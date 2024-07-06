<template>
  <table class="w-full rounded-md overflow-hidden relative min-h-64">
    <thead>
      <tr class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <th class="py-2 text-start px-5 w-[100px]">STT</th>
        <th class="py-2 text-start px-5">Tên món</th>
        <th class="py-2 text-start px-5">Loại</th>
        <th class="py-2 text-start px-5">Tạo bởi</th>
        <th class="py-2 text-start px-5">Ngày tạo</th>
        <th class="py-2 text-end px-5">Chức năng</th>
      </tr>
    </thead>
    <EmptyBox
      v-if="props.dishes.length == 0"
      class="absolute top-10 left-0 z-20"
    />
    <tbody v-if="props.dishes.length != 0">
      <tr
        v-for="(item, index) in props.dishes"
        :key="index"
        class="even:bg-gray-200 hover:bg-[#3B44D1]/50 hover:text-white"
      >
        <td class="py-3 text-start px-5">{{ index + 1 }}</td>
        <td class="py-3 text-start px-5">{{ item.name }}</td>
        <td class="py-3 text-start px-5">
          {{ convertFoodCategory(item.category) }}
        </td>
        <td class="py-3 text-start px-5">{{ item.username }}</td>
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
        <td class="pr-5">
          <div class="flex justify-end">
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
import { watch } from "vue";

//icon
import delete_icon from "../../../assets/icons/delete.svg";
import edit_icon from "../../../assets/icons/edit.svg";

//component
import EmptyBox from "../../../components/empty_data.vue";

//service
import { convertFoodCategory } from "../../../utils/resources/converter";
import {
  formatTimeString,
  ddmmyyyyDateString,
} from "../../../utils/resources/format_date";
//props
const props = defineProps({
  dishes: {
    type: Object,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
</style>