<template>
  <div class="bg-white w-screen">
    <HeaderView class="fixed top-0 left-0 w-full z-50 bg-white shadow-md" />

    <div class="container mx-auto py-12 mt-14">
      <h2 class="text-2xl font-bold text-center mb-4">
        Chi tiết tin tức {{ title }}
      </h2>

      <img :src="url" class="w-full h-96 rounded-lg mb-8 mt-5" />

      <div>
        <p class="text-gray-600 text-lg leading-relaxed text-left">
          {{ des }}
        </p>
      </div>
    </div>

    <FooterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import newsService from "../../../services/news.service";
import HeaderView from "../component/header_view.vue";
import FooterView from "../component/footer_view.vue";

const route = useRoute();
const title = ref("");
const des = ref("");
const url = ref("");

onMounted(() => {
  if (route.params.id) {
    getNews();
  }
});

async function getNews() {
  try {
    const newsId = route.params.id;
    const response = await newsService.getNewsById(newsId);

    if (response.status === 200) {
      const news = response.data.data[0];
      if (news) {
        title.value = news.title;
        des.value = news.description;
        url.value = news.img;
      }
    } else {
      console.error("Failed to load news:", response.data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
</script>

<style scoped>
/* CSS cho trang chi tiết */
</style>
