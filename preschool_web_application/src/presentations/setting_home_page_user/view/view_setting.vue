<template>
  <div class="bg-white ml-4 h-fit rounded-3xl text-center mb-20 mb-3 mt-10">
    <div class="flex justify-end content-center mr-3 mb-5">
      <router-link :to="{ name: 'EditSettingHomePageView' }">
        <EditButton :title="'Chỉnh sửa'"></EditButton>
      </router-link>
    </div>
    <TableData :data-table="dataOfTable"></TableData>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TableData from "../component/table.vue";
import settingService from "../../../services/setting_homepage.service";
import EditButton from "../../../components/edit_button.vue";
const dataOfTable = ref([]);

const emits = defineEmits(["add-toast"]);

async function getSetting() {
  const response = await settingService.getSetting();
  console.log(response.data);
  dataOfTable.value = response.data.data;
}

onMounted(async () => {
  getSetting();
});
</script>

<style scoped></style>
