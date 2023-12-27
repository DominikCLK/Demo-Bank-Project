import { prepareTransferData } from '../src/factories/transferData.factory';
import { LoginPage } from '../src/pages/login.page';
import { PulpitPage } from '../src/pages/pulpit.page';
import { testUser } from '../src/test-data/user.data';
import { SubmitFastTransferView } from '../src/views/submitTransfer.view';
import { expect, test } from '@playwright/test';

test.describe('Verify Fast transfer flow', () => {
  let loginPage: LoginPage;
  let pulpitPage: PulpitPage;
  let submitFastTransferView: SubmitFastTransferView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    submitFastTransferView = new SubmitFastTransferView(page);

    await loginPage.goto();
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verify that users can successfully create a fast transfer for Jan Demobankowy @DB-R03-01 @DB-R03-02', async ({}) => {
    // Arrange
    const fastTransferData = prepareTransferData();
    const availableFunds = await pulpitPage.getAvailableFunds();
    const result = await pulpitPage.calculateFundsAfterTransfer(
      availableFunds,
      Number(fastTransferData.transferAmount),
    );

    const expectedMessage = `Przelew wykonany! Jan Demobankowy 123 - ${fastTransferData.transferAmount},00PLN - ${fastTransferData.titleOfTransfer}`;

    // Act
    await pulpitPage.createFastTransfer(fastTransferData);
    await pulpitPage.sendTransferBtn.click({ delay: 500 });
    await submitFastTransferView.submitTransferBtn.click({ delay: 500 });

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
    await expect(pulpitPage.moneyValue).toHaveText(String(result));
  });

  test('Verify that users can successfully create a fast transfer for Michael Scott @DB-R03-01 @DB-R03-02', async ({}) => {
    // Arrange
    const fastTransferData = prepareTransferData();
    const availableFunds = await pulpitPage.getAvailableFunds();
    const result = await pulpitPage.calculateFundsAfterTransfer(
      availableFunds,
      Number(fastTransferData.transferAmount),
    );
    fastTransferData.recipientOfTransfer = '3';

    const expectedMessage = `Przelew wykonany! Michael Scott - ${fastTransferData.transferAmount},00PLN - ${fastTransferData.titleOfTransfer}`;

    // Act
    await pulpitPage.createFastTransfer(fastTransferData);
    await pulpitPage.sendTransferBtn.click({ delay: 500 });
    await submitFastTransferView.submitTransferBtn.click({ delay: 500 });

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
    await expect(pulpitPage.moneyValue).toHaveText(String(result));
  });

  test.describe('Invalid Fast transfer', () => {
    test('Verify that users can not create a fast transfer - empty recipient @DB-R04-01', async ({}) => {
      // Arrange
      const fastTransferData = prepareTransferData();
      fastTransferData.recipientOfTransfer = '';

      //Act
      await pulpitPage.createFastTransfer(fastTransferData);
      await pulpitPage.sendTransferBtn.click({ delay: 500 });

      //Assert
      await expect(pulpitPage.recipientRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });

    test('Verify that users can not create a fast transfer - empty amount @DB-R04-02', async ({}) => {
      // Arrange
      const fastTransferData = prepareTransferData();
      fastTransferData.transferAmount = '';

      //Act
      await pulpitPage.createFastTransfer(fastTransferData);
      await pulpitPage.sendTransferBtn.click({ delay: 500 });

      //Assert
      await expect(pulpitPage.amountRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });

    test('Verify that users can not create a fast transfer - empty title @DB-R04-03', async ({}) => {
      // Arrange
      const fastTransferData = prepareTransferData();
      fastTransferData.titleOfTransfer = '';

      //Act
      await pulpitPage.createFastTransfer(fastTransferData);
      await pulpitPage.sendTransferBtn.click({ delay: 500 });

      //Assert
      await expect(pulpitPage.titleRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });
  });
});
