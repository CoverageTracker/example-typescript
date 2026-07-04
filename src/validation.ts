const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Basic shape + length check — not a full RFC 5322 validator. */
export function validateEmail(email: string): boolean {
  const trimmed = normalizeWhitespace(email);
  if (trimmed.length === 0 || trimmed.length > 254) {
    return false;
  }
  return EMAIL_PATTERN.test(trimmed);
}

/**
 * Validates a phone number as either a US-style 10-digit number or an
 * international number starting with `+`.
 */
export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/[\s().-]/g, '');
  if (digits.startsWith('+')) {
    return /^\+\d{8,15}$/.test(digits);
  }
  return /^\d{10}$/.test(digits);
}

/**
 * Collapses runs of whitespace and trims the ends.
 *
 * Duplicated (deliberately) in `currency.ts` — a small copy-paste that
 * jscpd's duplication scan is meant to catch in this example repo.
 */
export function normalizeWhitespace(value: string): string {
  let result = '';
  let lastWasSpace = false;
  for (const char of value.trim()) {
    const isSpace = char === ' ' || char === '\t' || char === '\n';
    if (isSpace) {
      if (!lastWasSpace) {
        result += ' ';
      }
      lastWasSpace = true;
    } else {
      result += char;
      lastWasSpace = false;
    }
  }
  return result;
}
