<template>
  <div class="bg-white ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div
      v-if="showRegisterImg"
      class="absolute w-full h-full bg-gray-500/75 left-0 top-0 z-30 content-center overflow-y-auto"
    >
      <button
        class="w-[40px] h-[40px] absolute right-10 top-10"
        @click="showRegisterImg = null"
      >
        <img :src="close_icon" />
      </button>
      <img
        class="m-auto bg-white rounded-xl w-[1000px] object-contain"
        :src="showRegisterImg"
      />
    </div>
    <RegisterDetailPopup
      v-if="registerToViewDetail"
      @close="closeRegisterDatailPopup"
      :data="registerToViewDetail"
    />
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="`Bạn có muốn xóa đơn đăng ký với số điện ${showConfirmDialog.phone} của người đăng ký tên ${showConfirmDialog.name} không?`"
      @confirm="getConfirm($event)"
      :value="showConfirmDialog"
    />
    <ConfirmDialog
      v-if="registerUpdateStatus"
      class="absolute top-0 left-0"
      :content="`Bạn có chắc chắn thay đổi trạng thái đơn mã ${
        registerUpdateStatus.id
      } thành '${convertRegisterStatus(registerUpdateStatus.status)}'  không?`"
      @confirm="comfirmChangeRegisterStatus($event)"
      :value="registerUpdateStatus"
    />

    <!-- Header -->
    <div
      class="text-left px-6 text-[36px] py-4 mb-5 font-bold border border-b-1"
    >
      Đơn đăng ký
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
    <ResultNumComp class="ml-8">{{ total }}</ResultNumComp>
    <div class="text-start mx-5 my-3 flex">
      <select
        class="input-text-default w-[200px]"
        @change="changeAdmissionPeriod()"
        v-model="admissionPeriod"
      >
        <option value="null">Chọn đợt tuyển sinh</option>
        <option
          v-for="item in admissionPeriodList"
          :key="item"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
      <VueDatePicker
        v-model="date"
        class="date-picker"
        :enable-time-picker="false"
        :range="{ partialRange: true }"
      />
    </div>
    <div
      v-if="registrations.length == 0 && status != 'loading'"
      class="h-full py-20 w-full align-center py-10"
    >
      <img :src="empty_icon" class="m-auto" alt="" />
      <span class="text-gray-500">Không có dữ liệu</span>
    </div>
    <div v-if="registrations.length !== 0">
      <!--Show muc-->
      <div v-if="admissionPeriod != 'null' && admissionPeriod != null">
        <div class="flex items-center">
          <ShowNumberComp
            :numb-show="limit"
            @change-limit="changeLimit($event)"
          ></ShowNumberComp>
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
        <LoadingComp
          v-if="status === 'loading' || status === 'initial'"
        ></LoadingComp>
        <TableComp
          v-if="status == 'loaded' && status !== 'initial'"
          :data="registrations"
          @delete-item="showConfirmDialog = $event"
          @edit-item="
            $router.push({
              name: 'RegisterAdditionView',
              query: { id: $event.id },
            })
          "
          @view="registerToViewDetail = $event"
          @create-new-student="createNewStudent($event)"
          @update-status="registerUpdateStatus = $event"
          @show-register-img="showRegisterImg = $event"
          @create-parent="createParent($event)"
        ></TableComp>
        {{ showConfirmDialog }}
        <div
          class="bottom-table-section flex justify-between my-3 h-[37px] content-center"
        >
          <div
            v-if="
              status !== 'search_failed' &&
              status !== 'load_failed' &&
              total !== 0
            "
            class="h-[37px] content-center mx-[20px]"
          >
            Hiển thị từ {{ page * limit + 1 }} đến
            {{ (page + 1) * limit - (limit - registrations.length) }} trong
            {{ total }} đơn đăng ký
          </div>
          <div
            v-if="status == 'search_failed' || total == 0"
            class="h-[37px] content-center mx-[20px]"
          >
            Không tìm thấy đơn đăng ký nào!
          </div>
          <div
            v-if="status == 'load_failed'"
            class="h-[37px] content-center mx-[20px]"
          >
            Không có đơn đăng ký nào tồn tại!
          </div>
          <Pagination
            :page-nums="round(total / limit)"
            :page-active="page + 1"
            @click-page="changePage($event)"
          ></Pagination>
        </div>
      </div>
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
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { isEmpty } from "../../../utils/resources/check_valid";
import LoadingComp from "../../../components/loading_comp.vue";
import close_icon from "../../../assets/icons/close.svg";
import ResultNumComp from "../../../components/result_comp.vue";
import ShowNumberComp from "../../../components/show_number_comp.vue";
import empty_icon from "../../../assets/icons/Empty Box.svg";
import addmissionPeriodService from "../../../services/admission_period.service";
import { convertRegisterStatus } from "../../../utils/resources/converter";
import io from "socket.io-client";
import { useRouter } from "vue-router";
import RegisterDetailPopup from "../components/popup_detail.vue";

const registrationStore = useRegistrionStore();
const { registrations, total, status, limit, page, searchText, statusIds } =
  storeToRefs(registrationStore);

const showConfirmDialog = ref(null);
const showRegisterImg = ref(null);

const admissionPeriodList = ref(null);

const admissionPeriod = ref(null);

const router = useRouter();

const date = ref();

const registerToViewDetail = ref(null);

async function changeAdmissionPeriod() {
  registrationStore.admission_period_id = admissionPeriod.value;
  registrationStore.page = 0;
  registrationStore.limit = 10;
  registrationStore.searchText = "";
  registrationStore.statusIds = [];

  const count = await registrationStore.countRegistration();
  fillStatusTotal(count);
  hasCheckStatus();
  registrationStore.getRegistration();
}

onMounted(async () => {
  if (!admissionPeriodList) {
    return;
  }

  if (registrationStore.admission_period_id == null) return;

  admissionPeriod.value = registrationStore.admission_period_id;

  const socket = io("http://localhost:9000");

  const count = await registrationStore.countRegistration();

  if (
    registrationStore.searchText !== "" &&
    registrationStore.statusIds.length != 0
  ) {
    await registrationStore.searchHasStatus();
  } else if (registrationStore.searchText !== "") {
    await registrationStore.searchRegistration();
  } else if (registrationStore.statusIds.length != 0) {
    await registrationStore.getRegistrationsWithStatus();
  } else {
    await registrationStore.getRegistration();
  }
  fillStatusTotal(count);

  hasCheckStatus();

  socket.on("changedRegisterStatus", async () => {
    const count = await registrationStore.getTotalOfStatus();
    fillStatusTotal(count);
    if (
      registrationStore.searchText !== "" &&
      registrationStore.statusIds.length != 0
    ) {
      await registrationStore.searchHasStatus();
    } else if (registrationStore.searchText !== "") {
      await registrationStore.searchRegistration();
    } else if (registrationStore.statusIds.length != 0) {
      await registrationStore.getRegistrationsWithStatus();
    } else {
      await registrationStore.getRegistration();
    }
  });
});
onBeforeMount(() => {
  getAddmissionPeriodOpenning();
});

onBeforeUnmount(() => {
  const socket = io("http://localhost:9000");
  socket.off("changedRegisterStatus");
});

function closeRegisterDatailPopup() {
  registerToViewDetail.value = null;
}

async function getAddmissionPeriodOpenning() {
  const response = await addmissionPeriodService.getAddmissionPeriod();

  if (response.data.success) {
    admissionPeriodList.value = response.data.data;
  }
}

const statusList = ref([
  { id: 0, name: "Đơn mới", checked: false, total: 0 },
  { id: 1, name: "Đã hẹn", checked: false, total: 0 },
  { id: 2, name: "Liên hệ lại", checked: false, total: 0 },
  { id: 3, name: "Đơn ảo", checked: false, total: 0 },
  { id: 4, name: "Hoàn thành", checked: false, total: 0 },
  { id: 5, name: "Chờ hủy", checked: false, total: 0 },
]);

async function changeChecked(event, item) {
  if (registrationStore.admission_period_id == null) return;
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
    await registrationStore.searchRegistration();
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
  } else {
    statusList.value.forEach((e) => {
      e.checked = false;
    });
  }
}
// const filterStatus = ref();

const emits = defineEmits(["add-toast"]);

const registerUpdateStatus = ref(null);

async function updateStatus(event) {
  const result = await registrationStore.updateStatus(
    event.id,
    event.status,
    event.status_before
  );
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
  const socket = io("http://localhost:9000");
  socket.emit("changeRegisterStatus");
  if (searchText.value != "") {
    registrationStore.searchHasStatus();
  } else {
    registrationStore.getRegistrationsWithStatus();
  }
  emits("add-toast", {
    title: "Cập nhật thành công",
    content: result.message,
    type: 0,
  });
}

async function comfirmChangeRegisterStatus(event) {
  if (!event) {
    registerUpdateStatus.value = null;
    return;
  }

  updateStatus(event);
  registerUpdateStatus.value = null;
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
  if (registrationStore.admission_period_id == null) return;
  registrationStore.changePage(event - 1);
}

function round(value) {
  return Math.ceil(value);
}
function changeLimit(event) {
  if (registrationStore.admission_period_id == null) return;
  registrationStore.changeLimit(event);
}
function close() {
  showCreateAccountView.value = false;
  registrationStore.getRegistration();
}
async function getSearchText(event) {
  if (registrationStore.admission_period_id == null) return;
  registrationStore.searchText = event;

  if (registrationStore.statusIds.length !== 0) {
    await registrationStore.searchHasStatus();
    return;
  }
  await registrationStore.searchRegistration(event);
}

function createNewStudent(event) {
  router.push({
    name: "ParentStudentCreationView",
    query: { register_id: event.id },
  });
}
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 12px 30px 11px 12px;
  width: 300px;
  margin: 5px 20px;
}
</style>