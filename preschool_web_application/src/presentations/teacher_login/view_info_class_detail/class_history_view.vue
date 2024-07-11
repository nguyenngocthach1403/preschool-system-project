<template>
  <div class="text-[14px]">
    <main>
      <div class="mr-[10px] mt-[50px]">
        <!-- Filter inputs -->
        <div class="flex space-x-4 mb-4">
          <div>
            <label for="startYear">Năm bắt đầu:</label>
            <select
              id="startYear"
              v-model="startYearFilter"
              @change="applyFilters"
              class="px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="">Chọn năm bắt đầu</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div>
            <label for="endYear">Năm kết thúc:</label>
            <select
              id="endYear"
              v-model="endYearFilter"
              @change="applyFilters"
              class="px-2 py-1 border border-gray-300 rounded-md"
            >
              <option value="">Chọn năm kết thúc</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <table class="h-fit w-full mx-auto rounded-lg overflow-hidden">
          <thead
            class="sticky w-full top-0 text-[15px] bg-[#6EC2F7] text-white z-10 rounded-lg"
          >
            <tr>
              <th class="px-3 py-3 text-left w-[250px]">
                <div class="flex">Tên lớp học</div>
              </th>
              <th class="w-[300px]">Vai trò</th>
              <!-- <th class="w-[300px]">Cấp độ</th>
              <th class="w-[300px]">Chương trình</th> -->
              <th class="w-[300px]">
                <div class="flex justify-center">
                  Cấp độ
                  <img
                    :src="sort_icon"
                    @click="sortDataByLevel"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th class="w-[300px]">
                <div class="flex justify-center">
                  Chương trình
                  <img
                    :src="sort_icon"
                    @click="sortDataBySyllabus"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th class="w-[300px]">Niên khoá</th>
              <th class="w-[400px]">Thời gian bắt đầu</th>
              <th class="w-[400px]">Thời gian kết thúc</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredClassData" :key="item.id">
              <td class="px-3 py-3">{{ item.name }}</td>
              <td class="px-3 py-3">{{ item.RoleName }}</td>
              <td class="px-3 py-3">{{ item.levelsName }}</td>
              <td class="px-3 py-3">{{ item.syllabusName }}</td>
              <td class="px-3 py-3">{{ item.session }}</td>
              <td class="px-3 py-3">{{ formatDate(item.start_date) }}</td>
              <td class="px-3 py-3">{{ formatDate(item.end_date) }}</td>
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
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";

const ClassData = ref([]);
const startYearFilter = ref(null);
const endYearFilter = ref(null);

onMounted(async () => {
  CurrentClass();
});
async function CurrentClass() {
  // const accountId = window.user.id;
  const accountId = JSON.parse(localStorage.getItem("user")).id;
  const response = await accountService.getTeacherById(accountId);
  const teacherId = response.data[0].TeacherId;
  const result = await teacherService.getHistoryClass(teacherId);
  // console.log(result.data.data);
  ClassData.value = result.data.data;
}
// function formatDate(dateString) {
//   const date = new Date(dateString);
//   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// }
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const availableYears = computed(() => {
  const years = [];
  const currentYear = new Date().getFullYear();
  const pastYearsCount = 10; // Số năm trong quá khứ
  const futureYearsCount = 10; // Số năm trong tương lai

  // Lấy các năm trong quá khứ
  for (let i = pastYearsCount; i > 0; i--) {
    years.push(currentYear - i);
  }

  // Lấy năm hiện tại
  years.push(currentYear);

  // Lấy các năm trong tương lai
  for (let i = 1; i <= futureYearsCount; i++) {
    years.push(currentYear + i);
  }

  return years;
});

const filteredClassData = computed(() => {
  if (!startYearFilter.value && !endYearFilter.value) {
    return ClassData.value;
  }

  return ClassData.value.filter((item) => {
    const startDate = new Date(item.start_date);
    const endDate = new Date(item.end_date);

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startYearFilter.value && startYear < startYearFilter.value) {
      return false;
    }

    if (endYearFilter.value && endYear > endYearFilter.value) {
      return false;
    }

    return true;
  });
});

function applyFilters() {
  startYearFilter.value = parseInt(startYearFilter.value);
  endYearFilter.value = parseInt(endYearFilter.value);
}

const sortOrderSyllabus = ref(null);
const sortOrderLevel = ref(null);
const sortDataByLevel = () => {
  if (sortOrderLevel.value === "asc") {
    ClassData.value.sort((a, b) => (a.levelsName > b.levelsName ? 1 : -1));
    sortOrderLevel.value = "desc";
  } else {
    ClassData.value.sort((a, b) => (b.levelsName > a.levelsName ? 1 : -1));
    sortOrderLevel.value = "asc";
  }
};

const sortDataBySyllabus = () => {
  if (sortOrderSyllabus.value === "asc") {
    ClassData.value.sort((a, b) => (a.syllabusName > b.syllabusName ? 1 : -1));
    sortOrderSyllabus.value = "desc";
  } else {
    ClassData.value.sort((a, b) => (b.syllabusName > a.syllabusName ? 1 : -1));
    sortOrderSyllabus.value = "asc";
  }
};
</script>
