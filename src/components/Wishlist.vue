<template>
  <div class="row">
    <transition name="fade"> <Loading v-if="performingRequest" /> </transition>
    <div class="col-10 offset-1">
      <h4>Wishlist</h4>
      <div v-if="wishlist.length > 0" class="row p-2">
        <div
          class="col-md-4 col-sm-12"
          v-for="product in wishlist"
          :key="product.name"
        >
          <Products
            :product="product"
            :isWishlist="isWishlist"
          />
        </div>
      </div>
      <div class="card" v-else>
        <h5 class="card-body">There are no products in your wishlist</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Products from "@/views/Products";

export default {
  name: "Wishlist",
  components: { Products },
  props: ["wishlistProducts"],
  created() {
    this.$store.dispatch("wishlistModule/getWishlist");
  },
  methods: {
    removeFromWishlist(product) {
      this.$store.dispatch("wishlistModule/removeFromWishlist");
    }
  },
  computed: {
    ...mapGetters("wishlistModule", ["wishlist"]),
    isWishlist() {
      return this.$route.name === "wishlist";
    },
    performingRequest() {
      console.log(this.$store.getters.performingRequest);
      return this.$store.getters.performingRequest;
    }
  }
};
</script>
