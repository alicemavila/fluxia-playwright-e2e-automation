import { expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export async function checkAccessibility(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
}

export async function expectNoCriticalAccessibilityIssues(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const criticalViolations = accessibilityScanResults.violations.filter(
    (violation) => violation.impact === 'critical' || violation.impact === 'serious'
  );

  expect(criticalViolations).toEqual([]);
}