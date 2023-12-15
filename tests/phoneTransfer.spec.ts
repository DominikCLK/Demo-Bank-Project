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
    // Arrange
    loginPage = new LoginPage(page);
    pulpitPage = new PulpitPage(page);
    submitTransferView = new SubmitFastTransferView(page);

    // Act
    await loginPage.goto();
    await loginPage.login(testUser);
    const title = await pulpitPage.title();

    //Assert
    expect(title).toContain(pulpitPage.titleText);
    await expect(page).toHaveURL(pulpitPage.url);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Verify that users can successfully create a phone transfer @DB-R05-01 @DB-R05-02', async () => {
    // Arrange
    const amount = pulpitPage.randomPhoneAmountTopUp;
    const phone = pulpitPage.randomPhoneOption;
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phone}`;

    // Act
    await pulpitPage.createPhoneTransfer(phone, amount);
    await pulpitPage.phoneTransferCheckbox.check();
    await pulpitPage.topUpBtn.click();
    await submitTransferView.submitTransferBtn.click();

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
  });

  test('Verify that users can successfully create a phone transfer. Select 504 xxx xxx number from the list @DB-R05-03', async () => {
    // Arrange
    const amount = pulpitPage.randomTopUpOption;
    const phone = '504 xxx xxx';
    const expectedMessage = `Doładowanie wykonane! ${amount},00PLN na numer ${phone}`;

    // Act
    await pulpitPage.createPhoneTransfer(phone, amount);
    await pulpitPage.phoneTransferCheckbox.check();
    await pulpitPage.topUpBtn.click();
    await submitTransferView.submitTransferBtn.click();

    //Assert
    await expect(pulpitPage.successfulTransferMessage).toHaveText(
      expectedMessage,
    );
  });

  test.describe('Invalid Phone transfer', () => {
    test('Verify that users can not create a phone transfer. Do not type a amount @DB-R06-01', async ({
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

    test('Verify that users can not create a phone transfer. Do not check permissions @DB-R06-02', async () => {
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
