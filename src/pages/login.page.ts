import { LoginUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '';
  userIDInput = this.page.getByTestId('login-input');
  userPasswordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  loginIdError = this.page.getByTestId('error-login-id');
  loginPasswordError = this.page.getByTestId('error-login-password');

  titleText = 'Demobank - Bankowość Internetowa - Logowanie';
  loginIdTextError = 'identyfikator ma min. 8 znaków';
  loginPasswordTextError = 'hasło ma min. 8 znaków';
  requiredFieldText = 'pole wymagane';

  constructor(page: Page) {
    super(page);
  }

  async waitForPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }

  async login(loginUserData: LoginUser): Promise<void> {
    await this.userIDInput.fill(loginUserData.userID);
    await this.userPasswordInput.fill(loginUserData.userPassword);

    const isButtonDisabled =
      (await this.loginButton.getAttribute('disabled')) === '';

    if (!isButtonDisabled) {
      await this.loginButton.click();
    }
  }
}
