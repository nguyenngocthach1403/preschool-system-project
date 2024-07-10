<template>
  <div class="ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <div class="m-auto w-[1300px] rounded-xl bg-white overflow-hidden relative">
      <!--background-->
      <div class="w-full h-[300px] bg-blue-800"></div>
      <!--Infor-->
      <div class="w-full h-[140px] flex items-center">
        <!--Avatar-->
        <div
          class="w-[130px] h-[130px] rounded-full absolute bottom-[60px] left-10 border-[5px] border-white relative"
        >
          <img
            :src="
              studentData !== null
                ? studentData.avatar
                : 'https://th.bing.com/th/id/OIP.ZE4ir71OG1JRH0NymdnGnwHaJ4?w=236&h=315&c=7&o=5&dpr=1.1&pid=1.20'
            "
            alt=""
            class="w-full h-full rounded-full"
          />
          <button
            class="w-7 h-7 bg-black absolute bottom-0 right-0 rounded-full z-40"
          ></button>
        </div>
        <!--Name and gender-->
        <div class="mx-[60px] text-start">
          <p class="text-2xl font-bold">
            Bé
            {{ studentData !== null ? studentData.name : "unknown" }}
          </p>
          <p class="text-[15px] text-gray-500">
            {{
              studentData !== null ? convertGender(studentData.gender) : "none"
            }}
          </p>
          <p class="text-[15px] text-gray-500">
            {{
              studentData !== null
                ? ddmmyyyyDateString(
                    new Date(studentData.birthday).toLocaleDateString()
                  )
                : "1/1/1988"
            }}
          </p>
        </div>
      </div>
      <!--Tab-->
      <div class="mx-10 my-5 flex border-b relative">
        <button
          class="px-5 py-3 h-fit"
          v-for="(tab, index) in tabList"
          :key="index"
          @click="selectTab($event, index)"
          :class="{ active: tab.active }"
          ref="TabElement"
        >
          {{ tab.title }}
        </button>
        <div
          ref="TabLineElement"
          class="h-1 bg-[#3b44d1] absolute bottom-0 rounded-md ease-in-out duration-300"
        ></div>
      </div>
      <StudentInformationView
        v-if="getTabActive(0)"
        :student-data="studentData"
      />
      <ClassHistoryView v-if="getTabActive(3)" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import studentService from "../../../services/student.service";
import { convertGender } from "../../../utils/resources/converter";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
import StudentInformationView from "../views/student_detail_infomation_view.vue";
import ClassHistoryView from "../views/class_history_view.vue";
const router = useRouter();

const studentData = ref(null);

//element
const TabLineElement = ref(null);
const TabElement = ref(null);

const tabList = ref([
  {
    title: "Chi tiết",
    active: true,
  },
  {
    title: "Biểu đồ sức khỏe",
    active: false,
  },
  {
    title: "Lịch sử khám sức khỏe",
    active: false,
  },
  {
    title: "Lịch sử lớp học",
    active: false,
  },
  {
    title: "Thành tích",
    active: false,
  },
]);

onMounted(() => {
  initialActiveTab();
  getStudentById();
});

//funciton
async function getStudentById() {
  if (!router.currentRoute.value.query.studentID) return;
  const response = await studentService.getStudentById(
    router.currentRoute.value.query.studentID
  );
  if (response.status !== 200) {
    return;
  }
  if (!response.data.success) {
    return;
  }

  studentData.value = response.data.data;

  console.log(response);
}

//effect function
function initialActiveTab() {
  const indexHasActive = tabList.value.findIndex((e) => e.active);
  if (indexHasActive !== undefined) {
    TabLineElement.value.style.width =
      TabElement.value[indexHasActive].offsetWidth + "px";
    TabLineElement.value.style.left =
      TabElement.value[indexHasActive].offsetLeft + "px";
  }
}
function selectTab(event, index) {
  TabLineElement.value.style.width = event.target.offsetWidth + "px";
  TabLineElement.value.style.left = event.target.offsetLeft + "px";

  //clear active
  tabList.value.forEach((el) => (el.active = false));

  //new active
  tabList.value[index].active = true;
}
function getTabActive(index) {
  return tabList.value[index].active;
}
</script>

<style  scoped>
.active {
  color: #3b44d1;
}
</style>