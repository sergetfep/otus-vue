/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/components/forms',
        '.eslintrc.cjs',
        'env.d.ts',
        'postcss.config.js',
        'tailwind.config.js',
        'src/App.vue',
        'src/main.ts',
        'src/components/base/BaseLoader.vue',
        'src/components/products/ProductsItem.vue',
        'src/pages/AddProductPage.vue',
        'src/router/index.ts',
        'src/types/products.ts',
      ],
    },
    exclude: ['**/node_modules/**', 'tests/e2e'],
  },
});
