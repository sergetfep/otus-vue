<script lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';

import HomePage from './pages/HomePage.vue';
import OrderPage from './pages/OrderPage.vue';
import AddProductPage from './pages/AddProductPage.vue';

export default {
  components: {
    TheHeader,
    HomePage,
    OrderPage,
    AddProductPage
  },
  data() {
    return {
      productsFilter: ''
    };
  },
  methods: {
    changeProductsFilter(text: string): void {
      this.productsFilter = text;
    }
  }
};
</script>

<template>
  <TheHeader @search-change="changeProductsFilter"></TheHeader>
  <main>
    <OrderPage />
    <AddProductPage />
    <HomePage :products-filter="productsFilter" />
  </main>
  <!-- <footer></footer> -->
</template>
