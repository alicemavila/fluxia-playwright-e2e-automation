import { expect, Page } from '@playwright/test';
import { routes } from '../utils/routes';

export class PermissionsPage {
  private readonly deniedMessage = /upgrade|plano pro|assinatura|permissão insuficiente|permissao insuficiente|acesso negado|não autorizado|nao autorizado|recurso premium|403/i;

  constructor(private page: Page) {}

  async openGoalsByMenuOrRoute() {
    const goalsLink = this.page.getByRole('link', { name: /metas|goals/i });

    if (await goalsLink.count()) {
      await goalsLink.first().click();
      return;
    }

    await this.page.goto(routes.goals);
  }

  async openRecurrencesByMenuOrRoute() {
    const recurrencesLink = this.page.getByRole('link', {
      name: /recorrências|recorrencias|recurrences/i,
    });

    if (await recurrencesLink.count()) {
      await recurrencesLink.first().click();
      return;
    }

    await this.page.goto(routes.recurrences);
  }

  async openImportByMenuOrRoute() {
    const importLink = this.page.getByRole('link', {
      name: /importação|importacao|importar|import/i,
    });

    if (await importLink.count()) {
      await importLink.first().click();
      return;
    }

    await this.page.goto(routes.importCsv);
  }

  async gotoGoalsDirectly() {
    await this.page.goto(routes.goals);
  }

  async gotoRecurrencesDirectly() {
    await this.page.goto(routes.recurrences);
  }

  async gotoImportDirectly() {
    await this.page.goto(routes.importCsv);
  }

  async expectAccessBlocked(expectedBlockedRoute?: string) {
    const deniedLocator = this.page.getByText(this.deniedMessage).first();

    await expect(async () => {
      const hasDeniedMessage = await deniedLocator.isVisible().catch(() => false);
      const currentUrl = this.page.url();

      const wasRedirected =
        expectedBlockedRoute !== undefined && !currentUrl.includes(expectedBlockedRoute);

      expect(hasDeniedMessage || wasRedirected).toBeTruthy();
    }).toPass({
      timeout: 10000,
    });
  }

  async expectAccessAllowed() {
    await expect(this.page.getByText(this.deniedMessage).first()).not.toBeVisible();
  }

  async expectPremiumActionAvailable() {
    const actionButton = this.page.getByRole('button', {
      name: /novo|nova|criar|adicionar|importar|upload/i,
    });

    await expect(actionButton.first()).toBeVisible();
  }
}