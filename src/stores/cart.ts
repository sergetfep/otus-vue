import { defineStore } from 'pinia';

const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: {} as Record<number, number>,
    };
  },
  actions: {
    initCart(): void {
      this.cart = JSON.parse(localStorage.getItem('cart') || '');
    },
    saveCart(): void {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    addToCart(id: number) {
      const res = Object.prototype.hasOwnProperty.call(this.cart, id);

      if (res) {
        this.cart[id] += 1;
      } else {
        this.cart[id] = 1;
      }
      this.saveCart();
    },
    removeFromCart(id: number) {
      const res = Object.prototype.hasOwnProperty.call(this.cart, id);

      if (res) {
        if (this.cart[id] > 1) {
          this.cart[id] -= 1;
        } else {
          delete this.cart[id];
        }
      }
      this.saveCart();
    },
    clearCart() {
      this.cart = {};
      this.saveCart();
    },
  },
  getters: {
    getCart(state): Record<number, number> {
      return state.cart;
    },
    getCount(state): number {
      let count = 0;
      for (const id in state.cart) {
        count += state.cart[id];
      }
      return count;
    },
  },
});

export default useCartStore;
