import Vue from "vue";
import Vuex from "vuex";

import cartModule from "@/store/modules/cartModule";
import wishlistModule from "@/store/modules/wishlistModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cartModule,
    wishlistModule
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
