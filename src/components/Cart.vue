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

const uid = fb.auth.currentUser.uid;

const cartURL = `cart/${uid}`;
export default {
  name: "Cart",
  data() {
    return {
      items: [],
      name: "Chocomama Checkout",
      description: "Pay for your chocolates",
      currency: "$",
      image: "",
      total: "",
      performingRequest: false
    };
  },
  created() {
    this.getCart();
    this.total = this.items.reduce((acc, item) => acc + Number(item.price), 0);
  },
  methods: {
    checkout(total) {
      this.processPayment(total);
    },
    getCart() {
      this.performingRequest = true;
      fb.db
        .ref(`${cartURL}/products`)
        .once("value", snapshot => {
          snapshot.forEach(childSnapshot => {
            this.items.push({
              key: childSnapshot.key,
              ...childSnapshot.val()
            });
            this.performingRequest = false;
          });
        })
        .catch(err => {
          this.performingRequest = false;
        });
    },
    removeItem(item) {
      console.log("delete item", item);
      const removeCartURL = `cart/${uid}/products/${item.key}`;
      fb.db.ref(removeCartURL).remove();
      this.items = this.items.filter(product => product.name !== item.name);
      this.$toastr.error(
        `Product ${item.name} is removed from Cart`,
        "Removed!"
      );
    },
    copyCartRecord(oldRef, newRef) {
      return new Promise((resolve, reject) => {
        console.log("oldRef", oldRef, newRef);
        fb.db
          .ref(oldRef)
          .once("value")
          .then(snap => {
            return fb.db.ref(newRef).set(snap.val());
          })
          .then(() => {
            return fb.db.ref(oldRef).set(null);
          })
          .then(() => {
            console.log("Done!");
            resolve();
          })
          .catch(err => {
            console.log(err.message);
            reject();
          });
      });
    },
    processPayment(total) {
      let payment = {
        total,
        paid: true
      };
      fb.db
        .ref(cartURL)
        .child("/payment")
        .push(payment)
        .then(response => {
          this.$toastr.success(
            "Your Payment is processed and order is placed",
            "Congratulations!"
          );
          this.items = [];
          const isCopied = this.copyCartRecord(cartURL, `orders/${uid}`);
          console.log("isCopied", isCopied);
        });
    }
  },
  watch: {
    items() {
      this.total = this.items.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );
    }
  }
};
</script>
