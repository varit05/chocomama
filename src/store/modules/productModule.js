import fb from "@/common/firebase.config";

const state = {
  products: []
};
const getters = {
  products: function(state) {
    return state.products;
  }
};

const mutations = {
  LOAD_PRODUCT(state, items) {
    state.products = items;
  }
};

const actions = {
  getProduct: ({ commit }) => {
    const prodURL = `products`;
    let products = [];
    fb.db.ref(prodURL).once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        products.push({
          key: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    });
    console.log(products);
    commit("LOAD_PRODUCT", products);
  }
};

const productModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default productModule;
