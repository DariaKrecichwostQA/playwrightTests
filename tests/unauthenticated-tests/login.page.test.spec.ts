import { test } from "../../fixtures/main";
import { expect } from "@playwright/test";
import waitForExpect from "wait-for-expect";
import { config } from "../../env/config";

test.describe("Unauthenticated tests", () => {
  test("@loginv Log in with invalid credentials", async ({ page, loginPage }) => {
    // Open the application using the URL provided
    await loginPage.navigateToLoginPage();
    await loginPage.setLanguageOption("English");

    //Enter the incorrect username and correct password and click on the login button
    await loginPage.login(config.email, config.password + "1");
    console.log(page.url());
    //Verify that the user could not log in successfully
    await expect(page).not.toHaveURL(/.*administrator/);

    //Verify that an error message is displayed
    const alert1 = await loginPage.getTextFromSelector(loginPage.loginAlert);
    console.log(page.url());
    await expect(alert1).toBe("We couldn't log you in. Please check your email address and password and try again.");

    //Enter the correct username and incorrect password and click on the login button
    await loginPage.login(config.email + "1", config.password);

    //Verify that the user could not log in successfully
    await expect(page).not.toHaveURL(/.*administrator/);

    // Verify that an error message is displayed
    await waitForExpect(async () => {
      const alert2 = await loginPage.getTextFromSelector(loginPage.loginAlert);
      await expect(alert2).toBe("Please enter a valid email address.");
    });
  });

  test("@language Select Deutsch language", async ({ loginPage }) => {
    //Open the application using the URL provided
    await loginPage.navigateToLoginPage();

    //Using menu on top right, select language different from English
    await loginPage.setLanguageOption("Deutsch");

    //Verify that the login page is displayed in the selected language
    await waitForExpect(async () => {
      const buttonText = await loginPage.getTextFromSelector(loginPage.logInButton);
      const headingText = await loginPage.getTextFromSelector(loginPage.loginHeader);
      expect(headingText).toEqual("Anmelden");
      expect(buttonText).toEqual("Anmelden");
    });
  });
});
