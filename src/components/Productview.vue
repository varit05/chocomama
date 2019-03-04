<template>
  <section class="container">
    <transition name="fade"> <Loading v-if="performingRequest" /> </transition>
    <div
      class="row"
      v-for="product in products"
      :key="product.id"
    >
      <div class="col-12 col-sm-6">
        <img
          :src="product.img"
          alt="product image"
          width="100%"
          height="100%"
        />
      </div>
      <div class="col-12 col-sm-6 text-left">
        <h2 v-text="product.name"></h2>
        <h4 class="brand" v-text="product.brand"></h4>
        <p class="col-12 col-8" v-text="product.description"></p>
        <h2>{{ product.price | currency }}</h2>
        <button class="btn btn-outline-success" @click="addToCart(product);">
          Add to Cart
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import fb from "@/common/firebase.config";
export default {
  name: "Productview",
  data() {
    return {
      id: "",
      products: [],
      performingRequest: true
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.performingRequest = true;
    fb.db.ref(`products/${this.id}`).once("value", data => {
      this.performingRequest = false;
      let obj = {};
      data.forEach(childSnapshot => {
        obj[childSnapshot.key] = childSnapshot.val();
      });
      this.products.push(obj);
    });
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("cartModule/addToCart", product);
    }
  }
};
</script>
<style>
.brand {
  border-bottom: 1px solid #d9d9d9;
}
</style>
