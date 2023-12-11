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
        level: 1,
        pathName: "TEST3",
        path: "/test/child3",
      });
    },
  },
};
</script>