import { APIRequestContext, expect } from '@playwright/test';
import { apiRoutes } from './api-routes';

type LoginResponse = {
  token?: string;
  accessToken?: string;
  data?: {
    token?: string;
    accessToken?: string;
  };
  user?: unknown;
};

export async function loginByApi(
  request: APIRequestContext,
  email: string,
  password: string
): Promise<string> {
  const response = await request.post(apiRoutes.login, {
    data: {
      email,
      password,
    },
  });

  expect(response.status(), 'Login via API deve retornar 200').toBe(200);

  const body = (await response.json()) as LoginResponse;

  const token =
    body.token ||
    body.accessToken ||
    body.data?.token ||
    body.data?.accessToken;

  expect(token, 'Token de autenticação deve existir no retorno do login').toBeTruthy();

  return token as string;
}

export function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function invalidAuthHeaders() {
  return {
    Authorization: 'Bearer token_invalido_fluxia_qa',
  };
}

export async function createTransactionByApi(
  request: APIRequestContext,
  token: string,
  payload: Record<string, unknown>
): Promise<string> {
  const response = await request.post(apiRoutes.transactions, {
    headers: authHeaders(token),
    data: payload,
  });

  expect(response.status(), 'Criação de transação deve retornar 201').toBe(201);

  const body = await response.json();

  const id =
    body.id ||
    body.transactionId ||
    body.data?.id ||
    body.data?.transactionId;

  expect(id, 'ID da transação criada deve existir').toBeTruthy();

  return String(id);
}

export async function deleteTransactionByApi(
  request: APIRequestContext,
  token: string,
  transactionId: string
) {
  const response = await request.delete(apiRoutes.transactionById(transactionId), {
    headers: authHeaders(token),
  });

  expect(
    [200, 204],
    'Exclusão de transação deve retornar 200 ou 204 conforme contrato'
  ).toContain(response.status());
}