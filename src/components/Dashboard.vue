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
              v-on:add-to-cart="addToCart(product);"
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

const uid = fb.auth.currentUser.uid;

export default {
  name: "Dashboard",
  components: { Products },
  data() {
    return {
      products: [],
    };
  },
  firebase: {
    products: fb.productsCollection
  },
  created() {
    this.$store.dispatch("getCart");
  },
  methods: {
    addToCart(product) {
      product.quantity = 1;
      this.$store.dispatch("addToCart", product);
    },
    addToWishlist(product) {
      const wishlistURL = `wishlist/${uid}`;
      let productToWishlist = {
        name: product.name,
        price: product.price,
        img: product.img,
        ".key": product[".key"]
      };
      if (uid) {
        fb.db.ref(wishlistURL).push(productToWishlist);
        this.$toastr.success("Product added to Wishlist", "Great!");
      }
    }
  }
};
</script>
