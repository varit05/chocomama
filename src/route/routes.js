const routes = [
  {
    name: "dashboard",
    path: "/",
    component: () => import("@/components/Dashboard.vue"),
    isPublic: false,
    title: "Dashboard"
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/components/Login.vue"),
    isPublic: true,
    title: "Login"
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/components/Register.vue"),
    isPublic: true,
    title: "Register"
  },
  {
    path: "*",
    redirect: "/login"
  }
];
export default routes;
