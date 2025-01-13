import { test } from "../fixtures/main";
import { expect } from "@playwright/test";

import { config } from "../env/config";
test("Clean meetings", async ({ meetingListPage, page }) => {
  //ARANGE: Navigate to meetings list page in edit mode //TODO:fix
  await meetingListPage.navigateToRoomMeetings(config.roomName);
  if ((await meetingListPage.selectAllCheckbox.count()) > 0) {
    await meetingListPage.deleteAllMeetings();
  }
  await expect(await meetingListPage.emptyMettingListWrapper).toBeVisible();
});
