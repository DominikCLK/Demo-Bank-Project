import { Locator, Page } from '@playwright/test';

export class SubmitFastTransferView {
  transferDoneTitle = this.page.getByText('Przelew wykonany', { exact: true });
  recipientOnSubmit = this.page.getByText('Przelew wykonany!Odbiorca:');
  submitTransferBtn = this.page.getByTestId('close-button');

  dataOnSubmitView(
    recipientName: string,
    transferAmount: string,
    titleOfTransfer: string,
  ): Locator {
    return this.page.locator(
      `//p[contains(.,'Przelew wykonany!Odbiorca: ${recipientName}Kwota: ${transferAmount},00PLN Nazwa: ${titleOfTransfer}')]`,
    );
  }

  constructor(private page: Page) {}
}
