<template>
  <div id="app">
    <div class="container-fluid text-dark text-center">
      <Header-View />
      <transition name="slide-fade" mode="out-in">
        <router-view class="content"></router-view>
      </transition>
      <Footer-View />
    </div>
  </div>
</template>

<script>
import HeaderView from "@/views/Header";
import FooterView from "@/views/Footer";
import Register from "@/components/Register";
import "./assets/css/app.scss";

export default {
  name: "App",
  components: {
    Register,
    HeaderView,
    FooterView
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
</style>
