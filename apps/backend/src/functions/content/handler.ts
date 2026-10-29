import {
  type ApiEvent,
  json,
  notImplemented,
  withErrors,
} from "../../lib/http";

/**
 * ContentService: şehirler, mekanlar, rehberler.
 * Bütün rotaları tek Lambda karşılıyor, event.routeKey ile ayrılıyor.
 */
export const handler = withErrors(async (event: ApiEvent) => {
  switch (event.routeKey) {
    case "GET /cities":
      // 1.5: iskelet testi. Gerçek şehir listesi 3.4'te gelecek.
      return json(200, {
        message: "Hello from ESN GO",
        stage: process.env.STAGE,
      });

    default:
      return notImplemented(event);
  }
});
