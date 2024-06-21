<template>
  <div class="w-full h-full border rounded-xl overflow-y-auto">
    <table class="w-full">
      <thead class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <th class="py-1 px-2 w-[200px] text-start">ID</th>
        <th class="py-1 px-2 w-dvw text-start">Đợt</th>
        <th class="py-1 px-2 w-[400px] text-start">Status</th>
        <th class="py-1 px-2 w-[20%] text-start">Bắt đầu</th>
        <th class="py-1 px-2 w-[20%] text-start">Kết thúc</th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in props.data"
          :key="index"
          class="py-2 h-[40px] hover:bg-gray-200 text-start"
          :class="{ active: index == selectedIndex }"
          @click="(selectedIndex = index), $emit('selected', item)"
        >
          <td class="px-2">{{ item.id }}</td>
          <td class="px-2">{{ item.name }}</td>
          <td class="px-2">{{ item.openning ? "Mở" : "Đóng" }}</td>
          <td class="px-2">
            {{ new Date(item.start_date).toLocaleDateString() }}
          </td>
          <td class="px-2">
            {{ new Date(item.end_date).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedIndex = ref(null);
const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
});
</script>

<style scoped>
.active {
  background-color: rgb(232, 232, 232);
}
</style>