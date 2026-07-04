export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

/** Formats a numeric amount with the currency's symbol and decimal convention. */
export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const symbol = SYMBOLS[currency];
  const cleanLabel = collapseSpaces(currency);

  if (currency === 'JPY') {
    // Yen has no minor unit — round to a whole number.
    return `${symbol}${Math.round(amount).toLocaleString('en-US')} ${cleanLabel}`;
  }

  return `${symbol}${amount.toFixed(2)} ${cleanLabel}`;
}

/**
 * Collapses runs of whitespace and trims the ends.
 *
 * Duplicated (deliberately) from `validation.ts` — a small copy-paste that
 * jscpd's duplication scan is meant to catch in this example repo.
 */
function collapseSpaces(value: string): string {
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
