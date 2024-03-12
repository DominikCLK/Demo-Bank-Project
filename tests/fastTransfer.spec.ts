import { PulpitMessages } from '@_src/enums/messages.dicts';
import { prepareTransferData } from '@_src/factories/transferData.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { testUser } from '@_src/test-data/user.data';

test.describe('Verify Fast transfer flow', () => {
  test.beforeEach(async ({ page, pulpitPage, loginPage }) => {
    // Act
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    // Assert
    expect(title).toContain(PulpitMessages.PulpitTitleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });

  test('Verify that users can successfully create a fast transfer for Jan Demobankowy @DB-R03-01 @DB-R03-02', async ({
    pulpitPage,
    submitFastTransferView,
  }) => {
    // Arrange
    const fastTransferData = prepareTransferData();
    const availableFunds = await pulpitPage.getAvailableFunds();
    const result = await pulpitPage.calculateFundsAfterTransfer(
      availableFunds,
      Number(fastTransferData.transferAmount),
    );

    const expectedMessage = `Przelew wykonany! Jan Demobankowy - ${fastTransferData.transferAmount},00PLN - ${fastTransferData.titleOfTransfer}`;

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

  test('Verify that users can successfully create a fast transfer for Michael Scott @DB-R03-01 @DB-R03-02', async ({
    pulpitPage,
    submitFastTransferView,
  }) => {
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
    test('Verify that users can not create a fast transfer - empty recipient @DB-R04-01', async ({
      pulpitPage,
    }) => {
      // Arrange
      const fastTransferData = prepareTransferData();
      fastTransferData.recipientOfTransfer = '';

      //Act
      await pulpitPage.createFastTransfer(fastTransferData);
      await pulpitPage.sendTransferBtn.click({ delay: 500 });

      //Assert
      await expect(pulpitPage.recipientRequiredErrorFastTransfer).toHaveText(
        PulpitMessages.PulpitRequiredFieldText,
      );
    });

    test('Verify that users can not create a fast transfer - empty amount @DB-R04-02', async ({
      pulpitPage,
    }) => {
      // Arrange
      const fastTransferData = prepareTransferData();
      fastTransferData.transferAmount = '';

      //Act
      await pulpitPage.createFastTransfer(fastTransferData);
      await pulpitPage.sendTransferBtn.click({ delay: 500 });

      //Assert
      await expect(pulpitPage.amountRequiredErrorFastTransfer).toHaveText(
        PulpitMessages.PulpitRequiredFieldText,
      );
    });

    test('Verify that users can not create a fast transfer - empty title @DB-R04-03', async ({
      pulpitPage,
    }) => {
      // Arrange
      const fastTransferData = prepareTransferData();
      fastTransferData.titleOfTransfer = '';

      //Act
      await pulpitPage.createFastTransfer(fastTransferData);
      await pulpitPage.sendTransferBtn.click({ delay: 500 });

      //Assert
      await expect(pulpitPage.titleRequiredErrorFastTransfer).toHaveText(
        PulpitMessages.PulpitRequiredFieldText,
      );
    });
  });
});
