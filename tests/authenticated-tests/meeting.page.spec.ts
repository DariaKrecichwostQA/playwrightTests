import { test } from "../../fixtures/main";
import { expect } from "@playwright/test";
import { config } from "../../env/config";
import { faker, tr } from "@faker-js/faker";
import moment from "moment";

test.describe("Authenticated tests", () => {
  test("@create Create a new meeting", async ({ meetingListPage, meetingDetailsPage }) => {
    const meetingTitleData = faker.company.buzzAdjective() + " " + faker.number.int(10);
    const meetingStartDate = moment(faker.date.future()).format("DD MMM YYYY");

    // Open the application using the URL provided
    await meetingListPage.navigateToRoomMeetings(config.roomName);
    await meetingListPage.setEditMode(true);
    await expect(meetingListPage.meetingListContainer).toBeVisible();

    // Click on the "New Meeting" button
    await meetingListPage.clickElement(meetingListPage.addNewMeetingButton);
    await expect(meetingListPage.meetingMeetingTypeSelector).toBeVisible();

    // Select meeting type "Meeting"
    await meetingListPage.clickElement(meetingListPage.physicalMeetingOption);
    await expect(meetingDetailsPage.meetingStartTimeInput).toBeVisible();

    // Enter the meeting title,date,meeting start and end time and click on the "Create" button
    await meetingDetailsPage.fillMeetingGeneralInfo({
      meetingTitle: meetingTitleData,
      date: meetingStartDate,
      startTime: "08:00",
      endTime: "09:00",
    });
    await expect(await meetingDetailsPage.meetingTileInput.inputValue()).toEqual(meetingTitleData);
    await expect(await meetingDetailsPage.meetingDateInput.inputValue()).toEqual(meetingStartDate);
    await expect(await meetingDetailsPage.meetingStartTimeInput.inputValue()).toEqual("08:00");
    await expect(await meetingDetailsPage.meetingEndTimeInput.inputValue()).toEqual("09:00");

    // Click on the "Create" button
    await meetingDetailsPage.clickElement(meetingDetailsPage.createButton);

    // Verify that the meeting is visible in the list of meetings
    await meetingListPage.navigateToRoomMeetings(config.roomName);
    await meetingListPage.setEditMode(true);
    await expect(meetingListPage.meetingListContainer).toBeVisible();

    //Search for meeting title
    await meetingListPage.fillInput(meetingListPage.searchInput, meetingTitleData);
    const meetingElement = meetingListPage.getMeetingByTitle(meetingTitleData);

    await expect(meetingElement).toBeVisible(); //TODO: ALL properties like date, title are visible in meeting
  });

  test("@agenda Add an agenda item to the meeting", async ({
    meetingListPage,
    meetingDetailsPage,
    mettingAgendaPage: meetingAgendaPage,
  }) => {
    const meetingTitleData = faker.company.buzzAdjective() + " " + faker.number.int(10);
    const meetingStartDate = moment(faker.date.future()).format("DD MMM YYYY");

    //Open the application using the URL provided
    await meetingListPage.navigateToRoomMeetings(config.roomName);
    await meetingListPage.setEditMode(true);
    await expect(meetingListPage.meetingListContainer).toBeVisible();

    //Create a new meeting //TODO: Send request
    await meetingListPage.clickElement(meetingListPage.addNewMeetingButton);
    await expect(meetingListPage.meetingMeetingTypeSelector).toBeVisible();
    await meetingListPage.clickElement(meetingListPage.physicalMeetingOption);
    await expect(meetingDetailsPage.meetingStartTimeInput).toBeVisible();
    await meetingDetailsPage.fillMeetingGeneralInfo({
      meetingTitle: meetingTitleData,
      date: meetingStartDate,
      startTime: "08:00",
      endTime: "09:00", //TODO: Use data from file or randomize data
    });
    await expect(await meetingDetailsPage.meetingTileInput.inputValue()).toEqual(meetingTitleData);
    await expect(await meetingDetailsPage.meetingDateInput.inputValue()).toEqual(meetingStartDate);
    await expect(await meetingDetailsPage.meetingStartTimeInput.inputValue()).toEqual("08:00");
    await expect(await meetingDetailsPage.meetingEndTimeInput.inputValue()).toEqual("09:00");
    await meetingDetailsPage.clickElement(meetingDetailsPage.createButton);

    //Create 2 agenda items for the meeting
    await addAgendaItem();
    await addAgendaItem();

    async function addAgendaItem() {
      const name = faker.company.buzzAdjective() + " " + faker.number.int(10);
      await meetingAgendaPage.addAgendaItem(name);
      await expect(await meetingAgendaPage.getTextFromSelector(meetingAgendaPage.agendaItemName.last())).toEqual(name);
    }
  });
});
