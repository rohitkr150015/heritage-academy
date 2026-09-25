import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
test("Capture final desktop and mobile layouts for visual review", async ({
  page,
}) => {
  mkdirSync("docs/qa", { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const [route, name] of [
      ["/", "home"],
      ["/admissions/fees", "fees"],
      ["/portal/parent", "parent"],
      ["/campus", "campus"],
    ]) {
      await page.goto(route);
      await expect(page.locator("main")).not.toContainText(
        "Opening your next chapter",
      );
      await page.locator("img").evaluateAll((imgs) =>
        Promise.all(
          imgs.map((i) => {
            i.loading = "eager";
            return i.decode().catch(() => {});
          }),
        ),
      );
      await page.screenshot({
        path: `docs/qa/${name}-${width}.jpg`,
        type: "jpeg",
        quality: 80,
        fullPage: true,
      });
    }
  }
});
test("Record a throttled mobile production lab sample", async ({
  page,
  context,
}) => {
  test.skip(
    process.env.HERITAGE_QA_PRODUCTION !== "1",
    "Lab metrics require the production build.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 200000,
    uploadThroughput: 75000,
    connectionType: "cellular3g",
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    const metrics = { lcp: 0, cls: 0 };
    Object.assign(window, { heritageMetrics: metrics });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) metrics.lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        const entry = e as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const metrics = await page.evaluate(() => ({
    ...(window as unknown as { heritageMetrics: { lcp: number; cls: number } })
      .heritageMetrics,
    requests: performance.getEntriesByType("resource").length,
    userAgent: navigator.userAgent,
  }));
  mkdirSync("docs/qa", { recursive: true });
  writeFileSync(
    "docs/qa/lab.json",
    JSON.stringify(
      {
        conditions:
          "Local Vite production preview, cold cache, 390×844, CPU 4x slowdown, 150 ms latency, 1.6 Mbps download, 0.6 Mbps upload; one sample; preview serves uncompressed assets",
        ...metrics,
      },
      null,
      2,
    ),
  );
  console.log("Mobile lab metrics", metrics);
  expect(metrics.lcp).toBeGreaterThan(0);
});
