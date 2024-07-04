<template>
  <div class="bg-[#EEEEEE]">
    <div class="bg-[#EEEEEE] text-center h-full mb-20 py-3">
      <div class="container mx-auto px-4 py-8">
        <HeaderView class="fixed top-0 left-0 w-full z-50 bg-white shadow-md" />
        <h1 class="text-3xl font-bold mb-4 text-left mt-10">
          Danh sách tin tức
        </h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <NewsCard
            v-for="newsItem in newsItems"
            :key="newsItem.id"
            :imageUrl="newsItem.imageUrl"
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
import NewsCard from "../component/card_news.vue";
import HeaderView from "../component/header_view.vue";
import FooterView from "../component/footer_view.vue";
const newsItems = [
  {
    id: 1,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 111111111111111111111111",
    description:
      "Mô tả ngắn gọn về tin tức aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbcccccccccccbb",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 2",
    description: "Mô tả ngắn gọn về tin tức 2...",
  },
  {
    id: 3,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 3",
    description: "Mô tả ngắn gọn về tin tức 3...",
  },
  {
    id: 4,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 4",
    description: "Mô tả ngắn gọn về tin tức 4...",
  },
  {
    id: 5,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 5",
    description: "Mô tả ngắn gọn về tin tức 5...",
  },
  {
    id: 6,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 6",
    description: "Mô tả ngắn gọn về tin tức 6...",
  },
  {
    id: 7,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 6",
    description: "Mô tả ngắn gọn về tin tức 6...",
  },
  {
    id: 8,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 6",
    description: "Mô tả ngắn gọn về tin tức 6...",
  },
  {
    id: 9,
    imageUrl:
      "https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg",
    altText: "Placeholder Image",
    title: "Tiêu đề tin tức 6",
    description: "Mô tả ngắn gọn về tin tức 6...",
  },
];
const generateRandomColor = () => {
  const colors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-purple-200",
    "bg-indigo-200",
    "bg-pink-200",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const generatedColors = newsItems.map(() => generateRandomColor());
</script>

<style scoped></style>
