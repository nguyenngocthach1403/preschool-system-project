<template>
  <div class="w-full h-full border rounded-xl overflow-y-auto relative">
    <table class="w-full relative">
      <thead class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <th class="py-1 px-2 w-[30%] text-start">Tên người đăng ký</th>
        <th class="py-1 px-2 w-dvw text-start">Liên hệ</th>
        <th class="py-1 px-2 text-start w-[400px]">Status</th>
        <th class="py-1 px-2 w-[15%] text-start">Ngày tạo</th>
      </thead>

      <LoadinComp v-if="props.loading" class="absolute h-full w-full my-20" />
      <div
        v-if="props.data.length == 0 && !props.loading"
        class="absolute h-full py-20 w-full align-center"
      >
        <img :src="empty_icon" class="m-auto" alt="" />
        <span class="text-gray-500">Không có dữ liệu</span>
      </div>
      <tbody v-if="props.loading || props.data.length !== 0">
        <tr
          v-for="(item, index) in props.data"
          :key="index"
          class="py-2 h-[40px] hover:bg-gray-200 text-start"
        >
          <td class="w-[1000px] px-3 py-2">
            <span>{{ item.name }}</span>
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Vai trò:</span>
              {{ convertParentRole(item.relationship) }}
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

          <td class="px-3 w-[400px] relative">
            <button
              :class="{
                'status-0': item.status === 0,
                'status-1': item.status === 1,
                'status-2': item.status === 2,
                'status-3': item.status === 3,
                'status-4': item.status === 4,
                'status-5': item.status === 5,
              }"
              class="hover:bg-gray-200 rounded-[5px] h-[30px] w-fit px-2 content-center text-center text-[12px]"
            >
              {{ convertRegisterStatus(item.status) }}
            </button>
          </td>
          <td class="px-2">
            {{ new Date(item.created).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  

<script setup>
import LoadinComp from "../../../components/loading_comp.vue";
import empty_icon from "../../../assets/icons/Empty Box.svg";
import {
  convertRegisterStatus,
  convertParentRole,
} from "../../../utils/resources/converter";
const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
  loading: {
    type: Boolean,
    require: true,
  },
});
</script>
  
  <style scoped>
.status-0 {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
.status-1 {
  background-color: rgb(221 214 254) !important;
  border: 1px solid rgb(196 181 253) !important;
  color: rgb(139 92 246) !important;
}
.status-2 {
  color: rgb(142, 73, 8) !important;
  background-color: rgba(162, 103, 7, 0.2);
  border: solid 1px rgb(246, 199, 105);
}
.status-3 {
  background-color: rgb(254, 254, 202);
  border: 1px solid rgb(252, 230, 165) !important;
  color: rgb(220, 162, 38);
}
.status-4 {
  background-color: rgb(217 249 157);
  border: 1px solid rgb(190 242 100) !important;
  color: rgb(132 204 22);
}
.status-5 {
  background-color: rgba(252, 165, 165, 0.3) !important;
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
</style>
