<template>
  <section class="row">
    <div class="col-10 offset-1">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab;"
      >
        {{ tab }}
      </button>

      <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>
  </section>
</template>
<script>
import TabHome from "@/views/Tab/TabHome";
import TabPassword from "@/views/Tab/TabPassword";

export default {
  name: "Profile",
  components: { TabHome, TabPassword },
  data() {
    return {
      currentTab: "Home",
      tabs: ["Home", "Password"],
      userInfo: ""
    };
  },
  computed: {
    currentTabComponent: function() {
      return `Tab${this.currentTab}`;
    }
  }
};
</script>
<style>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
}
</style>
