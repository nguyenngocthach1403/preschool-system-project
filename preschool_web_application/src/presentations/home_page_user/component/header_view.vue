<template>
  <div class="bg-white shadow-md flex justify-between items-center p-4">
    <div class="flex items-center">
      <img
        src="https://cdn.popsww.com/blog/sites/2/2022/01/thanh-guom-diet-quy-review.jpg"
        alt="Logo"
        class="h-8"
      />
      <span class="ml-4 text-lg font-bold">PreSchool</span>
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
          <a href="#">Chương trình</a>
        </li>

        <li>
          <router-link class="h-full" :to="{ name: 'RegistrationFormView' }"
            >Tuyển sinh</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'HomePageView' }">Tin tức</router-link>
          <router-link :to="{ name: 'RegistrationFormView' }">
            Tuyển sinh
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'NewsView' }"> Tin tức </router-link>
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

<script setup></script>

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
  background-color: #3b44d1;
}
</style>
