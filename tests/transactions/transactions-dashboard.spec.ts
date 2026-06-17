import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TransactionsPage } from '../../pages/TransactionsPage';
import { users } from '../../fixtures/users';
import { transactions } from '../../fixtures/transactions';

test.describe('Transações e Dashboard - Regressão Crítica', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.pro.email, users.pro.password);
    await dashboardPage.expectLoaded();
  });

  test('CT-029 @automacao_p1 @transacoes - Criar receita válida', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.createTransaction(transactions.income);

    await transactionsPage.expectTransactionVisible(transactions.income.description);
  });

  test('CT-030 @automacao_p1 @transacoes - Criar despesa válida', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.createTransaction(transactions.expense);

    await transactionsPage.expectTransactionVisible(transactions.expense.description);
  });

  test('CT-026 @automacao_p1 @dashboard @transacoes - Dashboard atualiza após criar receita', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);
    const dashboardPage = new DashboardPage(page);

    await transactionsPage.createTransaction(transactions.income);

    await dashboardPage.goto();

    await dashboardPage.expectDashboardContainsFinancialSummary();
    await dashboardPage.expectIncomeValue(transactions.income.value);
  });

  test('CT-032 @automacao_p1 @transacoes - Excluir transação existente', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.createTransaction(transactions.expense);
    await transactionsPage.expectTransactionVisible(transactions.expense.description);

    await transactionsPage.deleteTransaction(transactions.expense.description);

    await transactionsPage.expectTransactionNotVisible(transactions.expense.description);
  });

  test('CT-033 @automacao_p1 @transacoes @validacao - Bloquear transação com valor zero', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await transactionsPage.openCreateTransactionForm();
    await transactionsPage.selectTransactionType(transactions.invalidZero.type);
    await transactionsPage.fillDescription(transactions.invalidZero.description);
    await transactionsPage.fillValue(transactions.invalidZero.value);
    await transactionsPage.selectCategory(transactions.invalidZero.category);
    await transactionsPage.fillDateToday();
    await transactionsPage.submit();

    await transactionsPage.expectValidationMessage(/valor obrigatório|maior que zero|valor inválido/i);
  });

  test('CT-034 @automacao_p1 @transacoes @validacao - Bloquear valor negativo manual', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await transactionsPage.openCreateTransactionForm();
    await transactionsPage.selectTransactionType(transactions.invalidNegative.type);
    await transactionsPage.fillDescription(transactions.invalidNegative.description);
    await transactionsPage.fillValue(transactions.invalidNegative.value);
    await transactionsPage.selectCategory(transactions.invalidNegative.category);
    await transactionsPage.fillDateToday();
    await transactionsPage.submit();

    await transactionsPage.expectValidationMessage(/valor positivo|valor inválido|maior que zero/i);
  });

  test('CT-040 @automacao_p1 @transacoes - Duplo clique não cria transação duplicada', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.createTransactionWithDoubleClick(transactions.income);

    await transactionsPage.expectOnlyOneTransactionCreated(transactions.income.description);
  });
});