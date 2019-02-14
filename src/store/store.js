import Vue from "vue";
import Vuex from "vuex";

import fb from "@/common/firebase.config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: []
  },
  getters: {
    getCart: state => {
      return state.cart;
    }
  },
  mutations: {
    LOAD_TO_CART(state, items) {
      state.cart = items;
    },
    ADD_TO_CART(state, item) {
      state.cart.push(item);
    },
    REMOVE_FROM_CART(state, item) {
      state.cart = state.cart.filter(product => product.key !== item.key);
    },
    UPDATE_CART(state, item) {
      let indexToUpdate = state.cart.findIndex(
        product => product.name === item.name
      );
      state.cart[indexToUpdate].quantity += 1;
    }
  },
  actions: {
    addToCart: ({state, dispatch}, payload) => {
      if (state.cart.length > 0) {
        let productExists = state.cart.find(productInCart => productInCart.name === payload.name);
        if (productExists) {
          dispatch('updateProduct', productExists);
        } else {
          dispatch('callAddToCart', payload);
        }
      } else {
        dispatch('callAddToCart', payload);
      }
    },
    callAddToCart: ({commit}, payload) => {
      const uid = fb.auth.currentUser.uid;
      const cartURL = `cart/${uid}/products`;
      delete payload['.key'];
      payload.quantity = 1;
      fb.db
        .ref(cartURL)
        .push(payload)
        .then(response => {
          payload.key = response.key;
          commit("ADD_TO_CART", payload);
          // this.$toastr.success(`Product ${product.name} added to Cart`, "Awesome!");
        });
    },
    updateProduct: ({commit}, payload) => {
      const uid = fb.auth.currentUser.uid;
      let productToUpdate = {
        quantity: payload.quantity + 1
      };
      const updateCartURL = `cart/${uid}/products/${payload.key}`;
      fb.db
        .ref(updateCartURL)
        .update(productToUpdate)
        .then(response => {
          commit('UPDATE_CART', payload);
          // this.$toastr.info(
          //   `Product ${product.name} is updated in cart`,
          //   "Awesome!"
          // );
        });
    },
    getCart: context => {
      const uid = fb.auth.currentUser.uid;
      const cartURL = `cart/${uid}/products`;
      let items = [];
      fb.db.ref(cartURL).once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          items.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      });
      context.commit("LOAD_TO_CART", items);
    },
    removeFromCart: (context, payload)  => {
      const uid = fb.auth.currentUser.uid;
      console.log("payload", payload);
      const removeCartURL = `cart/${uid}/products/${payload.key}`;
      fb.db.ref(removeCartURL).remove();
      context.commit("REMOVE_FROM_CART", payload);
      // this.$toastr.error(
      //   `Product ${item.name} is removed from Cart`,
      //   "Removed!"
    }
  }
});
