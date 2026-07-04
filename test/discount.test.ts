import { describe, expect, it } from 'vitest';
import { calculateDiscount, tierLabel } from '../src/discount.js';

describe('calculateDiscount', () => {
  it('applies the VIP flat rate', () => {
    expect(calculateDiscount(10, 2, 'vip')).toBe(16);
  });

  it('applies the premium flat rate', () => {
    expect(calculateDiscount(10, 2, 'premium')).toBe(18);
  });

  it('gives regular customers no discount below the bulk threshold', () => {
    expect(calculateDiscount(10, 2, 'regular')).toBe(20);
  });

  it('rejects a non-positive price', () => {
    expect(() => calculateDiscount(0, 2, 'regular')).toThrow(RangeError);
  });

  // Deliberately not exercised: regular customers hitting the bulk-quantity
  // discount (quantity >= 10) — the genuine edge case that keeps branch
  // coverage below line coverage.
});

describe('tierLabel', () => {
  it('labels each known tier', () => {
    expect(tierLabel('vip')).toBe('VIP');
    expect(tierLabel('premium')).toBe('Premium');
    expect(tierLabel('regular')).toBe('Regular');
  });

  // Deliberately not exercised: the defensive `default` branch for an
  // out-of-union value — unreachable through TS's type system.
});
