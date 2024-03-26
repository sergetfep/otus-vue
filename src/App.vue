<script lang="ts">
import { RouterView } from 'vue-router';

import TheHeader from '@/components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
    RouterView,
  },
};
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
  <!-- <footer></footer> -->
</template>
