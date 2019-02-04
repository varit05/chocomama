<template>
  <section class="row">
    <transition name="fade"> <Loading v-if="performingRequest" /> </transition>
    <div class="col-10 offset-1">
      <h4>My Orders</h4>
      <div v-if="orders.length > 0" class="row p-2"></div>
      <div class="card" v-else>
        <h5 class="card-body">You haven't order anything yet!</h5>
        <p>
          <router-link to="/" class="btn btn-outline-success">
            Order Now
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import fb from "@/common/firebase.config";
let uid = fb.auth.currentUser.uid;
export default {
  name: "Orders",
  data() {
    return {
      orders: [],
      performingRequest: false
    };
  },
  mounted() {
    fb.db.ref(`orders/${uid}`).once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        this.orders.push({
          key: childSnapshot.key,
          ...childSnapshot.val()
        });
        console.log(this.orders);
      });
    });
  }
};
</script>
