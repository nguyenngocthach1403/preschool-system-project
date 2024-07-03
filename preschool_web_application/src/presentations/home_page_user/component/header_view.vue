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
          <!-- <router-link to="/">Trang chủ</router-link> -->
          <a href="#">Trang chủ</a>
        </li>
        <li>
          <a href="#">Giới thiệu</a>
        </li>
        <li>
          <a href="#">Chương trình</a>
        </li>

        <li>
          <a href="#">Tuyển sinh</a>
        </li>
        <li>
          <a href="#">Tin tức</a>
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
</style>
