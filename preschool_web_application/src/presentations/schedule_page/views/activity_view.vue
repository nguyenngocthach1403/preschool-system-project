<template>
  <div class="h-full w-full mt-5">
    <PopupCreate
      v-if="isShowCreate"
      @close="closeCreatePopup($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <PopupEdit
      v-if="isShowEdit"
      :activity="isShowEdit"
      @close="closeEditPopup($event)"
      @add-toast="$emit('add-toast', $event)"
    />
    <ConfirmDelete
      v-if="isShowDelete"
      class="absolute top-0 left-0"
      :content="`Bạn có chắc muốn xóa hoạt động này không`"
      :value="{}"
      @confirm="getConfirmResult($event)"
    />
    <div class="flex justify-between">
      <SearchComp class="w-[450px]" />
      <CreateButton @click="isShowCreate = true" :title="'Thêm hoạt động'" />
    </div>
    <ResultNumComp class="my-2">{{ total }}</ResultNumComp>
    <LoadingComp v-if="loading" class="h-[200px] py-10" />
    <div v-else>
      <ActivityTableComp
        :activities="activities"
        class="drop-shadow-xl"
        @edit="isShowEdit = $event"
        @delete="isShowDelete = $event"
      />
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
import PopupEdit from "../components/popup_edit_activity.vue";
import ConfirmDelete from "../../../components/confirm_dialog.vue";

//store
import { storeToRefs } from "pinia";
import { useActivityStore } from "../../../stores/activity_store";
import { onMounted, ref } from "vue";
import scheduleService from "../../../services/schedule.service";
const activityStore = useActivityStore();
const { activities, limit, page, total, loading } = storeToRefs(activityStore);

//valiable

//state
const isShowCreate = ref(false);
const isShowEdit = ref(false);
const isShowDelete = ref(false);

//props

//emits
const emits = defineEmits(["add-toast"]);
//watch

function getConfirmResult(result) {
  if (result) {
    deleteActivity(isShowDelete.value.id);
    // console.log(isShowDelete.value.id);
  }

  isShowDelete.value = null;
}
async function deleteActivity(activityId) {
  try {
    await scheduleService.deleteActivity(activityId);

    emits("add-toast", {
      title: "Thành công!",
      type: 0,
    });
    activityStore.fetchActivities();
  } catch (error) {
    emits("add-toast", {
      title: "Thất bại!",
      type: 1,
    });
  }
}

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

function closeEditPopup(result) {
  if (result) {
    activityStore.fetchActivities();
  }
  isShowEdit.value = false;
}
//life circle
onMounted(async () => {
  if (activityStore.activities.length == 0)
    await activityStore.fetchActivities();
});
</script>

<style lang="scss" scoped>
</style>