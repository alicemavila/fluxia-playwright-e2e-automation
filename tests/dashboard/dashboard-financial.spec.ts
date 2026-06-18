import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TransactionsPage } from '../../pages/TransactionsPage';
import { users } from '../../fixtures/users';
import { financialTransactions } from '../../fixtures/financial-transactions';

test.describe.serial('Dashboard Financeiro - Risco R-001 Cálculo Financeiro', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.financial.email, users.financial.password);
    await dashboardPage.expectLoaded();
  });

  test('CT-020 CT-023 @automacao_p1 @dashboard @calculo - Dashboard consolida receitas, despesas e saldo', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);
    const dashboardPage = new DashboardPage(page);

    await transactionsPage.createTransaction(financialTransactions.income1000);
    await transactionsPage.createTransaction(financialTransactions.income500);
    await transactionsPage.createTransaction(financialTransactions.expense250);
    await transactionsPage.createTransaction(financialTransactions.expense100);

    await dashboardPage.goto();

    await dashboardPage.expectFinancialSummary(1500, 350, 1150);
  });

  test('CT-024 @automacao_p1 @dashboard @calculo @decimal - Dashboard calcula valores decimais corretamente', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);
    const dashboardPage = new DashboardPage(page);

    await transactionsPage.createTransaction(financialTransactions.decimalIncome);
    await transactionsPage.createTransaction(financialTransactions.decimalExpense);

    await dashboardPage.goto();

    await dashboardPage.expectFinancialValue(99.99);
    await dashboardPage.expectFinancialValue(33.33);
    await dashboardPage.expectFinancialValue(66.66);
  });

  test('CT-042 @automacao_p1 @dashboard @transacoes - Dashboard recalcula após excluir despesa', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);
    const dashboardPage = new DashboardPage(page);

    await transactionsPage.createTransaction(financialTransactions.expenseToDelete);

    await dashboardPage.goto();
    await dashboardPage.expectFinancialValue(100);

    await transactionsPage.goto();
    await transactionsPage.deleteTransaction(financialTransactions.expenseToDelete.description);

    await dashboardPage.goto();

    await transactionsPage.expectTransactionNotVisible(
      financialTransactions.expenseToDelete.description
    );
  });
});