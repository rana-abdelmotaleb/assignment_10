import { createClient } from "redis";

export const redisConnection = async () => {
  const client = createClient({
    url: "rediss://default:gQAAAAAAAo4uAAIgcDE0MGY1Nzg2NDQyNWE0ZjA4YmMxM2FjNDVjYzBiN2UwMw@able-hawk-167470.upstash.io:6379",
  });

  client.on("error", function (err) {
    throw err;
  });
  await client.connect();
  console.log("redis connected");
  return client;
};
