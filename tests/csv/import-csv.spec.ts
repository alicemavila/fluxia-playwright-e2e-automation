import path from 'path';
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TransactionsPage } from '../../pages/TransactionsPage';
import { ImportCsvPage } from '../../pages/ImportCsvPage';
import { users } from '../../fixtures/users';
import {
  createValidFullCsv,
  createValidSmallCsv,
} from '../../utils/csv-fixtures';

test.describe.serial('Importação CSV - Risco de Integridade de Dados', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(users.csv.email, users.csv.password);
    await dashboardPage.expectLoaded();
  });

  test('CT-071 @automacao_p1 @csv @pro - Upload de CSV válido é aceito', async ({ page }) => {
    const importCsvPage = new ImportCsvPage(page);
    const csv = createValidSmallCsv();

    await importCsvPage.goto();
    await importCsvPage.uploadCsv(csv.filePath);

    await importCsvPage.expectMappingOrPreviewStep();
    await importCsvPage.expectPreviewContains(csv.rows[0].descricao);
    await importCsvPage.expectPreviewContains(csv.rows[1].descricao);
  });

  test('CT-072 @automacao_p1 @csv @negativo - CSV vazio é rejeitado', async ({ page }) => {
    const importCsvPage = new ImportCsvPage(page);
    const emptyCsvPath = path.join(process.cwd(), 'data', 'csv', 'empty.csv');

    await importCsvPage.goto();
    await importCsvPage.uploadCsv(emptyCsvPath);

    await importCsvPage.expectValidationError();
  });

  test('CT-075 @automacao_p1 @csv @negativo - CSV com coluna obrigatória ausente é bloqueado', async ({ page }) => {
    const importCsvPage = new ImportCsvPage(page);
    const missingColumnsPath = path.join(
      process.cwd(),
      'data',
      'csv',
      'missing-required-columns.csv'
    );

    await importCsvPage.goto();
    await importCsvPage.uploadCsv(missingColumnsPath);
    await importCsvPage.confirmMappingIfNeeded();

    await importCsvPage.expectValidationError();
  });

  test('CT-083 @automacao_p1 @csv @dashboard - Importação confirmada cria transações', async ({ page }) => {
    const importCsvPage = new ImportCsvPage(page);
    const transactionsPage = new TransactionsPage(page);
    const dashboardPage = new DashboardPage(page);
    const csv = createValidFullCsv();

    await importCsvPage.goto();
    await importCsvPage.uploadCsv(csv.filePath);

    await importCsvPage.expectMappingOrPreviewStep();
    await importCsvPage.confirmMappingIfNeeded();
    await importCsvPage.confirmImport();

    await importCsvPage.expectImportSuccess();

    await transactionsPage.goto();
    await transactionsPage.expectTransactionVisible(csv.rows[0].descricao);
    await transactionsPage.expectTransactionVisible(csv.rows[4].descricao);

    await dashboardPage.goto();
    await dashboardPage.expectFinancialValue(csv.expectedBalance);
  });

  test('CT-084 @automacao_p1 @csv @duplicidade - CSV duplicado não gera transações repetidas sem alerta', async ({ page }) => {
    const importCsvPage = new ImportCsvPage(page);
    const csv = createValidSmallCsv();

    await importCsvPage.goto();
    await importCsvPage.uploadCsv(csv.filePath);
    await importCsvPage.expectMappingOrPreviewStep();
    await importCsvPage.confirmMappingIfNeeded();
    await importCsvPage.confirmImport();
    await importCsvPage.expectImportSuccess();

    await importCsvPage.goto();
    await importCsvPage.uploadCsv(csv.filePath);

    await importCsvPage.expectDuplicateWarning();
  });
});