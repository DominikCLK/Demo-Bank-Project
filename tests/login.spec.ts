import { LoginPage } from '../src/pages/login.page';
import { PulpitPage } from '../src/pages/pulpit.page';
import { testUser } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);

    await loginPage.goto();
  });

  test('Verify that users can successfully log in with valid credentials. @DB-R01-01', async ({
    page,
  }) => {
    // Act
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    //Assert
    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });
});
