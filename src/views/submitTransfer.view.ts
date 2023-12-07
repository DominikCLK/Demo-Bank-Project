import { Page } from '@playwright/test';

export class SubmitFastTransferView {
  submitTransferBtn = this.page.getByTestId('close-button');

  submitViewTextFastTransfer = this.page.getByText('Przelew wykonany', {
    exact: true,
  });
  submitViewTextPhoneTransfer = this.page.getByText('Doładowanie wykonane', {
    exact: true,
  });

  constructor(private page: Page) {}
}
