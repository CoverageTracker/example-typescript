import { calculateDiscount, type CustomerType } from './discount.js';

export interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 7.5;

/** An in-memory shopping cart used to demo a slightly less trivial call graph. */
export class Cart {
  private readonly items = new Map<string, CartItem>();

  constructor(private readonly customerType: CustomerType = 'regular') {}

  addItem(item: CartItem): void {
    if (item.quantity <= 0) {
      throw new RangeError('quantity must be positive');
    }
    const existing = this.items.get(item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.set(item.id, { ...item });
    }
  }

  removeItem(id: string): boolean {
    return this.items.delete(id);
  }

  get size(): number {
    return this.items.size;
  }

  /** Sum of each line item's discounted subtotal. */
  getTotal(): number {
    let total = 0;
    for (const item of this.items.values()) {
      total += calculateDiscount(item.price, item.quantity, this.customerType);
    }
    return Number(total.toFixed(2));
  }

  /**
   * Totals the cart and adds shipping.
   *
   * Throws on an empty cart — checking out nothing is a caller bug, not a
   * valid zero-total order.
   */
  checkout(): { total: number; shipping: number } {
    if (this.items.size === 0) {
      throw new Error('cannot check out an empty cart');
    }
    const total = this.getTotal();
    const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return { total: Number((total + shipping).toFixed(2)), shipping };
  }
}
