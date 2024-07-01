<template>
  <div class="text-[14px]">
    <div class="flex justify-end items-center">
      <button
        @click.prevent="showCreateForm = true"
        class="w-fit text-[16px] flex justify-center h-[40px] bg-[#3B44D1] rounded-[5px] px-[10px] text-white py-2 shadow-card content-center hover:bg-blue-600"
      >
        <img :src="create_icon" class="w-[25px]" />
      </button>
      <showCreateSyllabusView
        v-if="showCreateForm"
        class="absolute top-0 left-0"
        @close="showCreateForm = false"
        @add-toast="$emit('add-toast', $event)"
      />
    </div>
    <main>
      <div class="mr-[10px] mt-[50px]">
        <table class="h-fit w-full mx-auto rounded-lg overflow-hidden">
          <thead
            class="sticky w-full top-0 text-[15px] bg-[#3B44D1] text-white z-10 rounded-lg"
          >
            <tr>
              <th class="w-[100px]">ID</th>
              <th class="px-3 py-3 text-left w-[300px]">
                <div class="flex">Tên Chương trình</div>
              </th>
              <th class="px-3 py-3 w-[300px] text-left">Mô tả</th>
              <th class="w-[200px]">Thời gian tạo</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in syllabusData"
              :key="item.id"
              class="h-[60px] w-full text-left even:bg-gray-50 hover:bg-gray-200"
            >
              <td class="px-3 py-3 text-center">{{ item.id }}</td>
              <td class="px-3 py-3">{{ item.name }}</td>
              <!-- <td class="px-3 py-3">{{ item.description }}</td> -->
              <td class="px-3 py-3" v-if="item.description">
                {{ item.description }}
              </td>
              <td
                class="px-3 py-3 text-gray-500 text-sm font-italic ml-8"
                v-else
              >
                Trống
              </td>
              <td class="px-3 py-3 text-center">
                {{ formatDate(item.created) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import syllabusService from "../../../services/syllabus.service";
import create_icon from "@/assets//icons//pls.svg";
import showCreateSyllabusView from "../../syllabus_create_page/views/syllabus_create_view.vue";
const showCreateForm = ref(false);
onMounted(async () => {
  getSyllabus();
});
const syllabusData = ref([]);
async function getSyllabus() {
  const respone = await syllabusService.getSyllabus();
  console.log(respone.data.data);
  syllabusData.value = respone.data.data;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
</script>
