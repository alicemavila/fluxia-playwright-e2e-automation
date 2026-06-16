import { Page, expect } from '@playwright/test';
import { routes } from '../utils/routes';

export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(routes.dashboard);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(
      this.page.getByRole('heading', { name: /dashboard/i })
    ).toBeVisible();
  }

  async logout() {
    await this.page.getByRole('button', { name: /sair|logout/i }).click();
  }

  async expectProtectedDataNotVisible() {
    await expect(this.page.getByText(/saldo|receitas|despesas/i)).not.toBeVisible();
  }
}