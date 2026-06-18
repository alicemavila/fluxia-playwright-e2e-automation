import { expect, test } from '@playwright/test';
import { users } from '../../fixtures/users';
import { apiPayloads } from '../../fixtures/api-payloads';
import { apiRoutes } from '../../utils/api-routes';
import {
  authHeaders,
  createTransactionByApi,
  deleteTransactionByApi,
  invalidAuthHeaders,
  loginByApi,
} from '../../utils/api-client';
import {
  expectDashboardContract,
  expectLoginContract,
  expectTransactionContract,
} from '../../utils/contract-assertions';

test.describe('Fase 5 - API e Segurança', () => {
  test('CT-114 @automacao_p1 @api @auth - POST /login retorna 200 com credenciais válidas', async ({ request }) => {
    const response = await request.post(apiRoutes.login, {
      data: {
        email: users.pro.email,
        password: users.pro.password,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expectLoginContract(body);
  });

  test('CT-115 @automacao_p1 @api @auth @negativo - POST /login retorna 401 com senha inválida', async ({ request }) => {
    const response = await request.post(apiRoutes.login, {
      data: {
        email: users.pro.email,
        password: users.invalid.password,
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json().catch(() => ({}));

    expect(JSON.stringify(body)).not.toMatch(/token|accessToken/i);
  });

  test('CT-117 @automacao_p1 @api @dashboard - GET /dashboard retorna dados consolidados', async ({ request }) => {
    const token = await loginByApi(request, users.financial.email, users.financial.password);

    const response = await request.get(apiRoutes.dashboard, {
      headers: authHeaders(token),
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expectDashboardContract(body);
  });

  test('CT-118 @automacao_p1 @api @transactions - POST /transactions cria receita', async ({ request }) => {
    const token = await loginByApi(request, users.pro.email, users.pro.password);

    const response = await request.post(apiRoutes.transactions, {
      headers: authHeaders(token),
      data: apiPayloads.validIncomeTransaction,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expectTransactionContract(body);
  });

  test('CT-120 @automacao_p1 @api @transactions - DELETE /transactions remove transação', async ({ request }) => {
    const token = await loginByApi(request, users.pro.email, users.pro.password);

    const transactionId = await createTransactionByApi(
      request,
      token,
      apiPayloads.validExpenseTransaction
    );

    await deleteTransactionByApi(request, token, transactionId);

    const getDeletedResponse = await request.get(apiRoutes.transactionById(transactionId), {
      headers: authHeaders(token),
    });

    expect([404, 410]).toContain(getDeletedResponse.status());
  });

  test('CT-121 @automacao_p1 @api @goals @pro - POST /goals cria meta para usuário PRO', async ({ request }) => {
    const token = await loginByApi(request, users.pro.email, users.pro.password);

    const response = await request.post(apiRoutes.goals, {
      headers: authHeaders(token),
      data: apiPayloads.validGoal,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    const goal = body.data || body;

    expect(goal.id || goal.goalId).toBeTruthy();
    expect(goal.name || goal.nome).toBeTruthy();
  });

  test('CT-122 @automacao_p1 @api @goals @free @permissao - POST /goals bloqueia usuário Free', async ({ request }) => {
    const token = await loginByApi(request, users.free.email, users.free.password);

    const response = await request.post(apiRoutes.goals, {
      headers: authHeaders(token),
      data: apiPayloads.validGoal,
    });

    expect(response.status()).toBe(403);
  });

  test('CT-094 @automacao_p1 @api @seguranca - API rejeita token inválido', async ({ request }) => {
    const response = await request.get(apiRoutes.dashboard, {
      headers: invalidAuthHeaders(),
    });

    expect([401, 403]).toContain(response.status());
  });

  test('CT-093 @automacao_p1 @api @seguranca - API rejeita token expirado', async ({ request }) => {
    test.skip(
      !process.env.EXPIRED_TOKEN,
      'EXPIRED_TOKEN não configurado. Solicite um token expirado real de HML ou endpoint de teste.'
    );

    const response = await request.get(apiRoutes.dashboard, {
      headers: authHeaders(process.env.EXPIRED_TOKEN as string),
    });

    expect([401, 403]).toContain(response.status());
  });

  test('CT-092 @automacao_p1 @api @seguranca - Usuário não acessa dados de outro usuário', async ({ request }) => {
    const proToken = await loginByApi(request, users.pro.email, users.pro.password);
    const freeToken = await loginByApi(request, users.free.email, users.free.password);

    const transactionId = await createTransactionByApi(
      request,
      proToken,
      apiPayloads.validIncomeTransaction
    );

    const response = await request.get(apiRoutes.transactionById(transactionId), {
      headers: authHeaders(freeToken),
    });

    expect([403, 404]).toContain(response.status());
  });

  test('CT-099 @automacao_p1 @api @seguranca @sessao - Logout invalida sessão no backend', async ({ request }) => {
    const token = await loginByApi(request, users.pro.email, users.pro.password);

    const logoutResponse = await request.post(apiRoutes.logout, {
      headers: authHeaders(token),
    });

    expect([200, 204]).toContain(logoutResponse.status());

    const dashboardResponse = await request.get(apiRoutes.dashboard, {
      headers: authHeaders(token),
    });

    expect([401, 403]).toContain(dashboardResponse.status());
  });

  test('CT-125 @automacao_p1 @api @contrato - Respostas seguem contrato definido', async ({ request }) => {
    const token = await loginByApi(request, users.pro.email, users.pro.password);

    const loginResponse = await request.post(apiRoutes.login, {
      data: {
        email: users.pro.email,
        password: users.pro.password,
      },
    });

    expect(loginResponse.status()).toBe(200);
    expectLoginContract(await loginResponse.json());

    const dashboardResponse = await request.get(apiRoutes.dashboard, {
      headers: authHeaders(token),
    });

    expect(dashboardResponse.status()).toBe(200);
    expectDashboardContract(await dashboardResponse.json());

    const transactionResponse = await request.post(apiRoutes.transactions, {
      headers: authHeaders(token),
      data: apiPayloads.validIncomeTransaction,
    });

    expect(transactionResponse.status()).toBe(201);
    expectTransactionContract(await transactionResponse.json());
  });
});