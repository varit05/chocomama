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
      product.quantity = 1;
      this.$store.dispatch("addToCart", product);
      // if (this.cart.length > 0) {
      //   let productExists = this.cart.find(productInCart => productInCart.name === product.name);
      //   if (productExists) {
      //     this.updateProduct(product, productExists);
      //   } else {
      //     this.callAddToCart(product);
      //   }
      // } else {
      //   this.callAddToCart(product);
      // }
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
