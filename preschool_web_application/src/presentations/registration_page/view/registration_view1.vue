<template lang="">
  <div
    class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px] overflow-hidden">
    <RegistrationAdditionPopup
      v-if="isRegistrationPopupShow"
      @close="isRegistrationPopupShow = false"
      @add-toast="$emit('add-toast', $event)" />
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1">
      Đơn đăng ký
    </div>
    <div class="p-3 flex place-content-between gap-5">
      <div class="flex gap-5">
        <Search
          :fontSize="14"
          :height="40"
          v-model:value="searchValue" />
        <SelectVue
          :height="40"
          :options="['Đợt 1', 'Đợt 2', 'Đợt 3', 'Đợt 4', 'Đợt 5', 'Đợt 6']"
          v-model:value="enrollmentSesionSelected" />
        <VueDatePicker
          v-model="date"
          range
          multi-calendars
          date-picker />
      </div>
      <div class="flex gap-5">
        <ButtonCustom
          :width="40"
          :height="40"
          :title="`Xuất Excel`"
          :background-color="`white`"
          :color="`black`"
          :radius="8"
          :icon="excelIcon"
          :border="`1px solid #D6DAE1`"
          :hover-color="`#D6DAE1`" />
        <ButtonCustom
          :width="40"
          :height="40"
          :title="`Tạo đơn mới`"
          :radius="8"
          @click="isRegistrationPopupShow = true" />
      </div>
    </div>
    <div>
      <RegistrationTalble />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
//Components
import RegistrationTalble from "../components/registration_table.vue";
import Search from "@/components/search_form_comp.vue";
import SelectVue from "@/components/selects/dropdown_search_selected_box.vue";
import ButtonCustom from "@/components/button.vue";
import RegistrationAdditionPopup from "@/presentations/registration_addition_page/views/registration_addition_popup.vue";
//Assets
import excelIcon from "@/assets/icons/excel.svg";

const searchValue = ref("dadssd");
let isRegistrationPopupShow = ref(false);
const enrollmentSesionSelected = ref(null);

const date = ref();

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});
</script>
<style scoped>
.dp__theme_light {
  --dp-button-height: 45px;

  --dp-highlight-color: rgba(21, 117, 207, 0.2);
  --dp-border-radius: 5px;
  --dp-input-padding: 5px 30px 10px 12px;
  width: 350px;
}
</style>
