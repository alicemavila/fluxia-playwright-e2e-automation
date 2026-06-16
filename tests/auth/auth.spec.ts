import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { users } from '../../fixtures/users';
import { routes } from '../../utils/routes';

test.describe('Login e Autenticação', () => {
  test('CT-009 @smoke @auth @automacao_p1 - Login com credenciais válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.pro.email, users.pro.password);

    await dashboardPage.expectLoaded();
  });

  test('CT-010 @smoke @auth @automacao_p1 - Login com senha inválida', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(users.pro.email, users.invalid.password);

    await loginPage.expectInvalidCredentialsMessage();
    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('CT-013 @smoke @auth @automacao_p1 - Logout encerra acesso autenticado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.pro.email, users.pro.password);
    await dashboardPage.expectLoaded();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/login/);

    await page.goBack();

    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('CT-100 @smoke @seguranca @automacao_p1 - Bloquear URL protegida sem autenticação', async ({ page }) => {
    await page.goto(routes.dashboard);

    await expect(page).toHaveURL(/login/);
    await expect(page.getByText(/saldo|receitas|despesas/i)).not.toBeVisible();
  });
});