import { describe, expect, test, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useProductsStore from './products';

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Loading products', async () => {
    const store = useProductsStore();
    await store.loadProducts();
    expect(store.products.length).toBeGreaterThan(0);
  });

  test('Filtering products', async () => {
    const store = useProductsStore();
    store.setProductsFilter('');
    expect(store.getFilteredProducts).toEqual(store.products);

    const filter = 'fit';
    store.setProductsFilter(filter);
    expect(store.getFilteredProducts).toEqual(
      store.products.filter((product) => {
        return (
          product.title.toLowerCase().includes(filter) || product.price.toString().includes(filter)
        );
      }),
    );
  });

  test('Getting filtered products', async () => {
    const store = useProductsStore();
    store.setProductsFilter('fit');
    expect(store.getFilteredProducts).toEqual([]);
  });

  test('Load single product', async () => {
    const store = useProductsStore();
    const product = await store.loadSingleProduct(1);
    expect(product).not.toEqual(undefined);
  });
});
