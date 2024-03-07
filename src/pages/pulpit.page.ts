import { FastTransferModel } from '@_src/models/transfer.model';
import { BasePage } from '@_src/pages/base.page';
import { SubmitFastTransferView } from '@_src/views/submitTransfer.view';
import { Page } from '@playwright/test';

export class PulpitPage extends BasePage {
  url = '/pulpit.html';

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

  recipientRequiredErrorFastTransfer = this.page.getByTestId(
    'error-widget-1-transfer-receiver',
  );
  amountRequiredErrorFastTransfer = this.page.getByTestId(
    'error-widget-1-transfer-amount',
  );
  titleRequiredErrorFastTransfer = this.page.getByTestId(
    'error-widget-1-transfer-title',
  );

  topUpErrorPhoneTransfer = this.page.getByTestId(
    'error-widget-1-topup-amount',
  );

  agreementErrorPhoneTransfer = this.page.getByTestId(
    'error-widget-1-topup-agreement',
  );

  //Random phone top up
  randomPhoneAmountTopUp = Math.floor(Math.random() * (150 - 5 + 1)) + 5;

  //Random transfer amount
  randomTransferAmount: number = Math.floor(Math.random() * 10000);

  //Random phone number selecting
  phoneNumbersList = ['500 xxx xxx', '502 xxx xxx', '503 xxx xxx'];
  randomPhoneOption =
    this.phoneNumbersList[
      Math.floor(Math.random() * this.phoneNumbersList.length)
    ];

  //Random top up selecting
  topUpAmountList = ['5', '10', '25', '40', '50', '100', '200'];
  randomTopUpOption =
    this.topUpAmountList[
      Math.floor(Math.random() * this.topUpAmountList.length)
    ];

  constructor(page: Page) {
    super(page);
  }

  async createFastTransfer(
    fastTransferData: FastTransferModel,
  ): Promise<SubmitFastTransferView> {
    await this.recipientList.selectOption(fastTransferData.recipientOfTransfer);
    await this.amountInput.fill(String(fastTransferData.transferAmount));
    await this.titleInput.fill(fastTransferData.titleOfTransfer);

    return new SubmitFastTransferView(this.page);
  }

  async createPhoneTransfer(
    phone: string,
    amount: number | string,
  ): Promise<SubmitFastTransferView> {
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
    return new SubmitFastTransferView(this.page);
  }

  async subtractNumbers(a: number, b: number): Promise<number> {
    return a - b;
  }

  async getAvailableFunds(): Promise<number> {
    const availableFundsString = await this.moneyValue.innerText();
    return Number(availableFundsString);
  }

  async calculateFundsAfterTransfer(
    availableFunds: number,
    transferAmount: number,
  ): Promise<number> {
    return this.subtractNumbers(availableFunds, transferAmount);
  }
}
