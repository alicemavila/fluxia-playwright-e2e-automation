import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { PermissionsPage } from '../../pages/PermissionsPage';
import { users } from '../../fixtures/users';
import { routes } from '../../utils/routes';
import { apiRoutes } from '../../utils/api-routes';
import { getAuthHeaders } from '../../utils/auth';

test.describe('Permissões Free/PRO - Risco de Monetização e Autorização', () => {
  test('CT-087 @automacao_p1 @permissao @free - Usuário Free não acessa recurso PRO pela interface', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const permissionsPage = new PermissionsPage(page);

    await loginPage.login(users.free.email, users.free.password);
    await dashboardPage.expectLoaded();

    await permissionsPage.openGoalsByMenuOrRoute();

    await permissionsPage.expectAccessBlocked(routes.goals);
  });

  test('CT-089 @automacao_p1 @permissao @seguranca - Usuário Free não burla permissão alterando URL', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const permissionsPage = new PermissionsPage(page);

    await loginPage.login(users.free.email, users.free.password);
    await dashboardPage.expectLoaded();

    await permissionsPage.gotoGoalsDirectly();

    await permissionsPage.expectAccessBlocked(routes.goals);
  });

  test('CT-090 @automacao_p1 @permissao @pro - Usuário PRO acessa recursos premium', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const permissionsPage = new PermissionsPage(page);

    await loginPage.login(users.pro.email, users.pro.password);
    await dashboardPage.expectLoaded();

    await permissionsPage.gotoGoalsDirectly();
    await permissionsPage.expectAccessAllowed();
    await permissionsPage.expectPremiumActionAvailable();

    await permissionsPage.gotoRecurrencesDirectly();
    await permissionsPage.expectAccessAllowed();

    await permissionsPage.gotoImportDirectly();
    await permissionsPage.expectAccessAllowed();
  });

  test('CT-088 @automacao_p1 @api @permissao @free - Usuário Free não acessa endpoint PRO diretamente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.free.email, users.free.password);
    await dashboardPage.expectLoaded();

    const authHeaders = await getAuthHeaders(page);

    const response = await page.request.post(apiRoutes.goals, {
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      data: {
        name: `Meta Free Bloqueada QA ${Date.now()}`,
        targetValue: 5000,
        currentValue: 0,
        deadline: '2026-12-31',
      },
    });

    expect(response.status()).toBe(403);
  });
});