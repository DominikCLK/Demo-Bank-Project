import { Locator, Page } from '@playwright/test';

export class SubmitFastTransferView {
  submitTransferBtn = this.page.getByTestId('close-button');
  transferDoneTitle = this.page.getByText('Przelew wykonany', { exact: true });

  recipientOnSubmit(recipient: string): Locator {
    return this.page.getByText(`Przelew wykonany!Odbiorca:${recipient}`);
  }

  constructor(private page: Page) {}
}
