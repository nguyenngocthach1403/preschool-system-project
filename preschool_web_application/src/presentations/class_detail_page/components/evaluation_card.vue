<template>
  <div
    class="text-start bg-white border hover:ring-1 h-[180px] pb-10 px-3 py-2 drop-shadow-xl rounded-md"
  >
    <!--Title-->
    <div class="w-full text-[19px] font-bold text-start relative">
      Đớt đánh giá {{ props.eva.name }}
    </div>
    <div class="text-[14px]">
      <div>
        <span class="text-gray-600">Số phiếu: </span>
        {{ props.eva.status_0 + props.eva.status_1 + props.eva.status_2 }}
      </div>
      <div>
        <span class="text-gray-600">Đã hoàn thành: </span
        >{{ props.eva.status_2 }}
      </div>
      <div>
        <span class="text-gray-600">Chờ duyệt: </span> {{ props.eva.status_1 }}
      </div>
      <div>
        <span class="text-gray-600">Chờ đánh giá: </span
        >{{ props.eva.status_0 }}
      </div>
    </div>
    <span class="text-[14px] text-gray-500 absolute bottom-1 right-2"
      >Ngày tạo:
      {{
        ddmmyyyyDateString(new Date(props.eva.created).toLocaleDateString())
      }}</span
    >
    <div class="flex items-center gap-3 absolute bottom-1 left-2">
      <img
        :src="avatar_default"
        class="w-7 h-7 rounded-full hover:border hover:border-black"
      />
      <span class="text-[14px]">{{ props.eva.username }}</span>
    </div>
  </div>
</template>

<script setup>
import avatar_default from "../../../assets/img/avatar.jpg";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
const props = defineProps({
  eva: {
    type: Object,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
</style>