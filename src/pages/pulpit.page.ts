import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class PulpitPage extends BasePage {
  url = '/pulpit.html';
  titleText = 'Demobank - Bankowość Internetowa - Pulpit';
  userName = this.page.getByTestId('user-name');

  constructor(page: Page) {
    super(page);
  }
}
