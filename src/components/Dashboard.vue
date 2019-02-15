<template>
  <div class="text-center">
    <h3>Chocolate Mall!</h3>
    <div class="row">
      <div class="col">
        <div class="row">
          <div
            class="col-md-3 mb-2 p-1"
            v-for="product of products"
            :key="product.id"
          >
            <Products
              :product="product"
              v-on:add-to-wishlist="addToWishlist(product);"
            ></Products>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fb from "@/common/firebase.config";
import Products from "@/views/Products";

export default {
  name: "Dashboard",
  components: { Products },
  data() {
    return {
      products: []
    };
  },
  firebase: {
    products: fb.productsCollection
  },
  created() {
    this.$store.dispatch("cartModule/getCart");
    this.$store.dispatch("wishlistModule/getWishlist");
  }
};
</script>
