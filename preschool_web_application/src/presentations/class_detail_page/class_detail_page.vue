<template>
  <div>
    <div
      class="ml-4 mr-2 px-5 font-bold text-[21px] bg-white my-3 rounded-md py-3"
    >
      Thông tin lớp học
    </div>

    <div class="w-full ml-4 mr-2 text-center flex gap-2 pr-5">
      <!--Menu-->
      <div class="w-[350px] bg-white rounded-xl">
        <div
          v-if="classObject"
          class="w-full bg-white h-[100px] border-b rounded-md flex items-center px-5 gap-2"
        >
          <img
            :src="classObject.class_img"
            class="w-[60px] h-[70px] object-cover"
          />
          <div class="text-start">
            <p class="font-bold text-[19px]">{{ classObject.name }}</p>
            <p class="text-gray-500 text-[14px]">
              {{
                ddmmyyyyDateString(
                  new Date(classObject.start_date).toLocaleDateString()
                )
              }}
              -
              {{
                ddmmyyyyDateString(
                  new Date(classObject.end_date).toLocaleDateString()
                )
              }}
            </p>
            <p class="text-[14px]">
              {{
                convertClassStatus(classObject.start_date, classObject.end_date)
              }}
            </p>
          </div>
        </div>
        <div class="relative">
          <button
            class="py-4 w-full text-start px-6 ease-in-out duration-300 font-bold hover:bg-gray-200"
            v-for="(item, index) in menuList"
            :key="index"
            :class="{ active: item.active }"
            @click="selectTab($event, index)"
            ref="TabElement"
          >
            {{ item.title }}
          </button>
          <div
            ref="TabLineElement"
            class="bg-[#3b44d1] w-1 h-10 top-0 absolute right-0 rounded-md ease-in-out duration-300"
          ></div>
        </div>
      </div>
      <div class="w-full h-full bg-white rounded-xl">
        <!--Body-->
        <router-view @add-toast="$emit('add-toast', $event)"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import StudentListView from "./views/student_list_view.vue";
import ClassTeacherView from "./views/class_teachers_view.vue";
import ClassMenuView from "./views/class_menu_detail_view.vue";
//services
import ClassService from "../../services/class.service";
import { ddmmyyyyDateString } from "../../utils/resources/format_date";
import { convertClassStatus } from "../../utils/resources/converter";
import { useRouter } from "vue-router";

//router
const router = useRouter();

const classObject = ref(null);

//element
const TabLineElement = ref(null);
const TabElement = ref(null);

const menuList = ref([
  {
    id: 0,
    title: "Lịch học",
    active: true,
    name: "ClassScheduleView",
  },
  {
    id: 1,
    title: "Danh sách các bé",
    active: false,
    name: "ClassMemberView",
  },
  {
    id: 2,
    title: "Điểm danh",
    active: false,
  },
  {
    id: 3,
    title: "Giáo viên quản lý",
    active: false,
    name: "ClassManagerView",
  },
  {
    id: 4,
    title: "Thực đơn",
    active: false,
    name: "ClassMenuView",
  },
  {
    id: 5,
    title: "Quản lý đánh giá",
    active: false,
    name: "StudentReviewManagementView",
  },
]);

watch(classObject, () => {
  initialActiveTab();
});

/**
 * Phương thức lấy lớp học bằng Id
 * @param {interger} id
 */
async function fetchClassById(id) {
  try {
    const response = await ClassService.getClassById(id);
    const dbResponse = response.data.data;

    classObject.value = dbResponse;
    console.log(dbResponse);
  } catch (error) {
    //
  }
}

onMounted(() => {
  fetchClassById(router.currentRoute.value.query.classID);
});

//effect function
function initialActiveTab() {
  const indexHasActive = menuList.value.findIndex((e) => e.active);
  if (indexHasActive !== undefined) {
    TabLineElement.value.style.height =
      TabElement.value[indexHasActive].offsetHeight + "px";
    TabLineElement.value.style.top =
      TabElement.value[indexHasActive].offsetTop + "px";

    router.push({
      name: menuList.value[indexHasActive].name,
      query: { classID: router.currentRoute.value.query.classID },
    });
  }
}
function selectTab(event, index) {
  TabLineElement.value.style.height = event.target.offsetHeight + "px";
  TabLineElement.value.style.top = event.target.offsetTop + "px";

  //clear active
  menuList.value.forEach((el) => (el.active = false));

  //new active
  menuList.value[index].active = true;

  router.push({
    name: menuList.value[index].name,
    query: { classID: router.currentRoute.value.query.classID },
  });
}
function getCurrentActive(index) {
  return menuList.value[index].active;
}
</script>

<style scoped>
.active {
  color: #3b44d1;
}
</style>