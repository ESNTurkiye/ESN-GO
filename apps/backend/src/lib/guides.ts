import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  type ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { mediaUrl } from "./media";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

/** guides tablosundaki kayıt (1.6). İçerik alanları 3.6'da admin/seed ile dolar. */
export interface Guide {
  guideId: string;
  order?: number;
  /** Erasmus Hacks page section: paperwork, daily-life or travel. */
  group?: string;
  title?: string;
  question?: string;
  summary?: string;
  icon?: string;
  /** S3 anahtarı: guides/<guideId>/<ULID>.<uzantı> */
  coverImage?: string;
  edition?: string;
  updatedAt?: string;
  [field: string]: unknown;
}

/** guideId: slug (ör. sim-card). */
const GUIDE_ID = /^[a-z0-9-]{1,64}$/;

export function isGuideId(value: unknown): value is string {
  return typeof value === "string" && GUIDE_ID.test(value);
}

function withCover(guide: Guide) {
  const { coverImage, ...rest } = guide;
  return {
    ...rest,
    coverImage: coverImage
      ? { key: coverImage, url: mediaUrl(coverImage) }
      : undefined,
  };
}

/**
 * Rehber listesi (Erasmus Hacks kartları): sadece kart alanları, order'a göre.
 * ~8 kayıt olduğu için Scan (1.6'da kabul edilen istisna).
 */
export async function listGuides() {
  const items: Guide[] = [];
  let startKey: ScanCommandInput["ExclusiveStartKey"];
  do {
    const res = await db.send(
      new ScanCommand({
        TableName: process.env.GUIDES_TABLE,
        ExclusiveStartKey: startKey,
      }),
    );
    items.push(...((res.Items ?? []) as Guide[]));
    startKey = res.LastEvaluatedKey;
  } while (startKey);

  return items
    .sort(
      (a, b) =>
        (a.order ?? Number.MAX_SAFE_INTEGER) -
        (b.order ?? Number.MAX_SAFE_INTEGER),
    )
    .map((guide) =>
      withCover({
        guideId: guide.guideId,
        order: guide.order,
        group: guide.group,
        title: guide.title,
        question: guide.question,
        summary: guide.summary,
        icon: guide.icon,
        coverImage: guide.coverImage,
        edition: guide.edition,
        updatedAt: guide.updatedAt,
      }),
    );
}

/** Tek rehber, bütün alanlarıyla. */
export async function findGuide(guideId: string) {
  const res = await db.send(
    new GetCommand({ TableName: process.env.GUIDES_TABLE, Key: { guideId } }),
  );
  return res.Item ? withCover(res.Item as Guide) : undefined;
}
