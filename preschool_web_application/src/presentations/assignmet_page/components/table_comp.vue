<template>
  <div class="overflow-hidden h-fit mr-[10px]">
    <!--Table here-->
    <table class="h-fit w-full overflow-hidden rounded-md">
      <thead
        class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10 text-start"
      >
        <tr>
          <th class="py-2 px-3 w-[100px]">Avatar</th>
          <th class="py-2 px-3 w-[100px]">ID</th>
          <th class="py-2 px-3 text-start w-[200px]">Tên giáo viên</th>
          <th class="py-2 px-3">Số lượng lớp tham gia</th>
          <th class="py-2 px-3">Số lượng lớp đã tham gia</th>
          <th class="py-2 px-3">Ds lớp đã tham gia</th>
          <th class="py-2 px-3">Ds lớp đang tham gia</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in props.data"
          :key="item"
          class="even:bg-gray-200/75 hover:bg-gray-200"
        >
          <td class="px-3 py-3">
            <img
              :src="item.avatar || avatar"
              class="w-[40px] h-[40px] rounded-full m-auto border border-white border-[1px]"
            />
          </td>
          <td class="px-3 py-3">{{ item.id }}</td>
          <td class="px-3 py-3 text-start">{{ item.name }}</td>
          <td class="px-3 py-3">{{ item.count_class_attended }}</td>
          <td class="px-3 py-3">{{ item.class_attended.length }}</td>
          <td class="px-3 py-3">
            <div class="relative h-10">
              <div
                v-for="(item, index) in item.class_attending"
                :key="index"
                class="class absolute drop-shadow-xl top-0 w-10 h-10 rounded-full bg-gray-200 hover:border hover:border-black overflow-hidden"
                :style="{ left: index * 20 + 'px' }"
              >
                <img :src="item.class_img" class="w-full h-full object-cover" />
              </div>
            </div>
            <!-- <button
              class="border rounded-md px-3 py-1 text-[13px] border-yellow-500 text-yellow-600 bg-yellow-200/25 hover:bg-yellow-400"
            >
              Xem
            </button> -->
          </td>
          <td class="px-3 py-3">
            <button
              class="border rounded-md px-3 py-1 text-[13px] border-yellow-500 text-yellow-600 bg-yellow-200/25 hover:bg-yellow-400"
            >
              Xem
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
//icon
import avatar from "../../../assets//img/avatar.jpg";
//props
const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
});
</script>

<style scoped>
.class {
  box-shadow: -2px -2px 15px rgba(0, 0, 0, 0.2) !important;
}
</style>