<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="imageUrl" :alt="altText" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2 text-left">{{ title }}</h2>
      <p class="text-gray-600 text-sm mb-4 text-left clamp-text">
        {{ description }}
      </p>
      <a href="#" class="text-blue-500 hover:text-blue-700">Đọc thêm</a>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  imageUrl: String,
  altText: String,
  title: String,
  description: String,
});
</script>

<style>
.clamp-text {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Số dòng hiển thị tối đa */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 4.8em; /* Số dòng * chiều cao mỗi dòng */
}
</style>
