<template>
  <div class="row">
    <transition name="fade"> <Loading v-if="performingRequest" /> </transition>
    <div class="col-10 offset-1">
      <h4>Wishlist</h4>
      <div v-if="wishlist.length > 0" class="row p-2">
        <div class="col-md-4 col-sm-12" v-for="product in wishlist" :key="product.name">
          <Products :product="product" :isWishlist="isWishlist" />
        </div>
      </div>
      <div class="card" v-else><h5 class="card-body">There are no products in your wishlist</h5></div>
    </div>
  </div>
</template>
<script>
import fb from "@/common/firebase.config";
import Products from "@/views/Products";
export default {
  name: "Wishlist",
  data() {
    return {
      wishlist: [],
      performingRequest: false
    };
  },
  components: { Products },
  props: ["wishlistProducts"],
  mounted() {
    const uid = fb.auth.currentUser.uid;
    const wishlistURL = `wishlist/${uid}`;
    fb.db.ref(wishlistURL).once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        this.wishlist.push({
          key: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
    });
  },
  computed: {
    isWishlist() {
      return this.$route.name === "wishlist";
    }
  }
};
</script>
