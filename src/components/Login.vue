<template>
  <div>
    <transition name="fade">
      <div v-if="performingRequest" class="loading"><p>Loading...</p></div>
    </transition>
    <div class="col-12 col-md-8 offset-md-2">
      <div class="card">
        <div class="card-header">
          <h1>{{ msg }}</h1>
        </div>
        <div class="card-body">
          <form @submit="onSubmit" @reset="onReset">
            <div class="row my-1">
              <div class="col-sm">
                <div class="form-group">
                  <label for="Email address:" class="col-4" align="right"
                    >Email address:</label
                  >
                  <input
                    class="form-control col-4 d-inline"
                    type="email"
                    v-model="loginForm.email"
                    required
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>
            <div class="row my-1">
              <div class="col-sm">
                <div class="form-group">
                  <label for="Password" class="col-4" align="right"
                    >Password:</label
                  >
                  <input
                    class="form-control col-4 d-inline"
                    type="password"
                    v-model="loginForm.password"
                    required
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="loginForm.isRememberMeChecked"
              />
              <label class="form-check-label" for="inlineCheckbox2"
                >Remember me</label
              >
            </div>
            <div class="row">
              <div class="col">
                <button
                  class="btn btn-outline-primary m-2"
                  type="submit"
                  variant="primary"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div class="row">
            <div class="col">
              <p>
                Not Registered?
                <router-link to="/register">Register</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveUserDetails } from "@/common/storage.service";
import fb from "@/common/firebase.config";

export default {
  name: "Login",
  data() {
    return {
      msg: "Welcome to Login!",
      loginForm: {
        email: "",
        name: "",
        isRememberMeChecked: false
      },
      performingRequest: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.getLogin();
    },
    onReset(evt) {
      evt.preventDefault();
      this.loginForm.email = "";
      this.loginForm.password = "";
      this.loginForm.isRememberMeChecked = false;
    },
    getLogin() {
      this.performingRequest = true;
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$root.currentUserDetails = user;
          console.log("login page", user);
          saveUserDetails(JSON.stringify(user)); // When Page is relaoded
          this.performingRequest = false;
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
        });
    }
  }
};
</script>
