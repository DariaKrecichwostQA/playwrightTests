import type { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";
export class MeetingAgendaPage extends BasePage {
  public readonly agendaNewItemInput: Locator = this.page.getByTestId("type_new_agenda_item");
  public readonly agendaItemRow: Locator = this.page.getByTestId("agenda_item_row");
  public readonly agendaItemName: Locator = this.page.getByTestId("agenda_item_name");
  constructor(page: Page) {
    super(page);
  }
  async addAgendaItem(meetingAgendaItemData: string): Promise<void> {
    await this.fillInput(this.agendaNewItemInput, meetingAgendaItemData);
    await this.page.keyboard.press("Enter");
  }
}
