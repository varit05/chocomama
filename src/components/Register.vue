<template>
  <div class="col-12 col-md-8 offset-md-2">
    <transition name="fade">
      <div v-if="performingRequest" class="loading"><p>Loading...</p></div>
    </transition>
    <div class="card">
      <div class="card-header">
        <h1>{{ msg }}</h1>
      </div>
      <div class="card-body">
        <form @submit="onSubmit" @reset="onReset">
          <div class="row my-1">
            <div class="col-sm">
              <div class="form-group">
                <label for="Your Name" class="col-4" align="right"
                  >Your Name:</label
                >
                <input
                  class="col-4 form-control d-inline"
                  type="text"
                  v-model="signupForm.name"
                  required
                  placeholder="Enter name"
                />
              </div>
            </div>
          </div>
          <div class="row my-1">
            <div class="col-sm">
              <div class="form-group">
                <label for="Email address:" class="col-4" align="right"
                  >Email address:</label
                >
                <input
                  class="col-4 form-control d-inline"
                  type="email"
                  v-model="signupForm.email"
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
                  class="col-4 form-control d-inline"
                  type="password"
                  v-model="signupForm.password"
                  required
                  placeholder="Enter password"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button
                class="btn btn-outline-primary m-2"
                type="submit"
                variant="primary"
              >
                Submit
              </button>
              <button
                class="btn btn-outline-secondary"
                type="reset"
                variant="danger"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col">
            <p>
              Already Registered?
              <router-link to="/login">Login</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="errorMsg !== ''" class="error-msg">
        <p>{{ errorMsg }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import fb from "@/common/firebase.config";
import { saveUserDetails } from "@/common/storage.service";
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      msg: "Welcome to Registration!",
      signupForm: {
        email: "",
        name: "",
        password: ""
      },
      performingRequest: false,
      errorMsg: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.signup();
    },
    onReset(evt) {
      evt.preventDefault();
      this.signupForm.email = "";
      this.signupForm.name = "";
      this.signupForm.password = "";
    },
    signup() {
      this.performingRequest = true;
      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(userDetails => {
          let user = userDetails;
          firebase
            .auth()
            .currentUser.updateProfile({ displayName: this.signupForm.name })
            .then(updateUser => {
              console.log("Register User ", user);
              this.$root.currentUserDetails = user;
              saveUserDetails(JSON.stringify(user));
              this.performingRequest = false;
              this.$router.push("/");
            });
        })
        .catch(err => {
          // console.log(err);
          // this.onReset();
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
  }
};
</script>
