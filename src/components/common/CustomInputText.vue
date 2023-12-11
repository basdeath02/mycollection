<template>
  <div>
    <label
      :for="this.id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ this.name }}</label
    >
    <input
      :type="this.type"
      :id="this.id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :placeholder="this.placeholder"
      :required="this.required"
      :pattern="this.pattern"
      :value="modelValue"
      :min="this.min"
      :max="this.max"
      @input="this.onChange($event)"
    />
  </div>
</template>

<script>
export default {
  name: "CustomInputText",
  props: {
    type: {
      type: String,
      required: false,
      default: "text",
    },
    id: String,
    name: String,
    placeholder: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    pattern: {
      type: String,
      required: false,
    },
    min: {
      type: String,
      required: false,
    },
    max: {
      type: String,
      required: false,
    },
    modelValue: String,
  },
  methods: {
    onChange(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>