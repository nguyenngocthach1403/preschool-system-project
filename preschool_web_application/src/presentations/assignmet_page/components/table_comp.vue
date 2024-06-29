<template>
  <div class="overflow-hidden h-fit mr-[10px]">
    <!--Table here-->
    <table class="h-fit w-full overflow-hidden rounded-md">
      <thead
        class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10 text-start"
      >
        <tr>
          <th class="py-2 px-3 w-[100px]">ID</th>
          <th class="py-2 px-3 text-start w-[300px]">Tên giáo viên</th>
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
          <td class="px-3 py-3">{{ item.id }}</td>
          <td class="px-3 py-3 text-start">{{ item.name }}</td>
          <td class="px-3 py-3">{{ item.count_class_attended }}</td>
          <td class="px-3 py-3">{{ item.class_attended.length }}</td>
          <td class="px-3 py-3">
            <button
              class="border rounded-md px-3 py-1 text-[13px] border-yellow-500 text-yellow-600 bg-yellow-200/25 hover:bg-yellow-400"
            >
              Xem
            </button>
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
//props
const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
});
</script>

<style scoped>
</style>