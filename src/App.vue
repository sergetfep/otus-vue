<script lang="ts">
import { RouterView } from 'vue-router';

import TheHeader from '@/components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
    RouterView,
  },
  data() {
    return {
      isAuthenticated: false,
      cart: [] as { name: number; count: number }[],
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
  },
  mounted() {
    this.setAuthenticated(!!localStorage.getItem('authenticated'));
  },
};
</script>

<template>
  <TheHeader :isAuthenticated="isAuthenticated" @logout="logout" />
  <main>
    <RouterView @login="login" />
  </main>
  <!-- <footer></footer> -->
</template>
