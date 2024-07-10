Slideshow.vue
<template>
  <div class="slideshow-container">
    <div
      v-for="(image, index) in filteredImages"
      :key="`slide-${index}`"
      :class="{ hidden: currentIndex !== index, block: currentIndex === index }"
    >
      <img :src="image.url" class="w-screen max-h-500" />
    </div>
    <!-- <div class="flex justify-center mt-4">
      <div v-for="(image, index) in filteredImages" :key="`button-${index}`">
        <button
          @click="changeSlide(index)"
          :class="{
            'bg-blue-500': currentIndex === index,
            'bg-gray-300': currentIndex !== index,
          }"
          class="w-4 h-4 mx-1 rounded-full"
        ></button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineProps } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const defaultImage = {
  // url: "url_of_default_image.jpg",
  url: "https://i.pinimg.com/originals/d3/fc/64/d3fc641235720b031acf0d7649a5a265.png",
  status: 1,
};

const currentIndex = ref(0);
const maxImages = 6;
let intervalId = null;

const filteredImages = computed(() => {
  let filtered = props.images
    .filter((image) => image.status === 1)
    .slice(0, maxImages);
  if (filtered.length === 0) {
    filtered.push(defaultImage);
  }
  return filtered;
});

// const changeSlide = (index) => {
//   currentIndex.value = index;
// };

const startSlideShow = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % filteredImages.value.length;
  }, 3000);
};

onMounted(() => {
  startSlideShow();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.slideshow-container {
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
}

.slideshow-container img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}
</style>
