// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import { router } from "./route";
import VueToastr2 from "vue-toastr-2";

import fb from "@/common/firebase.config";

import Loading from "@/views/Loading";

window.toastr = require("toastr");

const toastrOption = {
  positionClass: "toast-top-center"
};

Vue.use(VueToastr2, toastrOption);

Vue.config.productionTip = false;
//Global Filter Registration
Vue.filter("currency", value => `$ ${value}`);
//Global Component Registration
Vue.component("Loading", Loading);

let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      el: "#app",
      router,
      components: { App, Loading },
      template: "<App/>"
    });
  }
});
