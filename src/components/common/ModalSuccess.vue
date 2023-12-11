<template>
  <div
    class="flex absolute w-full min-h-screen inset-0 justify-center items-center bg-slate-500 bg-opacity-30"
    :class="{ hidden: !this.$store.state.success?.status }"
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
        <div class="flex-col modal-success-detail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-40 h-40 text-green-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span class="text-xl text-green-700 font-extrabold">{{
            this.$store.state.success?.message
          }}</span>
        </div>
        <div class="flex justify-between mt-4">
          <button
            @click="this.closeModal()"
            class="px-6 py-2 text-text-white border border-blue-500 hover:bg-blue-400 hover:text-white rounded"
          >
            Cancel
          </button>
          <button
            class="px-6 py-2 ml-2 text-white border border-blue-500 bg-blue-500 hover:bg-blue-400 rounded"
            @click="this.onClickOk()"
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
  name: "ModalSuccess",
  methods: {
    closeModal() {
      this.$store.commit("setSuccessModal", { status: false });
    },
    onClickOk() {
      if (this.$store.state.success.isCallback) {
        this.$store.state.success?.callback();
      }
      this.$store.commit("setSuccessModal", { status: false });
    },
  },
};
</script>

<style>
.modal-success-detail {
  text-align: -webkit-center;
}
</style>