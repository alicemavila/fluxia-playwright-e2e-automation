import { Page, expect } from '@playwright/test';
import { routes } from '../utils/routes';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(routes.login);
  }

  async fillEmail(email: string) {
    await this.page.getByLabel(/e-mail|email/i).fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByLabel(/senha|password/i).fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: /entrar|login/i }).click();
  }

  async login(email: string, password: string) {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectInvalidCredentialsMessage() {
    await expect(
      this.page.getByText(/credenciais inválidas|e-mail ou senha inválidos|login inválido/i)
    ).toBeVisible();
  }
}