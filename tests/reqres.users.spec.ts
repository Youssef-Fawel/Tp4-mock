import { test, expect } from '@playwright/test';

test('mock de la liste des utilisateurs', async ({ page }) => {
  // Intercepter la requête API et retourner des données mockées
  await page.route('**/api/users?page=2', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: [
          { id: 1, first_name: 'JeanMocked', last_name: 'DupontMocked', email: 'jean.dupont@example.com' },
          { id: 2, first_name: 'ClaireMocked', last_name: 'MartinMocked', email: 'claire.martin@example.com' }
        ]
      })
    });
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=List Users');

  // Vérifier que les données mockées apparaissent dans la réponse
  await page.waitForSelector('pre[data-key="output-response"]');
  await expect(page.locator('pre[data-key="output-response"]')).toContainText('JeanMocked');
  await expect(page.locator('pre[data-key="output-response"]')).toContainText('ClaireMocked');

  await page.unroute('**/api/users?page=2');
});

