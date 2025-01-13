import { test as base } from "@playwright/test";
import { pages, Pages } from "./pages";

export const test = base.extend<Pages>({
  ...pages,
  page: async ({ page }, use) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await use(page);
  },
});
