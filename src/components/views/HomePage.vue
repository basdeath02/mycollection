<template>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-3">
      <CustomInputText
        id="first_name"
        name="First name"
        placeholder="First name"
        required
        v-model="this.userForm.firstName"
      />
      <CustomInputText
        id="last_name"
        name="Last name"
        placeholder="Last name"
        v-model="this.userForm.lastName"
      />
      <CustomInputText
        id="company"
        name="Company"
        placeholder="Flowbite"
        v-model="this.userForm.company"
      />
      <CustomInputText
        id="phone"
        name="Phone number"
        placeholder="123-45-678"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        v-model="this.userForm.phone"
      />
      <CustomInputText
        id="website"
        name="Website URL"
        placeholder="flowbite.com"
        v-model="this.userForm.website"
      />
      <CustomInputText
        type="number"
        id="visitors"
        name="Unique visitors (per month)"
        min="0"
        max="5"
        v-model="this.userForm.visitors"
      />
    </div>
    <div class="mb-6">
      <CustomInputText
        id="email"
        name="Email address"
        placeholder="john.doe@company.com"
        v-model="this.userForm.email"
      />
    </div>
    <div class="mb-6">
      <CustomInputText
        type="password"
        id="password"
        name="Password"
        placeholder="•••••••••"
        v-model="this.userForm.password"
      />
    </div>
    <div class="mb-6">
      <CustomInputText
        type="password"
        id="confirm_password"
        name="Confirm password"
        placeholder="•••••••••"
        v-model="this.userForm.confirmPassword"
      />
    </div>
    <div class="flex items-start mb-6">
      <div class="flex items-center h-5">
        <input
          id="remember"
          type="checkbox"
          value=""
          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          required
        />
      </div>
      <label
        for="remember"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >I agree with the
        <a href="#" class="text-blue-600 hover:underline dark:text-blue-500"
          >terms and conditions</a
        >.</label
      >
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import axiosService from "../../services/axiosService";
import CustomInputText from "../common/CustomInputText.vue";

export default {
  name: "HomePage",
  components: { CustomInputText },
  setup() {
    const userForm = ref({});
    return {
      userForm,
    };
  },
  async mounted() {
    let user = null;
    try {
      user = await axiosService({
        method: "get",
        url: "/",
      });
    } catch (error) {
      this.$store.commit("setLoading", { loading: false });
      this.$store.commit("setErrorModal", {
        status: true,
        message: error.message,
      });
    } finally {
      console.log("finally");
      this.userForm =
        user != null
          ? {
              firstName: user.data?.firstName,
              lastName: user.data?.lastName,
            }
          : {};
      this.$store.commit("setLoading", { loading: false });
      this.$store.commit("setSuccessModal", {
        status: true,
        isCallback: false,
        // callback: () => this.test(),
      });
    }
  },
  methods: {
    async test() {
      console.log("test function");
      // let isError = false;
      let user = await axiosService({
        method: "get",
        url: "/",
      })
        .catch((error) => {
          this.$store.commit("setLoading", { loading: false });
          this.$store.commit("setErrorModal", {
            status: true,
            message: error.message,
          });
        })
        // .catch(() => {
        //   this.$store.commit("setLoading", { loading: false });
        //   isError = true;
        // })
        .finally(() => {
          this.$store.commit("setLoading", { loading: false });
          // console.log(isError);
          // if (!isError) {
          this.$store.commit("setSuccessModal", {
            status: true,
            isCallback: false,
          });
          // }
        });
      console.log(user);
    },
  },
};
</script>