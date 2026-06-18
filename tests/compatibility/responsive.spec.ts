import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { users } from '../../fixtures/users';

test.describe('Fase 6 - Compatibilidade responsiva', () => {
  test('CT-COMP-001 @automacao_p1 @compatibilidade - Login carrega corretamente no viewport atual', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('button', { name: /entrar|login/i })).toBeVisible();
    await expect(page.getByLabel(/e-mail|email/i)).toBeVisible();
    await expect(page.getByLabel(/senha|password/i)).toBeVisible();
  });

  test('CT-COMP-002 @automacao_p1 @compatibilidade @dashboard - Dashboard carrega no viewport atual', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.pro.email, users.pro.password);

    await dashboardPage.expectLoaded();
    await dashboardPage.expectDashboardContainsFinancialSummary();
  });
});