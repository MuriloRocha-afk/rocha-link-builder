import { createServerFn } from "@tanstack/react-start";

/** O ID de medição do GA4 fica guardado como secret; devolvemos ao cliente pois é público. */
export const getGaMeasurementId = createServerFn({ method: "GET" }).handler(async () => {
  return process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"] ?? null;
});
