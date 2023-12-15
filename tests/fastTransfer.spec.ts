import { generateRandomSentence } from '../src/factories/randomData.factory';
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
    const availableFunds = await pulpitPage.moneyValue.innerText();
    const transferTitle = generateRandomSentence(10);
    const expectedMessage = `Przelew wykonany! Jan Demobankowy - ${availableFunds},00PLN - ${transferTitle}`;
    const option = '1';

    // Act
    await pulpitPage.createFastTransfer(option, availableFunds, transferTitle);
    await pulpitPage.sendTransferBtn.click({ delay: 1000 });
    await submitFastTransferView.submitTransferBtn.click();

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
  });

  //this test need to be refactored
  test('Verify available funds after transfer', async ({}) => {
    // Arrange
    const availableFunds = await pulpitPage.moneyValue.innerText();
    const transferTitle = generateRandomSentence(10);
    const expectedMessage = `Przelew wykonany! Michael Scott - ${pulpitPage.randomTransferAmount},00PLN - ${transferTitle}`;
    const option = '3';
    const finalAmount =
      Number(availableFunds) - pulpitPage.randomTransferAmount;

    // Act
    await pulpitPage.createFastTransfer(
      option,
      String(pulpitPage.randomTransferAmount),
      transferTitle,
    );
    await pulpitPage.sendTransferBtn.click();
    await submitFastTransferView.submitTransferBtn.click();

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );

    await expect(pulpitPage.moneyValue).toHaveText(String(finalAmount));
  });

  test.describe('Invalid Fast transfer', () => {
    test('Verify that users can not create a fast transfer - empty recipient @DB-R04-01', async ({}) => {
      // Arrange
      const availableFunds = await pulpitPage.moneyValue.innerText();
      const transferTitle = generateRandomSentence(10);
      const option = '';

      // Act
      await pulpitPage.createFastTransfer(
        option,
        availableFunds,
        transferTitle,
      );
      await pulpitPage.recipientList.selectOption(option);
      await pulpitPage.sendTransferBtn.click();

      //Assert
      await expect(pulpitPage.recipientRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });

    test('Verify that users can not create a fast transfer - empty amount @DB-R04-02', async ({}) => {
      // Arrange
      const availableFunds = '';
      const transferTitle = generateRandomSentence(10);
      const option = '2';

      // Act
      await pulpitPage.createFastTransfer(
        option,
        availableFunds,
        transferTitle,
      );
      await pulpitPage.sendTransferBtn.click();

      //Assert
      await expect(pulpitPage.amountRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });

    test('Verify that users can not create a fast transfer - empty title @DB-R04-03', async ({}) => {
      // Arrange
      const availableFunds = await pulpitPage.moneyValue.innerText();
      const transferTitle = '';
      const option = '3';

      // Act
      await pulpitPage.createFastTransfer(
        option,
        availableFunds,
        transferTitle,
      );
      await pulpitPage.sendTransferBtn.click();

      //Assert
      await expect(pulpitPage.titleRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });

    test('Verify that users can not create a fast transfer. Do not fill all inputs @DB-R04-04', async ({}) => {
      // Act
      await pulpitPage.sendTransferBtn.click();

      //Assert
      await expect(pulpitPage.recipientRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );

      await expect(pulpitPage.amountRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );

      await expect(pulpitPage.titleRequiredErrorFastTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });
  });
});
