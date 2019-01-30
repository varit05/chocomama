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
    name: "wishlist",
    path: "/wishlist",
    component: () => import("@/components/Wishlist.vue"),
    isPublic: false,
    title: "Wishlist"
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import("@/components/Profile.vue"),
    isPublic: false,
    title: "Profile"
  },
  {
    name: "productView",
    title: "Product",
    path: "/product/:id",
    component: () => import("@/components/Productview.vue"),
    isPublic: false
  },
  {
    path: "*",
    redirect: "/login"
  }
];
export default routes;
