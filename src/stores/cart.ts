import { defineStore } from 'pinia';

interface ICart {
  [index: number]: number;
  keys(): number[];
  hasOwnProperty(key: number): boolean;
}

const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: {} as ICart,
    };
  },
  actions: {
    addToCart(id: number) {
      const res = Object.prototype.hasOwnProperty.call(this.cart, id);

      if (res) {
        this.cart[id] += 1;
      } else {
        this.cart[id] = 1;
      }
    },
    removeFromCart(id: number) {
      const res = Object.prototype.hasOwnProperty.call(this.cart, id);

      if (res) {
        if (this.cart[id] > 0) {
          this.cart[id] -= 1;
        } else {
          delete this.cart[id];
        }
      }
    },
    clearCart() {
      this.cart = {} as ICart;
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getCount(state) {
      let count = 0;
      for (const id in state.cart) {
        count += state.cart[id];
      }
      return count;
    },
  },
});

export default useCartStore;
