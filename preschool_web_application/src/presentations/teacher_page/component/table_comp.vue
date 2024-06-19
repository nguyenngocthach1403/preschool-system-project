<template>
  <div class="dashboard text-[14px]">
    <main>
      <div class="2xl:h-dvh mr-[10px]h-dvh">
        <table class="h-fit w-full">
          <thead
            class="sticky top-0 text-[15px] bg-[#3B44D1] text-white text-white z-10"
          >
            <tr>
              <th class="w-[300px]">Avatar</th>
              <th class="px-3 py-3 text-left">
                <div class="flex">
                  Họ và tên
                  <img
                    :src="sort_icon"
                    @click="$emit('sort-teacher-name')"
                    class="w-[20px] hover:bg-gray-200/25 rounded-full"
                  />
                </div>
              </th>
              <th>Giới tính</th>
              <th>Liên hệ</th>
              <!-- <th>Tên lớp</th>
              <th>Vai trò</th> -->
              <th>Lớp quản lý</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="h-[60px] text-left even:bg-gray-50 hover:bg-gray-200"
              v-for="teacher in dataTable"
              :key="teacher.id"
            >
              <td class="w-[200px]">
                <div class="ml-[15px]">
                  <img
                    :src="teacher.avatar"
                    class="w-[40px] h-[40px] rounded-[50px] object-cover"
                  />
                </div>
              </td>
              <td class="w-[500px]">{{ teacher.name }}</td>
              <td class="w-[200px]">
                {{ teacher.gender === 0 ? "Nam" : "Nữ" }}
              </td>
              <td class="w-[300px] text-gray-400">
                <dd>
                  <span>Email: </span>
                  <span class="text-gray-700">{{ teacher.email }}</span>
                </dd>
                <dd>
                  <span>Phone: </span>
                  <span class="text-gray-700">{{ teacher.phone }}</span>
                </dd>
              </td>
              <td class="w-[700px] text-gray-400">
                <div
                  v-for="(classInfo, index) in teacher.class_managed"
                  :key="index"
                >
                  <span>{{ classInfo.role_name }}</span>
                  <span class="text-gray-700"> của lớp </span>
                  <span>{{ classInfo.class_name }}</span>
                </div>
              </td>
              <td class="w-[200px]">
                <div class="flex">
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
                    @click="deleteTeacher(teacher)"
                  >
                    <img :src="delete_icon" class="w-[14px] m-auto" />
                  </div>
                  <div
                    class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center"
                    @click="editTeacher(teacher.id)"
                  >
                    <img :src="edit_icon" class="w-[14px] m-auto" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import moment from "moment";
import router from "@/router/router";
import delete_icon from "@/assets/icons/delete.svg";
import edit_icon from "@/assets/icons/edit.svg";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";

const emits = defineEmits(["add-toast"]);

defineProps({
  dataTable: {
    type: Array,
    required: true,
  },
});

const editTeacher = (teacherId) => {
  router.push({ name: "TeacherEditView", params: { id: teacherId } });
  console.log(teacherId);
};
function deleteTeacher(teacherIdToDel) {
  emits("delete-teacher", teacherIdToDel);
}
</script>

<style scoped>
th,
td {
  padding: 10px;
  border: 0px solid #ffffff;
  text-align: left;
}

th {
  white-space: nowrap;
}
</style>
