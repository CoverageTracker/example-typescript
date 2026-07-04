import { describe, expect, it } from 'vitest';
import { Cart } from '../src/cart.js';

describe('Cart', () => {
  it('merges quantities when the same item is added twice', () => {
    const cart = new Cart('regular');
    cart.addItem({ id: 'sku-1', price: 10, quantity: 1 });
    cart.addItem({ id: 'sku-1', price: 10, quantity: 2 });
    expect(cart.size).toBe(1);
    expect(cart.getTotal()).toBe(30);
  });

  it('removes an item by id', () => {
    const cart = new Cart();
    cart.addItem({ id: 'sku-1', price: 10, quantity: 1 });
    expect(cart.removeItem('sku-1')).toBe(true);
    expect(cart.size).toBe(0);
  });

  // Deliberately not exercised: rejecting a non-positive quantity in
  // addItem() — a genuine edge case, not the mainline path.

  it('refuses to check out an empty cart', () => {
    const cart = new Cart();
    expect(() => cart.checkout()).toThrow('cannot check out an empty cart');
  });

  it('adds the shipping fee below the free-shipping threshold', () => {
    const cart = new Cart('regular');
    cart.addItem({ id: 'sku-1', price: 10, quantity: 1 });
    expect(cart.checkout()).toEqual({ total: 17.5, shipping: 7.5 });
  });

  // Deliberately not exercised: the free-shipping branch once the total
  // crosses FREE_SHIPPING_THRESHOLD.
});
