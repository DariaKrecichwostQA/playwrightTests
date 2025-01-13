import type { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

export class LoginPage extends BasePage {
  public readonly loginInput: Locator = this.page.locator("#email");
  public readonly passwordInput: Locator = this.page.locator("#password");
  public readonly logInButton: Locator = this.page.locator("button[type='submit']");
  public readonly loginAlert: Locator = this.page.locator('[role="alert"] > small');
  public readonly loginHeader: Locator = this.page.locator('h1[class*="ContentBoxTitle_heading"]');

  constructor(page: Page) {
    super(page);
  }

  private openLanguagePicker() {
    const languageOption = this.page.locator(`[class*="LanguageSwitcher"] [title]`);
    languageOption.click();
  }

  setLanguageOption(language: string) {
    this.openLanguagePicker();
    const languageOption = this.page.locator(`[title="${language}"]`);
    languageOption.click();
  }
  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.loginInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.logInButton);
    await this.page.waitForLoadState("networkidle");
  }
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }
}
