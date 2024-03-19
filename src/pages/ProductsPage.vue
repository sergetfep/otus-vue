<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import ProductsItem from '../components/products/ProductsItem.vue';

import { useProducts } from '@/hooks/products';

export default defineComponent({
  components: {
    ProductsItem
  },
  methods: {
    addToCart(value: number) {
      this.$emit('add-to-cart', value);
    }
  },
  setup() {
    const { isLoading, error, products, loadProducts } = useProducts();

    onMounted(async () => {
      await loadProducts();
    });

    return { isLoading, error, products };
  }
});
</script>

<template>
  <section class="products mt-12">
    <div class="container">
      <h1 class="page-title">Products list</h1>
      <BaseLoader v-if="isLoading" />
      <ul v-else-if="!isLoading && !error" class="products__list">
        <ProductsItem
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
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
