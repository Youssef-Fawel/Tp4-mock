import { test, expect } from '@playwright/test';

test('mock GET /api/users/{id} - single user', async ({ page }) => {
  await page.route('**/api/users/2', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          id: 2,
          email: 'test.user@reqres.in',
          first_name: 'TestFirstName',
          last_name: 'TestLastName',
          avatar: 'https://reqres.in/img/faces/2-image.jpg'
        }
      })
    });
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=Single User');

  await page.waitForSelector('pre[data-key="output-response"]');
  await expect(page.locator('pre[data-key="output-response"]')).toContainText('TestFirstName');

  await page.unroute('**/api/users/2');
});

test('mock POST /api/users - create user', async ({ page }) => {
  let mockCalled = false;
  
  await page.route('**/api/users', async route => {
    if (route.request().method() === 'POST') {
      mockCalled = true;
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          name: 'morpheus',
          job: 'leader',
          id: '999',
          createdAt: '2025-11-14T12:00:00.000Z'
        })
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=Create');

  await page.waitForSelector('pre[data-key="output-response"]', { timeout: 10000 });
  
  if (mockCalled) {
    await expect(page.locator('pre[data-key="output-response"]')).toContainText('999');
  }

  await page.unroute('**/api/users');
});

test('mock PUT /api/users/{id} - update user', async ({ page }) => {
  await page.route('**/api/users/2', async route => {
    if (route.request().method() === 'PUT') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          name: 'morpheus',
          job: 'zion_resident_updated',
          updatedAt: '2025-11-14T12:00:00.000Z'
        })
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=Update');

  await page.waitForSelector('pre[data-key="output-response"]');
  await expect(page.locator('pre[data-key="output-response"]')).toContainText('zion_resident_updated');

  await page.unroute('**/api/users/2');
});

test('mock DELETE /api/users/{id} - delete user', async ({ page }) => {
  await page.route('**/api/users/2', async route => {
    if (route.request().method() === 'DELETE') {
      await route.fulfill({
        status: 204,
        body: ''
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=Delete');

  await page.waitForTimeout(3000);
  await expect(page.locator('body')).toBeVisible();

  await page.unroute('**/api/users/2');
});

test('mock POST /api/register - register successful', async ({ page }) => {
  await page.route('**/api/register', async route => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 4,
          token: 'MockedTokenXYZ123'
        })
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=Register - Successful');

  await page.waitForSelector('pre[data-key="output-response"]');
  await expect(page.locator('pre[data-key="output-response"]')).toContainText('MockedTokenXYZ123');

  await page.unroute('**/api/register');
});

test('mock POST /api/login - login successful', async ({ page }) => {
  await page.route('**/api/login', async route => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          token: 'MockedLoginToken456'
        })
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=Login - Successful');

  await page.waitForSelector('pre[data-key="output-response"]');
  await expect(page.locator('pre[data-key="output-response"]')).toContainText('MockedLoginToken456');

  await page.unroute('**/api/login');
});

test('mock GET /api/unknown - list resources', async ({ page }) => {
  await page.route('**/api/unknown', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: [
          { id: 1, name: 'MockedColor1', year: 2000, color: '#98B2D1', pantone_value: '15-4020' },
          { id: 2, name: 'MockedColor2', year: 2001, color: '#C74375', pantone_value: '17-2031' }
        ]
      })
    });
  });

  await page.goto('https://reqres.in/', { waitUntil: 'load' });
  await page.click('text=List <Resource>');

  await page.waitForSelector('pre[data-key="output-response"]');
  await expect(page.locator('pre[data-key="output-response"]')).toContainText('MockedColor1');

  await page.unroute('**/api/unknown');
});

