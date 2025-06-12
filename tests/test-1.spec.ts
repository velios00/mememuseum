import { test, expect } from '@playwright/test';

test('should register with correct credentials and redirect to login screen', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await expect(page.getByRole('heading')).toContainText('Crea account');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Snake');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Eater');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await expect(page.getByRole('status')).toContainText('Registrazione effettuata con successo!');
  await expect(page.getByRole('heading')).toContainText('Accedi');
});

test('should login with correct credentials and see its name on header', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByRole('heading')).toContainText('Accedi');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Snake');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Eater');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByRole('status')).toContainText('Login riuscito!');
  await expect(page.locator('h6')).toContainText('Snake');
});

test('should be able to upload a meme after login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Snake');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Eater');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByRole('status')).toContainText('Login riuscito!');
  await page.getByRole('button', { name: 'Carica' }).click();
  await expect(page.locator('h1')).toContainText('Carica il tuo meme');
  await page.getByRole('textbox', { name: 'Titolo' }).click();
  await page.getByRole('textbox', { name: 'Titolo' }).fill('Prova Meme');
  await page.getByRole('textbox', { name: 'Tag' }).click();
  await page.getByRole('textbox', { name: 'Tag' }).fill('prova, meme');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('96a730c05c7846c63d7b7dfc3d6594e4.jpg');
  await page.locator('form').getByRole('button', { name: 'Carica' }).click();
  await expect(page.getByRole('status')).toContainText('Meme caricato con successo!');
  await expect(page.getByText('Recenti')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Prova Meme', exact: true })).toBeVisible();
  await expect(page.locator('#root')).toContainText('Snake');
  await expect(page.locator('#root')).toContainText('Prova Meme');
  await expect(page.locator('div').filter({ hasText: /^#prova$/ })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^#meme$/ }).first()).toBeVisible();
});

test('should be able to upvote and downvote a meme after login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Snake');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Eater');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).click();
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).fill('prova');
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).press('Enter');
  await page.getByText('0').first().click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await page.getByText('1').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await page.getByText('0').first().click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByText('-').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByText('0').first().click();
});

test('should be able to search memes by tags', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).click();
  await expect(page.getByText('SnakeMeme per Tag#tag100SnakeProva Meme#prova#meme00Snakeddd#eee00Snakeprova')).toBeVisible();
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).click();
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).fill('tag1');
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).press('Enter');
  await expect(page.getByRole('button', { name: 'tag1' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^#tag1$/ }).nth(1)).toBeVisible();
});

test('should not be able to upload a meme without a file', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Snake');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Eater');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('button', { name: 'Carica' }).click();
  await page.locator('form').getByRole('button', { name: 'Carica' }).click();
  await expect(page.getByRole('status')).toContainText('Nessuna immagine da caricare');
});

test('should not be able to register with too few characters', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('ab');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('ab');
  await page.getByRole('button', { name: 'Registrati' }).click();
  await page.getByText('Password troppo corta').click();
  await page.getByText('Username troppo corto').click();
});

test('should not be able to login with wrong credentials', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('sbagliate');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('credenziali');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByText('Login Fallito. Usa').click();
});

test('should not be able to comment if not logged in', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).click();
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).fill('prova');
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).press('Enter');
  await page.getByRole('button', { name: '0' }).click();
  await page.locator('div').filter({ hasText: /^Nessun commento ancora\.$/ }).click();
  await page.getByRole('textbox', { name: 'Scrivi un commento...' }).click();
  await page.getByRole('textbox', { name: 'Scrivi un commento...' }).fill('posso commentare ?');
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByText('Devi essere loggato per').click();
  await page.locator('div').filter({ hasText: /^Nessun commento ancora\.$/ }).click();
});

test('should not be able to send comment if its empty', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Snake');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Eater');
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).click();
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).fill('prova');
  await page.getByRole('textbox', { name: 'Filtra per tag...' }).press('Enter');
  await page.getByRole('button', { name: '0' }).click();
  await page.locator('div').filter({ hasText: /^Nessun commento ancora\.$/ }).click();
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByText('Il commento non può essere').click();
  await page.locator('div').filter({ hasText: /^Nessun commento ancora\.$/ }).click();
});