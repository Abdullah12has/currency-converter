import { Request, Response } from "express";
import axios from "axios";
import { setCache } from "../middleware/cache";

const formatCurrency = (value: number, currency: string, locale: string): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
};

export const convertCurrency = async (req: Request, res: Response) => {
  // from is source currency
  // to is target currency
  // amount is amount of source currency
  const { from, to, amount } = req.query;
  const locale = "fi-FI";

  const cacheKey = from + "_" + to + "_" + amount;

  // Construct the GraphQL query to get the conversion rate from and to currencies from EUR
  const query = `
  query ConvertCurrency {
    fromRate: latest(baseCurrency: "EUR", quoteCurrencies: ["${from}"]) {
      quoteCurrency
      quote
    }
    toRate: latest(baseCurrency: "EUR", quoteCurrencies: ["${to}"]) {
      quoteCurrency
      quote
    }
  }
`;

  try {
    // POST request to the GraphQL endpoint
    const responseFromAPI = await axios.post(
      "https://swop.cx/graphql",
      { query },
      {
        headers: {
          Authorization: `ApiKey ${process.env.SWOP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const fromRate = responseFromAPI.data.data.fromRate[0]?.quote; // Rate from EUR to 'from'
    const toRate = responseFromAPI.data.data.toRate[0]?.quote; // Rate from EUR to 'to'

    if (!fromRate || !toRate) {
      return res.status(400).json({ error: "Invalid currency codes provided or rates not available." });
    }

    const amountInEuro = parseFloat(amount as string) / fromRate;

    const convertedValue = amountInEuro * toRate;
    const formattedValue = formatCurrency(convertedValue, to as string, locale);

    try {
      await setCache(cacheKey, formattedValue);
    } catch (error) {
      logging.error("Failed to set cache in ConvertController. ", error);
    }

    res.json({
      from,
      to,
      amount,
      convertedValue: formattedValue,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logging.error("API Error Response:", error.response?.data?.errors);
      res.status(error.response?.status || 500).json({ error: "Failed to fetch exchange rates from API" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
