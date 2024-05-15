<template>
  <div class="overflow-hidden h-fit mr-[10px]">
    <!--Table here-->
    <table class="h-fit w-full">
      <thead class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <tr>
          <th class="px-3 py-3 text-left"></th>
          <th class="px-3 text-left">
            <div class="flex">
              Mã đăng ký
              <img
                :src="sort_icon"
                class="w-[20px] hover:bg-gray-200/25 rounded-full"
              />
            </div>
          </th>
          <th class="px-3 text-left">
            <div class="flex">
              Tên người đăng ký
              <img
                :src="sort_icon"
                class="w-[20px] hover:bg-gray-200/25 rounded-full"
              />
            </div>
          </th>
          <th class="px-3 text-left w-fit">Tài khoản</th>
          <th class="px-3 text-left">Liên hệ</th>
          <th class="px-3 text-left">Địa chỉ</th>
          <th class="px-3 text-left">Nội dung</th>
          <th class="px-3 text-left">Hồ sơ</th>
          <th class="px-3 text-left">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in drops.data"
          :key="item.id"
          class="text-[14px] h-[60px] text-left even:bg-gray-50 border-b-[1px]"
        >
          <td class="px-3">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="check"
              >
                <input
                  type="checkbox"
                  class="before:content[''] hover:ring-2 peer relative h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#3B44D1] checked:border-none hover:before:opacity-10"
                  id="check"
                />
                <span
                  class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          </td>
          <td class="hidden 2xl:table-cell px-3 w-[500px]">
            <span>{{ item.id }}</span>
          </td>
          <td class="w-dvw px-3 py-2">
            <span>{{ item.name }}</span>
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Vai trò:</span> {{ checkRole(item.role) }}
            </dd>
          </td>
          <td class="px-3 w-[400px]">
            <button
              @click.prevent
              v-if="item.user == null"
              class="hover:bg-yellow-500/50 active:scale-95 rounded-[5px] h-[30px] w-fit px-2 content-center text-center border-yellow-300 text-[12px] border bg-yellow-200/25 text-yellow-600 cursor-default"
            >
              Tạo tài khoản
            </button>
            <dd class="text-gray-500 text-[14px] my-[5px]" v-else>
              <span>
                <span class="font-bold">Tài khoản:</span> {{ item.user }}</span
              >
            </dd>
          </td>
          <td class="hidden 2xl:table-cell px-3 w-[600px] text-blue-900">
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Email:</span> {{ item.email ?? "None" }}
            </dd>
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">SDT:</span> {{ item.phone ?? "None" }}
            </dd>
          </td>

          <td class="w-[1000px] px-3">
            <span>{{ item.address }}</span>
            <!-- <span v-if="!item.class" class="italic">None</span> -->
          </td>
          <td class="px-3 w-[600px]">
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Cấp:</span> {{ item.levels ?? "None" }}
            </dd>
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Chương trình:</span>
              {{ item.syllabus ?? "None" }}
            </dd>
          </td>
          <td class="px-3 w-[200px]">
            <div
              class="rounded-[5px] h-[30px] w-fit px-2 content-center text-center text-[12px] border"
              :class="classStatus(item.profileStatus)"
            >
              {{ checkStatus(item.profileStatus) }}
            </div>
          </td>
          <td class="content-center px-3 cursor-default hover:text-blue-700">
            Edit
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";
const drops = defineProps({
  data: {
    type: Object,
    require: true,
  },
});

function checkStatus(value) {
  switch (value) {
    case 1:
      return "Hoàn thành";
    case 0:
      return "Chưa hoàn thành";
    case 3:
      return "Thiếu";

    default:
      return "None";
  }
}

function checkRole(value) {
  switch (value) {
    case 0:
      return "Bố";
    case 1:
      return "Mẹ";
    case 2:
      return "Người giám hộ";

    default:
      return "None";
  }
}
function classStatus(value) {
  switch (value) {
    case 1:
      return "done";
    case 0:
      return "unfinished";
    case 3:
      return "lack";

    default:
      return "None";
  }
}
</script>

<style scoped>
.done {
  color: rgb(8, 142, 64) !important;
  background-color: rgba(7, 162, 43, 0.116);
  border: solid 1px rgb(105, 246, 124);
}
.lack {
  color: rgb(132, 122, 33) !important;
  background-color: rgba(162, 157, 7, 0.116);
  border: solid 1px rgb(246, 213, 105);
}
.unfinished {
  color: rgb(132, 33, 33) !important;
  background-color: rgba(162, 7, 7, 0.116);
  border: solid 1px rgb(246, 105, 105);
}
</style>