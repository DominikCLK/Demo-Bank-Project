import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class PulpitPage extends BasePage {
  url = '/pulpit.html';
  titleText = 'Demobank - Bankowość Internetowa - Pulpit';
  requiredFieldText = 'pole wymagane';

  userName = this.page.getByTestId('user-name');
  moneyValue = this.page.locator('#money_value');
  amountInput = this.page.locator('#widget_1_transfer_amount');
  titleInput = this.page.locator('#widget_1_transfer_title');
  recipientList = this.page.locator('#widget_1_transfer_receiver');
  sendTransferBtn = this.page.getByRole('button', { name: 'wykonaj' });
  successfulTransferMessage = this.page.locator('#show_messages');

  phoneList = this.page.locator('#widget_1_topup_receiver');
  phoneTransferAmountInput = this.page.locator('#widget_1_topup_amount');
  phoneTransferAmountSelect = this.page.locator(
    `//select[@id='widget_1_topup_amount']`,
  );
  phoneTransferCheckbox = this.page.getByText('zapoznałem się z regulaminem');
  topUpBtn = this.page.getByRole('button', { name: 'doładuj telefon' });

  recipientRequiredError = this.page.getByTestId(
    'error-widget-1-transfer-receiver',
  );
  amountRequiredError = this.page.getByTestId('error-widget-1-transfer-amount');
  titleRequiredError = this.page.getByTestId('error-widget-1-transfer-title');

  randomFastTransferOption = Math.floor(Math.random() * 3) + 1;
  randomPhoneAmount = Math.floor(Math.random() * (150 - 5 + 1)) + 5;

  phoneNumbersList = ['500 xxx xxx', '502 xxx xxx', '503 xxx xxx'];
  randomPhoneOption =
    this.phoneNumbersList[
      Math.floor(Math.random() * this.phoneNumbersList.length)
    ];

  topUpAmountList = ['5', '10', '25', '40', '50', '100', '200'];
  randomTopUpOption =
    this.topUpAmountList[
      Math.floor(Math.random() * this.topUpAmountList.length)
    ];

  constructor(page: Page) {
    super(page);
  }

  async fastTransfer(amount: string, title: string): Promise<void> {
    await this.recipientList.selectOption(`${this.randomFastTransferOption}`);
    await this.amountInput.fill(amount);
    await this.titleInput.fill(title);
  }
  async phoneTransfer(phone: string, amount: number | string): Promise<void> {
    await this.phoneList.selectOption(phone);
    await this.phoneTransferAmountInput.fill(String(amount));
    await this.phoneTransferCheckbox.check();
  }

  async phoneTransferSelectOption(
    phone: string,
    amount: number | string,
  ): Promise<void> {
    await this.phoneList.selectOption(`${phone}`);

    const inputType = await this.phoneTransferAmountInput.evaluate((input) => {
      return input.tagName.toLowerCase();
    });

    if (inputType === 'select') {
      await this.phoneTransferAmountInput.selectOption(
        `${this.randomTopUpOption}`,
      );
    } else {
      await this.phoneTransferAmountInput.fill(String(amount));
    }

    await this.phoneTransferCheckbox.check();
  }
}
