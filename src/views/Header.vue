<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-inverse bg-inverse">
    <transition name="fade"> <Loading v-if="performingRequest" /> </transition>
    <router-link class="navbar-brand" to="/">Home</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
      <ul class="navbar-nav mt-2 mt-lg-0" v-if="!authUser">
        <li class="nav-item"><router-link to="login" class="nav-link"> Login</router-link></li>
        <li class="nav-item"><router-link to="register" class="nav-link">Register</router-link></li>
      </ul>

      <ul class="navbar-nav mt-2 mt-lg-0" v-if="!!authUser">
        <li class="nav-item"><router-link to="profile" class="nav-link" v-text="authUser.displayName"> </router-link></li>
        <li class="nav-item"><router-link to="wishlist" class="nav-link"> WishList </router-link></li>
        <li class="nav-item"><a class="nav-link" v-on:click="logout();"> Logout </a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import fb from "@/common/firebase.config";

export default {
  name: "HeaderView",
  data() {
    return {
      user: "",
      performingRequest: false
    };
  },
  methods: {
    logout() {
      this.performingRequest = true;
      fb.auth
        .signOut()
        .then(response => {
          this.performingRequest = false;
          this.$router.push({ path: "/login" });
          this.$toastr.info("Successfully logout!", "Come back soon!");
        })
        .catch(err => {
          this.$toastr.error(err.message, `Error!`);
        });
    }
  },
  computed: {
    authUser() {
      console.log("computed", fb.auth.currentUser);
      return fb.auth.currentUser;
    }
  }
};
</script>
