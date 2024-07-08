<!-- DetailPage.vue -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <img :src="url" />
    <p>{{ des }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import newsService from "../../../services/news.service";
import router from "@/router/router";

const title = ref("");
const des = ref("");
const url = ref("");
onMounted(() => {
  if (router.currentRoute.value.params.id) {
    getNews();
  }
});

async function getNews() {
  const newsId = router.currentRoute.value.params.id;
  const response = await newsService.getNewsById(newsId);

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu",
      content: response.data.error,
      type: 3,
    });
    return;
  }

  const news = response.data.data[0];

  if (news) {
    title.value = news.title;
    des.value = news.description;
    url.value = news.img;
  }
}

onMounted(() => {
  fetchItemDetail(itemId.value);
});
</script>

<style scoped>
/* CSS cho trang chi tiết */
</style>
