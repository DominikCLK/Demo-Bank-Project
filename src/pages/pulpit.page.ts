import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class PulpitPage extends BasePage {
  url = '/pulpit.html';
  titleText = 'Demobank - Bankowość Internetowa - Pulpit';

  userName = this.page.getByTestId('user-name');
  moneyValue = this.page.locator('#money_value');
  amountInput = this.page.locator('#widget_1_transfer_amount');
  titleInput = this.page.locator('#widget_1_transfer_title');
  sendTransferBtn = this.page.getByRole('button', { name: 'wykonaj' });
  recipientList = this.page.locator('#widget_1_transfer_receiver');

  successfulTransferMessage = this.page.locator('#show_messages');

  randomOption = Math.floor(Math.random() * 3) + 1;

  constructor(page: Page) {
    super(page);
  }

  async fastTransfer(amount: string, title: string): Promise<void> {
    await this.recipientList.selectOption(`${this.randomOption}`);

    await this.amountInput.fill(amount);
    await this.titleInput.fill(title);
    await this.sendTransferBtn.click();
  }
}
