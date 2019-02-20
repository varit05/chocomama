<template>
  <div id="app">
    <div class="container-fluid text-dark text-center">
      <vue-snotify />
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
  },
  watch: {
    notification() {
      if(this.notification) {
        console.log('inside notification', this.notification);
        const { type, title, message: body } = this.notification;
        const toast = this.$snotify[type](body, title);
        toast.on('destroyed', (t) => { this.$store.commit('flashNotification') });
      }
    }
  },
  computed: {
    notification() {
      return this.$store.getters.flash
    } 
  },
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
