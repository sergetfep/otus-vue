<script lang="ts">
import { defineComponent } from 'vue';

import { RouterLink } from 'vue-router';

export default defineComponent({
  components: { RouterLink },

  props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    },
    cart: {
      type: Array<{ name: number; count: number }>,
      required: true
    }
  },
  data() {
    return {
      searchText: '',
      timer: null as null | number
    };
  },
  computed: {
    cartCount(): number {
      let count = 0;
      for (const item of this.cart) {
        count += item.count;
      }
      return count;
    }
  },
  watch: {
    searchText(): void {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.updateSearchResults(this.searchText);
      }, 300);
    }
  },
  methods: {
    updateSearchResults(value: string): void {
      this.$router.push({ name: 'products', query: { search: value.toLowerCase() } });
    },
    logout(): void {
      this.$emit('logout');
    },
    clearCart() {
      this.$emit('clear-cart');
    }
  }
});
</script>

<template>
  <header class="header">
    <div class="container flex justify-between items-center py-4">
      <RouterLink :to="{ name: 'home' }" class="header__logo cursor-pointer">
        Vue Store
      </RouterLink>
      <div class="flex items-center gap-4">
        <form @submit.prevent>
          <input
            type="text"
            class="header__search"
            placeholder="search by name/price"
            v-model="searchText"
          />
        </form>
        <RouterLink :to="{ name: 'order' }" class="header__link">Order</RouterLink>
        <RouterLink :to="{ name: 'products.add' }" class="header__link">Add product</RouterLink>
        <button class="header__link" @click="clearCart">Cart ({{ cartCount }})</button>
        <RouterLink v-if="!isAuthenticated" :to="{ name: 'login' }" class="header__link">
          Login
        </RouterLink>
        <button v-else class="header__link" @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  &__logo {
    color: #67c4a7;
    font-size: 30px;
    font-weight: 500;
  }

  &__link {
    color: #494949;
    font-size: 18px;
    font-weight: 400;
    transition: all 0.3s;

    &:hover,
    &:focus {
      color: #67c4a7;
    }
  }

  &__search {
    border-radius: 6px;
    border: 1px solid rgba(109, 109, 109, 0.7);
    padding: 7px 15px 7px 15px;

    color: #7d7d7d;
    font-size: 12px;
    font-weight: 400;
    transition: all 0.3s;

    &:hover,
    &:focus {
      border-color: #67c4a7;
      outline: none;
    }
  }
}
</style>
