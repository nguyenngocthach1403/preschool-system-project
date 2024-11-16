<template>
  <div class="h-full w-full mt-5">
    <!--a-->
    <PopupRegisterDeTail
      v-if="registerToViewDetail"
      @close="closeRegisterDatailPopup"
      :data="registerToViewDetail" />
    <CreateAdmissionPopUp
      v-if="showCreateAdmissionPopup"
      @close="closePopCreateAdmission()"
      @add-toast="$emit('add-toast', $event)" />
    <section class="w-full my-10 h-[170px] flex gap-5 rounded-xl">
      <div class="w-[250px] h-full rounded-md shadow p-5 text-start">
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
          {{
            admissionSelected
              ? ddmmyyyyDateString(
                  new Date(admissionSelected.created).toLocaleDateString()
                )
              : ""
          }}
        </div>
      </div>
      <div
        class="w-[280px] h-full rounded-md content-center flex items-center gap-5 shadow p-5 align-center justify-center">
        <div class="bg-blue-700 rounded-full w-[70px] h-[70px] content-center">
          <img
            :src="register_icon"
            class="w-[50px] m-auto" />
        </div>
        <div class="text-black h-full content-center">
          <span class="font-bold text-[15px]">Số người đăng ký</span>
          <p>
            <span class="font-bold text-[20px]">{{ totalRegistration }}</span>
          </p>
        </div>
      </div>
      <!-- <div
        class="w-[350px] h-full rounded-md content-center flex text-[13px] gap-5 items-center"
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
      </div> -->

      <!-- <div class="grow h-full border px-1 py-2 shadow">
        <div class="w-full grow h-full rounded-md align-start flex">
          <div class="w-[120px] overflow-y-auto">
            <button
              class="border py-1 h-fit w-full rounded-[3px] hover:bg-gray-200"
              v-for="(level, index) in levelList"
              :key="index"
              :class="{ select: levelSelected == level.value }"
              @click="
                getTotalSyllabusOfLevelByAdmission(
                  admissionSelected !== null ? admissionSelected.id : 0,
                  level.value
                ),
                  (levelSelected = level.value)
              ">
              {{ level.name }}
            </button>
          </div>
          <div
            v-if="loadingTotalSyllabus"
            class="h-full grow">
            <LoadingComp />
          </div>
          <div
            v-if="!loadingTotalSyllabus"
            class="h-full grow">
            <div
              class="border-b border-l border-gray-500 h-full rounded-[3px] mx-2 w-full flex items-end px-5 gap-5 span-1 overflow-x-auto">
              <div
                v-for="(item, index) in syllabusList"
                :key="index"
                class="text-center">
                {{ returnSyllabus(item.value) }}
                <div
                  class="w-5"
                  :class="{
                    'bg-red': index == 0,
                    'bg-blue': index == 1,
                    'bg-green': index == 2,
                    'bg-yellow': index == 3,
                    'bg-black': index == 4,
                  }"
                  :style="{
                    height:
                      (100 / totalRegistration) * returnSyllabus(item.value) +
                      'px',
                  }"></div>
              </div>
            </div>
          </div>
          <div class="grow-1 h-full overflow-y-auto">
            <div
              v-for="(syllabus, index) in syllabusList"
              :key="index"
              class="text-center flex gap-5 mx-3 items-center">
              <div
                class="w-5 h-5 rounded-md"
                :class="{
                  'bg-red': index == 0,
                  'bg-blue': index == 1,
                  'bg-green': index == 2,
                  'bg-yellow': index == 3,
                  'bg-black': index == 4,
                }"></div>
              <span>{{ syllabus.name }}</span>
            </div>
          </div>
        </div>
      </div> -->
    </section>

    <section class="w-full">
      <div class="flex w-full gap-5">
        <SearchForm class="w-[400px] my-2" />
        <VueDatePicker
          v-model="date"
          :enable-time-picker="false"
          :range="{ partialRange: true }" />
        <CreatButton
          class="my-2"
          @click="showCreateAdmissionPopup = true"></CreatButton>
      </div>
      <div class="flex h-[500px] mb-10 gap-5">
        <div class="w-[700px]">
          <AdmissionTable
            :data="admissionList || []"
            @selected="selectedAdmission($event)" />
        </div>
        <div class="w-full">
          <RegistrationTable
            :data="registrationList"
            :loading="loading"
            @view-detail="registerToViewDetail = $event" />
          <Pagination
            :page-active="page"
            :page-nums="round(totalRegistration / limit)"
            class="my-2 bg-white w-full text-end pr-[20px]"
            @click-page="page = $event - 1" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

//Assets
import register_icon from "../../../assets/icons/Signing A Document.svg";

//Component
import AdmissionTable from "../components/admission_table.vue";
import RegistrationTable from "../components/registration_table.vue";
import Pagination from "../../../components/pagination.vue";
import SearchForm from "../../../components/search_form_comp.vue";
import CreatButton from "../../../components/create_button.vue";
import CreateAdmissionPopUp from "../components/enrollment_creation_popup.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import PopupRegisterDeTail from "../../registration_page/components/popup_detail.vue";

//Service
import syllabusService from "../../../services/syllabus.service";
import levelService from "../../../services/levels.service";
import admissionService from "../../../services/enrollment.service";
import registrationService from "../../../services/registration.service";

//function
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";

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
const levelList = ref([]);
const syllabusList = ref([]);
const totalSyllabusByAdmission = ref([]);
const levelSelected = ref(0);

const showCreateAdmissionPopup = ref(false);
const loadingTotalSyllabus = ref(false);
const registerToViewDetail = ref(null);

function round(value) {
  return Math.ceil(value);
}

onMounted(() => {
  getAdmission();
  getLevel();
  getSyllabus();
});

watch(admissionSelected, () => {
  getTotalSyllabusOfLevelByAdmission(
    admissionSelected.value.id,
    levelSelected.value
  );
});

function returnStatusCount(status, statusList) {
  if (statusList.length !== 0) {
    let hasStatus;
    statusList.forEach((element) => {
      if (element.status == status) {
        hasStatus = element;
      }
    });
    if (hasStatus != undefined) return hasStatus.total;
    return 0;
  }
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
async function getLevel() {
  const response = await levelService.getLevels();
  for (let index = 0; index < response.data.data.length; index++) {
    const element = response.data.data[index];
    levelList.value.push({
      value: element.id,
      name: element.name,
    });
  }
  levelSelected.value = levelList.value[0].value;
}

async function getSyllabus() {
  const response = await syllabusService.getSyllabus();
  for (let index = 0; index < response.data.data.length; index++) {
    const element = response.data.data[index];
    syllabusList.value.push({
      value: element.id,
      name: element.name,
    });
  }
}

async function getTotalSyllabusOfLevelByAdmission(
  admission_period_id,
  level_id
) {
  loadingTotalSyllabus.value = true;
  const response = await levelService.getTotalSyllabusByAdmission(
    admission_period_id,
    level_id
  );

  console.log(response);

  if (response.status !== 200) {
    totalSyllabusByAdmission.value = [];
    loadingTotalSyllabus.value = false;
    return;
  }

  if (!response.data.success) {
    totalSyllabusByAdmission.value = [];
    loadingTotalSyllabus.value = false;
    return;
  }

  totalSyllabusByAdmission.value = response.data.data;
  loadingTotalSyllabus.value = false;
}
function returnSyllabus(syllabus_id) {
  return totalSyllabusByAdmission.value.find(
    (e) => e.syllabus_id == syllabus_id
  )
    ? totalSyllabusByAdmission.value.find((e) => e.syllabus_id == syllabus_id)
        .total
    : 0;
}

function closePopCreateAdmission() {
  showCreateAdmissionPopup.value = null;
  getAdmission();
}

function closeRegisterDatailPopup() {
  registerToViewDetail.value = null;
}
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 8px 30px 10px 12px;
  width: 300px;
  margin: 8px 0px;
}
.select {
  background-color: rgb(232, 232, 232);
}
.bg-blue {
  background-color: rgba(39, 39, 245, 0.824);
}
.bg-red {
  background-color: rgba(245, 39, 39, 0.824);
}
.bg-yellow {
  background-color: rgba(245, 242, 39, 0.824);
}
.bg-green {
  background-color: rgba(46, 245, 39, 0.824);
}
.bg-black {
  background-color: rgba(0, 0, 0, 0.726);
}
</style>
