import { BasePage } from './base.page';
import { faker } from '@faker-js/faker/locale/pl';
import { Page } from '@playwright/test';

export class PulpitPage extends BasePage {
  url = '/pulpit.html';
  titleText = 'Demobank - Bankowość Internetowa - Pulpit';

  userName = this.page.getByTestId('user-name');
  moneyValue = this.page.locator('#money_value');
  amountInput = this.page.locator('#widget_1_transfer_amount');
  titleInput = this.page.locator('#widget_1_transfer_title');
  sendTransferBtn = this.page.getByRole('button', { name: 'wykonaj' });

  transferTitle = faker.lorem.sentence({ min: 3, max: 5 });
  randomOption = Math.floor(Math.random() * 3) + 1;

  constructor(page: Page) {
    super(page);
  }

  async fastTransfer(amount: string, title: string): Promise<void> {
    await this.page
      .locator('#widget_1_transfer_receiver')
      .selectOption(`${this.randomOption}`);

    await this.amountInput.fill(amount);
    await this.titleInput.fill(title);
    await this.sendTransferBtn.click();
  }
}
