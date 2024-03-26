<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

import useCartStore from '@/stores/cart';
import useAuthStore from '@/stores/auth';
import { mapState, mapActions } from 'pinia';

export default defineComponent({
  components: { RouterLink },
  data() {
    return {
      searchText: '',
      timer: null as unknown as NodeJS.Timeout,
    };
  },
  computed: {
    ...mapState(useCartStore, {
      getCount: 'getCount',
    }),
    ...mapState(useAuthStore, {
      isAuthenticated: 'getIsAuthenticated',
      username: 'getUsername',
    }),
  },
  watch: {
    searchText(): void {
      /* v8 ignore next 3 */
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.updateSearchResults(this.searchText);
      }, 300);
    },
  },
  methods: {
    updateSearchResults(value: string): void {
      this.$router.push({ name: 'products', query: { search: value.toLowerCase() } });
    },
    ...mapActions(useCartStore, {
      initCart: 'initCart',
    }),
    ...mapActions(useAuthStore, {
      logout: 'logout',
      initAuthStore: 'initStore',
    }),
  },
  mounted() {
    this.initAuthStore();
    this.initCart();
  },
});
</script>

<template>
  <header class="header">
    <div class="container flex justify-between items-center py-4">
      <RouterLink :to="{ name: 'home' }" class="header__logo cursor-pointer">Vue Store</RouterLink>
      <div class="flex items-center gap-4">
        <RouterLink :to="{ name: 'order' }" class="header__link">Order</RouterLink>
        <RouterLink :to="{ name: 'products.add' }" class="header__link">Add product</RouterLink>
        <form @submit.prevent>
          <input
            type="text"
            class="header__search"
            placeholder="search by name/price"
            v-model="searchText"
          />
        </form>
        <RouterLink :to="{ name: 'cart' }" class="header__link">Cart ({{ getCount }})</RouterLink>
        <RouterLink v-if="!isAuthenticated" :to="{ name: 'login' }" class="header__link login-btn">
          Login
        </RouterLink>
        <template v-else>
          <div class="header__profile">
            {{ username }}
            <img src="../../assets/images/profile.svg" alt="" />
          </div>
          <button class="header__link" @click="logout">Logout</button>
        </template>
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

  &__profile {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #494949;
    font-size: 18px;
    font-weight: 400;

    img {
      width: 20px;
      height: 20px;
      object-fit: contain;
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
