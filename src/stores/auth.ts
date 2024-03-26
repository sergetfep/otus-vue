import { defineStore } from 'pinia';

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      username: '',
      isAuthenticated: false,
    };
  },
  actions: {
    setAuthenticated(value: boolean): void {
      this.isAuthenticated = value;
    },
    setUsername(value: string) {
      this.username = value;
    },
    initStore() {
      this.setAuthenticated(!!localStorage.getItem('authenticated'));
      this.setUsername(localStorage.getItem('username') || '');
    },
    login(username: string): void {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('username', username);
      this.setAuthenticated(true);
      this.setUsername(username);
    },
    logout(): void {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('username');
      this.setAuthenticated(false);
      this.setUsername('');
    },
  },
  getters: {
    getIsAuthenticated(state): boolean {
      return state.isAuthenticated;
    },
    getUsername(state): string {
      return state.username;
    },
  },
});

export default useAuthStore;
