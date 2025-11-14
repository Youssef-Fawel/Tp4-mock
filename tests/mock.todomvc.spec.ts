import { test, expect } from '@playwright/test';

test('mock localStorage avec tâches existantes', async ({ page }) => {
  // Injecter un jeu de données avant que la page ne se charge
  await page.addInitScript(() => {
    const mockedTodos = [
      { title: 'Acheter du pain', completed: false },
      { title: 'Préparer le repas', completed: true },
      { title: 'Lire la documentation Playwright', completed: false }
    ];
    localStorage.setItem('react-todos', JSON.stringify(mockedTodos));
  });

  await page.goto('https://demo.playwright.dev/todomvc');

  // Vérification des tâches visibles dans l'interface
  await expect(page.getByText('Acheter du pain')).toBeVisible();
  await expect(page.getByText('Préparer le repas')).toBeVisible();
  await expect(page.getByText('Lire la documentation Playwright')).toBeVisible();
});
