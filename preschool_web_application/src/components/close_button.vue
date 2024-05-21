<template>
  <button
    class="text-[15px] h-[40px] content-center px-[12px] gap-2 bg-red-400 rounded-md flex text-white m-auto mt-[15px] hover:bg-red-500 active:scale-95"
  >
    <img :src="closeIcon" alt="" class="w-[20px] m-auto" />
    <div class="h-full content-center">Huỷ</div>
  </button>
</template>

<script setup>
import closeIcon from "@/assets/icons/close.svg";
</script>

<style lang="scss" scoped></style>
