<template>
  <button
    class="w-fit text-[16px] flex justify-center gap-2 items-center h-[40px] bg-[#3B44D1] rounded-[5px] px-[10px] text-white py-2 shadow-card content-center hover:bg-blue-600"
  >
    <img :src="create_icon" class="w-[20px]" />
    <div class="text-[14px]">{{ props.title }}</div>
  </button>
</template>

<script setup>
import create_icon from "@/assets//icons//pls.svg";
const props = defineProps({
  title: {
    type: String,
    require: false,
  },
});
</script>

<style scoped>
</style>