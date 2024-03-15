import { RegularTransferModel } from '@_src/models/transfer.model';
import { BasePage } from '@_src/pages/base.page';
import { SubmitFastTransferView } from '@_src/views/submitTransfer.view';
import { Page } from '@playwright/test';

export class RegularTransfer extends BasePage {
  url = '/przelew_nowy_zew.html';

  recipientNameField = this.page.getByTestId('transfer_receiver');
  bankAccountNumberField = this.page.getByTestId('form_account_to');
  amountField = this.page.getByTestId('form_amount');
  titleOfTransferField = this.page.getByTestId('form_title');
  createTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  userAvailableFunds = this.page.locator('#form_account_amount');

  constructor(page: Page) {
    super(page);
  }

  async createRegularTransfer(
    regularTransferData: RegularTransferModel,
  ): Promise<SubmitFastTransferView> {
    await this.recipientNameField.fill(
      regularTransferData.recipientOfRegularTransfer,
    );
    await this.bankAccountNumberField.fill(
      regularTransferData.bankAccountNumber,
    );
    await this.amountField.fill(regularTransferData.regularTransferAmount);

    await this.titleOfTransferField.fill(
      regularTransferData.titleOfRegularTransfer,
    );
    return new SubmitFastTransferView(this.page);
  }
}
