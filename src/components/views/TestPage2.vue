<template>
  <div>TEST</div>
</template>

<script>
export default {
  name: "TestPage2",
  mounted() {
    this.setLevelPage();
  },
  methods: {
    setLevelPage() {
      this.$store.commit("setLevelList", {
        level: 0,
        pathName: "TEST2",
        path: "/test/child2",
      });
    },
  },
};
</script>