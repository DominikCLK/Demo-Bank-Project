import { PulpitMessages } from '@_src/enums/messages.dicts';
import { prepareRegularTransferData } from '@_src/factories/transferData.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { testUser } from '@_src/test-data/user.data';

test.describe('As a user, I want to create regular transfers from the payment section', () => {
  test.beforeEach(async ({ pulpitPage, loginPage }) => {
    // Act
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    // Assert
    expect(title).toContain(PulpitMessages.PulpitTitleText);
    await pulpitPage.verifyCurrentUrl();
  });

  test('Verify that users can successfully create a regular transfer. Only requaired fields @DB-R07-01 @DB-R07-02', async ({
    regularTransfer,
    pulpitPage,
    submitFastTransferView,
  }) => {
    // Arrange
    const regularTransferData = prepareRegularTransferData();
    const expectedMessage = `Przelew wykonany! ${regularTransferData.regularTransferAmount},00PLN dla ${regularTransferData.recipientOfRegularTransfer}`;

    // Act
    await regularTransfer.createRegularTransfer(regularTransferData);
    await regularTransfer.createTransferButton.click();

    // Assert
    await expect(
      submitFastTransferView.dataOnSubmitView(
        regularTransferData.recipientOfRegularTransfer,
        regularTransferData.regularTransferAmount,
        regularTransferData.titleOfRegularTransfer,
      ),
    ).toBeVisible();

    // Act
    await submitFastTransferView.submitTransferBtn.click({ delay: 500 });

    //Assert
    await expect(
      submitFastTransferView.dataOnSubmitView(
        regularTransferData.recipientOfRegularTransfer,
        regularTransferData.regularTransferAmount,
        regularTransferData.titleOfRegularTransfer,
      ),
    ).not.toBeInViewport();

    await regularTransfer.verifyCurrentUrl();
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
  });
});
