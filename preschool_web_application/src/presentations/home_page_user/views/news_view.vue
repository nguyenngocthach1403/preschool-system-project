<template>
  <div class="bg-[#EEEEEE] w-screen">
    <div class="bg-[#EEEEEE] text-center h-full mb-20 py-3">
      <div class="w-screen">
        <img
          src="https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-cartoon-wind-simple-starting-school-enrollment-image_13850.jpg"
          alt="Image description"
          class="h-full w-screen"
        />
      </div>
      <div class="container mx-auto px-4 py-8">
        <HeaderView class="fixed top-0 left-0 w-full z-50 bg-white shadow-md" />

        <h1 class="text-3xl font-bold mb-4 text-left mt-10">
          Danh sách tin tức
        </h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <NewsCard
            v-for="newsItem in filteredNews"
            :key="newsItem.id"
            :id="newsItem.id"
            :imageUrl="newsItem.img"
            :altText="newsItem.altText"
            :title="newsItem.title"
            :description="newsItem.description"
            class="mb-4"
          />
        </div>
      </div>
    </div>
    <FooterView />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import NewsCard from "../component/card_news.vue";
import HeaderView from "../component/header_view.vue";
import FooterView from "../component/footer_view.vue";
import newsService from "../../../services/news.service";
const newsItems = ref([]);

onMounted(() => {
  getNews();
});
async function getNews() {
  const respone = await newsService.getNews();
  console.log(respone);
  newsItems.value = respone.data.data;
}
const filteredNews = computed(() => {
  const sortedNews = newsItems.value
    .filter((newsItem) => newsItem.status === 1) // Lọc tin tức có status là 1
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  return sortedNews.slice(0, 9);
});
</script>

<style scoped></style>
