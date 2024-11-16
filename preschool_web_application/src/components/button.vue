<template>
  <button
    :style="{
      height: props.height + 'px',
      width: !props.title ? `${props.width}px` : `fit-content`,
      borderRadius: `${radius}px`,
    }"
    class="w-fit text-[16px] flex justify-center gap-2 items-center bg-[#3B44D1] px-[10px] text-white py-2 shadow-card content-center hover:bg-blue-600">
    <img
      :src="icon"
      class="w-[20px]" />
    <div
      v-if="props.title"
      class="text-[14px]">
      {{ props.title }}
    </div>
  </button>
</template>

<script setup>
import create_icon from "@/assets//icons//pls.svg";
const props = defineProps({
  title: {
    type: String,
    require: false,
  },
  height: {
    type: Number,
    default: 40,
  },
  width: {
    type: Number,
    default: 40,
  },
  icon: {
    type: String,
    require: true,
    default: create_icon,
  },
  radius: {
    type: Number,
    require: false,
    default: 5,
  },
});
</script>

<style scoped></style>
