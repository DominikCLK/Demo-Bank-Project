import { randomLoginData } from '../src/factories/user.factory';
import { expect, test } from '../src/fixtures/merge.fixture';
import { UserNameModel } from '../src/models/user.model';
import { loggedTestUser, testUser } from '../src/test-data/user.data';

test.describe('Verify login @DB-login', () => {
  test('Verify that users can successfully log in with valid credentials. ID and password with exactly 8 characters @DB-R01-01 @DB-R01-02', async ({
    page,
    loginPage,
    pulpitPage,
  }) => {
    // Arrange
    const loggedUserData: UserNameModel = {
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

  test('Verify that users can not log in with ID less than 8 characters @DB-R02-01', async ({
    page,
    loginPage,
  }) => {
    // Arrange
    const invalidID = randomLoginData(7, 8);

    // Act
    await loginPage.login(invalidID);
    const title = await loginPage.title();

    //Assert
    expect(title).toContain(loginPage.titleText);
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginIdError).toHaveText(loginPage.loginIdTextError);
  });

  test('Verify that users can not log in with password less than 8 characters @DB-R02-02', async ({
    page,
    loginPage,
  }) => {
    // Arrange
    const invalidID = randomLoginData(8, 7);

    // Act
    await loginPage.login(invalidID);
    const title = await loginPage.title();
    await page.click('body');

    //Assert
    expect(title).toContain(loginPage.titleText);
    await expect(page).toHaveURL(loginPage.url);
    await expect(loginPage.loginPasswordError).toHaveText(
      loginPage.loginPasswordTextError,
    );
  });

  test('Verify that users can not log in with empty password and ID fields @DB-R02-03', async ({
    page,
    loginPage,
  }) => {
    // Arrange
    const title = await loginPage.title();

    // Act
    await loginPage.userIDInput.click();
    await loginPage.userPasswordInput.click();
    await page.click('body');

    //Assert
    expect(title).toContain(loginPage.titleText);
    await expect(page).toHaveURL(loginPage.url);

    await expect(loginPage.loginIdError).toHaveText(
      loginPage.requiredFieldText,
    );
    await expect(loginPage.loginPasswordError).toHaveText(
      loginPage.requiredFieldText,
    );
  });
});
