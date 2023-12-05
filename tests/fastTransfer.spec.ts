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
    const title = await pulpitPage.title();

    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verify that users can successfully create a fast transfer @DB-R03-01 @DB-R03-02', async ({}) => {
    // Arrange
    const moneyValue = await pulpitPage.moneyValue.innerText();
    const transferTitle = generateRandomSentence(10);

    // Act
    await pulpitPage.fastTransfer(moneyValue, transferTitle);
    await pulpitPage.sendTransferBtn.click();

    await expect(pulpitPage.submitViewText).toBeVisible();
    await submitTransferView.submitTransferBtn.click();

    //Assert
    await pulpitPage.successfulTransferMessage.waitFor({ state: 'visible' });
    await expect(pulpitPage.successfulTransferMessage).toContainText(
      moneyValue,
    );
    await expect(pulpitPage.successfulTransferMessage).toContainText(
      transferTitle,
    );
  });

  test('Verify that users can not create a fast transfer - empty recipient @DB-R04-01', async ({}) => {
    // Arrange
    const moneyValue = await pulpitPage.moneyValue.innerText();
    const transferTitle = generateRandomSentence(10);

    // Act
    await pulpitPage.fastTransfer(moneyValue, transferTitle);
    await pulpitPage.recipientList.selectOption('');
    await pulpitPage.sendTransferBtn.click();

    //Assert
    await expect(pulpitPage.recipientRequiredError).toHaveText(
      pulpitPage.requiredFieldText,
    );
  });

  test('Verify that users can not create a fast transfer - empty amount @DB-R04-02', async ({}) => {
    // Arrange
    const moneyValue = '';
    const transferTitle = generateRandomSentence(10);

    // Act
    await pulpitPage.fastTransfer(moneyValue, transferTitle);

    await pulpitPage.sendTransferBtn.click();

    //Assert
    await expect(pulpitPage.amountRequiredError).toHaveText(
      pulpitPage.requiredFieldText,
    );
  });

  test('Verify that users can not create a fast transfer - empty title @DB-R04-03', async ({}) => {
    // Arrange
    const moneyValue = await pulpitPage.moneyValue.innerText();
    const transferTitle = '';

    // Act
    await pulpitPage.fastTransfer(moneyValue, transferTitle);
    await pulpitPage.sendTransferBtn.click();

    //Assert
    await expect(pulpitPage.titleRequiredError).toHaveText(
      pulpitPage.requiredFieldText,
    );
  });

  test('Verify that users can not create a fast transfer. Do not fill all inputs @DB-R04-04', async ({}) => {
    // Act
    await pulpitPage.sendTransferBtn.click();

    //Assert
    await expect(pulpitPage.recipientRequiredError).toHaveText(
      pulpitPage.requiredFieldText,
    );

    await expect(pulpitPage.amountRequiredError).toHaveText(
      pulpitPage.requiredFieldText,
    );

    await expect(pulpitPage.titleRequiredError).toHaveText(
      pulpitPage.requiredFieldText,
    );
  });
});
