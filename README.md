# ⚡️Demo Bank Automated Testing

## Overview

This project aims to ensure the reliability and functionality of the [Demo Bank](https://demo-bank.vercel.app/) website through automated testing. Leveraging the Playwright framework with TypeScript, we strive to streamline the testing process, catching potential issues early on and maintaining a robust and error-free web application.

## 🚀 Features

- **End-to-End Testing:** Simulate real user interactions to validate the entire user journey.

- **Scenario Coverage:** Cover various user journeys, including login to account, fund transfers, and balance verification.

- **Continuous Integration:** Integrate the testing suite into the continuous integration pipeline for quick feedback.

## 🛠 Technologies Used

- **Playwright Framework:** A powerful automation framework for browsers.

- **TypeScript:** Enhance code readability and maintainability with strong typing and modern features.

- **Continuous Integration (CI):** Automate testing on code changes for a continuous feedback loop.

  
# Test requirements
Tags - (D-demo, B-bank, R-requirements, '01'- number of section)


- **Login flow requirements** 

| DB-R01 Valid Credentials: |
| -------- |
| DB-R01-01 : Verify that users can successfully log in with valid credentials. ID and password with exactly 8 characters          |
| DB-R01-02 : Verify that users is on pulpit page. Name and lastname are visible  |

| DB-R02 Invalid Credentials: |
| -------- |
| DB-R02-01 : Verify that users can not log in with ID less than 8 characters. Visible alert - "identyfikator ma min. 8 znaków"
| DB-R02-02 : Verify that users can not log in with password less than 8 characters.  Visible alert - "hasło ma min. 8 znaków"|
| DB-R02-03 : Verify that users can not log in with empty ID and fields.  Visible alert - "pole wymagane"|

- **Dashboard requirements** 

| DB-R03 Valid Fast transfer flow: |
| -------- |
| DB-R03-01 : Verify that users can successfully create a fast transfer. Select a recipient from the list. Use all available funds, fill title input        |
| DB-R03-02 : Verify that the popup is visible, contains the transfer recipient, transfer amount and title. Close popup by clicking "Ok" button       |

| DB-R04 Invalid Fast transfer flow: |
| -------- |
| DB-R04-01 : Verify that users can not create a fast transfer. Do not select a recipient from the list. Use all available funds, fill title input. Visible alert "pole wymagane"       |
| DB-R04-02 : Verify that users can not create a fast transfer. Select a recipient from the list. Left empty funds input, fill title input. Visible alert "pole wymagane"       |
| DB-R04-03 : Verify that users can not create a fast transfer. Select a recipient from the list. Use all available funds, left empty title input. Visible alert "pole wymagane"       |
| DB-R04-04 : Verify that users can not create a fast transfer. Do not fill all inputs, click "execute" button. Visible alert "pole wymagane"       |

























## Author

- [@DominikCLK](https://github.com/DominikCLK)


