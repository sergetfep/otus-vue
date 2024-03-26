import { describe, expect, test, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { DOMWrapper, shallowMount } from '@vue/test-utils';
import TheHeader from './TheHeader.vue';

describe('TheHeader.vue', () => {
  test('Renders login button when user is not logged in.', () => {
    const component = shallowMount(TheHeader, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(component.find('.login-btn').exists()).toBe(true);
    expect(component.find('.header__profile').exists()).toBe(false);
  });

  test('Renders profile and logout button when user is logged in.', () => {
    const component = shallowMount(TheHeader, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: { isAuthenticated: true },
            },
          }),
        ],
      },
    });

    expect(component.find('.login-btn').exists()).toBe(false);
    expect(component.find('.header__profile').exists()).toBe(true);
  });

  test('Logging out when button is pressed.', async () => {
    const component = shallowMount(TheHeader, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: { isAuthenticated: true, username: 'test' },
            },
            stubActions: false,
          }),
        ],
      },
    });

    expect(component.find('.login-btn').exists()).toBe(false);
    expect(component.find('.header__profile').exists()).toBe(true);

    await component.find('button').trigger('click');
    expect(component.find('.login-btn').exists()).toBe(true);
    expect(component.find('.header__profile').exists()).toBe(false);
  });

  test('Updating search results on search form input.', async () => {
    const mockRouter = {
      push: vi.fn(),
    };

    const component = shallowMount(TheHeader, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

    const search = component.find('.header__search') as DOMWrapper<HTMLInputElement>;

    await search.setValue('test_value');

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    await delay(300);

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'products',
      query: { search: 'test_value' },
    });
  });
});
