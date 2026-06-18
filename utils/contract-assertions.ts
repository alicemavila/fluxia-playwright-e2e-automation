import { expect } from '@playwright/test';

export function expectLoginContract(body: any) {
  const token =
    body.token ||
    body.accessToken ||
    body.data?.token ||
    body.data?.accessToken;

  expect(token, 'Login deve retornar token').toBeTruthy();
}

export function expectDashboardContract(body: any) {
  const dashboard = body.data || body;

  expect(dashboard, 'Dashboard deve retornar corpo válido').toBeTruthy();

  const hasIncome =
    dashboard.income !== undefined ||
    dashboard.totalIncome !== undefined ||
    dashboard.receitas !== undefined;

  const hasExpense =
    dashboard.expense !== undefined ||
    dashboard.totalExpense !== undefined ||
    dashboard.despesas !== undefined;

  const hasBalance =
    dashboard.balance !== undefined ||
    dashboard.saldo !== undefined;

  expect(hasIncome, 'Dashboard deve retornar total de receitas').toBeTruthy();
  expect(hasExpense, 'Dashboard deve retornar total de despesas').toBeTruthy();
  expect(hasBalance, 'Dashboard deve retornar saldo').toBeTruthy();
}

export function expectTransactionContract(body: any) {
  const transaction = body.data || body;

  expect(
    transaction.id || transaction.transactionId,
    'Transação deve retornar ID'
  ).toBeTruthy();

  expect(
    transaction.description || transaction.descricao,
    'Transação deve retornar descrição'
  ).toBeTruthy();

  expect(
    transaction.value !== undefined || transaction.valor !== undefined,
    'Transação deve retornar valor'
  ).toBeTruthy();
}