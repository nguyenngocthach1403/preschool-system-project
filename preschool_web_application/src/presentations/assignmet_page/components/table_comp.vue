<template>
  <div class="h-fit mr-[10px]">
    <PopupComfirm
      :content="
        isShowComfirm.oldTeacher
          ? 'Bạn có chắc muốn thay đổi người quản lý không?'
          : 'Bạn có chắc muốn thêm người quản lý không?'
      "
      v-if="isShowComfirm"
      :value="isShowComfirm"
      class="absolute top-0 left-0"
      @confirm="confirmChangeTeacher($event)"
    />
    <!--Table here-->
    <table class="h-fit w-full rounded-md">
      <thead
        class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10 text-start"
      >
        <tr>
          <th class="py-2 px-3 w-[100px]">Avatar</th>
          <th class="py-2 px-3 text-start w-[200px]">Tên lớp</th>
          <th class="py-2 px-3 w-[200px] text-start">Trạng thái</th>
          <th class="py-2 px-3 text-start">Niên khóa</th>
          <th class="py-2 px-3 text-start" v-for="role in roles" :key="role">
            {{ role.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in props.data"
          :key="item"
          class="even:bg-gray-200 hover:bg-[#3B44D1]/50"
          :class="classBacgroundStatus(item.status)"
        >
          <td class="px-5">
            <img :src="item.avatar || ''" class="w-10 h-10 rounded-md m-auto" />
          </td>
          <td class="px-3 py-3 text-start">{{ item.name }}</td>
          <td class="px-3 py-3 text-start">
            <div
              class="status w-fit text-[13px] px-[8px] py-1 rounded-md content-center"
              :class="status(item.status)"
            >
              {{ item.status }}
            </div>
          </td>
          <td class="px-3 py-3 text-start">{{ item.session }}</td>
          <td
            class="px-3 py-3 text-start"
            v-for="role in roles"
            :key="{ role, item }"
          >
            <!-- <InputSearchSingleSelect
              :value="''"
              :disabled="isDisaple(item)"
              :enable-sub="true"
              :select="
                item.managers[role.name].teachers
                  ? item.managers[role.name].teachers
                  : null
              "
              @selected="changeTeacherManger($event.id, item.id, role.id)"
              :options="teachers || []"
              class="h-[35px] w-[200px]"
            /> -->

            <select
              :disabled="isDisaple(item)"
              :value="
                item.managers[role.name].teachers
                  ? item.managers[role.name].teachers.id
                  : ''
              "
              class="w-[300px] rounded-md px-2 py-2 border outline-none hover:border-black"
              @change="
                changeTeacherManger(
                  $event.target.value,
                  item.id,
                  role.id,
                  item.managers[role.name].teachers || null
                )
              "
            >
              <option value="" disabled>Chọn giáo viên phụ trách</option>
              <option v-for="item in teachers" :key="item" :value="item.id">
                <span>{{ item.id }} - {{ item.name }}</span>
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
//icon
import { computed, onMounted, ref } from "vue";
//component
import InputSearchSingleSelect from "../../../components/selects/input_search_single_select.vue";
import PopupComfirm from "../../../components/confirm_dialog.vue";
//service
import classService from "../../../services/class.service";
import teacherService from "../../../services/teacher.service";

//
const isShowComfirm = ref(false);

//
const roles = ref([]);
const teachers = ref([]);
const teacherInput = ref(null);
//props
const props = defineProps({
  data: {
    type: Array,
    require: true,
  },
});
//emits
const emits = defineEmits(["update-manager-for-class"]);

async function fetchClassRole() {
  try {
    const response = await classService.getClassManagerRoles();

    const dataResponse = response.data;

    if (!dataResponse.data) {
      return undefined;
    }
    return dataResponse.data;
  } catch (error) {
    return undefined;
  }
}

const status = (status) => {
  switch (status) {
    case "Đang hoạt động":
      return "in-progress";
    case "Kết thúc":
      return "end";
    case "Sắp bắt đầu":
      return "in-comming";
    default:
      return "none";
  }
};

const classBacgroundStatus = (status) => {
  switch (status) {
    case "Đang hoạt động":
      return "bg-in-progress";
    case "Kết thúc":
      return "bg-end";
    case "Sắp bắt đầu":
      return "bg-in-comming";
    default:
      return "none";
  }
};
/**
 * Phương thức kiểm tra xem lớp còn hoat động hay không
 * @param {Object} item
 * @return {Boolean} True là kết thúc or False chưa kết thúc
 */
function isDisaple(item) {
  if (item.endDate < new Date()) return true;
  return false;
}
/**
 * Phương thức nhận giá trị thay đổi của giáo viên quản lý mới cho lớp và gửi đi sự kiện thay đổi giáo viên mới
 * @param {interger} teacherId
 * @param {interger} classId
 * @param {interger} roleId
 * @param {object} oldTeacher
 */
function changeTeacherManger(teacherId, classId, roleId, oldTeacher) {
  //comfirm
  isShowComfirm.value = {
    teacherId: teacherId,
    roleId: roleId,
    classId: classId,
    oldTeacher: oldTeacher,
  };
}
function confirmChangeTeacher(comfirm) {
  if (!comfirm) {
    isShowComfirm.value = null;
    return;
  }
  emits("update-manager-for-class", comfirm);

  isShowComfirm.value = null;
}
async function fetchTeachers() {
  try {
    const response = await teacherService.getTeacher(0, 20);

    const dataResponse = response.data;

    if (!dataResponse.data) {
      return undefined;
    }
    return dataResponse.data;
  } catch (error) {
    return undefined;
  }
}

function getTeacherId(teacher) {
  console.log(teacher);
}
onMounted(async () => {
  roles.value = (await fetchClassRole()) || [];
  teachers.value = (await fetchTeachers()) || [];
});
</script>

<style scoped>
/* .class {
  box-shadow: -2px 3px 8px rgba(0, 0, 0, 0.1) !important;
} */

.in-progress {
  background-color: rgba(187, 247, 208);
  border: 1px solid rgb(134 239 172) !important;
  color: rgb(22 163 74);
}
.end {
  background-color: rgb(254 202 202);
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
.in-comming {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
/* 
.bg-in-progress {
  background-color: rgb(113, 73, 73) !important;
}
.bg-end {
  background-color: rgb(254 202 202);
}
.bg-in-comming {
  background-color: rgba(175, 236, 255, 0.393) !important;
} */
</style>