<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import type { Product } from '@/types/products';

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  }
});
</script>

<template>
  <li class="products-item">
    <div class="products-item__image">
      <img :src="product.image" alt="" />
    </div>
    <p class="products-item__title">{{ product.title }}</p>
    <p class="products-item__category">{{ product.category }}</p>
    <p class="products-item__rating">
      {{ 'Rate: ' + product.rating.rate + ' / Count: ' + product.rating.count }}
    </p>
    <p class="products-item__descr">{{ product.description }}</p>
    <p class="products-item__price mt-auto">${{ product.price }}</p>
    <button class="btn">Buy Now</button>
  </li>
</template>

<style scoped lang="scss">
.products-item {
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

  &__category {
    color: #494949;
    font-size: 14px;
    font-weight: 300;
  }

  &__price {
    color: #272727;
    font-size: 20px;
    font-weight: 500;
  }

  &__descr {
    color: #7d7d7d;
    font-size: 12px;
    font-weight: 300;
  }

  .btn {
    border-radius: 4px;
    background: #67c4a7;
    padding: 8px 19px;

    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }

  &__rating {
    font-size: 12px;
    color: #272727;
    font-weight: 500;
  }
}
</style>
