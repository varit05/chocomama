<template>
  <transition name="fade">
    <div class="container">
      <div v-if="total">
        <div class="row"><h4 class="col">Cart</h4></div>
        <div class="row text-center">
          <div class="col-12 col-md-8">
            <ul class="card list-group">
              <li
                class="list-group-item border-none mt-2"
                v-for="item in items"
                :key="item.id"
              >
                {{ item.name }} - {{ item.price | currency }} -
                {{ item.quantity }}
                <button
                  class="btn badge badge-danger float-right ml-3"
                  @click="removeItem(item);"
                >
                  Remove
                </button>
              </li>
            </ul>
          </div>
          <div class="card col-12 col-md-4 p-2">
            <div class="p-2">Quantity: {{ this.items.length }}</div>
            <div class="p-2">Total: {{ total | currency }}</div>
            <button @click="checkout(total);" class="btn btn-outline-success">
              Pay {{ total | currency }}
            </button>
          </div>
        </div>
      </div>
      <div v-else>There are no products in Cart!</div>
    </div>
  </transition>
</template>

<script>
import fb from "@/common/firebase.config";
import { mapGetters } from "vuex";

const uid = fb.auth.currentUser.uid;

const cartURL = `cart/${uid}`;
export default {
  name: "Cart",
  data() {
    return {
      // items: [],
      name: "Chocomama Checkout",
      description: "Pay for your chocolates",
      currency: "$",
      image: "",
      // total: "",
      performingRequest: false
    };
  },
  created() {
    // this.getCart();
    // this.total = this.items.reduce((acc, item) => acc + Number(item.price), 0);
  },
  methods: {},
  computed: {
    // ...mapGetters([{ items: "getCart" }]),
    items() {
      return this.$store.state.cart;
    },
    total() {
      console.log("this.items", this.items);
      return this.items.reduce((acc, item) => acc + Number(item.price), 0);
    }
  },
  watch: {
    // items() {
    //   this.total = this.items.reduce(
    //     (acc, item) => acc + Number(item.price),
    //     0
    //   );
    // }
  }
};
</script>
