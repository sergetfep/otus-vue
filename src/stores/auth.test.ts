import { describe, expect, test, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useAuthStore from './auth';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('Login', () => {
    const store = useAuthStore();
    store.login('test_user');

    expect(store.getUsername).toStrictEqual('test_user');
    expect(store.getIsAuthenticated).toStrictEqual(true);
  });

  test('Initializing', () => {
    const store = useAuthStore();
    store.initStore();

    expect(store.username).toStrictEqual('test_user');
    expect(store.isAuthenticated).toStrictEqual(true);
  });

  test('Logout', () => {
    const store = useAuthStore();
    store.initStore();

    store.logout();
    expect(store.username).toStrictEqual('');
    expect(store.isAuthenticated).toStrictEqual(false);
  });
});
