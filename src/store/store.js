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
      console.log("getCart", state.cart);
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
      state.cart = state.cart.filter(product => product.name !== item.name);
    }
  },
  actions: {
    addToCart: (context, payload) => {
      const uid = fb.auth.currentUser.uid;
      const cartURL = `cart/${uid}`;
      let productToAdd = {
        name: payload.name,
        price: payload.price,
        img: payload.img,
        id: payload[".key"],
        quantity: 1
      };
      fb.db
        .ref(cartURL)
        .push(productToAdd)
        .then(response => {
          payload.key = response.key;
          // this.cart.push(productToAdd);
          context.commit("ADD_TO_CART", payload);
          // this.$toastr.success(`Product ${product.name} added to Cart`, "Awesome!");
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
