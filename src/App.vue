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

export default {
  name: "App",
  components: {
    HeaderView,
    FooterView
  }
};
</script>

<style lang="scss">

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #eee;
}
.content {
  min-height: 84vh;
  padding: 10px;
}
</style>
