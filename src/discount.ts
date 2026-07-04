export type CustomerType = 'regular' | 'premium' | 'vip';

/**
 * Computes the post-discount subtotal for a line item.
 *
 * VIP and premium customers get a flat rate; regular customers only earn a
 * volume discount once they cross the bulk threshold.
 */
export function calculateDiscount(
  price: number,
  quantity: number,
  customerType: CustomerType,
): number {
  if (price <= 0 || quantity <= 0) {
    throw new RangeError('price and quantity must be positive');
  }

  let rate = 0;
  if (customerType === 'vip') {
    rate = 0.2;
  } else if (customerType === 'premium') {
    rate = 0.1;
  } else if (quantity >= 10) {
    rate = 0.05;
  }

  const subtotal = price * quantity;
  return Number((subtotal * (1 - rate)).toFixed(2));
}

/** Human-readable label for the tier a customer falls into. */
export function tierLabel(customerType: CustomerType): string {
  switch (customerType) {
    case 'vip':
      return 'VIP';
    case 'premium':
      return 'Premium';
    case 'regular':
      return 'Regular';
    default:
      throw new Error(`unknown customer type: ${customerType as string}`);
  }
}
