<template>
  <div class="w-full flex gap-4 border-b-[0.1rem] p-2 justify-between">
    <div class="flex items-center gap-4">
      <!--Image-->
      <img
        :src="
          drops.classItem.avatar ??
          'https://th.bing.com/th/id/OIP.QZIRZKUSWt1HBifjDRKGzAHaFj?rs=1&pid=ImgDetMain'
        "
        alt=""
        class="w-16 h-12 rounded-md"
      />
      <div class="text-start content-center mr-14">
        <p>{{ drops.classItem.name }}</p>
        <p class="text-gray-600 text-[13px]">
          {{ drops.classItem.levels }}, {{ drops.classItem.sysllabus }}
        </p>
      </div>
    </div>
    <div class="text-start flex gap-2 items-center">
      <span
        ><img
          :src="'https://th.bing.com/th/id/OIP.QZIRZKUSWt1HBifjDRKGzAHaFj?rs=1&pid=ImgDetMain'"
          class="w-8 h-8 rounded-full"
      /></span>
      <span>Giao vien</span>
    </div>
    <div class="text-start flex gap-2 items-center mr-[15px]">
      <span
        >{{ drops.classItem.member }}/{{ drops.classItem.limitedMember }}</span
      >
    </div>
    <div class="text-start flex gap-2 items-center">
      <button
        @click.prevent
        class="hover:bg-yellow-500/50 active:scale-95 rounded-[5px] h-[30px] w-fit px-2 content-center text-center border-yellow-300 text-[12px] border bg-yellow-200/25 text-yellow-600 cursor-default"
      >
        Sắp bắt đầu
      </button>
    </div>
  </div>
</template>

<script setup>
const drops = defineProps({
  classItem: {
    type: Object,
    require: true,
  },
});
</script>

<style scoped>
</style>