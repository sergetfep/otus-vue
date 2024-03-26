import { describe, expect, test } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BaseToast from './BaseToast.vue';

describe('BaseToast.vue', () => {
  test('Renders toast if isShown is true.', () => {
    const component = shallowMount(BaseToast, {
      props: {
        config: {
          title: 'title',
          text: 'text',
          isShown: true,
        },
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    expect(component.find('.toast').exists()).toBe(true);
  });

  test('Does not render toast if isShown is false.', () => {
    const component = shallowMount(BaseToast, {
      props: {
        config: {
          title: 'title',
          text: 'text',
          isShown: false,
        },
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    expect(component.find('.toast').exists()).toBe(false);
  });
});
