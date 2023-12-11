<template>
  <div class="flex-row bg-white shadow px-2 py-4" id="mb-header">
    <div class="flex justify-between" id="mb-view">
      <HamburgerMenuIcon class="text-blue-500" id="hamburgerMenu" />
      <div class="flex" id="levelPath">
        <div
          v-for="(levelPath, index) in this.$store.state.levelPathList"
          :key="levelPath.pathName + index"
        >
          <div class="flex mr-2" v-if="levelPath.isCurrent">
            {{ levelPath.pathName }}
            <div
              v-if="this.$store.state.levelPathList.length - 1 != index"
              class="ml-2"
            >
              /
            </div>
          </div>
          <div class="flex mr-2" v-if="!levelPath.isCurrent">
            <a :href="levelPath.path" class="text-blue-700 underline">{{
              levelPath.pathName
            }}</a>
            <div
              v-if="this.$store.state.levelPathList.length - 1 != index"
              class="ml-2"
            >
              /
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <span class="text-base font-extrabold text-blue-500">Username</span>
      </div>
    </div>
  </div>
</template>

<script>
import HamburgerMenuIcon from "./HamburgerMenuIcon.vue";

export default {
  name: "TabHeader",
  components: { HamburgerMenuIcon },
};
</script>

<style>
#mb-view #hamburgerMenu {
  display: none;
}
#mb-header {
  display: block;
}
#levelPath {
  display: flex;
}
@media only screen and (max-width: 767px) {
  #mb-view #hamburgerMenu {
    display: block;
  }
  #levelPath {
    display: none;
  }
}
</style>