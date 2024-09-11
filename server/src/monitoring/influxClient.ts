import { InfluxDB, Point, WriteApi } from "@influxdata/influxdb-client";

const url = process.env.INFLUXDB_URL || "http://localhost:8086";
const token = process.env.INFLUXDB_TOKEN;
const org = process.env.INFLUXDB_ORG || "orgname";
const bucket = process.env.INFLUXDB_BUCKET || "orgbucket";

const influxDB = new InfluxDB({ url, token });

const writeApi: WriteApi = influxDB.getWriteApi(org, bucket, "ns"); // Use nanoseconds precision

writeApi.useDefaultTags({ app: "currency-converter" });

export const writePoint = (measurement: string, tags: Record<string, string>, fields: Record<string, any>) => {
  const point = new Point(measurement);

  Object.entries(tags).forEach(([key, value]) => {
    point.tag(key, value);
  });

  Object.entries(fields).forEach(([key, value]) => {
    point.floatField(key, value);
  });

  writeApi.writePoint(point);
};

// Properly close the WriteApi when the process exits
process.on("SIGINT", async () => {
  console.log("Closing InfluxDB Write");
  await writeApi
    .close()
    .then(() => {
      console.log("InfluxDB Write API closed successfully.");
    })
    .catch((err) => {
      console.error("Error closing InfluxDB Write API: ", err);
    });
  process.exit(0);
});

export { Point, writeApi };
