import Vue from "vue";
import Vuex from "vuex";

import cartModule from "@/store/modules/cartModule";
import wishlistModule from "@/store/modules/wishlistModule";
import productModule from "@/store/modules/productModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cartModule,
    wishlistModule,
    productModule
  },
  state: {
    performingRequest: false,
    flash: false
  },
  mutations: {
    setLoading(state, payload) {
      state.performingRequest = payload;
    },
    setNotification(state, {type, message, title}) {
      state.flash = { 
        type,
        title, 
        message
      }
    },
    flashNotification (state) {
      state.flash = null
    }
  },
  getters: {
    performingRequest(state) {
      return state.performingRequest;
    },
    flash(state) {
      console.log(state);
      return state.flash;
    }
  }
});
