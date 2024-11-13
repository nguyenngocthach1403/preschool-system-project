<template>
  <div class="bg-[#EEEEEE] w-screen">
    <div class="bg-[#EEEEEE] text-center h-full mb-20 py-3 w-full">
      <div class="container py-8">
        <HeaderView class="fixed top-0 left-0 w-full z-50 bg-white shadow-md" />

        <div class="w-screen mt-10">
          <Slideshow :images="slideItems" />
        </div>

        <div class="py-8 w-screen mt-4">
          <div class="container mx-auto">
            <h2 class="text-2xl font-bold text-center mb-4">
              TIN TỨC - SỰ KIỆN MỚI
            </h2>

            <div class="grid grid-cols-3 gap-4">
              <NewsCard
                v-for="newsItem in filteredNews"
                :key="newsItem.id"
                :id="newsItem.id"
                :imageUrl="newsItem.img"
                :altText="newsItem.altText"
                :title="newsItem.title"
                :description="newsItem.description"
                class="mb-4" />
            </div>
          </div>
        </div>

        <div
          class="bg-[#ec774b] shadow-md rounded-md p-5 w-screen h-[400px] flex items-center justify-between">
          <div class="w-[60%]">
            <ul class="list-disc mt-4 mr-4">
              <li class="text-white text-left text-[20px] list-none">
                Hân hoan chào đón Quý phụ huynh và xin được chúc mừng con em của
                Quý vị đã trở thành công dân của Trường Mầm Non nơi các em sẽ
                liên tục khám phá, trải nghiệm và phát triển hoàn hảo trên bước
                đường khai thức đầu đời.
              </li>
              <li class="text-white text-left text-[20px] list-none">
                Hệ thống Trường Mầm non hoạt động với sứ mệnh đem lại một môi
                trường học tập và phát triển an toàn, thân thiện, tôn trọng sự
                khác biệt của trẻ từ 2-5 tuổi, để các em trở thành những người
                ham học, biết cách học và biết cư xử phải phép.
              </li>
            </ul>
          </div>
          <div class="w-[40%]">
            <img
              src="https://mndongmai.edu.vn/uploads/mndongmai/news/2022_11/hdnk10.jpg"
              alt="Image description"
              class="top-0 left-0 h-[300px] w-full rounded-lg" />
          </div>
        </div>
        <div class="bg-gray-100 py-8 w-screen">
          <div class="container mx-auto">
            <h2 class="text-2xl font-bold text-center mb-4">
              Hình ảnh hoạt động vui chơi tại trường
            </h2>

            <div class="grid grid-cols-4 gap-4">
              <div
                v-for="image in images"
                :key="image.id"
                class="activity-item">
                <img
                  :src="image.url"
                  :alt="image.alt"
                  class="w-full h-[200px] rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterView />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import HeaderView from "../component/header_view.vue";
import FooterView from "../component/footer_view.vue";
import Slideshow from "../component/slide_show.vue";
import NewsCard from "../component/card_news.vue";

import newsService from "../../../services/news.service";
import slideService from "../../../services/slideshow.service";
const newsItems = ref([]);
const slideItems = ref([]);

onMounted(() => {
  getNews();
  getSlide();
});

async function getNews() {
  const response = await newsService.getNews();
  newsItems.value = response.data.data;
}

async function getSlide() {
  const result = await slideService.getSlide();
  console.log(result);
  slideItems.value = result.data.data;
  console.log(slideItems.value);
}

const filteredNews = computed(() => {
  const sortedNews = newsItems.value
    .filter((newsItem) => newsItem.status === 1) // Lọc tin tức có status là 1
    .sort((a, b) => new Date(b.created) - new Date(a.created)); // Sắp xếp từ mới nhất đến cũ nhất

  return sortedNews.slice(0, 3);
});

const images = [
  {
    id: 1,
    url: "https://s3.ap-southeast-1.amazonaws.com/kiddihub-production/images/truong-mam-non-195-thanh-pho-hung-yen11558673103.jpg",
    alt: "Image 1",
  },
  {
    id: 2,
    url: "https://lh3.googleusercontent.com/proxy/niXRIgYwIMNdWKIZS9gAPYRjIDIsKKI_IhGjGP-hhvqL8k8CsCN1sT3CUndEQHnqB__-l_fqRFaQj2tHQx8qMCcVIMi5T9s7Y8_ALlvMVVtEt-fpQvta0cwX5iaYrEBFMbwRgOmI0yvU2SzEgSC9eGW2tWpk",
    alt: "Image 2",
  },
  {
    id: 3,
    url: "https://storage-vnportal.vnpt.vn/ndh-ubnd/5039/CCB/b%C3%A1o.jpg",
    alt: "Image 3",
  },
  {
    id: 4,
    url: "https://baolamdong.vn/file/e7837c02845ffd04018473e6df282e92/dataimages/202202/original/images2436537_dsc_0128.jpg",
    alt: "Image 3",
  },
  {
    id: 5,
    url: "https://hochiminh.vn/Uploads/2021/11/6/26/mam-non-tan-son.jpg",
    alt: "Image 3",
  },
  {
    id: 6,
    url: "https://lh4.googleusercontent.com/proxy/2O6tYLOMMW6zE9EhJSO3UPSZx7rsi8Ffb4hIhoeTCEekM8Phbn84XzDh4Tv38BxmAzY0go9RcAj1UO5CDznyyZjSSJvirxFerwYbkrFY5unenhnK2QQs2lxNP6tomRDPY8cK218EkOYcGXTRrxCyHkEjnYkgh-DG",
    alt: "Image 3",
  },
  {
    id: 7,
    url: "https://lh6.googleusercontent.com/proxy/laWRszIyxTem_c8oSmXbm8up2aA3CKu0sIJ3pOnG5CwsII3mwNDWoK6EPhoQN8ycFmFEb5HYLU9lFrYyMTi2OgYUMrqBEwnatUHGGln9DcaH3LCgP8SWzloGvFmfs83HEVI_vZ3DGA",
    alt: "Image 3",
  },
  {
    id: 8,
    url: "https://cdn.baosoctrang.org.vn/uploads/image/2019/04/25/truong%20mam%20non%20khanh%20linh%20con%20dau%20tu%20khuon%20vien%20vuon%20co%20tich%20cho%20be.jpg",
    alt: "Image 3",
  },
];
</script>

<style scoped>
/* CSS scoped nếu cần */
</style>
