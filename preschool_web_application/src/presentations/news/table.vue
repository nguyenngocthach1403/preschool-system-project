<template>
  <div class="text-[14px]">
    <main>
      <div class="mr-[10px]">
        <table class="h-fit w-full">
          <thead
            class="sticky w-full top-0 text-[15px] bg-[#3B44D1] text-white text-white z-10"
          >
            <tr>
              <th class="w-[100px]">ID</th>
              <th class="w-[300px]">Hình ảnh</th>
              <th class="w-[400px]">Tiêu đề</th>
              <th class="w-[300px]">Nội dung</th>
              <th class="w-[300px]">Ngày tạo</th>
              <th class="w-[300px]">Trạng thái</th>
              <th class="w-[300px]">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-[60px] w-full text-left even:bg-gray-50 hover:bg-gray-200"
              v-for="news in dataTable"
              :key="news.id"
            >
              <td class="w-[100px]">
                {{ news.id }}
              </td>
              <td class="w-[300px]">
                <div class="ml-[15px]">
                  <img
                    :src="news.img"
                    class="w-[40px] h-[40px] rounded-[50px] object-cover"
                  />
                </div>
              </td>
              <td class="w-[400px]">
                {{ news.title }}
              </td>
              <!-- <td class="w-[400px]"> -->
              <td class="truncate max-w-[400px]">
                {{ news.description }}
              </td>
              <td class="w-[400px]">
                {{ new Date(news.created).toLocaleDateString() }}
              </td>
              <td class="w-[400px]">
                {{ news.status === 1 ? "Hiển thị" : "Khoá" }}
              </td>
              <td class="w-[200px]">
                <div class="flex">
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
                    @click="editNews(news.id)"
                  >
                    <img :src="edit_icon" class="w-[14px] m-auto" />
                  </div>
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                    @click="deleteNews(news)"
                  >
                    <img :src="delete_icon" class="w-[14px] m-auto" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import delete_icon from "@/assets/icons/delete.svg";
import edit_icon from "@/assets/icons/edit.svg";
import router from "@/router/router";
const emits = defineEmits(["add-toast"]);
defineProps({
  dataTable: {
    type: Array,
    required: true,
  },
});

const editNews = (id) => {
  router.push({ name: "EditNewsView", params: { id: id } });
};
function deleteNews(id) {
  emits("delete-news", id);
}
</script>

<style scoped>
th,
td {
  padding: 10px;
  border: 0px solid #ffffff;
  text-align: left;
}

th {
  white-space: nowrap;
}
.empty-account {
  background-color: rgba(59, 68, 209, 0.1);
}
</style>
