<template>
  <transition name="fade">
    <div v-if="total">
      <div class="row"><h4 class="col">Cart</h4></div>
      <div class="row text-center">
        <ul class="col card list-group">
          <li class="list-group-item border-none" v-for="item in items" :key="item.id">
            {{ item.name }} - {{ item.price | currency }} - {{ item.quantity }}
            <button class="btn badge badge-danger float-right ml-3" @click="$emit('remove-from-cart', item);">
              Remove
            </button>
          </li>
        </ul>
      </div>
      <div class="row">
        <div class="card col p-2">
          <div class="p-2">Quantity: {{ this.items.length }}</div>
          <div class="p-2">Total: {{ total | currency }}</div>
          <button @click="checkout(total);" class="btn btn-outline-success">Pay {{ total }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import fb from "@/common/firebase.config";
export default {
  name: "Cart",
  data() {
    return {
      products: [],
      name: "Chocomama Checkout",
      description: "Pay for your chocolates",
      currency: "$",
      image: "",
      total: ""
    };
  },
  props: ["items"],
  created() {
    this.total = this.items.reduce((acc, item) => acc + Number(item.price), 0);
  },
  methods: {
    checkout(total) {
      console.log("Payment response", total);
      this.$emit("process-payment", total);
    }
  },
  watch: {
    items() {
      this.total = this.items.reduce((acc, item) => acc + Number(item.price), 0);
    }
  }
};
</script>
