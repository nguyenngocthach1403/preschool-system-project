<template>
  <PopupLayout :title="'Thực đơn hàng tuần'" @close="$emit('close')">
    <template #content>
      <div class="w-[1200px]">
        <MenuTable
          @create-meal-of-day-menu="$emit('create-meal-of-day-menu', $event)"
        />
      </div>
    </template>
  </PopupLayout>
</template>

<script setup>
import PopupLayout from "../../../components/popup_layout.vue";
import MenuTable from "../../class_detail_page/components/menu_table.vue";

//props
const props = defineProps({
  classId: {
    type: Number,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
</style>