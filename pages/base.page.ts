import type { Page, Locator } from "@playwright/test";

export default class BasePage {
  protected page: Page;
  public readonly notificationSnackBar: Locator;
  public readonly spinerAnimation: Locator;
  public readonly notificationMessageSnackBar: Locator;
  constructor(page: Page) {
    this.page = page;
    this.notificationSnackBar = page.getByTestId("notifications");
    this.notificationMessageSnackBar = page.locator('[class*="Snackbar_message"]');
    this.spinerAnimation = page.locator('[class*="Spinner"]');
  }

  async getTextFromSelector(selector: Locator, options?: { timeout?: number }): Promise<string | null> {
    const { timeout = 3000 } = options || {};
    await this.allSpinnersDisappeared();

    try {
      await selector.waitFor({ state: "visible", timeout });
      const text = await selector.textContent();
      return text ?? null;
    } catch (error) {
      return null;
    }
  }

  async fillInput(element: Locator, value: string): Promise<void> {
    await this.allSpinnersDisappeared();
    await element.waitFor({ state: "visible" });
    await element.click();
    await element.fill(value);
  }

  async clickElement(selector: Locator): Promise<void> {
    await this.allSpinnersDisappeared();
    await selector.waitFor({ state: "visible" });
    await selector.click();
  }
  async allSpinnersDisappeared(): Promise<void> {
    const spinners = await this.spinerAnimation.all();
    for (const spinner of spinners) {
      await spinner.waitFor({ state: "detached", timeout: 5000 });
    }
  }
}
