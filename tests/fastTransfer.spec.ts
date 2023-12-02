import { LoginPage } from '../src/pages/login.page';
import { PulpitPage } from '../src/pages/pulpit.page';
import { testUser } from '../src/test-data/user.data';
import { faker } from '@faker-js/faker/locale/pl';
import { expect, test } from '@playwright/test';

test.describe('Verify Fast transfer flow', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await loginPage.goto();
    await loginPage.login(testUser);
  });

  test('Verify that users can successfully create a fast transfer @DB-R03-01 @DB-R03-02', async ({
    page,
  }) => {
    // Arrange
    const title = await pulpitPage.title();

    const moneyValue = await pulpitPage.moneyValue.innerText();
    const transferTitle = faker.lorem.sentence({ min: 3, max: 5 });

    // Act
    await pulpitPage.fastTransfer(moneyValue, transferTitle);

    //Assert
    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });
});
