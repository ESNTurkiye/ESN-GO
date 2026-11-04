/**
 * Seed data into a stage's DynamoDB tables (task 3.1, 03 - DynamoDB: "tek komutla seed").
 *
 *   npm run seed -- --stage dev            (uses your AWS profile, e.g. AWS_PROFILE=esngo-dev)
 *   npm run seed -- --stage dev-pr79       (GitHub Actions runs this after every deploy)
 *
 * Safe to run again: it only sets the fields that are in the seed file, so content
 * an admin adds later (intro, cover image…) is kept.
 */
import { readFile } from "node:fs/promises";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

/** Add a table here when it gets a seed file. */
const SEEDS = [{ file: "seed/cities.json", table: "cities", key: "cityId" }];

const STAGE = /^(dev|staging|prod|dev-[a-z0-9]+)$/; // same as template.yaml

function argument(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

const stage = argument("stage");
if (!stage || !STAGE.test(stage)) {
  console.error("Usage: npm run seed -- --stage <dev|prod|dev-xxx>");
  process.exit(1);
}

const db = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: argument("region") ?? "eu-central-1" }),
);

for (const seed of SEEDS) {
  const tableName = `esngo-${stage}-${seed.table}`;
  const items = JSON.parse(
    await readFile(new URL(`../${seed.file}`, import.meta.url), "utf8"),
  );

  for (const item of items) {
    const { [seed.key]: id, ...fields } = item;
    if (typeof id !== "string") {
      throw new Error(`${seed.file}: every item needs a "${seed.key}"`);
    }
    fields.seededAt = new Date().toISOString();

    const names = Object.keys(fields);
    await db.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { [seed.key]: id },
        UpdateExpression: `SET ${names.map((_, i) => `#f${i} = :v${i}`).join(", ")}`,
        ExpressionAttributeNames: Object.fromEntries(
          names.map((name, i) => [`#f${i}`, name]),
        ),
        ExpressionAttributeValues: Object.fromEntries(
          names.map((name, i) => [`:v${i}`, fields[name]]),
        ),
      }),
    );
  }
  console.log(`${tableName}: ${items.length} item(s) seeded`);
}
