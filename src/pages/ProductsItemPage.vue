<script lang="ts">
import { defineComponent } from 'vue';

import type { Product } from '@/types/products';

import useCartStore from '@/stores/cart';
import { mapActions } from 'pinia';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      error: null as null | string,
      product: {} as Product,
    };
  },
  methods: {
    async loadProduct(): Promise<void> {
      this.error = null;
      this.isLoading = true;

      try {
        const result = await fetch('https://fakestoreapi.com/products/' + this.id);
        this.product = (await result.json()) as Product;
      } catch (error) {
        this.error = 'Загрузка не удалась.';
      }

      this.isLoading = false;
    },
    ...mapActions(useCartStore, {
      addToCart: 'addToCart',
    }),
  },
  async mounted(): Promise<void> {
    await this.loadProduct();
  },
});
</script>

<template>
  <section class="item mt-12">
    <div class="container">
      <BaseLoader v-if="isLoading" />
      <div v-else-if="!isLoading && !error" class="item__body">
        <div class="item__image">
          <img :src="product.image" alt="" />
        </div>
        <div class="item__info">
          <h1 class="item__title">{{ product.title }}</h1>
          <p class="item__category">{{ product.category }}</p>
          <p class="item__rating">
            {{ 'Rate: ' + product.rating.rate + ' / Count: ' + product.rating.count }}
          </p>
          <p class="item__descr">{{ product.description }}</p>
          <p class="item__price mt-auto">${{ product.price }}</p>
          <button class="btn item__btn" @click="addToCart(product.id)">Add to cart</button>
        </div>
      </div>
      <p v-else>{{ error }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.item {
  &__body {
    padding: 8px;
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.1);
  }

  &__image {
    @apply flex flex-col justify-center items-center;

    img {
      @apply h-full w-full object-contain;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    color: #272727;
    font-size: 30px;
    font-weight: 500;
  }

  &__category {
    color: #494949;
    font-size: 20px;
    font-weight: 300;
  }

  &__price {
    color: #272727;
    font-size: 24px;
    font-weight: 500;
  }

  &__descr {
    color: #7d7d7d;
    font-size: 16px;
    font-weight: 300;
  }

  &__btn {
    font-size: 18px;
    font-weight: 400;
  }

  &__rating {
    font-size: 16px;
    color: #272727;
    font-weight: 500;
  }
}
</style>
