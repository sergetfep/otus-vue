<script lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue';

import { RouterView } from 'vue-router';

export default {
  components: {
    TheHeader,
    RouterView
  },
  data() {
    return {
      isAuthenticated: false,
      cart: [] as { name: number; count: number }[]
    };
  },
  methods: {
    setAuthenticated(value: boolean): void {
      this.isAuthenticated = value;
    },
    login(): void {
      localStorage.setItem('authenticated', 'true');
      this.setAuthenticated(true);
    },
    logout(): void {
      localStorage.removeItem('authenticated');
      this.setAuthenticated(false);
    },
    addToCart(value: number): void {
      const index = this.cart.findIndex((val) => {
        return value == val.name ? true : undefined;
      });

      if (index !== -1) {
        this.cart[index].count += 1;
      } else {
        this.cart.push({ name: value, count: 1 });
      }
    },
    removeFromCart(value: number): void {
      const index = this.cart.findIndex((val) => {
        return value == val.name ? true : undefined;
      });

      if (this.cart[index].count > 0) {
        this.cart[index].count -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    },
    clearCart(): void {
      this.cart = [];
    }
  },
  mounted() {
    this.setAuthenticated(!!localStorage.getItem('authenticated'));
  }
};
</script>

<template>
  <TheHeader
    :isAuthenticated="isAuthenticated"
    @logout="logout"
    :cart="cart"
    @clear-cart="clearCart"
  />
  <main>
    <RouterView @login="login" @add-to-cart="addToCart" />
  </main>
  <!-- <footer></footer> -->
</template>
