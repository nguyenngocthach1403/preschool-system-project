<template lang="">
  <div>
    <label class="relative flex items-center rounded-full cursor-pointer">
      <input
        type="checkbox"
        :style="{
          height: `${props.height}px`,
          width: `${props.width}px`,
          border: `1px solid ${borderColor}`,
          borderRadius: `${props.radius}px`,
        }"
        v-model="value"
        class="before:content[''] hover:ring-2 peer relative cursor-pointer appearance-none rounded-[5px] border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#3B44D1] checked:border-none hover:before:opacity-10"
        id="check"
        :disabled="props.disabled" />
      <span
        class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1">
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"></path>
        </svg>
      </span>
    </label>
  </div>
</template>
<script setup>
const value = defineModel("value");

let props = defineProps({
  width: {
    type: Number,
    default: 17,
  },
  height: {
    type: Number,
    default: 17,
  },
  borderColor: {
    type: String,
    default: "black",
  },
  radius: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
