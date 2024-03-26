import { describe, expect, test } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import ProductsItemPage from './ProductsItemPage.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';

describe('ProductsItemPage.vue', () => {
  test('Output only loader on loading state.', async () => {
    const component = shallowMount(ProductsItemPage, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
        components: {
          BaseLoader,
        },
      },
      props: {
        id: '1',
      },
      data() {
        return {
          isLoading: true,
          error: null,
        };
      },
    });

    expect(component.find('base-loader-stub').exists()).toBe(true);
    expect(component.find('.item__body').exists()).toBe(false);
    expect(component.find('.item__error').exists()).toBe(false);
  });

  test('Output only product when no loading and no errors.', async () => {
    const component = shallowMount(ProductsItemPage, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
        components: {
          BaseLoader,
        },
      },
      props: {
        id: '1',
      },
      data() {
        return {
          isLoading: false,
          error: null,
          product: {
            id: 1,
            title: 'title',
            price: 2,
            description: 'descr',
            category: 'cat',
            image: 'image-link',
            rating: {
              rate: 12,
              count: 1,
            },
          },
        };
      },
    });

    expect(component.find('base-loader-stub').exists()).toBe(false);
    expect(component.find('.item__body').exists()).toBe(true);
    expect(component.find('.item__error').exists()).toBe(false);
  });

  test('Output only error when there is one and no loading.', async () => {
    const component = shallowMount(ProductsItemPage, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
        components: {
          BaseLoader,
        },
      },
      props: {
        id: '1',
      },
      data() {
        return {
          isLoading: false,
          error: 'error',
        };
      },
    });

    expect(component.find('base-loader-stub').exists()).toBe(false);
    expect(component.find('.item__body').exists()).toBe(false);
    expect(component.find('.item__error').exists()).toBe(true);
  });
});
