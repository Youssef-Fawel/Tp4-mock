import { test, expect } from '@playwright/test';

test('mock de la liste des utilisateurs', async ({ page }) => {

    await page.route('**/api/users?page=2', async route => {
        await page.route('**/api/users?page=2', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: [
                        { id: 1, first_name: 'Jean', last_name: 'Dupont', email: 'jean.dupont@example.com' },
                        { id: 2, first_name: 'Claire', last_name: 'Martin', email: 'claire.martin@example.com' }
                    ]
                })
            });
        });
    });

    await page.goto('https://reqres.in/');
    await page.click('text=List Users');
    await expect(page.getByText('Jean')).toBeVisible();
    await expect(page.getByText('Claire')).toBeVisible();
    await page.pause();
    await page.unroute('**/api/users?page=2');
    await page.pause();
});

test('mock de création d\'utilisateur - POST /api/register', async ({ page }) => {
    await page.route('**/api/register', async route => {
        if (route.request().method() === 'POST') {
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    username: 'Jean Dupont',
                    email: 'jean.dupont@example.com',
                    password: '999'

                })
            });
        } else {
            await route.continue();
        }
    });

    await page.goto('https://reqres.in/');
    await expect(page).toHaveTitle(/Reqres/);
    await page.unroute('**/api/register');
});

test('mock de suppression utilisateur - DELETE /api/users/:id', async ({ page }) => {


    await page.route('**/api/users/2', async route => {
        if (route.request().method() === 'DELETE') {
            await route.fulfill({
                status: 204
            });
        } else {
            await route.continue();
        }
    });

    await page.goto('https://reqres.in/');
    await expect(page).toHaveTitle(/Reqres/);

    await page.unroute('**/api/users/2');
});

test('mock de récupération d\'un utilisateur - GET /api/users/:id', async ({ page }) => {
    await page.route('**/api/users/5', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: {
                    id: 5,
                    email: 'charles.morris@reqres.in',
                    first_name: 'Charles',
                    last_name: 'Morris',
                    avatar: 'https://reqres.in/img/faces/5-image.jpg'
                },
                support: {
                    url: 'https://reqres.in/#support-heading',
                    text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
                }
            })
        });
    });

    await page.goto('https://reqres.in/');
    await expect(page).toHaveTitle(/Reqres/);

    await page.unroute('**/api/users/5');
});

test('mock d\'une requête échouée - 404 Not Found', async ({ page }) => {
    await page.route('**/api/users/999999', async route => {
        await route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: JSON.stringify({})
        });
    });

    await page.goto('https://reqres.in/');
    await expect(page).toHaveTitle(/Reqres/);

    await page.unroute('**/api/users/999999');
});

test('exercice - interception multiple routes API ReqRes', async ({ page }) => {
    await page.route('**/api/users*', async route => {
        const url = route.request().url();
        if (url.includes('page=1')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    page: 1,
                    per_page: 6,
                    total: 12,
                    total_pages: 2,
                    data: [
                        { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth' },
                        { id: 2, email: 'janet.weaver@reqres.in', first_name: 'Janet', last_name: 'Weaver' },
                        { id: 3, email: 'emma.wong@reqres.in', first_name: 'Emma', last_name: 'Wong' }
                    ]
                })
            });
        } else if (url.includes('page=2')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    page: 2,
                    per_page: 6,
                    total: 12,
                    total_pages: 2,
                    data: [
                        { id: 7, email: 'michael.lawson@reqres.in', first_name: 'Michael', last_name: 'Lawson' },
                        { id: 8, email: 'lindsay.ferguson@reqres.in', first_name: 'Lindsay', last_name: 'Ferguson' }
                    ]
                })
            });
        } else {
            await route.continue();
        }
    });
    await page.route('**/api/users', async route => {
        if (route.request().method() === 'POST') {
            const postData = route.request().postDataJSON();
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    name: postData.name || 'Nouvel Utilisateur',
                    job: postData.job || 'Emploi',
                    id: '100',
                    createdAt: new Date().toISOString()
                })
            });
        } else {
            await route.continue();
        }
    });

    await page.goto('https://reqres.in/');
    await expect(page).toHaveTitle(/Reqres/);
    await page.unroute('**/api/users*');
    await page.unroute('**/api/users');
});
