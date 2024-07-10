<template>
  <div class="bg-white shadow-md flex justify-between items-center p-4">
    <div>
      <router-link :to="{ name: 'Home' }">
        <div class="flex items-center">
          <!-- <img
            src="https://png.pngtree.com/png-vector/20230518/ourlarge/pngtree-green-plant-logo-vector-png-image_7101352.png"
            alt="Logo"
            class="h-8"
          /> -->
          <img :src="url" alt="" class="h-8" />
          <span class="ml-4 text-lg font-bold">{{ name }}</span>
        </div>
      </router-link>
    </div>
    <nav class="hidden sm:block">
      <ul class="flex items-center justify-center gap-4 mr-20">
        <li>
          <router-link :to="{ name: 'Home' }">Trang chủ</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'IntroduceView' }">
            Giới thiệu
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'RegistrationFormView' }">
            Tuyển sinh
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'NewsView' }"> Tin tức </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'LoginView' }"> Đăng nhập </router-link>
        </li>
      </ul>
    </nav>
    <button class="block sm:hidden p-2 text-gray-400">
      <svg
        class="fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M16 7c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4zm0-5c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zM7 8c-2.28 0-4 1.72-4 4s1.72 4 4 4 4-1.72 4-4-1.72-4-4-4zm0-5c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import settingService from "../../../services/setting_homepage.service";

const url = ref("");
const name = ref("");

async function getSetting() {
  const res = await settingService.getSetting();
  console.log(res.data.data);
  const data = res.data.data[0];
  if (data) {
    url.value = data.url_logo_page;
    name.value = data.name_school;
  }
}

onMounted(async () => {
  getSetting();
});
</script>

<style scoped>
@media (max-width: 768px) {
  .header .nav {
    display: none;
  }

  .header .nav-toggle {
    display: block;
  }
}

ul > li {
  padding: 10px 10px;
}
ul > li:hover {
  color: white;
  background-color: #33cc99;
}
</style>
