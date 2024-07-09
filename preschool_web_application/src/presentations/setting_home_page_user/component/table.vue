<template>
  <div class="text-[14px]">
    <main>
      <div class="mr-[10px]">
        <table class="h-fit w-full">
          <thead
            class="sticky w-full top-0 text-[15px] bg-[#3B44D1] text-white text-white z-10"
          >
            <tr>
              <th class="w-[200px]">Thông tin</th>
              <th class="w-[400px]">Nội dung</th>
            </tr>
          </thead>
          <tbody
            class="h-[60px] w-full text-left even:bg-gray-50 hover:bg-gray-200"
            v-for="setting in dataTable"
            :key="setting.id"
          >
            <tr>
              <td>Logo Trường</td>
              <td class="w-[300px]">
                <img
                  :src="setting.url_logo_page"
                  class="w-[50px] h-[50px] rounded-[100px] object-cover"
                />
              </td>
            </tr>
            <tr>
              <td>Tên trường</td>
              <td class="w-[200px]">
                {{ setting.name_school }}
              </td>
            </tr>
            <tr>
              <td>Nội dung giới thiệu trường</td>
              <td class="w-[200px]">
                {{ setting.review }}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td class="w-[200px]">
                {{ setting.email }}
              </td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td class="w-[200px]">
                {{ setting.address }}
              </td>
            </tr>
            <tr>
              <td>Hotline</td>
              <td class="w-[200px]">
                {{ setting.hotline }}
              </td>
            </tr>
            <tr>
              <td>Đường dẫn Facebook</td>
              <td class="w-[200px]">
                {{ setting.fb_link }}
              </td>
            </tr>
            <tr>
              <td>Đường dẫn Youtube</td>
              <td class="w-[200px]">
                {{ setting.ytb_link }}
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
const emits = defineEmits(["add-toast"]);
defineProps({
  dataTable: {
    type: Array,
    required: true,
  },
});
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

tbody tr {
  border-bottom: 1px solid #ccc; /* Đường kẻ giữa các hàng */
}
.empty-account {
  background-color: rgba(59, 68, 209, 0.1);
}
</style>
