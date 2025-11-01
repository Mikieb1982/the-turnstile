import { test, expect } from '@playwright/test';

test('take screenshots of all pages', async ({ page }) => {
  const pages = [
    { name: 'league-table-v1', path: '/league-table?version=1' },
    { name: 'league-table-v2', path: '/league-table?version=2' },
    { name: 'league-table-v3', path: '/league-table?version=3' },
    { name: 'league-table-v4', path: '/league-table?version=4' },
    { name: 'achievements', path: '/achievements' },
    { name: 'dashboard', path: '/dashboard' },
    { name: 'fixtures', path: '/fixtures' },
    { name: 'profile-v1', path: '/profile?version=1' },
    { name: 'profile-v2', path: '/profile?version=2' },
    { name: 'match-log', path: '/match-log' },
    { name: 'teams', path: '/teams' },
  ];

  for (const { name, path } of pages) {
    await page.goto(`http://localhost:3000${path}`);
    await page.waitForTimeout(1000); // Allow time for the page to render
    await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true });
  }
});
