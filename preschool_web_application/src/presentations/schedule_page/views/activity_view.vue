<template>
  <div class="h-full w-full mt-5">
    <PopupCreate
      v-if="isShowCreate"
      @close="closeCreatePopup($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <div class="flex justify-between">
      <SearchComp class="w-[450px]" />
      <CreateButton @click="isShowCreate = true" :title="'Thêm hoạt động'" />
    </div>
    <ResultNumComp class="my-2">{{ total }}</ResultNumComp>
    <LoadingComp v-if="loading" class="h-[200px] py-10" />
    <div v-else>
      <ActivityTableComp :activities="activities" class="drop-shadow-xl" />
      <div
        v-if="activities.length != 0"
        class="flex h-[50px] my-5 px-2 justify-between items-center"
      >
        <div class="">
          Hiển thị từ {{ page * limit == 0 ? 1 : page * limit }} đến
          {{ (page + 1) * limit - (limit - activities.length) }} trong
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
import LoadingComp from "../../../components/loading_comp.vue";
import CreateButton from "../../../components/create_button.vue";
import ActivityTableComp from "../components/activity_table_comp.vue";
import PopupCreate from "../components/popup_create_activity.vue";

//store
import { storeToRefs } from "pinia";
import { useActivityStore } from "../../../stores/activity_store";
import { onMounted, ref } from "vue";
const activityStore = useActivityStore();
const { activities, limit, page, total, loading } = storeToRefs(activityStore);

//valiable

//state
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
    await activityStore.fetchActivities();
  }

  isShowCreate.value = false;
}
//life circle
onMounted(async () => {
  if (activityStore.activities.length == 0)
    await activityStore.fetchActivities();
});
</script>

<style lang="scss" scoped>
</style>