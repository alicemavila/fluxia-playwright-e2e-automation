import { Page } from '@playwright/test';

export async function getAuthHeaders(page: Page): Promise<Record<string, string>> {
  const token = await page.evaluate(() => {
    return (
      localStorage.getItem('token') ||
      localStorage.getItem('accessToken') ||
      localStorage.getItem('authToken') ||
      sessionStorage.getItem('token') ||
      sessionStorage.getItem('accessToken') ||
      sessionStorage.getItem('authToken')
    );
  });

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}