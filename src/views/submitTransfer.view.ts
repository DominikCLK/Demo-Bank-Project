import { Page } from '@playwright/test';

export class SubmitFastTransferView {
  submitTransferBtn = this.page.getByTestId('close-button');
  constructor(private page: Page) {}
}
