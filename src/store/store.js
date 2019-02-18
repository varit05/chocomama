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
    performingRequest: false
  },
  mutations: {
    setLoading(state, payload) {
      state.performingRequest = payload;
    }
  },
  getters: {
    performingRequest(state) {
      return state.performingRequest;
    }
  }
});
