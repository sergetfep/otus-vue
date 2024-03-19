import { createRouter, createWebHistory } from 'vue-router';
import ProductsPage from '@/pages/ProductsPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'products' },
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage,
  },
  {
    path: '/products/:id',
    name: 'products.item',
    component: () => import('@/pages/ProductsItemPage.vue'),
    props: true,
  },
  {
    path: '/products/add',
    name: 'products.add',
    component: () => import('@/pages/AddProductPage.vue'),
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/pages/OrderPage.vue'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (!localStorage.getItem('authenticated') && to.name === 'products.add') {
    return { name: 'login' };
  }
});

export default router;
