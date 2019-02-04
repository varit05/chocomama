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
      cart: []
    };
  },
  firebase: {
    products: fb.productsCollection
  },
  methods: {
    addToCart(product) {
      if (this.cart.length > 0) {
        let productExists = this.cart.find(
          productInCart => productInCart.name === product.name
        );
        if (productExists) {
          this.updateProduct(product, productExists);
        } else {
          this.callAddToCart(product);
        }
      } else {
        this.callAddToCart(product);
      }
    },
    callAddToCart(product) {
      let productToAdd = {
        name: product.name,
        price: product.price,
        img: product.img,
        id: product[".key"],
        quantity: 1
      };
      fb.db
        .ref(cartURL)
        .push(productToAdd)
        .then(response => {
          productToAdd.key = response.key;
          this.cart.push(productToAdd);
          this.$toastr.success(
            `Product ${product.name} added to Cart`,
            "Awesome!"
          );
        });
    },
    updateProduct(product, prevProduct) {
      let productToUpdate = {
        quantity: prevProduct.quantity + 1
      };
      const updateCartURL = `cart/${uid}/products/${prevProduct.key}`;
      fb.db
        .ref(updateCartURL)
        .update(productToUpdate)
        .then(response => {
          let indexToUpdate = this.cart.findIndex(
            product => product.name === prevProduct.name
          );
          this.cart[indexToUpdate].quantity += 1;
          this.$toastr.info(
            `Product ${product.name} is updated in cart`,
            "Awesome!"
          );
        });
    },
    addToWishlist(product) {
      const wishlistURL = `wishlist/${uid}`;
      let productToWishlist = {
        name: product.name,
        price: product.price,
        img: product.img
      };
      if (uid) {
        fb.db.ref(wishlistURL).push(productToWishlist);
        this.$toastr.success("Product added to Wishlist", "Great!");
      }
    }
  }
};
</script>
