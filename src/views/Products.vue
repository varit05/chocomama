<template>
  <div class="card p-0">
    <div class="card-header">
      <h4>{{ product.name }}</h4>
    </div>
    <div
      class="card-body"
      v-bind:style="{ 'background-image': 'url(' + product.img + ')' }"
    ></div>
    <div class="card-footer">
      <p>{{ product.price }}</p>
      <div>
        <button
          class="btn btn-outline-success"
          @click="$emit('add-to-cart', product);"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products",
  props: ["product"]
};
</script>
<style>
.card {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
}
.card-header h4 {
  margin-bottom: 0;
}
.card-body {
  height: 250px;
}
</style>
