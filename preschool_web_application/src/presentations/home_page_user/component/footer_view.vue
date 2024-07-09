<template>
  <footer class="bg-gray-800 text-white py-8 px-4 flex flex-col justify-center">
    <div class="flex flex-row justify-around">
      <div class="flex flex-col items-left ml-20 review-container">
        <h3 class="text-lg font-bold">Giới thiệu</h3>
        <p class="mt-2">{{ review }}</p>
      </div>
      <div class="flex flex-col items-start">
        <h3 class="text-lg font-bold text-center">Liên hệ</h3>
        <p class="text-base text-left mt-1">Địa chỉ: {{ address }}</p>
        <a href="#" class="text-base mt-1 hover:underline"
          >Email: {{ email }}</a
        >
        <a href="#" class="text-base mt-1 hover:underline"
          >Hotline: {{ hotline }}</a
        >
        <div>
          <div class="flex mt-2">
            <a :href="fb_link" target="_blank"
              ><img :src="facebook" class="w-[50px] h-[50px] m-auto"
            /></a>
            <a :href="youtube_link" target="_blank"
              ><img :src="youtube" class="w-[50px] h-[50px] m-auto ml-4"
            /></a>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start">
        <h3 class="text-lg font-bold">Liên kết</h3>
        <router-link
          :to="{ name: 'Home' }"
          class="text-base hover:underline mt-2"
          >Trang chủ</router-link
        >
        <router-link
          :to="{ name: 'IntroduceView' }"
          class="text-base mt-1 hover:underline"
          >Giới thiệu</router-link
        >
        <router-link
          :to="{ name: 'RegistrationFormView' }"
          class="text-base mt-1 hover:underline"
          >Tuyển sinh</router-link
        >
        <router-link
          :to="{ name: 'NewsView' }"
          class="text-base mt-1 hover:underline"
          >Tin tức</router-link
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import settingService from "../../../services/setting_homepage.service";
import facebook from "@/assets/icons/facebook.svg";
import youtube from "@/assets/icons/youtube.svg";
import website from "@/assets/icons/www.svg";
const review = ref("");
const hotline = ref("");
const email = ref("");
const address = ref("");
const fb_link = ref("");
const website_link = ref("");
const youtube_link = ref("");

onMounted(async () => {
  getSetting();
});

async function getSetting() {
  const res = await settingService.getSetting();
  console.log(res.data.data);
  const data = res.data.data[0];
  if (data) {
    review.value = data.review;
    address.value = data.address;
    email.value = data.email;
    hotline.value = data.hotline;
    fb_link.value = data.fb_link;
    youtube_link.value = data.ytb_link;
    website_link.value = data.website_link;
  }
}
</script>

<style scoped>
.review-container {
  max-width: 30%; /* Độ rộng tối đa là 50% của màn hình */
  margin-left: 20px; /* Khoảng cách bên trái */
}
</style>
