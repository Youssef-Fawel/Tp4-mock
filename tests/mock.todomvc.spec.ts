import { test, expect } from '@playwright/test';

test('mock localStorage avec tâches existantes', async ({ page }) => {
    await page.addInitScript(() => {
        const mockedTodos = [
            { title: 'Réviser les cours', completed: false },
            { title: 'Faire du sport', completed: false },
            { title: 'Regarder un film', completed: false }
        ];
        localStorage.setItem('react-todos', JSON.stringify(mockedTodos));
    });
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.pause();
    await expect(page.getByText('Réviser les cours')).toBeVisible();
    await expect(page.getByText('Faire du sport')).toBeVisible();
    await expect(page.getByText('Regarder un film')).toBeVisible();
    await page.pause();
});

test('exercice localStorage - 4 tâches avec modifications', async ({ page }) => {

    await page.addInitScript(() => {
        const mockedTodos = [
            { id: '1', title: 'Lire un livre', completed: false },
            { id: '2', title: 'Ranger la chambre', completed: false },
            { id: '3', title: 'Écouter de la musique', completed: false },
            { id: '4', title: 'Cuisiner un plat', completed: false }
        ];

        // Tache 3  complétée
        mockedTodos[2].completed = true;

        // Supprimer la 1re tâche
        mockedTodos.splice(0, 1);

        localStorage.setItem('react-todos', JSON.stringify(mockedTodos));
    });

    await page.goto('https://demo.playwright.dev/todomvc');
    await page.pause();
    // 1re tâche supprimée
    await expect(page.getByText('Lire un livre')).not.toBeVisible();
    await page.pause();
    // 2e visible
    await expect(page.getByText('Ranger la chambre')).toBeVisible();
    await page.pause();
    // 3e visible et complétée
    const faireDuSportLocator = page.locator('li', {
        has: page.getByText('Écouter de la musique')
    });
    await expect(faireDuSportLocator).toBeVisible();
    await expect(faireDuSportLocator.locator('input[type="checkbox"]')).toBeChecked();
    await page.pause();
    // 4e visible
    await expect(page.getByText('Cuisiner un plat')).toBeVisible();
    await page.pause();
});
