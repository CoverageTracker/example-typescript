import { describe, expect, it } from 'vitest';
import { normalizeWhitespace, validateEmail, validatePhone } from '../src/validation.js';

describe('validateEmail', () => {
  it('accepts a well-formed address', () => {
    expect(validateEmail('person@example.com')).toBe(true);
  });

  it('rejects an address missing a domain', () => {
    expect(validateEmail('person@')).toBe(false);
  });

  it('rejects an address over the length limit', () => {
    const tooLong = `${'a'.repeat(250)}@example.com`;
    expect(validateEmail(tooLong)).toBe(false);
  });
});

describe('validatePhone', () => {
  it('accepts a 10-digit US number with punctuation', () => {
    expect(validatePhone('(555) 123-4567')).toBe(true);
  });

  it('rejects a number with the wrong digit count', () => {
    expect(validatePhone('555-123')).toBe(false);
  });

  // Deliberately not exercised: the international `+`-prefixed branch.
});

describe('normalizeWhitespace', () => {
  it('collapses internal whitespace runs and trims the ends', () => {
    expect(normalizeWhitespace('  hello \t\n world  ')).toBe('hello world');
  });
});
