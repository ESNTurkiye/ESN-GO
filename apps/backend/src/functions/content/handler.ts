import {
  type ApiEvent,
  error,
  getUser,
  json,
  notImplemented,
  parseJson,
  withErrors,
} from "../../lib/http";
import { createUpload, isImageType } from "../../lib/media";

/**
 * ContentService: şehirler, mekanlar, rehberler, görsel yükleme.
 * Bütün rotaları tek Lambda karşılıyor, event.routeKey ile ayrılıyor.
 */
export const handler = withErrors(async (event: ApiEvent) => {
  switch (event.routeKey) {
    case "GET /cities":
      // 1.5: iskelet testi. Gerçek şehir listesi 3.4'te gelecek.
      return json(200, {
        message: "Hello from ESN GO (Hakkı test)",
        stage: process.env.STAGE,
        time: new Date().toISOString(),
      });

    case "POST /uploads": {
      // 1.7: ESNer mekan fotoğrafı için imzalı yükleme izni alır.
      const user = getUser(event);
      if (!user) return error(401, "UNAUTHORIZED", "Login required");

      const contentType = parseJson(event)?.contentType;
      if (!isImageType(contentType)) {
        return error(
          400,
          "BAD_REQUEST",
          "contentType must be image/jpeg, image/png or image/webp",
        );
      }

      const folder = `uploads/${encodeURIComponent(user.userId)}`;
      return json(200, await createUpload(folder, contentType));
    }

    default:
      return notImplemented(event);
  }
});
