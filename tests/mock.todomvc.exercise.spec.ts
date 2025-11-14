import { test, expect } from '@playwright/test';

test('exercice localStorage: 4 tâches, 3e complétée, 1re supprimée', async ({ page }) => {
  await page.addInitScript(() => {
    // 1. Injecter 4 tâches
    const mockedTodos = [
      { title: 'Tâche 1', completed: false },
      { title: 'Tâche 2', completed: false },
      { title: 'Tâche 3', completed: false },
      { title: 'Tâche 4', completed: false }
    ];

    // 2. Marquer la 3e tâche comme complétée
    mockedTodos[2].completed = true;

    // 3. Supprimer la 1re tâche
    mockedTodos.splice(0, 1);

    localStorage.setItem('react-todos', JSON.stringify(mockedTodos));
  });

  await page.goto('https://demo.playwright.dev/todomvc');

  // 4. Vérifier que la liste affichée correspond au contenu simulé
  await expect(page.getByText('Tâche 1')).not.toBeVisible();
  await expect(page.getByText('Tâche 2')).toBeVisible();
  await expect(page.getByText('Tâche 3')).toBeVisible();
  await expect(page.getByText('Tâche 4')).toBeVisible();

  // Vérifier que la Tâche 3 est cochée
  const task3Checkbox = page.locator('li:has-text("Tâche 3") input[type="checkbox"]');
  await expect(task3Checkbox).toBeChecked();
});

