<template>
  <table class="w-full rounded-md overflow-hidden relative min-h-64">
    <thead>
      <tr class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <td>STT</td>
        <th class="py-2 text-start w-[300px] px-5">Tên hoạt động</th>
        <th class="py-2 text-start px-5">Mô tả</th>
        <th class="py-2 text-start px-5">Tạo bởi</th>
        <th class="py-2 text-start px-5">Ngày tạo</th>
        <th class="py-2 px-5 text-center w-[150px]">Chức năng</th>
      </tr>
    </thead>
    <EmptyBox
      v-if="props.activities.length == 0"
      class="absolute top-5 left-0 z-20"
    />
    <tbody v-else>
      <tr
        v-for="(item, index) in props.activities"
        :key="index"
        class="even:bg-gray-200 hover:bg-[#3B44D1]/50 hover:text-white"
      >
        <td class="w-[50px]">{{ index + 1 }}</td>
        <td class="py-2 text-start px-5">{{ item.name }}</td>
        <td class="py-2 text-start px-5">
          {{ item.description || "-" }}
        </td>
        <td class="py-2 text-start px-5 w-[100px]">{{ item.username }}</td>
        <td class="py-2 text-start w-[200px] px-5">
          {{
            formatTimeString(
              new Date(item.created).getMinutes(),
              new Date(item.created).getHours()
            )
          }}
          -
          {{ ddmmyyyyDateString(new Date(item.created).toLocaleDateString()) }}
        </td>
        <td class="py-2">
          <div class="flex justify-center">
            <div
              @click="$emit('delete', item)"
              class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
            >
              <img :src="delete_icon" class="w-[14px] m-auto" />
            </div>
            <div
              @click="$emit('edit', item)"
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
  activities: {
    type: Array,
    require: true,
  },
});
</script>
    
    <style lang="scss" scoped>
</style>