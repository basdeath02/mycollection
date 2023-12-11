<template>
  <div>TEST</div>
</template>

<script>
export default {
  name: "TestPage",
  mounted() {
    this.setLevelPage();
  },
  methods: {
    setLevelPage() {
      this.$store.commit("setLevelList", {
        level: 0,
        pathName: "TEST",
        path: "/test/child1",
      });
    },
  },
};
</script>