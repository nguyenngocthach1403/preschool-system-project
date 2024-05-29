<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit mb-20 py-3">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="showConfirmDialog"
      @confirm="getConfirm($event)"
    />
    <!-- <CreateAccountView
      v-if="showCreateAccountView"
      class="absolute top-0 left-0"
      @close="showCreateAccountView = false"
      @add-toast="$emit('add-toast', $event), close()"
    /> -->
    <div class="text-left px-[20px] text-[36px] font-bold">Parent</div>
    <div class="flex justify-between content-center mr-3">
      <SearchForm @passSearchText="getSearchText"></SearchForm>

      <router-link :to="{ name: 'ParentCreationView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>
    <div class="my-2 w-full text-start px-6">
      Hiển thị
      <select
        id="show-num-parent"
        class="w-fit h-[30px] border rounded-md outline-none border-black px-2"
        @change="showParentNumSelectChange"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="100">100</option>
      </select>
      Phụ huynh
    </div>
    <TableData
      :data-table="parents"
      @delete-parent="deleteParentById"
    ></TableData>
    <div
      class="bottom-table-section flex justify-between h-[37px] content-center my-3"
    >
      <div
        v-if="status !== 'search_failed' && status !== 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - parents.length) }} trong
        {{ total }} phụ huynh
      </div>
      <div
        v-if="status == 'search_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Not found any parent!
      </div>
      <div
        v-if="status == 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        There are no parent!
      </div>
      <Pagination
        v-if="status !== 'search_failed' || status !== 'load_failed'"
        :page-nums="round(total / limit)"
        :page-active="page + 1"
        @click-page="changePage($event)"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import TableData from "../data/table_parent.vue";
import SearchForm from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
import Pagination from "../../../components/pagination.vue";
import ConfirmDialog from "@/components/confirm_dialog.vue";
// import CreateAccountView from "../../parent_page/views/add_account.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useParentStore } from "../../../stores/parent_store";

const parentStore = useParentStore();
const showConfirmDialog = ref("");
// const showCreateAccountView = ref(false);
// const parentItem = ref(null);
const { parents, page, limit, loading, total, status } =
  storeToRefs(parentStore);
onMounted(async () => {
  parentStore.getParent();
  //Get total
  parentStore.getTotalParent();
});
const searchText = ref("");

const getSearchText = (event) => {
  searchText.value = event;
  parentStore.txtSearch = searchText.value;
  // call Api search
  parentStore.searchParent(event);
  console.log(event);
};
function round(value) {
  return Math.ceil(value);
}

function changePage(event) {
  const page = event - 1;
  parentStore.changePage(page);
}
function showParentNumSelectChange(event) {
  parentStore.changeLimit(parseInt(event.target.value));
}
// function createAccountShow(parentId) {
//   showCreateAccountView.value = true;
//   parentItem.value = parentId;
// }
// function close() {
//   showCreateAccountView.value = false;
//   parentStore.getParent();
// }
const getConfirm = (event) => {
  if (event) {
    const parentToDel = JSON.parse(localStorage.getItem("parentToDel") || {});

    deleteParent(parentToDel);

    showConfirmDialog.value = null;
  } else {
    showConfirmDialog.value = null;
  }
};
const emits = defineEmits(["add-toast"]);
const deleteParentById = (event) => {
  localStorage.setItem("parentToDel", JSON.stringify(event));
  showConfirmDialog.value = "Bạn có muốn xóa  " + event.name + " không?";
};
async function deleteParent(parentToDel) {
  const resultOfDel = await parentStore.deleteParentInDB(parentToDel.id);

  if (resultOfDel) {
    emits("add-toast", {
      title: "Detele Successfully!",
      content: "Delete " + parentToDel.name + " parent",
      type: 0,
    });
  } else {
    //emit toast
    emits("add-toast", {
      title: "Detele Failed!",
      content: `Not found ${parentToDel.name}`,
      type: 1,
    });
  }
}
</script>

<style scoped></style>
