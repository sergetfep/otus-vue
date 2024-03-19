import { defineStore } from 'pinia';

import type { Product } from '@/types/products';

const useProductsStore = defineStore('products', {
  state: () => {
    return {
      products: [] as Product[],
      filter: '',
    };
  },
  actions: {
    async loadProducts(): Promise<void> {
      try {
        const result = await fetch('https://fakestoreapi.com/products');
        const products = (await result.json()) as Product[];
        this.products = products;
      } catch (e) {
        console.log('Загрузка не удалась.');
      }
    },
    setProductsFilter(value: string): void {
      this.filter = value;
    },
  },
  getters: {
    getFilteredProducts(state) {
      if (state.filter === '') {
        return state.products;
      } else {
        return state.products.filter((product) => {
          return (
            product.title.toLowerCase().includes(state.filter) ||
            product.price.toString().includes(state.filter)
          );
        });
      }
    },
  },
});

export default useProductsStore;
