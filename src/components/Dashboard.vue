<template>
  <div class="text-center">
    <h3>Chocolate Mall!</h3>
    <div class="row">
      <div class="col-md-2 d-sm-none d-xs-none d-md-block">
        <!-- <ProductFilters /> -->
      </div>
      <div class="col-md-10">
        <div class="row">
          <div
            class="col-xs-12 col-sm-6 col-md-3 mb-2 p-1"
            v-for="product of products"
            :key="product.id"
          >
            <Products :product="product"></Products>
          </div>
        </div>
      </div>
    </div>
    <vue-snotify />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Products from "@/views/Products";
// import ProductFilters from "@/views/ProductFilters";

export default {
  name: "Dashboard",
  components: { Products },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("productModule/getProduct");
    this.$store.dispatch("cartModule/getCart");
    this.$store.dispatch("wishlistModule/getWishlist");
  },
  computed: {
    ...mapGetters("productModule", ["products"]), 
  },
};
</script>
