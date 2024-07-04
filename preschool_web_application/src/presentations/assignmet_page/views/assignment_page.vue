<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1"
    >
      Quản lý phân công
    </div>
    <div class="flex justify-between px-5">
      <div class="flex gap-5">
        <SearchComp
          class="w-[400px]"
          v-on:passSearchText="searchText = $event"
        ></SearchComp>
        <select
          v-model="session"
          class="h-[45px] border rounded-md w-[150px] px-3"
        >
          <option value="">Tất cả</option>
          <option v-for="item in optionSession()" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <div class="flex gap-3 items-center">
          <ItemCheckBox
            v-for="item in statusList"
            :key="item"
            :content="item.name"
            :checked="item.checked"
            :id="item.id"
            :total="item.total"
            @change="changeChecked($event, item)"
            class="h-[30px]"
          />
        </div>
      </div>
      <!-- <CreateButtonComp /> -->
    </div>
    <ResultNumComp>{{ total }}</ResultNumComp>
    <TableComp
      :data="classes"
      @update-manager-for-class="updateMnagerForClass($event)"
      class="mt-5"
    ></TableComp>
    <div class="w-full mr-0 py-3">
      <PaginationComp class="m-auto" />
    </div>
  </div>
</template>

<script setup>
//component
import TableComp from "../components/table_comp.vue";
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
import ResultNumComp from "../../../components/result_comp.vue";
import PaginationComp from "../../../components/pagination.vue";
import ItemCheckBox from "../../registration_page/components/item_checkbox_filter.vue";
//Service
import classService from "../../../services/class.service";

//store
import { onMounted, ref, watch } from "vue";
import { useClassStore } from "../../../stores/class_store";
import { storeToRefs } from "pinia";
const classStore = useClassStore();

const { classes, limit, page, status, total } = storeToRefs(classStore);
const session = ref("");
const searchText = ref("");

const statusList = ref([
  { id: 0, name: "Đang diễn ra", checked: false, total: 0 },
  { id: 1, name: "Kết thúc", checked: false, total: 0 },
  { id: 2, name: "Sắp diễn ra", checked: false, total: 0 },
]);

onMounted(() => {
  classStore.fetchClass();
  if (classStore.totalStatus) {
    statusList.value[0].total = classStore.totalStatus.going_on;
    statusList.value[1].total = classStore.totalStatus.end;
    statusList.value[2].total = classStore.totalStatus.upcoming;
  }
});

//Watch
watch(session, () => {
  classStore.page = 0;
  if (classStore.session != session.value) {
    classStore.session = session.value;
    classStore.searchClasses();
  }
});
watch(searchText, () => {
  if (classStore.searchText != searchText.value) {
    classStore.page = 0;
    classStore.searchText = searchText.value;
    classStore.searchClasses();
  }
});
//emits
const emits = defineEmits(["add-toast"]);

const optionSession = () => {
  let options = [];
  for (let index = 0; index < 20; index++) {
    options.push(new Date().getFullYear() - index);
  }
  return options;
};

function loadClass() {
  if (searchText.value !== "") {
    classStore.searchClasses(searchText.value);
  } else {
    classStore.fetchClass();
  }
}

async function changeChecked(event, item) {
  item.checked = event.target.checked;

  classStore.statusIds = statusList.value
    .filter((e) => e.checked)
    .flatMap((e) => e.id);

  classStore.searchClasses();
}

/**
 * Hàm tương tác với người dùng gọi api gửi request đến server tạo người quản lý lớp mới hoặc cập nhật người mới
 * @param {Object} object
 */
async function updateMnagerForClass(object) {
  console.log(object);
  try {
    if (!object) return;
    const response = await classService.addManagementPositionForClass(
      object.classId,
      object.roleId,
      object.teacherId
    );
    const dataResponse = response.data;

    if (dataResponse.success)
      emits("add-toast", { title: "Thành công!", type: 0 });
    else
      emits("add-toast", {
        title: "Thất bại!",
        content: dataResponse.error,
        type: 1,
      });
    loadClass();
  } catch (error) {
    emits("add-toast", { title: "Thất bại!", type: 1 });
  }
}
</script>

<style scoped>
</style>