import type { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { MeetingAgendaPage } from "../pages/meetingAgenda.page";
import { MeetingDetailsPage } from "../pages/meetingDetails.page";
import { MeetingsListPage } from "../pages/meetingsList.page";

export type Pages = {
  loginPage: LoginPage;
  mettingAgendaPage: MeetingAgendaPage;
  meetingDetailsPage: MeetingDetailsPage;
  meetingListPage: MeetingsListPage;
};

type ExtendParams = Parameters<typeof base.extend<Pages>>[0];

export const pages: ExtendParams = {
  loginPage: async ({ page }, use) => {
    const loginPageInstance = new LoginPage(page);
    await use(loginPageInstance);
  },
  meetingDetailsPage: async ({ page }, use) => {
    const meetingDetailsPage = new MeetingDetailsPage(page);
    await use(meetingDetailsPage);
  },
  meetingListPage: async ({ page }, use) => {
    const meetingsListPage = new MeetingsListPage(page);
    await use(meetingsListPage);
  },
  mettingAgendaPage: async ({ page }, use) => {
    const meetingAgendaPage = new MeetingAgendaPage(page);
    await use(meetingAgendaPage);
  },
};
