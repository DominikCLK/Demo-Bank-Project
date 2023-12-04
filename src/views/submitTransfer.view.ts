import { Page } from '@playwright/test';

export class SubmitTransferView {
  submitTransferBtn = this.page.getByTestId('close-button');

  constructor(private page: Page) {}
}
