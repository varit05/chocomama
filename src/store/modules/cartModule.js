import fb from "@/common/firebase.config";

const state = {
  cart: [],
  total: ""
};
const getters = {
  cart: function(state) {
    return state.cart;
  },
  total: state => {
    return state.cart.reduce((acc, item) => acc + Number(item.price), 0);
  }
};

const mutations = {
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
};

const actions = {
  addToCart: ({ state, commit, dispatch }, payload) => {
    commit("setLoading", true, { root: true });
    if (state.cart.length > 0) {
      let productExists = state.cart.find(
        productInCart => productInCart.name === payload.name
      );
      if (productExists) {
        dispatch("updateProduct", productExists);
      } else {
        dispatch("callAddToCart", payload);
      }
    } else {
      dispatch("callAddToCart", payload);
    }
  },
  callAddToCart: ({ commit }, payload) => {
    const uid = fb.auth.currentUser.uid;
    const cartURL = `cart/${uid}/products`;
    delete payload[".key"];
    payload.quantity = 1;
    fb.db
      .ref(cartURL)
      .push(payload)
      .then(response => {
        commit("setLoading", false, { root: true });
        payload.cartKey = response.key;
        commit("setNotification", {
          type: 'success',
          title: `Product ${payload.name} is added in cart`,
          message: "Awesome!"
        }, { root: true });
        commit("ADD_TO_CART", payload);
      });
  },
  updateProduct: ({ commit }, payload) => {
    const uid = fb.auth.currentUser.uid;
    let productToUpdate = { 
      ...payload,
      quantity: payload.quantity + 1
    };
    const updateCartURL = `cart/${uid}/products/${payload.cartKey}`;
    fb.db
      .ref(updateCartURL)
      .update(productToUpdate)
      .then(response => {
        commit("UPDATE_CART", payload);
        commit("setNotification", {
          type: 'info',
          title: `Product ${payload.name} is updated in cart`,
          message: "Awesome!"
        }, { root: true });
      });
  },
  getCart: context => {
    const uid = fb.auth.currentUser.uid;
    const cartURL = `cart/${uid}/products`;
    let items = [];
    fb.db.ref(cartURL).once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        items.push({
          cartKey: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    });
    context.commit("LOAD_TO_CART", items);
  },
  removeFromCart: (context, payload) => {
    const uid = fb.auth.currentUser.uid;
    const removeCartURL = `cart/${uid}/products/${payload.cartKey}`;
    fb.db.ref(removeCartURL).remove().then(res => {
      context.commit("setNotification", {
        type: 'error',
        title: `Product ${payload.name} is removed from cart`,
        message: "Removed"
      }, { root: true });
      context.commit("REMOVE_FROM_CART", payload);
    })
    .catch(err => {
      console.log(err);
    });
  }
};

const cartModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default cartModule;
