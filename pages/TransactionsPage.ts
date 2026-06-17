import { expect, Page } from '@playwright/test';
import { routes } from '../utils/routes';

type TransactionData = {
  description: string;
  value: string;
  category: string;
  type: string;
};

export class TransactionsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(routes.transactions);
  }

  async openCreateTransactionForm() {
    await this.page.getByRole('button', { name: /nova transação|adicionar|criar/i }).click();
  }

  async selectTransactionType(type: string) {
    await this.page.getByLabel(/tipo/i).selectOption({ label: type });
  }

  async fillDescription(description: string) {
    await this.page.getByLabel(/descrição|descricao/i).fill(description);
  }

  async fillValue(value: string) {
    await this.page.getByLabel(/valor/i).fill(value);
  }

  async selectCategory(category: string) {
    await this.page.getByLabel(/categoria/i).selectOption({ label: category });
  }

  async fillDateToday() {
    const today = new Date().toISOString().split('T')[0];

    const dateField = this.page.getByLabel(/data/i);

    if (await dateField.count()) {
      await dateField.fill(today);
    }
  }

  async submit() {
    await this.page.getByRole('button', { name: /salvar|criar|confirmar/i }).click();
  }

  async createTransaction(transaction: TransactionData) {
    await this.goto();
    await this.openCreateTransactionForm();
    await this.selectTransactionType(transaction.type);
    await this.fillDescription(transaction.description);
    await this.fillValue(transaction.value);
    await this.selectCategory(transaction.category);
    await this.fillDateToday();
    await this.submit();
  }

  async createTransactionWithDoubleClick(transaction: TransactionData) {
    await this.goto();
    await this.openCreateTransactionForm();
    await this.selectTransactionType(transaction.type);
    await this.fillDescription(transaction.description);
    await this.fillValue(transaction.value);
    await this.selectCategory(transaction.category);
    await this.fillDateToday();

    await this.page.getByRole('button', { name: /salvar|criar|confirmar/i }).dblclick();
  }

  async expectTransactionVisible(description: string) {
    await expect(this.page.getByText(description)).toBeVisible();
  }

  async expectTransactionNotVisible(description: string) {
    await expect(this.page.getByText(description)).not.toBeVisible();
  }

  async deleteTransaction(description: string) {
    const row = this.page.getByRole('row').filter({ hasText: description });

    await expect(row).toBeVisible();

    await row.getByRole('button', { name: /excluir|remover|deletar/i }).click();

    const confirmButton = this.page.getByRole('button', {
      name: /confirmar|sim|excluir/i,
    });

    if (await confirmButton.count()) {
      await confirmButton.click();
    }
  }

  async expectValidationMessage(message: RegExp) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectOnlyOneTransactionCreated(description: string) {
    const rows = this.page.getByRole('row').filter({ hasText: description });
    await expect(rows).toHaveCount(1);
  }
}