import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TransactionsPage } from '../../pages/TransactionsPage';
import { users } from '../../fixtures/users';
import { routes } from '../../utils/routes';
import { expectNoCriticalAccessibilityIssues } from '../../utils/a11y';

test.describe('Fase 6 - Acessibilidade básica', () => {
  test('CT-A11Y-001 @automacao_p1 @a11y - Login não possui violações críticas de acessibilidade', async ({ page }) => {
    await page.goto(routes.login);

    await expect(page.getByRole('button', { name: /entrar|login/i })).toBeVisible();

    await expectNoCriticalAccessibilityIssues(page);
  });

  test('CT-A11Y-002 @automacao_p1 @a11y @dashboard - Dashboard não possui violações críticas de acessibilidade', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.pro.email, users.pro.password);
    await dashboardPage.expectLoaded();

    await expectNoCriticalAccessibilityIssues(page);
  });

  test('CT-A11Y-003 @automacao_p1 @a11y @transacoes - Tela de transações não possui violações críticas de acessibilidade', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const transactionsPage = new TransactionsPage(page);

    await loginPage.login(users.pro.email, users.pro.password);
    await dashboardPage.expectLoaded();

    await transactionsPage.goto();

    await expectNoCriticalAccessibilityIssues(page);
  });

  test('CT-A11Y-004 @automacao_p1 @a11y @teclado - Login permite navegação básica por teclado', async ({ page }) => {
    await page.goto(routes.login);

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });
});