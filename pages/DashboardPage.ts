import { expect, Page } from '@playwright/test';
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

  async expectIncomeValue(value: string) {
    await expect(this.page.getByText(new RegExp(value.replace('.', '[,.]')))).toBeVisible();
  }

  async expectExpenseValue(value: string) {
    await expect(this.page.getByText(new RegExp(value.replace('.', '[,.]')))).toBeVisible();
  }

  async expectBalanceValue(value: string) {
    await expect(this.page.getByText(new RegExp(value.replace('.', '[,.]')))).toBeVisible();
  }

  async expectDashboardContainsFinancialSummary() {
    await expect(this.page.getByText(/receitas|entradas/i)).toBeVisible();
    await expect(this.page.getByText(/despesas|saídas|saidas/i)).toBeVisible();
    await expect(this.page.getByText(/saldo/i)).toBeVisible();
  }
}