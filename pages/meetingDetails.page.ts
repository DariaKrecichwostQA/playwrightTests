import type { Page, Locator } from "@playwright/test";
import BasePage from "./base.page";

type FieldMapping<T> = {
  meetingTitle: T;
  purposeOfMeeting?: T;
  date: T;
  startTime?: T;
  endTime: T;
  timezone?: T;
  physicalLocation?: T;
  conferenceCall?: T;
};

export type MeetingGeneralInfo = FieldMapping<string>;

export class MeetingDetailsPage extends BasePage {
  public readonly meetingTileInput: Locator = this.page.locator("#name");
  public readonly meetingPurposetextarea: Locator = this.page.locator("#information");
  public readonly meetingDateInput: Locator = this.page.getByTestId("date_picker");
  public readonly meetingStartTimeInput: Locator = this.page.locator("#start_time_picker");
  public readonly meetingEndTimeInput: Locator = this.page.locator("#end_time_picker");
  public readonly createButton: Locator = this.page.getByTestId("submitButton");
  public readonly purposeOfMeetingInput: Locator = this.page.locator("#information");
  public readonly timezoneInput: Locator = this.page.getByTestId("timezone_list");
  public readonly physicalLocationInput: Locator = this.page.locator("#location");
  public readonly conferenceCallInput: Locator = this.page.locator('[name="conferenceCallProvider"]');

  constructor(page: Page) {
    super(page);
  }

  async fillMeetingGeneralInfo(meetingData: MeetingGeneralInfo): Promise<void> {
    const fieldMappings: Required<FieldMapping<Locator>> = {
      meetingTitle: this.meetingTileInput,
      date: this.meetingDateInput,
      startTime: this.meetingStartTimeInput,
      endTime: this.meetingEndTimeInput,
      purposeOfMeeting: this.purposeOfMeetingInput,
      timezone: this.timezoneInput,
      physicalLocation: this.physicalLocationInput,
      conferenceCall: this.conferenceCallInput,
    };

    for (const [key, value] of Object.entries(meetingData)) {
      if (value !== undefined && fieldMappings[key]) {
        await this.fillInput(fieldMappings[key], value);
      }
    }
  }
}
