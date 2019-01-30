<template>
  <section>
    <transition name="fade"> <Loading v-if="performingRequest" /> </transition>
    <div class="row" v-if="products" v-for="product in products" :key="product.id">
      <div class="col-xs-12 col-md-4"><img :src="product.img" alt="product image" width="100%" height="100%" /></div>
      <div class="col-xs-12 col-md-8 ">
        <h3>Name: {{ product.name }}</h3>
        <h4>Id: {{ this.id }}</h4>
        <h5>Price: {{ product.price | currency }}</h5>
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
  }
};
</script>
