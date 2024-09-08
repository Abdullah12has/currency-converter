import { Request, Response } from "express";
import axios from "axios";
import { setCache } from "../middleware/cache";

const formatCurrency = (value: number, currency: string, locale: string): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
};

export const convertCurrency = async (req: Request, res: Response) => {
  // from = source currency
  // to = target currency
  // amount = amount of source currency
  const { from, to, amount } = req.query;
  const locale = "fi-FI";

  const cacheKey = from + "_" + to + "_" + amount;

  try {
    const responseFromAPI = await axios.get(`https://swop.cx/rest/rates/${from}/${to}`, {
      headers: {
        Authorization: `ApiKey ${process.env.SWOP_API_KEY}`,
      },
    });

    const rate = responseFromAPI.data.quote;
    const convertedValue = parseFloat(amount as string) * rate;

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
    // logging.error("ERROR in getting conversion rates:", error);
    if (axios.isAxiosError(error)) {
        logging.error("API Error Response:", error.response?.data?.error);
      logging.error("API Error Response:", error.response?.data?.error?.details);
      res.status(error.response?.status || 500).json({ error: "Failed to fetch exchange rates from API" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
