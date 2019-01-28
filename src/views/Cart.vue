<template>
  <div>
    <div class="row"><h4 class="col">Cart</h4></div>
    <div class="row text-center">
      <ul class="col list-group">
        <li class="list-group-item" v-for="item in items" :key="item.id">
          {{ item.name }} - {{ item.price }}
          <button
            class="btn badge badge-danger float-right ml-3"
            @click="$emit('remove-from-cart', item);"
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="card col p-3 my-3">{{ total }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: ["items"],
  methods: {},
  computed: {
    total() {
      return this.items.reduce((acc, item) => acc + Number(item.price), 0);
    }
  }
};
</script>
