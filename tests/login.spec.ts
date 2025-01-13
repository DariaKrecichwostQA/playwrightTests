import { config } from "../env/config";
import { test as setup } from "../fixtures/main";
import { expect } from "@playwright/test";

const userAuthFile = "./.auth/user.json";

setup("Login as user", async ({ loginPage, page, context }) => {
  // Open the application using the URL provided
  await loginPage.navigateToLoginPage();
  // Enter the username and password and click on the login button
  await loginPage.login(config.email, config.password);

  // Verify that the user is logged in successfully
  await loginPage.loginInput.waitFor({ state: "detached" });
  const state = await context.storageState({ path: userAuthFile });
  await expect(state.cookies.map((x) => x.name)).toContain("iam_authentication_session_token");
  await expect(page).toHaveURL(/.*administrator/);

  await page.waitForLoadState("networkidle");
});
