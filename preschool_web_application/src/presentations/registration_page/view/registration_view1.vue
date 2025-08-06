<template lang="">
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <RegistrationAdditionPopup
      v-if="isRegistrationPopupShow"
      @close="isRegistrationPopupShow = false"
      @add-toast="$emit('add-toast', $event)" />
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1">
      Đơn đăng ký
    </div>
    <div class="p-3 flex place-content-between gap-5">
      <div class="flex gap-3">
        <Search
          :fontSize="14"
          :height="40"
          v-model:value="search" />
        <SelectVue
          :height="40"
          :width="170"
          :options="sessions.map((item) => `${item.id} - ${item.name}`)"
          v-model:value="enrollmentSesionSelected" />
        <SelectVue
          :height="40"
          :width="170"
          :delete-disapled="false"
          :options="sessionClasses.map((item) => `${item.id} - ${item.name}`)"
          v-model:value="sessionClassSelectBox"
          :placeholder="`Chọn lớp`" />
        <VueDatePicker
          v-model="timeline"
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
      <RegistrationTalble
        v-if="!loading && !isRegistraionEmpty"
        :registrations="registrations"
        :total-item="100"
        v-model:page="offset" />
      <div
        class="h-[150px]"
        v-if="loading">
        <LoadingComp />
      </div>
      <div
        v-if="isRegistraionEmpty && !loading"
        class="py-5">
        <EmptyComp />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
//Components
import RegistrationTalble from "../components/registration_table.vue";
import Search from "@/components/search_form_comp.vue";
import SelectVue from "@/components/selects/dropdown_search_selected_box.vue";
import ButtonCustom from "@/components/button.vue";
import RegistrationAdditionPopup from "@/presentations/registration_addition_page/views/registration_addition_popup.vue";
import LoadingComp from "@/components/loading_comp.vue";
import EmptyComp from "@/components/empty_data.vue";
//Assets
import excelIcon from "@/assets/icons/excel.svg";

//State management
import { userRegistrationStateStore } from "../../../stores/registration_state_store.js";
import { storeToRefs } from "pinia";

const emits = defineEmits(["add-toast"]);

const registrationStore = userRegistrationStateStore();
const {
  limit,
  offset,
  sessionSelected,
  sessionClasses,
  sessionClassSelected,
  sessions,
  loading,
  registrations,
  isRegistraionEmpty,
  timeline,
  search,
  msgErr,
} = storeToRefs(registrationStore);

let isRegistrationPopupShow = ref(false);
const enrollmentSesionSelected = ref(null);
const sessionClassSelectBox = ref(null);

const date = ref();

watch(sessionSelected, () => {
  enrollmentSesionSelected.value = `${sessionSelected.value.id} - ${sessionSelected.value.name}`;
});

watch(msgErr, () => {
  emits("add-toast", {
    title: "Error",
    type: 1,
    content: msgErr.value,
  });
});

watch(enrollmentSesionSelected, async () => {
  const enrollmentSesionSelectedId =
    enrollmentSesionSelected.value.split(" - ");

  sessionSelected.value = sessions.value.find(
    (item) => item.id == enrollmentSesionSelectedId[0]
  );
  await registrationStore.fetchRegistrations({
    sessionId: enrollmentSesionSelectedId[0],
  });
  await registrationStore.fetchSessionClassesBySessionId(
    enrollmentSesionSelectedId[0]
  );
});

watch(sessionClassSelectBox, async () => {
  const sessionClassSelectedId =
    sessionClassSelectBox.value?.split(" - ") || [];

  sessionClassSelected.value =
    sessionClasses.value.find((item) => item.id == sessionClassSelectedId[0]) ||
    {};

  await registrationStore.fetchRegistrations({
    classId: sessionClassSelected.value?.id || "",
  });
});

onMounted(async () => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  // if (registrations) return;
  await registrationStore.getEnrollmentSessions();
  await registrationStore.fetchRegistrations({});
});

watch(search, async () => {
  await registrationStore.fetchRegistrations({ search: search.value });
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
