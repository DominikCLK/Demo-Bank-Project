import { expect, test } from '@_src/fixtures/merge.fixture';
import { testUser } from '@_src/test-data/user.data';

test.describe('Verify Phone transfer flow', () => {
  test.beforeEach(async ({ page, pulpitPage, loginPage }) => {
    // Act
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    // Assert
    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });

  test('Verify that users can successfully create a phone transfer @DB-R05-01 @DB-R05-02', async ({
    pulpitPage,
    submitFastTransferView,
  }) => {
    // Arrange
    const amount = pulpitPage.randomPhoneAmountTopUp;
    const phone = pulpitPage.randomPhoneOption;
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phone}`;

    // Act
    await pulpitPage.createPhoneTransfer(phone, amount);
    await pulpitPage.phoneTransferCheckbox.check();
    await pulpitPage.topUpBtn.click();
    await submitFastTransferView.submitTransferBtn.click();

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
  });

  test('Verify that users can successfully create a phone transfer. Select 504 xxx xxx number from the list @DB-R05-03', async ({
    pulpitPage,
    submitFastTransferView,
  }) => {
    // Arrange
    const amount = pulpitPage.randomTopUpOption;
    const phone = '504 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phone}`;

    // Act
    await pulpitPage.createPhoneTransfer(phone, amount);
    await pulpitPage.phoneTransferCheckbox.check();
    await pulpitPage.topUpBtn.click();
    await submitFastTransferView.submitTransferBtn.click();

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
  });

  test.describe('Invalid Phone transfer', () => {
    test('Verify that users can not create top up phone transfer - empty amount @DB-R06-01', async ({
      pulpitPage,
      page,
    }) => {
      // Arrange
      const amount = '';
      const phone = pulpitPage.randomPhoneOption;

      // Act
      await pulpitPage.createPhoneTransfer(phone, amount);
      await page.click('body');

      //Assert
      await expect(pulpitPage.topUpErrorPhoneTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });

    test('Verify that users can not create a phone transfer - unchecked permission @DB-R06-02', async ({
      pulpitPage,
    }) => {
      // Arrange
      const amount = pulpitPage.randomTopUpOption;
      const phone = pulpitPage.randomPhoneOption;

      // Act
      await pulpitPage.createPhoneTransfer(phone, amount);
      await pulpitPage.topUpBtn.click();

      //Assert
      await expect(pulpitPage.agreementErrorPhoneTransfer).toHaveText(
        pulpitPage.requiredFieldText,
      );
    });
  });
});
