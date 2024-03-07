import { LoginUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/base.page';
import { PulpitPage } from '@_src/pages/pulpit.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  userIDInput = this.page.getByTestId('login-input');
  userPasswordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  loginIdError = this.page.getByTestId('error-login-id');
  loginPasswordError = this.page.getByTestId('error-login-password');

  constructor(page: Page) {
    super(page);
  }

  async login(loginUserData: LoginUserModel): Promise<PulpitPage> {
    await this.userIDInput.fill(loginUserData.userID);
    await this.userPasswordInput.fill(loginUserData.userPassword);

    const isButtonDisabled =
      (await this.loginButton.getAttribute('disabled')) === '';

    if (!isButtonDisabled) {
      await this.loginButton.click();
    }
    return new PulpitPage(this.page);
  }
}
