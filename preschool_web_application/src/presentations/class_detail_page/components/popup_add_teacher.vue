<template>
  <LayoutPopup
    :title="'Thêm giáo viên quản lý lớp học'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-full h-[700px] px-10 overflow-y-auto align-center">
        <SearchForm
          :value="searctText"
          @pass-search-text="searctText = $event"
          class="w-[700px] m-auto"
        />
        <LoadingComp v-if="loading" class="w-full" />
        <div
          v-if="!loading"
          class="list-box w-full h-[620px] border rounded-md flex flex-wrap justify-between px-3 overflow-y-auto"
          @scroll="handleScroll($event)"
        >
          <div
            v-for="item in teachers"
            :key="item"
            :class="{ selected: selected == item }"
            @click="selectTeacher(item)"
            class="my-3 h-[250px] w-[440px] rounded-xl border-[1px] border-blue-500 bg-blue-100/50 hover:border-black"
          >
            <div class="w-full flex gap-2">
              <div class="my-2 mx-2">
                <div
                  class="w-[90px] h-[90px] rounded-full border-[1px] border-gray-300"
                >
                  <img :src="item.avatar || avartar_default" alt="" />
                </div>
              </div>
              <div
                class="border-[1px] my-2 mr-2 bg-white rounded-md border-gray-300 w-full text-start px-2"
              >
                <p>{{ item.name }}</p>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Ngày sinh: </span
                    ><span>{{
                      ddmmyyyyDateString(
                        new Date(item.birthday).toLocaleDateString()
                      )
                    }}</span>
                  </p>
                  <p>
                    <span class="text-gray-500">Giới tính: </span
                    ><span>{{ item.gender == 0 ? "Nam" : "Nữ" }}</span>
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Thâm niên: </span>
                    {{ item.seniority || 0 }} năm
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Số lớp đã tham gia: </span>
                    {{ item.class_attended_count }}
                    lớp
                  </p>
                </div>
              </div>
            </div>
            <div
              class="border-[1px] bg-white h-[130px] overflow-y-auto my-1 mx-2 rounded-md text-start px-2 border-gray-300"
            >
              <div v-if="item.specialization_managed.length > 0">
                <p>Chuyên môn</p>
                <ul class="px-5 text-[13px] list-disc">
                  <li v-for="spec in item.specialization_managed" :key="spec">
                    {{ spec.SpecializationName }}
                  </li>
                </ul>
              </div>
              <div v-if="item.specialization_managed.length == 0">
                <p>Chuyên môn</p>
                <ul class="px-5 text-[13px] list-disc">
                  <li>Chưa có</li>
                </ul>
              </div>
              <div v-if="item.certificate_managed.length > 0">
                <p>Học vị</p>
                <ul class="px-5 text-[13px] list-disc">
                  <li v-for="cer in item.certificate_managed" :key="cer">
                    {{ cer.CertificateName }}
                  </li>
                </ul>
              </div>
              <div v-if="item.certificate_managed.length == 0">
                <p>Học vị</p>
                <ul class="px-5 text-[13px] list-disc">
                  <li>Chưa có</li>
                </ul>
              </div>
            </div>
          </div>
          <EmptyComp v-if="teachers.length == 0 && loading !== true" />
          <LoadingComp
            v-if="hasData && teachers.length !== 0"
            class="loading"
          />
        </div>
      </div>
    </template>
    <template #bottom>
      <div
        id="button-side"
        class="w-full flex my-2 justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          type="button"
          @click="exit()"
          class="h-[35px] my-[5px] border border-[#3B44D1] hover:bg-blue-400/50 hover:text-[#3B44D1] hover:border-white text-black px-[25px] rounded-md"
        >
          Hủy
        </button>
        <button
          v-if="!adding"
          @click="addManagementPosition()"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md ]"
        >
          Cập nhật
        </button>

        <button
          v-if="adding"
          type="button"
          class="h-[35px] basis-1/11 rounded-md my-[5px] w-fit outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
          disabled
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button>
      </div>
    </template>
  </LayoutPopup>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
//Component
import LayoutPopup from "../../../components/edit_and_create_layout.vue";
import SearchForm from "../../../components/search_form_comp.vue";
import LoadingComp from "../../../components/loading_comp.vue";
import EmptyComp from "../../../components/empty_data.vue";

//Service
import teacherService from "../../../services/teacher.service";
import {
  yyyymmddDateString,
  ddmmyyyyDateString,
} from "../../../utils/resources/format_date";
//icon
import avartar_default from "../../../assets/icons/User.svg";
import classService from "../../../services/class.service";
const selected = ref(null);
const searctText = ref("");
const teachers = ref([]);

const page = ref(0);
const hasData = ref(true);
const loading = ref(true);
const adding = ref(false);
//prop
const props = defineProps({
  classRole: {
    type: Number,
    require: true,
  },
  classData: {
    type: Object,
    require: true,
  },
});
watch(searctText, () => {
  page.value = 0;
  hasData.value = true;
  teachers.value = [];
  getTeacherForAsignment();
});
//emits
const emits = defineEmits(["add-toast", "close"]);
//Function
async function getTeacherForAsignment() {
  console.log(props.classData);
  if (!hasData.value) return;
  if (!props.classData) return;
  try {
    if (teachers.value.length == 0) loading.value = true;
    const response = await teacherService.getTeacherForAssignment(
      searctText.value,
      yyyymmddDateString(
        new Date(props.classData.start_date).toLocaleDateString()
      ),
      yyyymmddDateString(
        new Date(props.classData.end_date).toLocaleDateString()
      ),
      8,
      page.value
    );
    if (response.data.data.length == 0 || response.data.data.length < 8) {
      hasData.value = false;
    }
    console.log(response);
    teachers.value = [...response.data.data, ...teachers.value];
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}

async function addManagementPosition() {
  try {
    adding.value = true;
    const response = await classService.addManagementPositionForClass(
      props.classData.id,
      props.classRole,
      selected.value.id
    );
    console.log(response);

    if (!response.data.success) {
      emits("add-toast", {
        title: response.data.error,
        type: 1,
      });
      return;
    }

    emits("add-toast", {
      title: response.data.error,
      type: 0,
    });
    close();
    adding.value = false;
  } catch (error) {
    emits("add-toast", {
      title: error.response.data.error,
      type: 1,
    });
  }
}

//handle
function handleScroll(Event) {
  if (
    Event.target.scrollTop + Event.target.clientHeight >=
    Event.target.scrollHeight
  ) {
    if (!hasData) return;
    page.value += 1;
    getTeacherForAsignment();
  }
}
function selectTeacher(item) {
  if (selected.value !== null && selected.value.id == item.id) {
    selected.value = null;
    return;
  }
  selected.value = item;
}
function close() {
  emits("close");
}
onMounted(() => {
  getTeacherForAsignment();
});
</script>

<style  scoped>
.selected {
  background-color: rgba(34, 34, 34, 0.829);
  overflow: hidden;
}
.loading {
  height: 50px !important;
}
.list-box {
  transition: all 1s;
}
</style>