import { LoginUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '';
  userIDInput = this.page.getByTestId('login-input');
  userPasswordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  loginError = this.page.getByTestId('login-error');

  constructor(page: Page) {
    super(page);
  }

  async waitForPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }

  async login(loginUserData: LoginUser): Promise<void> {
    await this.userIDInput.fill(loginUserData.userID);
    await this.userPasswordInput.fill(loginUserData.userPassword);
    await this.loginButton.click();
  }
}
