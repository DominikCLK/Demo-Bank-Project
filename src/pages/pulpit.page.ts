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
  submitViewText = this.page.getByText('Przelew wykonany', { exact: true });
  sendTransferBtn = this.page.getByRole('button', { name: 'wykonaj' });

  successfulTransferMessage = this.page.locator('#show_messages');

  recipientRequiredError = this.page.getByTestId(
    'error-widget-1-transfer-receiver',
  );
  amountRequiredError = this.page.getByTestId('error-widget-1-transfer-amount');
  titleRequiredError = this.page.getByTestId('error-widget-1-transfer-title');

  randomOption = Math.floor(Math.random() * 3) + 1;

  constructor(page: Page) {
    super(page);
  }

  async fastTransfer(amount: string, title: string): Promise<void> {
    await this.recipientList.selectOption(`${this.randomOption}`);
    await this.amountInput.fill(amount);
    await this.titleInput.fill(title);
  }
}
