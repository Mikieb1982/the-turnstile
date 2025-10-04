import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { TeamLogo } from '../../src/components/TeamLogo';

describe('TeamLogo', () => {
  it('renders initials and gradient for known teams', () => {
    const markup = renderToStaticMarkup(
      <TeamLogo teamId="3" teamName="Leeds Rhinos" />
    );

    assert(markup.includes('>LR<'), `expected initials to be present in markup: ${markup}`);
    assert(
      markup.includes('linear-gradient(135deg, #00539F, #FFB81C)'),
      `expected palette gradient in markup: ${markup}`
    );
  });

  it('falls back to default styling when branding is missing', () => {
    const markup = renderToStaticMarkup(
      <TeamLogo teamId="unknown" teamName="Mystery Team" />
    );

    assert(markup.includes('>MT<'), `expected fallback initials in markup: ${markup}`);
    assert(
      markup.includes('linear-gradient(135deg, #6B7280, #9CA3AF)'),
      `expected fallback gradient in markup: ${markup}`
    );
    assert(
      markup.includes('color:#FFFFFF') || markup.includes('color:#ffffff'),
      `expected fallback text colour in markup: ${markup}`
    );
  });
});
