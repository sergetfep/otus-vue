import { describe, expect, test, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useCartStore from './cart';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Saving cart to cookie', () => {
    const store = useCartStore();
    store.cart = { 12: 1 };
    store.saveCart();
    store.cart = { 14: 1 };
    store.initCart();
    expect(store.getCart).toStrictEqual({ 12: 1 });
  });

  test('Adding product to cart', () => {
    const store = useCartStore();
    store.addToCart(12);
    expect(store.cart).toStrictEqual({ 12: 1 });
    store.addToCart(14);
    store.addToCart(12);
    expect(store.getCart).toStrictEqual({ 12: 2, 14: 1 });
  });

  test('Initializing', () => {
    const store = useCartStore();
    store.initCart();
    expect(store.cart).toStrictEqual({ 12: 2, 14: 1 });
  });

  test('Removing product from cart', () => {
    const store = useCartStore();
    store.initCart();

    store.removeFromCart(12);
    expect(store.cart).toStrictEqual({ 12: 1, 14: 1 });
    store.removeFromCart(12);
    expect(store.cart).toStrictEqual({ 14: 1 });
  });

  test('Clearing cart', () => {
    const store = useCartStore();
    store.initCart();
    store.clearCart();
    expect(store.cart).toStrictEqual({});
  });

  test('Count works correct', () => {
    const store = useCartStore();
    expect(store.getCount).toStrictEqual(0);
    store.addToCart(12);
    expect(store.getCount).toStrictEqual(1);
    store.addToCart(14);
    store.addToCart(12);
    expect(store.getCount).toStrictEqual(3);

    store.removeFromCart(12);
    store.removeFromCart(12);
    expect(store.getCount).toStrictEqual(1);
    store.clearCart();
    expect(store.getCount).toStrictEqual(0);
  });
});
