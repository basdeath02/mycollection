<template>
  <div
    class="flex absolute w-full min-h-screen inset-0 justify-center items-center bg-slate-500 bg-opacity-30"
    :class="{ hidden: !this.$store.state.error?.status }"
  >
    <div class="w-96 max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-end" @click="this.closeModal()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div class="mt-4">
        <div class="flex-col modal-error-detail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-40 h-40 text-red-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-xl text-red-700 font-extrabold"
            >Error{{
              this.$store.state.error?.message
                ? ": " + this.$store.state.error?.message
                : ""
            }}</span
          >
        </div>
        <div class="flex justify-center mt-4">
          <button
            class="px-6 py-2 ml-2 text-white border border-blue-500 bg-blue-500 hover:bg-blue-400 rounded"
            @click="this.closeModal()"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalError",
  methods: {
    closeModal() {
      this.$store.commit("setErrorModal", { status: false, message: "" });
    },
  },
};
</script>

<style>
.modal-error-detail {
  text-align: -webkit-center;
}
</style>