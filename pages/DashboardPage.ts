import { expect, Page } from '@playwright/test';
import { routes } from '../utils/routes';
import { moneyPattern } from '../utils/money';

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
    await expect(
      this.page.getByText(/saldo|receitas|despesas/i)
    ).not.toBeVisible();
  }

  async expectDashboardContainsFinancialSummary() {
    await expect(this.page.getByText(/receitas|entradas/i)).toBeVisible();
    await expect(this.page.getByText(/despesas|saídas|saidas/i)).toBeVisible();
    await expect(this.page.getByText(/saldo/i)).toBeVisible();
  }

  async expectFinancialValue(value: number) {
    await expect(this.page.getByText(moneyPattern(value)).first()).toBeVisible();
  }

  async expectFinancialSummary(income: number, expense: number, balance: number) {
    await this.expectDashboardContainsFinancialSummary();

    await this.expectFinancialValue(income);
    await this.expectFinancialValue(expense);
    await this.expectFinancialValue(balance);
  }

  async expectIncomeValue(value: string) {
    const numericValue = Number(value.replace(',', '.'));

    await this.expectFinancialValue(numericValue);
  }

  async expectExpenseValue(value: string) {
    const numericValue = Number(value.replace(',', '.'));

    await this.expectFinancialValue(numericValue);
  }

  async expectBalanceValue(value: string) {
    const numericValue = Number(value.replace(',', '.'));

    await this.expectFinancialValue(numericValue);
  }
}