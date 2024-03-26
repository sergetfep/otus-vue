import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:5173/';

test.describe('Main page', () => {
  test('Should display products', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page.getByRole('list')).toBeVisible();
  });

  test('Should display product page', async ({ page }) => {
    await page.goto(baseUrl);

    await page.getByRole('link', { name: 'Fjallraven - Foldsack No. 1' }).click();
    await expect(page.getByRole('heading')).toContainText(
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    );
  });
});

test.describe('Cart work', () => {
  test('Adding product', async ({ page }) => {
    await page.goto(baseUrl);

    await expect(page.getByRole('banner')).toContainText('Cart (0)');
    await page
      .locator('li')
      .filter({ hasText: 'Fjallraven - Foldsack No. 1' })
      .getByRole('button')
      .click();
    await expect(page.getByRole('banner')).toContainText('Cart (1)');

    await page.goto(baseUrl + 'cart');
    await expect(page.getByText('Fjallraven - Foldsack No. 1')).toBeVisible(); // Change to li is visible
  });

  test('Removing product', async ({ page }) => {
    await page.goto(baseUrl);

    await page
      .locator('li')
      .filter({ hasText: 'Fjallraven - Foldsack No. 1' })
      .getByRole('button')
      .click();
    await expect(page.getByRole('banner')).toContainText('Cart (1)');

    await page.goto(baseUrl + 'cart');
    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: '-' }).click();
    await expect(page.getByRole('banner')).toContainText('Cart (0)');
  });

  test('Clearing cart', async ({ page }) => {
    await page.goto(baseUrl);

    await page
      .locator('li')
      .filter({ hasText: 'Fjallraven - Foldsack No. 1' })
      .getByRole('button')
      .click();
    await expect(page.getByRole('banner')).toContainText('Cart (1)');

    await page.goto(baseUrl + 'cart');
    await page.getByRole('button', { name: 'Clear cart' }).click();
    await expect(page.getByRole('banner')).toContainText('Cart (0)');
  });
});
