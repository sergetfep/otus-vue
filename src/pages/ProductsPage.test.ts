import { describe, expect, test } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import ProductsPage from './ProductsPage.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';

describe('ProductsPage.vue', () => {
  test('Output only loader on loading state.', async () => {
    const component = shallowMount(ProductsPage, {
      global: {
        plugins: [createTestingPinia()],
        mocks: {
          $route: {
            query: {
              search: '',
            },
          },
        },
        components: {
          BaseLoader,
        },
      },
      data() {
        return {
          isLoading: true,
          error: null,
        };
      },
    });

    expect(component.find('base-loader-stub').exists()).toBe(true);
    expect(component.find('.products__list').exists()).toBe(false);
    expect(component.find('.products__error').exists()).toBe(false);
  });

  test('Output only products when no loading and no errors.', async () => {
    const component = shallowMount(ProductsPage, {
      global: {
        plugins: [createTestingPinia()],
        mocks: {
          $route: {
            query: {
              search: '',
            },
          },
        },
        components: {
          BaseLoader,
        },
      },
      data() {
        return {
          isLoading: false,
          error: null,
        };
      },
    });

    expect(component.find('base-loader-stub').exists()).toBe(false);
    expect(component.find('.products__list').exists()).toBe(true);
    expect(component.find('.products__error').exists()).toBe(false);
  });

  test('Output only error when there is one and no loading.', async () => {
    const component = shallowMount(ProductsPage, {
      global: {
        plugins: [createTestingPinia()],
        mocks: {
          $route: {
            query: {
              search: '',
            },
          },
        },
        components: {
          BaseLoader,
        },
      },
      data() {
        return {
          isLoading: false,
          error: 'error',
        };
      },
    });

    expect(component.find('base-loader-stub').exists()).toBe(false);
    expect(component.find('.products__list').exists()).toBe(false);
    expect(component.find('.products__error').exists()).toBe(true);
  });
});
