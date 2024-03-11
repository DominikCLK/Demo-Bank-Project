import { Page } from '@playwright/test';

export class BasePage {
  url = process.env.BASE_URL;
  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async title(): Promise<string> {
    return await this.page.title();
  }
  async waitForPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }
}
