<template>
  <div class="overflow-hidden h-fit mr-[10px]">
    <!--Table here-->
    <table class="h-fit w-full">
      <thead class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <tr>
          <th class="px-3 py-3 text-left"></th>
          <th class="px-3 text-left">
            <div class="flex">
              Mã tài khoản
              <img
                :src="sort_icon"
                class="w-[20px] hover:bg-gray-200/25 rounded-full"
              />
            </div>
          </th>
          <th class="px-3 text-left">
            <div class="flex">
              Tên tài khoản
              <img
                :src="sort_icon"
                class="w-[20px] hover:bg-gray-200/25 rounded-full"
              />
            </div>
          </th>
          <th class="px-3 text-left w-fit">Email</th>
          <th class="px-3 text-left">Phone</th>
          <th class="px-3 text-left">Chức vụ</th>
          <th class="px-3 text-left">Chức vụ</th>
          <th class="px-3 text-left">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in drops.data"
          :key="item.id"
          class="text-[14px] h-[60px] text-left even:bg-gray-50 border-b-[1px] hover:bg-gray-200"
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
          <td class="hidden 2xl:table-cell px-3 w-[300px]">{{ item.id }}</td>
          <td class="hidden 2xl:table-cell px-3 w-[1000px]">
            {{ item.username }}
          </td>
          <td class="hidden 2xl:table-cell px-3 w-dvw">{{ item.email }}</td>
          <td class="hidden 2xl:table-cell px-3 w-[500px]">{{ item.phone }}</td>
          <td class="hidden 2xl:table-cell px-3 w-[500px]">{{ item.role }}</td>
          <td class="px-3 w-[200px]">
            <div
              class="rounded-[5px] h-[30px] w-fit px-2 content-center text-center text-[12px] border"
            >
              {{ item.isOnline }}
            </div>
          </td>
          <td class="hidden 2xl:table-cell px-3 w-[500px]">{{ item.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const drops = defineProps(["data"]);
</script>

<style scoped>
</style>