<template>
  <div class="h-full w-full mt-5">
    <PopupCreate
      v-if="isShowCreate"
      @close="closeCreatePopup($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <div class="flex justify-between">
      <div class="flex gap-5 items-center h-full">
        <SearchComp class="w-[450px]" />
        <input class="h-[45px] rounded-md px-3 border mb-3" type="time" />
        <div class="h-[45px] font-bold">-</div>
        <input class="h-[45px] rounded-md px-3 border mb-3" type="time" />
      </div>
      <CreateButton
        @click="isShowCreate = true"
        :title="'Thêm thời gian biểu'"
      />
    </div>
    <ResultNumComp class="my-2">{{ total }}</ResultNumComp>
    <LoadingComp v-if="loading" />
    <div v-else>
      <TimetableTableComp :timetable="timetables" class="drop-shadow-xl" />
      <div
        v-if="timetables.length != 0"
        class="flex h-[50px] my-5 px-2 justify-between items-center"
      >
        <div class="">
          Hiển thị từ {{ page * limit == 0 ? 1 : page * limit }} đến
          {{ (page + 1) * limit - (limit - timetables.length) }} trong
          {{ total }} hoạt động
        </div>
        <Pagination
          :page-active="page + 1"
          :pageNums="Math.ceil(total / limit)"
          @click-page="getPage($event)"
        />
      </div>
    </div>
  </div>
</template>
  
<script setup>
//componenent
import Pagination from "../../../components//pagination.vue";
import ResultNumComp from "../../../components/result_comp.vue";
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButton from "../../../components/create_button.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import PopupCreate from "../components/popup_create_timetable.vue";
import TimetableTableComp from "../components/timetable_table_comp.vue";

//store
import { storeToRefs } from "pinia";
import { useTimetableStore } from "../../../stores/timetable_store";
import { onMounted, ref } from "vue";
const timetableStore = useTimetableStore();
const { timetables, limit, page, total, loading } = storeToRefs(timetableStore);

//valiable
//
const isShowCreate = ref(false);

//props

//emits

//watch

//function
function getPage(newPage) {
  activityStore.page = newPage - 1;
  activityStore.fetchActivities();
}

async function closeCreatePopup(result) {
  if (result) {
    await timetableStore.fetchTimeTable();
  }
  isShowCreate.value = false;
}

//life circle
onMounted(async () => {
  if (timetableStore.timetables.length == 0)
    await timetableStore.fetchTimeTable();
});
</script>
  
  <style lang="scss" scoped>
</style>