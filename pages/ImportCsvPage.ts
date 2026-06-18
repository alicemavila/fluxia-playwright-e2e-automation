import { expect, Page } from '@playwright/test';
import { routes } from '../utils/routes';

export class ImportCsvPage {
  private readonly errorMessage =
    /erro|inválido|invalido|vazio|sem dados|coluna obrigatória|coluna obrigatoria|valor obrigatório|valor obrigatorio|arquivo inválido|arquivo invalido/i;

  private readonly successMessage =
    /importação concluída|importacao concluida|importado com sucesso|sucesso|transações importadas|transacoes importadas/i;

  private readonly duplicateMessage =
    /duplicidade|duplicado|já importado|ja importado|arquivo já foi importado|arquivo ja foi importado|transações duplicadas|transacoes duplicadas/i;

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(routes.importCsv);
  }

  async uploadCsv(filePath: string) {
    const fileInput = this.page.locator('input[type="file"]').first();

    await expect(fileInput).toBeAttached();
    await fileInput.setInputFiles(filePath);

    const actionButton = this.page.getByRole('button', {
      name: /enviar|upload|carregar|avançar|avancar|continuar|processar/i,
    });

    if (await actionButton.count()) {
      await actionButton.first().click();
    }
  }

  async expectMappingOrPreviewStep() {
    await expect(
      this.page.getByText(/mapeamento|mapear|pré-visualização|pre-visualizacao|preview|colunas|data|descrição|descricao|valor/i)
        .first()
    ).toBeVisible();
  }

  async confirmMappingIfNeeded() {
    const button = this.page.getByRole('button', {
      name: /confirmar mapeamento|confirmar|validar|avançar|avancar|continuar/i,
    });

    if (await button.count()) {
      await button.first().click();
    }
  }

  async confirmImport() {
    const button = this.page.getByRole('button', {
      name: /importar|confirmar importação|confirmar importacao|finalizar|concluir/i,
    });

    await expect(button.first()).toBeVisible();
    await button.first().click();
  }

  async expectImportSuccess() {
    await expect(this.page.getByText(this.successMessage).first()).toBeVisible();
  }

  async expectValidationError() {
    await expect(this.page.getByText(this.errorMessage).first()).toBeVisible();
  }

  async expectDuplicateWarning() {
    await expect(this.page.getByText(this.duplicateMessage).first()).toBeVisible();
  }

  async expectPreviewContains(text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }
}