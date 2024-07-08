<template>
  <div>
    <PopUpAddStudent
      v-if="showPopUpAddStudent"
      :class-id="$router.currentRoute.value.query.classID"
      class="absolute top-0 left-0 w-[200px]"
      @close="(showPopUpAddStudent = null), getStudentOfClass()"
      @add-toast="$emit('add-toast', $event)"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Danh sách các bé</span>
      <button
        class="bg-[#3B44D1] text-[14px] text-white flex items-center py-2 gap-2 px-2 rounded-md hover:bg-blue-900 active:scale-95"
        @click="showPopUpAddStudent = true"
      >
        <img :src="plus_icon" class="w-5 h-5" alt="" />
        <span>Thêm học sinh</span>
      </button>
    </div>
    <div class="mt-5">
      <LoaddingComp v-if="loading" class="h-40"></LoaddingComp>
      <table
        v-if="!loading"
        class="w-full text-start rounded-md overflow-hidden"
      >
        <thead class="bg-[#3b44d1] text-white text-start">
          <th class="px-3 py-1 w-[100px] text-start">Avatar</th>
          <th class="px-3 py-1 w-[500px] text-start">Học sinh</th>
          <th class="px-3 py-1 w-[500px] text-start">Giới tính</th>
          <th class="px-3 py-1 w-[300px] text-start">Ngày sinh</th>
          <th class="px-3 py-1 w-[300px] text-start">Thêm bởi</th>
          <th class="px-3 py-1 w-[300px] text-start">Ngày vào</th>
          <th class="px-3 py-1 w-[200px] text-start">Chức năng</th>
        </thead>
        <tbody>
          <tr
            v-for="item in members"
            :key="item"
            class="text-start even:bg-gray-50 hover:bg-gray-200"
          >
            <td class="px-3 py-2">
              <img
                :src="item.avatar || avatar_default"
                alt=""
                class="w-[50px] h-[50px] rounded-full object-cover"
              />
            </td>
            <td class="px-3 py-2">
              <dd>{{ item.name }}</dd>
              <dd class="text-[13px] text-gray-600">Mã: HS{{ item.id }}</dd>
            </td>
            <td class="px-3 py-2">{{ convertGender(item.gender) }}</td>
            <td class="px-3 py-2">
              {{
                ddmmyyyyDateString(new Date(item.birthday).toLocaleDateString())
              }}
            </td>
            <td class="px-3 py-2 text-[15px]">
              <dd>{{ item.username }}</dd>
              <dd class="text-[13px]">
                <span class="text-[13px] text-gray-500">Chức vụ: </span
                >{{ convertAccountRole(item.role) }}
              </dd>
            </td>
            <td class="px-3 py-2 text-[15px]">
              {{
                ddmmyyyyDateString(new Date(item.joined).toLocaleDateString())
              }}
            </td>
            <td class="px-3 py-2">
              <button class="px-1 py-1 hover:bg-white rounded-full">
                <img :src="change_icon" class="w-[20px] h-[20px]" alt="" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <EmptyComp v-if="members.length == 0 && !loading" class="h-[450px]" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import plus_icon from "../../../assets/icons/pls.svg";
import change_icon from "../../../assets/icons/Available Updates.svg";
import avatar_default from "../../../assets/icons/student.svg";
import PopUpAddStudent from "../components/popup_add_student_into_class.vue";
import classService from "../../../services/class.service";
import LoaddingComp from "../../../components/loading_comp.vue";
import EmptyComp from "../../../components/empty_data.vue";
import { convertGender } from "../../../utils/resources/converter";
import { ddmmyyyyDateString } from "../../../utils/resources/format_date";
import { convertAccountRole } from "../../../utils/resources/converter";
import { useRouter } from "vue-router";

//router
const router = useRouter();

//Valiable effect
const showPopUpAddStudent = ref(false);
const loading = ref(false);

//Varible data
const members = ref([]);

onMounted(() => {
  getStudentOfClass();
});

//function
async function getStudentOfClass() {
  loading.value = true;
  const response = await classService.getMembers(
    router.currentRoute.value.query.classID
  );

  loading.value = false;

  if (response.data.success) {
    members.value = response.data.data;
  }
}
</script>

<style scoped>
</style>