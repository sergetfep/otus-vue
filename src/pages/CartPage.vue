<script lang="ts">
import { defineComponent } from 'vue';

import { RouterLink } from 'vue-router';
import CartItem from '@/components/products/CartItem.vue';

import useCartStore from '@/stores/cart';
import { mapState, mapActions } from 'pinia';

export default defineComponent({
  components: {
    CartItem,
    RouterLink,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useCartStore, {
      cart: 'getCart',
      cartCount: 'getCount',
    }),
  },
  methods: {
    ...mapActions(useCartStore, {
      clearCart: 'clearCart',
    }),
  },
});
</script>

<template>
  <section class="cart mt-12">
    <div class="container">
      <h1 v-if="cartCount == 0" class="page-title">You don't have any product in cart yet.</h1>
      <template v-else>
        <h1 class="page-title">Your Cart</h1>
        <div class="cart__menu">
          <p class="cart__total">Products: {{ cartCount }}</p>
          <RouterLink :to="{ name: 'order' }" class="btn cart__order">Order</RouterLink>
          <button @click="clearCart" class="btn cart__clear">Clear cart</button>
        </div>
        <ul class="cart__list">
          <CartItem
            v-for="(productCount, productId) in cart"
            :key="productId"
            :product-id="productId"
            :product-count="productCount"
          />
        </ul>
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cart {
  &__list {
    @apply mt-5 grid grid-cols-4 gap-2;
  }
  &__menu {
    display: flex;
    align-items: center;
  }

  &__total {
    color: #494949;
    font-size: 18px;
    font-weight: 400;
  }

  &__order {
    margin-left: auto;
  }

  &__clear {
    margin-left: 10px;
    background: #d63030;
  }
}
</style>
