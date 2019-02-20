import fb from "@/common/firebase.config";

const state = {
  wishlist: []
};
const getters = {
  wishlist: function(state) {
    return state.wishlist;
  }
};

const mutations = {
  LOAD_WISHLIST(state, items) {
    state.wishlist = items;
  },
  ADD_TO_WISHLIST(state, item) {
    state.wishlist.push(item);
  },
  REMOVE_FROM_WISHLIST(state, item) {
    state.wishlist = state.wishlist.filter(product => product.wishlistKey !== item.wishlistKey);
  }
};

const actions = {
  addToWishlist: ({ state, commit, dispatch }, payload) => {
    if (state.wishlist.length) {
      const isProductWishlisted = state.wishlist.find(
        product => product.name === payload.name
      );
      console.log("isProductWishlisted", isProductWishlisted);
      if (isProductWishlisted) {
        console.log("Product is already wishlisted!");
        commit("setNotification", {
          type: 'error',
          title: 'Error',
          message: `Product ${payload.name} is already wishlisted`,
        }, { root: true });
      } else {
        dispatch("callAddToWishlist", payload);
      }
    } else {
      dispatch("callAddToWishlist", payload);
    }
  },
  callAddToWishlist: ({ commit }, payload) => {
    const uid = fb.auth.currentUser.uid;
    const wishlistURL = `wishlist/${uid}`;
    delete payload[".key"];
    fb.db
      .ref(wishlistURL)
      .push(payload)
      .then(response => {
        payload.key = response.key;
        commit("setNotification", {
          type: 'success',
          message: `Product ${payload.name} is added in Wishlist`,
          title: "Great!"
        }, { root: true });
        commit("ADD_TO_WISHLIST", payload);
      })
      .catch(error => {
        commit("setNotification", {
          type: 'error',
          title: "Error!",
          message: `Error while wishlisting product`,
        }, { root: true });
        console.log(error);
      });
  },
  getWishlist: ({ commit }) => {
    commit("setLoading", true, { root: true });
    setTimeout(function() {
      const uid = fb.auth.currentUser.uid;
      const cartURL = `wishlist/${uid}`;
      let wishListitems = [];
      fb.db.ref(cartURL).once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          wishListitems.push({
            wishlistKey: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        commit("setLoading", false, { root: true });
        commit("LOAD_WISHLIST", wishListitems);
      });
    }, 9000);
  },
  removeFromWishlist: (context, payload) => {
    const uid = fb.auth.currentUser.uid;
    const removeWishlistURL = `wishlist/${uid}/${payload.wishlistKey}`;
    fb.db
      .ref(removeWishlistURL)
      .remove()
      .then(response => {
        context.commit("REMOVE_FROM_WISHLIST", payload);
        context.commit("setNotification", {
          type: 'error',
          title: "Removed!",
          message: `Product ${payload.name} is removed from Wishlist`
        }, { root: true });
      });
  }
};

const wislistModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default wislistModule;
