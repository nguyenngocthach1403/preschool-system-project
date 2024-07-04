<!-- <template>
  <div class="text-[14px]">
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
              <th class="w-[300px]">Vai trò</th>
              <th class="w-[300px]">Cấp độ</th>
              <th class="w-[300px]">Chương trình</th>
              <th class="w-[300px]">Niên khoá</th>
              <th class="px-3 py-3 text-left w-[300px]">
                <div class="flex">
                  Thời gian bắt đầu
                  <img
                    :src="sort_icon"
                    @click="$emit('sort-parent-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>

              <th class="px-3 py-3 text-left w-[300px]">
                <div class="flex">
                  Thời gian kết thúc
                  <img
                    :src="sort_icon"
                    @click="$emit('sort-parent-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in ClassData"
              :key="item.id"
              class="h-[60px] w-full text-center even:bg-gray-50 hover:bg-gray-200"
            >
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
import { ref, computed, onMounted } from "vue";
import accountService from "../../../services/account.service";
import teacherService from "../../../services/teacher.service";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";

const ClassData = ref([]);
onMounted(async () => {
  CurrentClass();
});
async function CurrentClass() {
  const accountId = window.user.id;
  const response = await accountService.getTeacherById(accountId);
  const teacherId = response.data[0].TeacherId;
  const result = await teacherService.getClassCurrent(teacherId);
  // classCurrentStore.getClass(teacherId);
  ClassData.value = result.data.data;
}
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
</script> -->

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

        <!-- Table -->
        <table class="h-fit w-full mx-auto rounded-lg overflow-hidden">
          <thead
            class="sticky w-full top-0 text-[15px] bg-[#6EC2F7] text-white z-10 rounded-lg"
          >
            <tr>
              <th class="px-3 py-3 text-left w-[250px]">
                <div class="flex">Tên lớp học</div>
              </th>
              <th class="w-[300px]">Vai trò</th>
              <th class="w-[100px]">Cấp độ</th>
              <th class="w-[300px]">Chương trình</th>
              <th class="w-[200px]">Niên khoá</th>
              <th class="px-3 py-3 text-left w-[300px]">
                <div class="flex">
                  Thời gian bắt đầu
                  <img
                    :src="sort_icon"
                    @click="$emit('sort-parent-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th class="px-3 py-3 text-left w-[300px]">
                <div class="flex">
                  Thời gian kết thúc
                  <img
                    :src="sort_icon"
                    @click="$emit('sort-parent-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th class="w-[300px]">Trạng thái lớp học</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredClassData"
              :key="item.id"
              class="h-[60px] w-full text-center even:bg-gray-50 hover:bg-gray-200"
            >
              <td class="px-3 py-3">{{ item.name }}</td>
              <td class="px-3 py-3">{{ item.RoleName }}</td>
              <td class="px-3 py-3">{{ item.levelsName }}</td>
              <td class="px-3 py-3">{{ item.syllabusName }}</td>
              <td class="px-3 py-3">{{ item.session }}</td>
              <td class="px-3 py-3">{{ formatDate(item.start_date) }}</td>
              <td class="px-3 py-3">{{ formatDate(item.end_date) }}</td>
              <td class="px-3 py-3">{{ getClassStatus(item) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
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
  const accountId = window.user.id;
  const response = await accountService.getTeacherById(accountId);
  const teacherId = response.data[0].TeacherId;
  const result = await teacherService.getClassCurrent(teacherId);
  ClassData.value = result.data.data;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const availableYears = computed(() => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 10; year--) {
    years.push(year);
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
  // Ensure input values are parsed as numbers
  startYearFilter.value = parseInt(startYearFilter.value);
  endYearFilter.value = parseInt(endYearFilter.value);
}
function getClassStatus(item) {
  const startDate = new Date(item.start_date);
  const endDate = new Date(item.end_date);
  const currentDate = new Date();

  if (currentDate < startDate) {
    return "Sắp bắt đầu";
  } else if (currentDate >= startDate && currentDate <= endDate) {
    return "Đang hoạt động";
  } else {
    return "Kết thúc";
  }
}
</script>

<style scoped></style>
