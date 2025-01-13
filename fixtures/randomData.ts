import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import moment from "moment";

const seedNumber = randomInt(1, 1000000);
faker.seed(seedNumber);
export const meetingTitleData = faker.company.buzzAdjective() + " " + faker.number.int(10);
export const meetingStartDate = moment(faker.date.future()).format("DD MMM YYYY");
