<script lang="ts">
import { defineComponent } from 'vue';

import useCartStore from '@/stores/cart';
import useProductsStore from '@/stores/products';
import { mapActions } from 'pinia';

import type { Product } from '@/types/products';

export default defineComponent({
  props: {
    productId: {
      type: Number,
      required: true,
    },
    productCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      product: {} as Product,
    };
  },
  methods: {
    ...mapActions(useCartStore, {
      addToCart: 'addToCart',
      removeFromCart: 'removeFromCart',
    }),
    ...mapActions(useProductsStore, {
      loadSingleProduct: 'loadSingleProduct',
    }),
  },
  async mounted() {
    this.product = (await this.loadSingleProduct(this.productId)) as Product;
  },
});
</script>

<template>
  <li class="cart-item">
    <div class="cart-item__image">
      <img :src="product.image" alt="" />
    </div>
    <p class="cart-item__title">
      {{ product.title }}
    </p>
    <p class="cart-item__price mt-auto">Price: ${{ product.price }}</p>
    <div class="cart-item__footer">
      <button class="btn cart-item__btn" @click="addToCart(product.id)">+</button>
      <p class="cart-item__count">{{ productCount }}</p>
      <button class="btn cart-item__btn" @click="removeFromCart(product.id)">-</button>
    </div>
  </li>
</template>

<style scoped lang="scss">
.cart-item {
  @apply flex flex-col gap-2 p-2;
  border-radius: 10px;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);

  &__image {
    @apply flex flex-col justify-center items-center h-20;

    img {
      @apply h-full w-full object-contain;
    }
  }

  &__title {
    color: #272727;
    font-size: 16px;
    font-weight: 500;
  }

  &__price {
    color: #272727;
    font-size: 20px;
    font-weight: 500;
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__btn {
    font-size: 20px;
    font-weight: 400;
    padding: 5px 15px;
  }

  &__count {
    color: #272727;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
