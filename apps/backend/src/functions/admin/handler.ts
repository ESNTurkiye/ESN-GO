import { type ApiEvent, notImplemented, withErrors } from "../../lib/http";

/** AdminService: sadece admin'e açık işlemler. Task 6.x'te. */
export const handler = withErrors(async (event: ApiEvent) => {
  return notImplemented(event);
});
