import type { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";
export class MeetingsListPage extends BasePage {
  public readonly addNewMeetingButton: Locator = this.page.getByTestId("add_new_meeting");
  public readonly physicalMeetingOption: Locator = this.page.getByTestId("physical_meeting");

  public readonly meetingsListSeparatorHeader: Locator = this.page.getByTestId("meetings_list_separator_header");

  public readonly meetingsListDateHeader: Locator = this.page.getByTestId("meetings_list_separator_header").locator("div");
  public readonly metingRow: Locator = this.page.getByTestId("meetings_list_separator_header");
  public readonly selectAllCheckbox: Locator = this.page.locator('[aria-label="select all"]').first();

  public readonly deleteAllButton: Locator = this.page.locator("button>span>i.s-icon-trash-can").first();
  public readonly confirmDeleteButton: Locator = this.page.locator('.ant-modal-footer button[class*="Button_red"]');
  public readonly emptyMettingListWrapper: Locator = this.page.locator('[class*="MeetingList_emptyRoom__"]');
  public readonly searchInput: Locator = this.page.locator('input[role="combobox"][aria-controls="rc_select_0_list"]');
  public readonly editModeInput: Locator = this.page.getByTestId("switch_to_edit_mode");
  public readonly meetingListContainer: Locator = this.page.locator('[class*="MeetingList_meetingList"]');
  public readonly meetingMeetingTypeSelector: Locator = this.page.locator("#meeting-type-select");

  constructor(page: Page) {
    super(page);
  }
  async navigateToRoomMeetings(roomName: string): Promise<void> {
    await this.page.goto(`/administrator/rooms/${roomName}/meetings`);
    await this.page.waitForLoadState("networkidle");
  }
  getMeetingByTitle(meetingTitle: string) {
    return this.page.getByTestId(`select ${meetingTitle}`);
  }
  meetingListItem(meetingTitle: string) {
    return this.page.getByLabel(`${meetingTitle}`, { exact: true });
  }
  async deleteAllMeetings(): Promise<void> {
    await this.clickElement(this.selectAllCheckbox);
    await this.clickElement(this.deleteAllButton);
    await this.clickElement(this.confirmDeleteButton);
    await this.page.waitForLoadState("networkidle");
  }
  async setEditMode(state: boolean) {
    const isEditModeEnabled = (await this.editModeInput.getAttribute("aria-checked")) === "true";

    if (state !== isEditModeEnabled) {
      await this.clickElement(this.editModeInput);
    }
  }
}
