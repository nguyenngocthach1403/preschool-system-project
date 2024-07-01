<template>
  <div class="text-[14px]">
    <!-- <SearchForm
      @passSearchText="getSearchText"
      class="w-[400px] ml-[20px]"
    ></SearchForm> -->
    <main>
      <div class="mr-[10px] mt-[50px]">
        <table class="h-fit w-full mx-auto rounded-lg overflow-hidden">
          <thead
            class="sticky w-full top-0 text-[15px] bg-[#6EC2F7] text-white z-10 rounded-lg"
          >
            <tr>
              <th class="px-3 py-3 text-left w-[250px]">
                <div class="flex">Tên lớp học</div>
              </th>
              <th class="w-[300px]">Chức vụ</th>
              <th class="w-[400px]">Thời gian bắt đầu</th>
              <th class="w-[400px]">Thời gian kết thúc</th>
              <th class="w-[300px]">Cấp độ</th>
              <th class="w-[300px]">Chương trình</th>
              <th class="w-[300px]">Niên khoá</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in ClassData" :key="item.id">
              <td class="px-3 py-3">{{ item.name }}</td>
              <td class="px-3 py-3">{{ item.RoleName }}</td>
              <td class="px-3 py-3">{{ formatDate(item.start_date) }}</td>
              <td class="px-3 py-3">{{ formatDate(item.end_date) }}</td>
              <td class="px-3 py-3">{{ item.levelsName }}</td>
              <td class="px-3 py-3">{{ item.syllabusName }}</td>
              <td class="px-3 py-3">{{ item.session }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
// import SearchForm from "../../../components/search_form_comp.vue";
import { ref, computed, onMounted } from "vue";
import accountService from "../../../services/account.service";
import teacherService from "../../../services/teacher.service";
const ClassData = ref([]);
onMounted(async () => {
  CurrentClass();
});
async function CurrentClass() {
  const accountId = window.user.id;
  const response = await accountService.getTeacherById(accountId);
  const teacherId = response.data[0].TeacherId;
  const result = await teacherService.getHistoryClass(teacherId);
  // console.log(result.data.data);
  ClassData.value = result.data.data;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
</script>
