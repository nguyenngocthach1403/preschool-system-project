<template>
  <div class="bg-white ml-4 h-fit rounded-3xl text-center mb-20 mb-3">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa phụ huynh ${showConfirmDialog.name} không?`"
      :value="showConfirmDialog"
      @confirm="getConfirm($event)"
    />
    <CreateAccountView
      v-if="showCreateAccountView"
      class="absolute top-0 left-0"
      :parent-id="showCreateAccountView"
      @close="closeAccountCreationView()"
      @add-toast="$emit('add-toast', $event)"
    />
    <div class="text-left px-6 text-[36px] py-4 font-bold border border-b-1">
      Phụ huynh
    </div>

    <div class="flex justify-between content-center mr-3 mt-5">
      <SearchForm
        @passSearchText="getSearchText"
        class="w-[400px] ml-[20px]"
      ></SearchForm>

      <router-link :to="{ name: 'ParentCreationView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>
    <ResultNumComp>{{ total }}</ResultNumComp>

    <ShowNumberComp :numb-show="limit" @change-limit="changeLimit($event)" />

    <TableData
      :data-table="parents"
      @sort-parent-name="sortDataByName"
      @sort-parent-role="sortDataByRole"
      @sort-parent-status="sortDataByStatus"
      @delete-parent="showConfirmDialog = $event"
      @create-account-for-parent="showCreateAccountView = $event"
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
import CreateAccountView from "../../account_page/components/create_account_view.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useParentStore } from "../../../stores/parent_store";
import ResultNumComp from "../../../components/result_comp.vue";
import ShowNumberComp from "../../../components/show_number_comp.vue";

const parentStore = useParentStore();
const showConfirmDialog = ref("");
const dataOfTable = ref([]);
const showCreateAccountView = ref(false);
// const parentItem = ref(null);
const { parents, page, limit, loading, total, status } =
  storeToRefs(parentStore);
onMounted(async () => {
  parentStore.getParent();
  //Get total
  parentStore.getTotalParent();
  // dataOfTable.value = parentStore.parents;
  console.log(parents.value);
});
const searchText = ref("");

const getSearchText = (event) => {
  searchText.value = event;

  if (event != parentStore.txtSearch) {
    parentStore.txtSearch = searchText.value;
    parentStore.page = 0;
  }

  // call Api search
  parentStore.searchParent();
};
function round(value) {
  return Math.ceil(value);
}

function changePage(event) {
  const page = event - 1;
  parentStore.changePage(page);
}
function changeLimit(event) {
  parentStore.changeLimit(event);
}
// function createAccountShow(parentId) {
//   showCreateAccountView.value = parentId;
//   alert(showCreateAccountView.value);
// }
// function close() {
//   showCreateAccountView.value = false;
//   parentStore.getParent();
// }

function closeAccountCreationView() {
  showCreateAccountView.value = null;

  if (parentStore.txtSearch != "") {
    parentStore.searchParent(parentStore.txtSearch);
    return;
  }
  parentStore.getParent();
}

const getConfirm = (event) => {
  if (!event) {
    showConfirmDialog.value = null;
    return;
  }
  deleteParent(event);
  showConfirmDialog.value = null;
};
const emits = defineEmits(["add-toast"]);
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
const sortOrderName = ref(null);
const sortOrderRole = ref(null);
const sortOrderStatus = ref(null);
const sortDataByName = () => {
  // Nếu đang sắp xếp tăng dần, chuyển sang sắp xếp giảm dần
  if (sortOrderName.value === "asc") {
    parents.value.sort((a, b) =>
      b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
    sortOrderName.value = "desc";
  } else {
    parents.value.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    sortOrderName.value = "asc";
  }
};
const sortDataByRole = () => {
  if (sortOrderRole.value === "asc") {
    parents.value.sort((a, b) => a.role - b.role);
    sortOrderRole.value = "desc";
  } else {
    parents.value.sort((a, b) => b.role - a.role);
    sortOrderRole.value = "asc";
  }
};
const sortDataByStatus = () => {
  if (sortOrderStatus.value === "asc") {
    parents.value.sort((a, b) => a.status - b.status);
    sortOrderStatus.value = "desc";
  } else {
    parents.value.sort((a, b) => b.status - a.status);
    sortOrderStatus.value = "asc";
  }
};
</script>

<style scoped></style>
