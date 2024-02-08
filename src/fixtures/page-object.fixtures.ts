import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { SubmitFastTransferView } from '../views/submitTransfer.view';
import { test as baseTest } from '@playwright/test';

const pageObjectTest = baseTest.extend<{
  loginPage: LoginPage;
  pulpitPage: PulpitPage;
  submitFastTransferView: SubmitFastTransferView;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await use(loginPage);
  },
  pulpitPage: async ({ page }, use) => {
    const pulpitPage = new PulpitPage(page);
    await use(pulpitPage);
  },
  submitFastTransferView: async ({ page }, use) => {
    const submitFastTransferView = new SubmitFastTransferView(page);
    await use(submitFastTransferView);
  },
});

export default pageObjectTest;
export const expect = pageObjectTest.expect;
