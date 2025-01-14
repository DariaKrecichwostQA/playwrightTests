# xxx coding challenge for QA engineer
#### Dear candidate, welcome to the xxx coding challenge for QA engineer position. We are excited to see your skills in action
Below you will find the instructions for the challenge. Please read them carefully and follow them closely.
Don't forget to go through project's files as well, as they contain important information and hints!
In your inbox you received an invitation to xxx application. You will get the password from your recruiter.
Server's URL is https://xxx-coding-challenge.dev.xxx.io/, you can also find it in the invitation to xxx.

xxx is the meeting management software for board and executive teams. We would like you to prepare automated test cases for the following scenarios:
#### Log in to the application and verify that the user is logged in successfully
1. Open the application using the URL provided
2. Enter the username and password (provided by the recruiter)
3. Click on the login button
4. Verify that the user is logged in successfully
#### Attempt to log in with invalid credentials and verify that the user is not logged in and an error message is displayed
1. Open the application using the URL provided
2. Enter the incorrect username and correct password
3. Click on the login button
4. Verify that the user could not log in successfully
5. Verify that an error message is displayed
6. Enter the correct username and incorrect password
7. Click on the login button
8. Verify that the user could not log in successfully
9. Verify that an error message is displayed
#### Verify transition to the login page
1. Open the application using the URL provided
2. Using menu on top right, select language different from English
3. Verify that the login page is displayed in the selected language
#### Create a new meeting:
1. Open the application using the URL provided
2. Log in using the provided credentials
3. Click on the "New Meeting" button
4. Select meeting type "Meeting"
5. Enter the meeting title
6. Enter the meeting date
7. Enter the meeting start and end time (e.g. 10:00 - 11:00)
8. Click on the "Create" button
9. Verify that the meeting is visible in the list of meetings
#### Add an agenda item to the meeting:
1. Open the application using the URL provided
2. Log in using the provided credentials
3. Create a new meeting
4. Create 2 agenda items for the meeting
#### The application is available at URL provided by recruiter. You also received the credentials to log in.

### Requirements
- Use TypeScript and Playwright for writing the tests.
- Ensure the code is clean, well-structured, and follows best practices.
- Use the Page Object Model (POM) design pattern for structuring your code.
- Include assertions to verify the correctness of each step.
- Provide clear instructions on how to set up the environment and run the tests.
- Test your solution thoroughly to ensure all tests pass successfully.



## Project's structure
```
xxx-QA-Coding-Challenge
├── env
├── fixtures
├── pages
│ ├── login.page.ts
│ ├── meetingAgenda.page.ts
│ ├── meetingDetails.page.ts
│ └── meetingsList.page.ts
├── tests
├── package.json
├── playwright.config.ts
└── readme.md
```

## Getting started
1. To start the project you need to have Node.js installed on your machine.
2. Go to the project's root directory and run the following command to install the dependencies:
```
npm install
```

## Contributing
```
1. Clone the repository.
2. Create a new branch.
3. Commit your changes.
4. Push your changes to the branch and open a pull request.
```
