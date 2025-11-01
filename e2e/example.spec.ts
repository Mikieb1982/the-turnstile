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
    await page.waitForTimeout(1000); // Allow time for the page to render
    await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
  }
});
