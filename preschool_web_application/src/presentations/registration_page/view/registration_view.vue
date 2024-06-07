<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa đơn đăng ký với số điện ${showConfirmDialog.phone} của người đăng ký tên ${showConfirmDialog.name} không?`"
      @confirm="getConfirm($event)"
      :value="showConfirmDialog"
    />
    <CreateAccountView
      v-if="showCreateAccountView"
      class="absolute top-0 left-0"
      @close="showCreateAccountView = false"
      :registration="registerItem"
      @add-toast="$emit('add-toast', $event), close()"
    />
    <!-- Header -->
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1"
    >
      Registration
    </div>

    <!-- Search-->
    <div class="flex justify-between content-center mr-3">
      <SearchFormComp
        @passSearchText="getSearchText($event)"
        class="w-[400px] ml-[20px]"
        :value="searchText"
      ></SearchFormComp>
      <router-link :to="{ name: 'RegisterAdditionView' }">
        <CreateButtonComp></CreateButtonComp>
      </router-link>
    </div>

    <!--Show muc-->
    <div class="flex items-center">
      <div class="my-2 w-[400px] text-start px-6">
        Hiển thị
        <select
          id="show-num-student"
          class="w-fit h-[30px] border rounded-md outline-none border-black px-2"
          @change="showStudentNumSelectChange"
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
        Danh mục
      </div>
      <div class="w-full flex gap-2">
        <ItemCheckBox
          v-for="item in statusList"
          :key="item"
          :content="item.name"
          :checked="item.checked"
          :id="item.id"
          :total="item.total"
          @change="changeChecked($event, item)"
        >
        </ItemCheckBox>
      </div>
    </div>

    <!-- Quick search -->

    <!-- Table components -->
    <TableComp
      :data="registrations"
      @delete-item="showConfirmDialog = $event"
      @edit-item="
        $router.push({
          name: 'RegisterAdditionView',
          query: { id: $event.id },
        })
      "
      @click-create-acount="createAccountShow($event)"
      @update-status="updateStatus($event)"
    ></TableComp>
    {{ showConfirmDialog }}
    <div
      class="bottom-table-section flex justify-between my-3 h-[37px] content-center"
    >
      <div
        v-if="
          status !== 'search_failed' && status !== 'load_failed' && total !== 0
        "
        class="h-[37px] content-center mx-[20px]"
      >
        Hiển thị từ {{ page * limit + 1 }} đến
        {{ (page + 1) * limit - (limit - registrations.length) }} trong
        {{ total }} danh mục
      </div>
      <div
        v-if="status == 'search_failed' || total == 0"
        class="h-[37px] content-center mx-[20px]"
      >
        Không tìm thấy danh mục nào!
      </div>
      <div
        v-if="status == 'load_failed'"
        class="h-[37px] content-center mx-[20px]"
      >
        Không có danh mục nào tồn tại!
      </div>
      <Pagination
        :page-nums="round(total / limit)"
        :page-active="page + 1"
        @click-page="changePage($event)"
      ></Pagination>
    </div>
  </div>
</template>

<script setup>
import CreateButtonComp from "../../../components/create_button.vue";
import ConfirmDialog from "../../../components/confirm_dialog.vue";
import TableComp from "../components/table.vue";
import CreateAccountView from "../../account_page/components/create_account_view.vue";
import SearchFormComp from "../../../components/search_form_comp.vue";
import Pagination from "../../../components/pagination.vue";
import ItemCheckBox from "../components/item_checkbox_filter.vue";
import { storeToRefs, mapState } from "pinia";
import { useRegistrionStore } from "../../../stores/registration_store";
import { onMounted, ref, watch } from "vue";
import { isEmpty } from "../../../utils/resources/check_valid";

const registrationStore = useRegistrionStore();
const {
  registrations,
  total,
  status,
  limit,
  page,
  loading,
  searchText,
  statusIds,
} = storeToRefs(registrationStore);

const showConfirmDialog = ref(null);

onMounted(async () => {
  const count = await registrationStore.countRegistration();

  if (
    registrationStore.searchText !== "" &&
    registrationStore.statusIds.length != 0
  ) {
    registrationStore.searchHasStatus();
  } else if (registrationStore.searchText !== "") {
    registrationStore.searchRegistration();
  } else if (registrationStore.statusIds.length != 0) {
    registrationStore.getRegistrationsWithStatus();
  } else {
    registrationStore.getRegistration();
  }
  fillStatusTotal(count);

  hasCheckStatus();
});

const statusList = ref([
  { id: 0, name: "Đơn mới", checked: false, total: 0 },
  { id: 1, name: "Chờ duyệt", checked: false, total: 0 },
  { id: 2, name: "Chờ liên hệ", checked: false, total: 0 },
  { id: 3, name: "Đã liên hệ", checked: false, total: 0 },
  { id: 4, name: "Hoàn thành", checked: false, total: 0 },
  { id: 5, name: "Đã hủy", checked: false, total: 0 },
]);

async function changeChecked(event, item) {
  item.checked = event.target.checked;
  if (event.target.checked) {
    registrationStore.checkSatusIds(item.id);
  } else {
    if (registrationStore.statusIds.includes(item.id)) {
      registrationStore.statusIds.splice(
        registrationStore.statusIds.findIndex((e) => e == item.id),
        1
      );
    }
  }

  if (
    registrationStore.searchText !== "" &&
    registrationStore.statusIds.length !== 0
  ) {
    await registrationStore.searchHasStatus();
  } else if (registrationStore.searchText !== "") {
    registrationStore.searchRegistration();
  } else {
    if (registrationStore.statusIds.length > 0) {
      await registrationStore.getRegistrationsWithStatus();
    } else {
      await registrationStore.getRegistration();
    }
  }
}

function fillStatusTotal(statusTotal) {
  // console.log("a", statusTotal[0]);
  for (let index = 0; index < statusTotal.length; index++) {
    const element = statusTotal[index];

    const id = statusList.value.findIndex((e) => e.id == element.status);
    statusList.value[id].total = element.total;
  }
}

function hasCheckStatus() {
  if (registrationStore.statusIds.length > 0) {
    registrationStore.statusIds.forEach((e) => {
      statusList.value[e].checked = true;
    });
  }
}
// const filterStatus = ref();

const emits = defineEmits(["add-toast"]);
const showCreateAccountView = ref(false);

const registerItem = ref(null);

async function updateStatus(event) {
  const result = await registrationStore.updateStatus(event.id, event.status);
  if (!result) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: result.error,
      type: 1,
    });
    return;
  }
  const count = await registrationStore.getTotalOfStatus();
  fillStatusTotal(count);
  emits("add-toast", {
    title: "Cập nhật thành công",
    content: result.message,
    type: 0,
  });
}

async function getConfirm(event) {
  if (!event) {
    showConfirmDialog.value = null;
    return;
  }

  //Call delete function
  const result = await registrationStore.deleteRegistration(event);

  if (!result.success) {
    emits("add-toast", {
      title: "Thất bại.",
      content: result.message,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Thành công.",
    content: result.message,
    type: 0,
  });

  if (
    registrationStore.statusIds.length != 0 &&
    !isEmpty(registrationStore.searchText)
  ) {
    await registrationStore.searchHasStatus();
  } else if (!isEmpty(registrationStore.searchText)) {
    registrationStore.searchRegistration();
  } else {
    if (registrationStore.statusIds.length != 0) {
      await registrationStore.getRegistrationsWithStatus();
    } else {
      await registrationStore.getRegistration();
    }
  }

  showConfirmDialog.value = null;
}
function changePage(event) {
  registrationStore.changePage(event - 1);
}
function createAccountShow(event) {
  showCreateAccountView.value = true;
  registerItem.value = event;
}
function round(value) {
  return Math.ceil(value);
}
function showStudentNumSelectChange(event) {
  registrationStore.changeLimit(parseInt(event.target.value));
}
function close() {
  showCreateAccountView.value = false;
  registrationStore.getRegistration();
}
async function getSearchText(event) {
  registrationStore.searchText = event;

  if (registrationStore.statusIds.length !== 0) {
    const result = await registrationStore.searchHasStatus();
    // if (!result.success) {
    //   emits("add-toast", {
    //     title: "Cập nhật thất bại",
    //     content: result.error,
    //     type: 1,
    //   });
    // }
    return;
  }
  await registrationStore.searchRegistration(event);
}
</script>