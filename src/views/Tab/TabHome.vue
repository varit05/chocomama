<template>
  <section class="row">
    <div class="col-12"><h3>User Info</h3></div>
  </section>
</template>
<script>
import firebase from "firebase";
export default {
  name: "TabHome",
  mounted() {
    console.log(firebase.auth().currentUser);
    this.userInfo = firebase.auth().currentUser;
  }
};
</script>
