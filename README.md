# ⚡️Demo Bank Automated Testing ![2024-01-10_06h29_59](https://github.com/DominikCLK/Demo-Bank-Project/assets/75272795/81fe3253-f181-42b8-80dc-df17fc432083)

## Overview

This project aims to ensure the reliability and functionality of the [Demo Bank](https://demo-bank.vercel.app/) website through automated testing. Leveraging the Playwright framework with TypeScript, we strive to streamline the testing process, catching potential issues early on and maintaining a robust and error-free web application.

## 🚀 Features

- **End-to-End Testing:** Simulate real user interactions to validate the entire user journey.

- **Scenario Coverage:** Cover various user journeys, including login to account, fund transfers, and balance verification.

- **Continuous Integration:** Integrate the testing suite into the continuous integration pipeline for quick feedback.

## 💬 Note

For the purposes of the project, fake data is made available in the repository under the .env file

## 🛠 Technologies Used

- **Playwright Framework:** A powerful automation framework for browsers.

- **TypeScript:** Enhance code readability and maintainability with strong typing and modern features.

- **Continuous Integration (CI):** Automate testing on code changes for a continuous feedback loop.

## ⚡️ Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- Clone the Repository

```
git clone https://github.com/DominikCLK/Demo-Bank-Project.git
```

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky install`
- prepare local env file : `cp .env-template .env`
- copy app main URL as value `BASE_URL` variable in `.env` file

## Use

Run all tests:

```
npx playwright test
```

Run all tests with tags:

```
npx playwright test --grep /tag/
```

For more usage cases look in `package.json` scripts section.

## 🔗 Test requirements

- [Test cases](https://docs.google.com/spreadsheets/d/1RqqELBk0kdBnF3xazXMpz79Zdp9VXOKEjNhC_aKY__8/edit?usp=sharing)

##  Summary reports of tests

![2024-01-25_09h52_24](https://github.com/DominikCLK/Demo-Bank-Project/assets/75272795/29a393b8-dc80-4afc-aa65-c47bf65c326d)


## Author

- [@DominikCLK](https://github.com/DominikCLK)
