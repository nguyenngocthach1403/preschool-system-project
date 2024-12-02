<template>
  <button
    :style="{
      height: props.height + 'px',
      width: !props.title ? `${props.width}px` : `fit-content`,
      borderRadius: `${radius}px`,
      backgroundColor: isMouseHover
        ? `${props.hoverColor}`
        : `${props.backgroundColor}`,
      color: `${props.color}`,
      border: props.border,
    }"
    @mouseenter="isMouseHover = true"
    @mouseleave="isMouseHover = false"
    class="w-fit text-[16px] flex justify-center gap-2 items-center bg-[#3B44D1] px-[10px] text-white py-2 shadow-card content-center hover:bg-blue-600">
    <img
      v-if="props.icon != ''"
      :src="props.icon"
      class="w-[20px]" />
    <div
      v-if="props.title"
      class="text-[14px]">
      {{ props.title }}
    </div>
  </button>
</template>

<script setup>
import { ref } from "vue";
import create_icon from "@/assets//icons//pls.svg";
const isMouseHover = ref(false);
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
  backgroundColor: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  border: {
    type: String,
    default: "",
  },
  hoverColor: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
button:active {
  transform: scale(0.95);
  box-shadow: 2px 5px 5px rgb(0, 0, 0, 0.3);
}
</style>
