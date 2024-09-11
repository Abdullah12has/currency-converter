import exp from "constants";
import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";

const REDIS_PORT = process.env.REDIS_PORT || "6379";
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1";
export const client = createClient({
  url: `${REDIS_URL}:${REDIS_PORT}`,
});
client.on("error", (error) => {
  logging.error("REDIS ERROR", error);
});

(async () => {
  await client.connect();
})();

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from, to, amount } = req.query;

    if (!from) {
      return res.status(400).json({ error: "Required Value Source Currency Missing." });
    }

    if (!to) {
      return res.status(400).json({ error: "Required Value Target Currency Missing." });
    }

    if (!amount) {
      return res.status(400).json({ error: "Required Value Amount Missing." });
    }

    const cacheKey = from + "_" + to + "_" + amount;
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      logging.info("Cache hit for key:" + cacheKey);
      logging.info(cachedData);
      return res.json(JSON.parse(cachedData));
    }

    logging.warn("Cache missing for key" + cacheKey);
    next();
  } catch (error) {
    logging.error("ERROR accessing cache", error);
    next();
  }
};

// if no cache timeout given stores for 30 mins
export const setCache = async (key: string, data: any, expire: number = 1800) => {
  try {
    await client.setEx(key, expire, JSON.stringify(data));
    logging.log("Cache set for key:" + key + "with expiry of:" + expire);
  } catch (error) {
    logging.error("ERROR Setting Cache", error);
  }
};

process.on("SIGINT", async () => {
  await client.disconnect();
  logging.warn("REDIS CLIENT DISCONNECTED.");
  process.exit(0);
});
