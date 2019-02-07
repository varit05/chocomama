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
    ADD_TO_CART(state, item) {
      console.log("inside ADD_TO_CART", state, item);
      state.cart.push(item);
      console.log("after inside ADD_TO_CART", state, item);
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
    }
  }
});
