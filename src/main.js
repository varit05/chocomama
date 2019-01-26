// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { router } from "./route";

import fb from "@/common/firebase.config";
import { getUserDetails } from "@/common/storage.service";

Vue.config.productionTip = false;
const currentUserDetails = JSON.parse(getUserDetails());

let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      el: "#app",
      router,
      data: {
        currentUserDetails
      },
      components: { App },
      template: "<App/>"
    });
  }
});
