<script lang="ts">
import { defineComponent } from 'vue';

import ProductsItem from '../components/products/ProductsItem.vue';

import useProductsStore from '@/stores/products';
import { mapState, mapActions } from 'pinia';

export default defineComponent({
  components: {
    ProductsItem,
  },
  data() {
    return {
      error: null as null | string,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useProductsStore, {
      products: 'getFilteredProducts',
    }),
    productsFilter(): string {
      return (this.$route.query['search'] as string) || '';
    },
  },
  watch: {
    productsFilter(value: string) {
      this.setProductsFilter(value);
    },
  },
  methods: {
    ...mapActions(useProductsStore, {
      loadProducts: 'loadProducts',
      setProductsFilter: 'setProductsFilter',
    }),
  },
  async mounted() {
    this.error = null;
    this.isLoading = true;

    await this.loadProducts();

    this.isLoading = false;
  },
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
      <p v-else class="products__error">{{ error }}</p>
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
