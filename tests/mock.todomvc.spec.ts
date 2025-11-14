import { test, expect } from '@playwright/test';

test('mock localStorage avec tâches existantes', async ({ page }) => {
    await page.addInitScript(() => {
        const mockedTodos = [
            { title: 'Acheter du pain', completed: false },
            { title: 'Préparer le repas', completed: false },
            { title: 'Lire la documentation Playwright', completed: false }
        ];
        localStorage.setItem('react-todos', JSON.stringify(mockedTodos));
    });
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.pause();
    await expect(page.getByText('Acheter du pain')).toBeVisible();
    await expect(page.getByText('Préparer le repas')).toBeVisible();
    await expect(page.getByText('Lire la documentation Playwright')).toBeVisible();
    await page.pause();
});

test('exercice localStorage - 4 tâches avec modifications', async ({ page }) => {

    await page.addInitScript(() => {
        const mockedTodos = [
            { id: '1', title: 'Acheter de chocolat', completed: false },
            { id: '2', title: 'travailler en ligne', completed: false },
            { id: '3', title: 'Pratiquer du sport', completed: false },
            { id: '4', title: 'Appeler un ami', completed: false }
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
    await expect(page.getByText('Acheter de chocolat')).not.toBeVisible();
    await page.pause();
    // 2e visible
    await expect(page.getByText('travailler en ligne')).toBeVisible();
    await page.pause();
    // 3e visible et complétée
    const faireDuSportLocator = page.locator('li', {
        has: page.getByText('Pratiquer du sport')
    });
    await expect(faireDuSportLocator).toBeVisible();
    await expect(faireDuSportLocator.locator('input[type="checkbox"]')).toBeChecked();
    await page.pause();
    // 4e visible
    await expect(page.getByText('Appeler un ami')).toBeVisible();
    await page.pause();
});
