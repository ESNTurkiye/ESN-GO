import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import type { Role } from "./http";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

/** users tablosundaki kayıt (1.6). */
export interface User {
  userId: string;
  name: string;
  section?: string;
  role: Role;
  createdAt: string;
}

/**
 * Girişte kullanıcıyı oluşturur veya günceller.
 * İlk girişte role = "esner" ve createdAt yazılır; sonraki girişlerde bunlara dokunulmaz
 * (admin rolü elle verilir ve korunur). Ad ve şube her girişte ESN'den güncellenir.
 */
export async function upsertUser(input: {
  userId: string;
  name: string;
  section?: string;
}): Promise<User> {
  const res = await db.send(
    new UpdateCommand({
      TableName: process.env.USERS_TABLE,
      Key: { userId: input.userId },
      UpdateExpression: [
        "SET #name = :name",
        "#role = if_not_exists(#role, :esner)",
        "#createdAt = if_not_exists(#createdAt, :now)",
        input.section ? "#section = :section" : undefined,
      ]
        .filter(Boolean)
        .join(", "),
      ExpressionAttributeNames: {
        "#name": "name",
        "#role": "role",
        "#createdAt": "createdAt",
        ...(input.section ? { "#section": "section" } : {}),
      },
      ExpressionAttributeValues: {
        ":name": input.name,
        ":esner": "esner",
        ":now": new Date().toISOString(),
        ...(input.section ? { ":section": input.section } : {}),
      },
      ReturnValues: "ALL_NEW",
    }),
  );
  return res.Attributes as User;
}

export async function findUser(userId: string): Promise<User | undefined> {
  const res = await db.send(
    new GetCommand({ TableName: process.env.USERS_TABLE, Key: { userId } }),
  );
  return res.Item as User | undefined;
}
