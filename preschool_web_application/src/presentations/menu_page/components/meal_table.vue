<template>
  <table class="w-full rounded-md overflow-hidden relative min-h-64">
    <thead>
      <tr class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <td>STT</td>
        <th class="py-2 text-start px-5">Buổi</th>
        <th class="py-2 text-start px-5">Thời gian</th>
        <th class="py-2 text-start px-5">Tạo bởi</th>
        <th class="py-2 text-start px-5">Tạo ngày</th>
        <th class="py-2 px-5 fixed">Chức năng</th>
      </tr>
    </thead>
    <EmptyBox
      v-if="props.meals.length == 0"
      class="absolute top-5 left-0 z-20"
    />
    <tbody v-else>
      <tr
        v-for="(item, index) in props.meals"
        :key="item"
        class="even:bg-gray-200 hover:bg-[#3B44D1]/50 hover:text-white"
      >
        <td>{{ index + 1 }}</td>
        <td class="py-2 text-start px-5">{{ item.meal }}</td>
        <td class="py-2 text-start px-5">
          {{ item.start_time }}-{{ item.end_time }}
        </td>
        <td class="py-2 text-start px-5">{{ item.username }}</td>
        <td class="py-2 text-start px-5">
          {{
            formatTimeString(
              new Date(item.created).getMinutes(),
              new Date(item.created).getHours()
            )
          }}
          -
          {{ ddmmyyyyDateString(new Date(item.created).toLocaleDateString()) }}
        </td>
        <td class="pl-3">
          <div class="flex">
            <div
              class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
            >
              <img :src="delete_icon" class="w-[14px] m-auto" />
            </div>
            <div
              class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
            >
              <img :src="edit_icon" class="w-[14px] m-auto" />
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import EmptyBox from "../../../components/empty_data.vue";
//icom
import delete_icon from "../../../assets/icons/delete.svg";
import edit_icon from "../../../assets/icons/edit.svg";

//service
import {
  ddmmyyyyDateString,
  formatTimeString,
} from "../../../utils/resources/format_date";

// props
const props = defineProps({
  meals: {
    type: Array,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
</style>