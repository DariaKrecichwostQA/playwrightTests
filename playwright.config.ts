import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({
  path: ["env/.env.local", "env/test-server.env"],
});

export default defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL,
  },

  projects: [
    { name: "setup", testMatch: /login\.spec\.ts/ },
    {
      name: "meetings-cleanup",
      testMatch: /meetings\.cleanup\.ts/,
      use: {
        storageState: "./.auth/user.json",
      },
    },
    {
      name: "authenticated-tests",
      use: {
        storageState: "./.auth/user.json",
      },
      ...devices["Desktop Chrome"],
      dependencies: ["setup"],
      testDir: "./tests/authenticated-tests",
      teardown: "meetings-cleanup",
    },
    {
      name: "unauthenticated-tests",
      testDir: "./tests/unauthenticated-tests",
      ...devices["Desktop Chrome"],
    },
  ],
});
