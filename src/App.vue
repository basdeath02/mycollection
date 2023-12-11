<template>
  <div class="relative flex min-h-screen">
    <div
      class="flex"
      :class="{
        'absolute h-leftBar': this.$store.state.leftBar.showLeftBar,
      }"
      id="leftBar-main"
    >
      <LeftBar />
    </div>
    <div class="flex-1">
      <HeaderBar />
      <div class="p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <LoadingCircle />
  <ModalSuccess />
  <ModalError />
</template>

<script>
import LeftBar from "./components/common/LeftBar.vue";
import HeaderBar from "./components/common/HeaderBar.vue";
import LoadingCircle from "./components/common/LoadingCircle.vue";
import ModalSuccess from "./components/common/ModalSuccess.vue";
import ModalError from "./components/common/ModalError.vue";

export default {
  name: "App",
  components: { LeftBar, HeaderBar, LoadingCircle, ModalSuccess, ModalError },
};
</script>

<style>
.h-leftBar {
    height: 100%;
}
@media only screen and (min-width: 768px) {
  #leftBar-main {
    position: relative !important;
  }
  .h-leftBar {
    height: 100vh;
}
}
</style>
