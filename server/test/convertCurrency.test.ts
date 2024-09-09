import request from "supertest";
import axios from "axios";
import { createApp } from "../src/createApp";
import { client as redisClient, setCache } from "../src/middleware/cache";
import { type Express } from "express";

describe("/test", () => {
  let app: Express;

  // need to create the express app before testing
  beforeAll(() => {
    app = createApp();
  });

  // need to disconnect redis cache after all the tests
  afterAll(async () => {
    await redisClient.disconnect(); // Disconnect Redis client here
  });

  // test to check the function that tells if the app is working or not

  it("should return a message saying everything is working", async () => {
    const res = await request(app).get("/test");
    expect(res.statusCode).toStrictEqual(200);
    expect(res.body).toHaveProperty("status", "Server is Working");
  });

  // integration test for the API

  it("should do a correct conversion of USD to CHF by making a real API call", async () => {
    const fromCurrency = "USD";
    const toCurrency = "CHF";
    const amount = 100;

    // Send a GET request to the /convert endpoint
    const res = await request(app)
      .get("/convert")
      .query({ from: fromCurrency, to: toCurrency, amount: String(amount) })
      .set("Authorization", `ApiKey ${process.env.SWOP_API_KEY}`); // API key from .env.test

    //   // status code should be 200
    expect(res.statusCode).toBe(200);

    //   // general response structure
    expect(res.body).toHaveProperty("from", fromCurrency);
    expect(res.body).toHaveProperty("to", toCurrency);
    expect(res.body).toHaveProperty("amount", String(amount));

    // Calculated converted value should be there
    expect(res.body).toHaveProperty("convertedValue");
    expect(typeof res.body.convertedValue).toBe("string"); // Check if the converted value is a string

    // Log the converted value for debugging
    console.log(`Converted value: ${res.body.convertedValue}`);
  });

  // // Test to see if there's a wrong currency code

  it("should return an error for invalid currency codes", async () => {
    const res = await request(app)
      .get("/convert")
      .query({ from: "INVALID_CODE", to: "CHF", amount: "100" })
      .set("Authorization", `ApiKey ${process.env.SWOP_API_KEY}`);

    expect(res.statusCode).toBe(400); // Adjust based on your API's error handling
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toContain("Error. Please check if you've input correct curriencies.");
  });

  // Test missing parameters entered to the API, and it should give an error

  it("should return an error for missing the 'to' currency parameter", async () => {
    const res = await request(app)
      .get("/convert")
      .query({ from: "USD", amount: "100" })
      .set("Authorization", `ApiKey ${process.env.SWOP_API_KEY}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  // When Amoun input is not a number
  it("should return an error for invalid amount value", async () => {
    const res = await request(app)
      .get("/convert")
      .query({ from: "USD", to: "EUR", amount: "abc" })
      .set("Authorization", `ApiKey ${process.env.SWOP_API_KEY}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
