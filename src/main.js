// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import fb from "@/common/firebase.config";
import store from "./store";
import { router } from "./route";

import Loading from "@/views/Loading";
import Snotify, { SnotifyPosition } from 'vue-snotify';
import 'vue-snotify/styles/material.css'; 

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}

Vue.use(Snotify, options);

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
      store,
      components: { App, Loading },
      template: "<App/>"
    });
  }
});
