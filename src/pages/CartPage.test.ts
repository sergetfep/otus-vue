import { describe, expect, test } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import CartPage from './CartPage.vue';

describe('CartPage.vue', () => {
  test('Output only title when cart is empty.', async () => {
    const component = shallowMount(CartPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              cart: {
                cart: {},
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    expect(component.find('.cart__menu').exists()).toBe(false);
    expect(component.find('.cart__list').exists()).toBe(false);
  });

  test('Output products in cart when it is not empty.', async () => {
    const component = shallowMount(CartPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              cart: {
                cart: {
                  12: 1,
                },
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    expect(component.find('.cart__menu').exists()).toBe(true);
    expect(component.find('.cart__list').exists()).toBe(true);
  });

  test('Clears cart on button click.', async () => {
    const component = shallowMount(CartPage, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              cart: {
                cart: {
                  12: 1,
                },
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    await component.find('.cart__clear').trigger('click');

    expect(component.find('.cart__menu').exists()).toBe(false);
    expect(component.find('.cart__list').exists()).toBe(false);
  });
});
