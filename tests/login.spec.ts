import { randomLoginData } from '../src/factories/user.factory';
import { UserName } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { PulpitPage } from '../src/pages/pulpit.page';
import { loggedTestUser, testUser } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await loginPage.goto();
  });

  test('Verify that users can successfully log in with valid credentials. @DB-R01-01 @DB-R01-02', async ({
    page,
  }) => {
    // Arrange
    const loggedUserData: UserName = {
      userName: loggedTestUser.userName,
    };
    const userName = loggedUserData.userName;

    // Act
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    //Assert
    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
    await expect(pulpitPage.userName).toHaveText(userName);
  });

  test('Verify that users can not log in with ID less than 8 characters. @DB-R02-01', async ({
    page,
  }) => {
    // Arrange
    const invalidID = randomLoginData(7, 8);

    // Act <--to do
    await loginPage.login(invalidID);
    const title = await pulpitPage.title();

    //Assert <--to do
    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });
});
