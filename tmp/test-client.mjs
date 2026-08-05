import { ConvexHttpClient } from "/project/node_modules/convex/dist/esm/browser/index.js";
const client = new ConvexHttpClient("https://majestic-wildcat-199.convex.cloud");
const t0 = Date.now();
try {
  const res = await client.action("github:tokenStatus", {});
  console.log("OK", JSON.stringify(res), "in", Date.now() - t0, "ms");
} catch (e) {
  console.log("FAIL", e.message ?? String(e), "in", Date.now() - t0, "ms");
}
process.exit(0);
