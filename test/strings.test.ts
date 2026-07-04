import { describe, expect, it } from 'vitest';
import { capitalize, slugify, truncate } from '../src/strings.js';

describe('capitalize', () => {
  it('uppercases the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('returns the empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('truncate', () => {
  it('leaves short strings untouched', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('truncates long strings with an ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hell…');
  });

  // Deliberately not exercised: the maxLength <= 1 edge case.
});

describe('slugify', () => {
  it('converts a title into a url-safe slug', () => {
    expect(slugify('  Hello, World!  ')).toBe('hello-world');
  });
});
