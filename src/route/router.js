import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import firebase from "firebase";

Vue.use(VueRouter);

function guardRoute(to, from, next) {
  const user = firebase.auth().currentUser;

  if (!user) {
    next({ path: "/login" });
  } else {
    next();
  }
}

const router = new VueRouter({
  mode: "history",
  routes: routes.map(route => ({
    name: route.name,
    path: route.path,
    component: route.component,
    beforeEnter: (to, from, next) => {
      document.title = route.title;

      if (!route.isPublic) return guardRoute(to, from, next);

      next();
    }
  }))
});

export default router;
