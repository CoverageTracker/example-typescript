import { describe, expect, it } from 'vitest';
import { formatCurrency } from '../src/currency.js';

describe('formatCurrency', () => {
  it('formats USD with two decimals', () => {
    expect(formatCurrency(19.5, 'USD')).toBe('$19.50 USD');
  });

  it('formats EUR with two decimals', () => {
    expect(formatCurrency(19.5, 'EUR')).toBe('€19.50 EUR');
  });

  // Deliberately not exercised: GBP, and the JPY branch (no minor unit,
  // whole-number rounding).
});
