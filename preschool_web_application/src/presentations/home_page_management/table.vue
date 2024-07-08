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
              <th class="w-[300px]">Ngày tạo</th>
              <th class="w-[300px]">Trạng thái</th>
              <th class="w-[300px]">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-[60px] w-full text-left even:bg-gray-50 hover:bg-gray-200"
              v-for="slide in dataTable"
              :key="slide.id"
            >
              <td class="w-[100px]">
                {{ slide.id }}
              </td>
              <td class="w-[300px]">
                <div class="ml-[15px]">
                  <img
                    :src="slide.url"
                    class="w-[100px] h-[50px] object-cover"
                  />
                </div>
              </td>
              <!-- <td class="w-[400px]"> -->
              <td class="w-[400px]">
                {{ formatDate(slide.created) }}
              </td>
              <td class="w-[400px]">
                {{ slide.status === 1 ? "Hiển thị" : "Khoá" }}
              </td>
              <td class="w-[200px]">
                <div class="flex">
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
                    @click="editSlide(slide.id)"
                  >
                    <img :src="edit_icon" class="w-[14px] m-auto" />
                  </div>
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                    @click="deleteSlide(slide)"
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
import delete_icon from "../../assets/icons/delete.svg";
import edit_icon from "../../assets/icons/edit.svg";
import router from "../../router/router";
const emits = defineEmits(["add-toast"]);
defineProps({
  dataTable: {
    type: Array,
    required: true,
  },
});

const editSlide = (id) => {
  router.push({ name: "EditSlideView", params: { id: id } });
};
function deleteSlide(id) {
  emits("delete-slide", id);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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
