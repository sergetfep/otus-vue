import type { Product } from '@/types/products';

import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

export function useProducts() {
  const error = ref(null as null | string);
  const isLoading = ref(false);
  const filteredProducts = ref([] as Product[]);

  const productsFilter = computed((): string => {
    const route = useRoute();
    return (route.query['search'] as string) || '';
  });

  watch(productsFilter, async () => {
    await loadProducts();
  });

  function setFilteredProducts(products: Product[]): void {
    if (productsFilter.value === '') {
      filteredProducts.value = products;
    } else {
      filteredProducts.value = products.filter((product) => {
        return (
          product.title.toLowerCase().includes(productsFilter.value) ||
          product.price.toString().includes(productsFilter.value)
        );
      });
    }
  }

  async function loadProducts(): Promise<void> {
    error.value = null;
    isLoading.value = true;

    try {
      const result = await fetch('https://fakestoreapi.com/products');
      const products = (await result.json()) as Product[];
      setFilteredProducts(products);
    } catch (e) {
      error.value = 'Загрузка не удалась.';
    }

    isLoading.value = false;
  }

  return { isLoading, error, products: filteredProducts, loadProducts };
}
