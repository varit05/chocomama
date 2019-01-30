<template>
  <section class="card p-0">
    <a @click="navigateToProductDetails(product);">
      <div class="card-header">
        <h4 class="nav-link">{{ product.name }}</h4>
      </div>
      <div class="card-body" v-bind:style="{ 'background-image': 'url(' + product.img + ')' }"></div>
    </a>
    <div class="card-footer">
      <p>Cost: {{ product.price | currency }}</p>
      <div>
        <button class="btn btn-outline-success" @click="$emit('add-to-cart', product);">Add To Cart</button>
        <button v-if="!isWishlist" class="ml-1 btn btn-outline-info" @click="$emit('add-to-wishlist', product);">
          WishList
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Products",
  props: ["product", "isWishlist"],
  methods: {
    navigateToProductDetails(product) {
      this.$router.push({ path: `/product/${product[".key"]}` });
    }
  }
};
</script>
<style scoped>
.card {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
}
.card-header h4 {
  margin-bottom: 0;
  color: #9bceb4;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
}
.card-header h4 a:hover {
  text-decoration: none;
}

.card-body {
  height: 250px;
}
</style>
