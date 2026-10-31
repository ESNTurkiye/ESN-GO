import { getPlace, isInTurkey, suggestPlaces } from "../../lib/geo";
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

    case "GET /geo/suggest": {
      // 1.8: ESNer mekan adını yazarken öneriler.
      if (!getUser(event)) return error(401, "UNAUTHORIZED", "Login required");

      const params = event.queryStringParameters ?? {};
      const q = params.q?.trim() ?? "";
      const lat = Number(params.lat);
      const lng = Number(params.lng);

      if (q.length < 3 || q.length > 100) {
        return error(400, "BAD_REQUEST", "q must be 3-100 characters");
      }
      if (!isInTurkey(lat, lng)) {
        return error(400, "BAD_REQUEST", "lat/lng must be a point in Türkiye");
      }

      return json(200, { results: await suggestPlaces(q, { lat, lng }) });
    }

    case "GET /geo/place": {
      // 1.8: seçilen önerinin kaydedilebilir konumu.
      if (!getUser(event)) return error(401, "UNAUTHORIZED", "Login required");

      const id = event.queryStringParameters?.id;
      if (!id || id.length > 500) {
        return error(400, "BAD_REQUEST", "id is required");
      }

      const place = await getPlace(id);
      if (!place) return error(404, "NOT_FOUND", "Place not found");
      return json(200, place);
    }

    default:
      return notImplemented(event);
  }
});
