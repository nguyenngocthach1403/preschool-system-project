<template>
  <div class="h-full w-full mt-5">
    <!--a-->
    <section class="w-full my-10 flex gap-5 rounded-xl">
      <div class="w-[400px] h-[150px] rounded-md shadow p-5 text-start">
        <div>
          <span class="text-gray-500 text-[13px]">Mã đợt:</span>
          {{ admissionSelected ? admissionSelected.id : "" }}
        </div>
        <div>
          <span class="text-gray-500 text-[13px]">Tên đợt:</span>
          {{ admissionSelected ? admissionSelected.name : "" }}
        </div>
        <div>
          <span class="text-gray-500 text-[13px]">Người tạo:</span>
          {{ admissionSelected ? admissionSelected.username : "" }}
        </div>
        <div>
          <span class="text-gray-500 text-[13px]">Tạo ngày:</span>
          {{ admissionSelected ? admissionSelected.created : "" }}
        </div>
      </div>
      <div
        class="w-[400px] h-[150px] rounded-md content-center flex items-center gap-5 shadow p-5 align-center justify-center"
      >
        <div class="bg-blue-700 rounded-full w-[80px] h-[80px] content-center">
          <img :src="register_icon" class="w-[50px] m-auto" />
        </div>
        <div class="text-black h-full content-center">
          <span class="font-bold text-[15px]">Số người đăng ký</span>
          <p>
            <span class="font-bold text-[20px]">{{ totalRegistration }}</span>
          </p>
        </div>
      </div>
      <div
        class="w-[500px] h-[150px] rounded-md content-center flex text-[13px] gap-5 items-center"
      >
        <div class="w-full">
          <div class="py-2">
            <div
              class="border rounded-full py-1 bg-blue-800/25 text-blue-800 border-blue-800"
            >
              Đơn mới
            </div>
            <div class="font-bold text-[20px]">
              {{ returnStatusCount(0, statusCount) || 0 }}
            </div>
          </div>
          <div>
            <div
              class="border rounded-full py-1 bg-red-500/25 text-red-600 border-red-600"
            >
              Chờ hủy
            </div>
            <div class="font-bold text-[20px]">
              {{ returnStatusCount(5, statusCount) || 0 }}
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="py-2">
            <div
              class="border rounded-full py-1 bg-yellow-500/25 text-yellow-600 border-yellow-500"
            >
              Đơn ảo
            </div>
            <div class="font-bold text-[20px]">
              {{ returnStatusCount(3, statusCount) || 0 }}
            </div>
          </div>
          <div>
            <div
              class="border rounded-full py-1 bg-green-500/25 text-green-500 border-green-500"
            >
              Hoàn thành
            </div>
            <div class="font-bold text-[20px]">
              {{ returnStatusCount(4, statusCount) || 0 }}
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="py-2">
            <div
              class="border rounded-full py-1 bg-violet-800/25 text-violet-800 border-violet-800"
            >
              Đã hẹn
            </div>
            <div class="font-bold text-[20px]">
              {{ returnStatusCount(1, statusCount) || 0 }}
            </div>
          </div>
          <div>
            <div
              class="border rounded-full py-1 bg-amber-800/25 text-amber-800 border-amber-800"
            >
              Liên hệ lại
            </div>
            <div class="font-bold text-[20px]">
              {{ returnStatusCount(2, statusCount) || 0 }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full">
      <div class="flex w-full gap-5">
        <SearchForm class="w-[400px] my-2" />
        <VueDatePicker
          v-model="date"
          :enable-time-picker="false"
          :range="{ partialRange: true }"
        />
      </div>
      <div class="flex h-[500px] mb-10 gap-5">
        <div class="w-[700px]">
          <AdmissionTable
            :data="admissionList || []"
            @selected="selectedAdmission($event)"
          />
        </div>
        <div class="w-full">
          <RegistrationTable :data="registrationList" :loading="loading" />
          <Pagination
            :page-active="page"
            :page-nums="round(totalRegistration / limit)"
            class="my-2 bg-white w-full text-end pr-[20px]"
            @click-page="page = $event - 1"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import admissionService from "../../../services/admission_period.service";
import registrationService from "../../../services/registration.service";
import register_icon from "../../../assets/icons/Signing A Document.svg";
import AdmissionTable from "../components/admission_table.vue";
import RegistrationTable from "../components/registration_table.vue";
import Pagination from "../../../components/pagination.vue";
import SearchForm from "../../../components/search_form_comp.vue";
const admissionList = ref([1, 2, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1231]);
const showAdmissionList = ref(false);
const registrationList = ref([]);
const page = ref(0);
const limit = ref(20);
const admissionSelected = ref(null);
const statusCount = ref([]);
const totalRegistration = ref(0);
const loading = ref(false);
const date = ref([]);

function round(value) {
  return Math.ceil(value);
}

onMounted(() => {
  getAdmission();
});

function returnStatusCount(status, statusList) {
  console.log("statusList", statusList);
  if (statusList.length !== 0) {
    let hasStatus;
    statusList.forEach((element) => {
      if (element.status == status) {
        hasStatus = element;
      }
    });

    console.log("a", hasStatus);
    if (hasStatus != undefined) return hasStatus.total;
    return 0;
  }
}

function closeAdmissionList() {
  setTimeout(() => {
    showAdmissionList.value = false;
  }, 50);
}

async function getAdmission() {
  const response = await admissionService.getAddmissionPeriod();

  console.log(response);

  if (response.data.success) {
    admissionList.value = response.data.data;
    admissionList.value.sort(
      (a, b) => new Date(b.start_date) - new Date(a.start_date)
    );
  }
}

function selectedAdmission(event) {
  if (event) {
    admissionSelected.value = event;

    getRegistrationByAdmission(event.id);
  }
}

async function getRegistrationByAdmission(admission_id) {
  loading.value = true;
  const response = await registrationService.getRegistrations(
    admission_id,
    limit.value,
    page.value
  );

  loading.value = false;

  statusCount.value = response.data.status_count;

  totalRegistration.value = response.data.total;

  registrationList.value = response.data.data;
}
</script>

<style  scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 8px 30px 10px 12px;
  width: 300px;
  margin: 8px 0px;
}
</style>