<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="imageUrl" :alt="altText" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2 text-left">{{ title }}</h2>
      <p class="clamp-text text-gray-600 text-sm mb-4 text-left">
        {{ description }}
      </p>
      <router-link
        :to="{ name: 'DetailNewsView' } + id"
        class="text-blue-500 hover:text-blue-700"
        >Đọc thêm</router-link
      >
      <!-- <a href="#" class="text-blue-500 hover:text-blue-700">Đọc thêm</a> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  id: String,
  imageUrl: String,
  altText: String,
  title: String,
  description: String,
});
</script>

<style scoped>
.clamp-text {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  /* max-height: 4.8em; */
}
</style>
