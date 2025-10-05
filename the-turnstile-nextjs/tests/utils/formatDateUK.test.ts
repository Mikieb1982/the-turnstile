import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { formatDateUK } from '../../src/utils/date';

describe('formatDateUK', () => {
  it('formats Date instances using UK locale order', () => {
    const date = new Date(Date.UTC(2024, 0, 15, 12));
    assert.equal(formatDateUK(date), '15/01/2024');
  });

  it('formats numeric timestamps', () => {
    const timestamp = Date.UTC(2023, 10, 5, 12);
    assert.equal(formatDateUK(timestamp), '05/11/2023');
  });

  it('returns an empty string for invalid inputs', () => {
    assert.equal(formatDateUK('not-a-date'), '');
  });
});
