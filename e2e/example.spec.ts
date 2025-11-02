import { test, expect } from '@playwright/test';

test('take screenshots of all pages', async ({ page }) => {
  const pages = [
    { name: 'league-table', path: '/league-table' },
    { name: 'achievements', path: '/achievements' },
    { name: 'dashboard', path: '/dashboard' },
    { name: 'fixtures', path: '/fixtures' },
    { name: 'profile', path: '/profile' },
    { name: 'match-log', path: '/match-log' },
    { name: 'teams', path: '/teams' },
  ];

  for (const { name, path } of pages) {
    await page.goto(`http://localhost:3000${path}`);
    try {
      await page.waitForSelector('h1', { timeout: 5000 });
    } catch (error) {
      // If the h1 element is not found, it's likely a page that's still loading
      // or a page that doesn't have an h1 element. In either case, we'll
      // just wait for a fixed amount of time before taking the screenshot.
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
  }
});
