/** Health probe used by the Docker healthcheck. */
export function GET() {
  return Response.json({ status: "ok" });
}
