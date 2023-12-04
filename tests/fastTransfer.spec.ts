import { generateRandomSentence } from '../src/factories/randomData.factory';
import { LoginPage } from '../src/pages/login.page';
import { PulpitPage } from '../src/pages/pulpit.page';
import { testUser } from '../src/test-data/user.data';
import { SubmitTransferView } from '../src/views/submitTransfer.view';
import { expect, test } from '@playwright/test';

test.describe('Verify Fast transfer flow', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  let submitTransferView: SubmitTransferView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    submitTransferView = new SubmitTransferView(page);

    await loginPage.goto();
    await loginPage.login(testUser);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verify that users can successfully create a fast transfer @DB-R03-01 @DB-R03-02', async ({
    page,
  }) => {
    // Arrange
    const title = await pulpitPage.title();
    const moneyValue = await pulpitPage.moneyValue.innerText();
    const transferTitle = generateRandomSentence(10);

    // Act
    await pulpitPage.fastTransfer(moneyValue, transferTitle);
    await submitTransferView.submitTransferBtn.click();

    //Assert
    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);

    await expect(pulpitPage.successfulTransferMessage).toContainText(
      moneyValue,
    );
    await expect(pulpitPage.successfulTransferMessage).toContainText(
      transferTitle,
    );
  });
});
