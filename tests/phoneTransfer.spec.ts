import { LoginPage } from '../src/pages/login.page';
import { PulpitPage } from '../src/pages/pulpit.page';
import { testUser } from '../src/test-data/user.data';
import { SubmitFastTransferView } from '../src/views/submitTransfer.view';
import { expect, test } from '@playwright/test';

test.describe('Verify Phone transfer flow', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  let submitTransferView: SubmitFastTransferView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    submitTransferView = new SubmitFastTransferView(page);

    await loginPage.goto();
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verify that users can successfully create a phone transfer @DB-R05-01 @DB-R05-02', async ({}) => {
    // Arrange
    const amount = pulpitPage.randomPhoneAmount;
    const phone = pulpitPage.randomPhoneOption;

    // Act
    await pulpitPage.phoneTransferSelectOption(phone, amount);
    await pulpitPage.topUpBtn.click();

    await expect(submitTransferView.submitViewTextPhoneTransfer).toBeVisible();
    await submitTransferView.submitTransferBtn.click();

    await pulpitPage.successfulTransferMessage.waitFor({ state: 'visible' });
    await expect(pulpitPage.successfulTransferMessage).toContainText(
      String(amount),
    );
    await expect(pulpitPage.successfulTransferMessage).toContainText(phone);
  });

  test('Verify that users can successfully create a phone transfer. Select 504 xxx xxx number from the list @DB-R05-03', async ({}) => {
    // Arrange
    const amount = pulpitPage.randomTopUpOption;
    const phone = '504 xxx xxx';

    // Act
    await pulpitPage.phoneTransferSelectOption(phone, amount);
    await pulpitPage.topUpBtn.click();

    await expect(submitTransferView.submitViewTextPhoneTransfer).toBeVisible();
    await submitTransferView.submitTransferBtn.click();

    await pulpitPage.successfulTransferMessage.waitFor({ state: 'visible' });
    await expect(pulpitPage.successfulTransferMessage).toContainText(
      String(amount),
    );
    await expect(pulpitPage.successfulTransferMessage).toContainText(phone);
  });
});
