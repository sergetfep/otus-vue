<script lang="ts">
import { defineComponent } from 'vue';

import ProductsItem from '../components/products/ProductsItem.vue';

import type { Product } from '@/types/products';

export default defineComponent({
  props: {
    productsFilter: {
      type: String,
      required: true
    }
  },
  components: {
    ProductsItem
  },
  data() {
    return {
      isLoading: false,
      error: null as null | string,
      products: [] as Product[]
    };
  },
  watch: {
    async productsFilter(): Promise<void> {
      await this.loadProducts();
    }
  },
  methods: {
    setProductsFilter(products: Product[]): void {
      if (this.productsFilter === '') {
        this.products = products;
      } else {
        this.products = products.filter((product) => {
          return (
            product.title.toLowerCase().includes(this.productsFilter) ||
            product.price.toString().includes(this.productsFilter)
          );
        });
      }
    },
    async loadProducts(): Promise<void> {
      this.error = null;
      this.isLoading = true;

      try {
        const result = await fetch('https://fakestoreapi.com/products');
        const products = (await result.json()) as Product[];
        this.setProductsFilter(products);
      } catch (error) {
        this.error = 'Загрузка не удалась.';
      }

      this.isLoading = false;
    }
  },
  async mounted(): Promise<void> {
    await this.loadProducts();
  }
});
</script>

<template>
  <section class="products mt-12">
    <div class="container">
      <h1 class="page-title">Products list</h1>
      <BaseLoader v-if="isLoading" />
      <ul v-else-if="!isLoading && !error" class="products__list">
        <ProductsItem v-for="product in products" :key="product.id" :product="product" />
      </ul>
      <p v-else>{{ error }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.products {
  &__list {
    @apply mt-5 grid grid-cols-4 gap-2;
  }
}
</style>
