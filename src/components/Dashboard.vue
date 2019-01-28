<template>
  <div>
    <h1>Shopping Mall!</h1>
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <div class="row">
          <div
            class="col-md-4 mb-2"
            v-for="product of products"
            :key="product.id"
          >
            <Products
              :product="product"
              v-on:add-to-cart="addToCart(product);"
            ></Products>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <Cart :items="cart" v-on:remove-from-cart="removeItem($event);" />
      </div>
    </div>
  </div>
</template>

<script>
import fb from "@/common/firebase.config";
import Products from "@/views/Products";
import Cart from "@/views/Cart";

export default {
  name: "Dashboard",
  components: { Products, Cart },
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
      this.cart.push(product);
    },
    removeItem(item) {
      console.log(item);
      console.log(this.cart);
      this.cart = this.cart.filter(product => product.name !== item.name);
    }
  }
};
</script>
