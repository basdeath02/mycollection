<template>
  <div></div>
</template>

<script>
export default {
  name: "CollectionPage",
  mounted() {
    this.setLevelPage();
  },
  methods: {
    setLevelPage() {
      this.$store.commit("setLevelList", {
        level: 0,
        pathName: "Collection",
        path: "/collection",
      });
    },
  },
};
</script>

<style>
</style>