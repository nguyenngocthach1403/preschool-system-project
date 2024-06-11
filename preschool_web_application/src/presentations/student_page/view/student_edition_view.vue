<template>
  <Layout
    class="h-screen overflow-y-scroll py-20"
    :title="'Cập nhật thông tin'"
    @close="$emit('close')"
  >
    <template #content>
      <form @submit.prevent="" class="w-full h-full px-[40px] text-start">
        <!-- Aavatar -->
        <div
          class="add-avatar w-[100px] h-[100px] m-auto bg-[#D9D9D9] rounded-md relative"
        >
          <img
            v-if="avatarPath"
            :src="avatarPath"
            class="w-[100px] h-[100px] m-auto object-cover rounded-md border-2"
          />
          <input
            type="file"
            class="absolute top-0 left-0 w-[100px] h-[100px] opacity-0"
            accept=".png, .jpeg, .jpg"
            @change="handleUploadImg"
          />
        </div>
        <p class="w-full text-center">Ảnh đại diện</p>
        <div id="YourName_YourClass" class="gap-5 flex mt-4">
          <div id="YourName" class="w-full">
            <label for="">
              <span class="pl-4 text-blue-700">Họ và tên</span>
              <input
                type="text"
                v-model="nameInput"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
          <div id="YourName" class="w-full">
            <label for="">
              <span class="pl-4 text-blue-700">Lớp</span>
              <input
                type="text"
                v-model="classInput"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
        </div>
        <div id="YourName_YourClass" class="gap-5 flex mt-4">
          <div id="YourName" class="w-full">
            <label for="">
              <span class="pl-4 text-blue-700">Giới tính</span>
              <!-- <input type="text" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4"> -->
              <select
                ref="selectGender"
                @change="genderInput = $event.target.value"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </label>
          </div>
          <div id="Gender" class="w-full">
            <label for="">
              <span class="pl-4 text-blue-700">Ngày sinh</span>
              <input
                type="date"
                ref="birthdayEle"
                v-model="birthdayInput"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
        </div>
        <div id="input-side-1" class="flex w-full gap-5 mt-4">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Nơi sinh</span>
            <input
              v-model="placeOfBirthInput"
              type="text"
              placeholder="Nhập nơi sinh"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Trạng thái</span>
            <input
              v-model="statusInput"
              type="text"
              placeholder="Nhập địa chỉ"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            />
          </label>
        </div>
        <div id="input-side-2" class="flex w-full gap-5 mt-4">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Dân tộc</span>
            <input
              v-model="forkInput"
              type="text"
              placeholder="Dân tộc"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Quốc tịch</span>
            <input
              v-model="nationInput"
              type="text"
              placeholder="Viet Nam"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            />
          </label>
        </div>
        <div id="input-side-3" class="flex w-full gap-5 mt-4">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Địa chỉ</span>
            <input
              v-model="addressInput"
              type="text"
              placeholder="Nhập địa chỉ"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Nguyên quán</span>
            <input
              v-model="placeOfOrginInput"
              type="text"
              placeholder="Nhập địa chỉ"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            />
          </label>
        </div>
      </form>
    </template>
    <template #bottom>
      <div
        id="button-side"
        class="w-full flex my-3 justify-center gap-5 basis-1/6"
      >
        <button
          type="button"
          @click="exitUpdate()"
          class="h-[45px] my-[5px] border border-[#3B44D1] hover:bg-blue-400 text-black px-[25px] rounded-md text-[20px]"
        >
          Hủy
        </button>
        <button
          v-if="status !== 'updating'"
          type="button"
          @click="updateStudent()"
          class="h-[45px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
        >
          Cập nhật
        </button>

        <button
          v-if="status == 'updating'"
          type="button"
          class="h-[45px] basis-1/11 rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
  </Layout>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import Layout from "@/components/edit_and_create_layout.vue";
import { useStudentStore } from "@/stores/student_store.js";
import { yyyymmddDateString } from "..//..//..//utils//resources//format_date";
import { storeToRefs } from "pinia";

const avatarPath = ref(null);
const avatarUpload = ref(null);
const nationInput = ref(null);
// const parentIdInput = ref(null);
const forkInput = ref(null);
const addressInput = ref(null);
const placeOfOrginInput = ref(null);

const studentStore = useStudentStore();

const { status } = storeToRefs(studentStore);

const emits = defineEmits(["add-toast", "close"]);

//Input
const nameInput = ref(null);
const classInput = ref(null);
const selectGender = ref(null);
const genderInput = ref(null);
const birthdayInput = ref(null);
const placeOfBirthInput = ref(null);
const statusInput = ref(null);
const statusGetParent = ref(null);
const messageGetParent = ref(null);

// //Hook
onMounted(() => {
  avatarPath.value = studentData.studentData.avatar;
  nameInput.value = studentData.studentData.name;
  classInput.value = studentData.studentData.class;
  selectGender.value.selectedIndex = studentData.studentData.gender;
  genderInput.value = studentData.studentData.gender;
  birthdayInput.value = yyyymmddDateString(studentData.studentData.birthday);
  forkInput.value = studentData.studentData.fork;
  addressInput.value = studentData.studentData.address;
  nationInput.value = studentData.studentData.nation;
  placeOfBirthInput.value = studentData.studentData.placeOfBirth;
  statusInput.value = studentData.studentData.status;
  placeOfOrginInput.value = studentData.studentData.origin;
});

const parentRemoved = ref([]);

const handleUploadImg = (event) => {
  //Lấy hình
  avatarUpload.value = event.target.files[0];

  //Kiểm tra tồn tại
  if (!avatarUpload) return;

  //Kiểm tra size
  if (avatarUpload.value.size / 1024 > 5120) {
    //Bỏ nếu quá dung lượng cho phếp
    avatarUpload.value = null;
    return;
  }

  //Tạo đường dẫn của ảnh
  avatarPath.value = URL.createObjectURL(avatarUpload.value);
};

// function deleteParentInList(parent) {
//   const index = parentListForDisplay.value.findIndex((e) => e.id == parent.id);
//   parentRemoved.value.push(parentListForDisplay.value[index]);
//   parentListForDisplay.value.splice(index, 1);
// }

// function returnRelation(rel) {
//   switch (rel) {
//     case 1:
//       return "Bố";
//     case 2:
//       return "Mẹ";
//     default:
//       break;
//   }
// }

async function updateStudent() {
  const formData = new FormData();

  if (avatarUpload.value !== null) {
    formData.append("files", avatarUpload.value);
  }
  formData.append("name", nameInput.value);
  formData.append("gender", genderInput.value);
  formData.append("birthday", birthdayInput.value);
  // formData.append("status", statusInput.value);
  formData.append("fork", forkInput.value);
  formData.append("nation", nationInput.value);
  formData.append("address", addressInput.value);
  formData.append("placeOfOrigin", placeOfOrginInput.value);
  formData.append("placeOfbirth", placeOfBirthInput.value);

  // let parentToUpdate = [];
  // parentListForDisplay.value.forEach((e) => {
  //   parentToUpdate.push({
  //     id: e.id,
  //     relationship: e.role,
  //   });
  // });

  // if (parentRemoved.value.length > 0) {
  //   let parentToRemove = [];
  //   parentListForDisplay.value.forEach((e) => {
  //     parentToRemove.push({
  //       id: e.id,
  //     });
  //   });
  //   formData.append("parentsRemove", JSON.stringify(parentToRemove));
  // }

  // formData.append("parents", JSON.stringify(parentToUpdate));

  const result = await studentStore.updateStudent(
    studentData.studentData.id,
    formData
  );

  if (!result.success) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: result.message,
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Cập nhật thành công",
    content: `Cập nhật học sinh ${nameInput.value} thành công.`,
    type: 0,
  });
}

function exitUpdate() {
  avatarUpload.value = null;
  avatarPath.value = studentData.studentData.avatar;
  nameInput.value = studentData.studentData.name;
  classInput.value = studentData.studentData.class;
  selectGender.value.selectedIndex = studentData.studentData.gender;
  genderInput.value = studentData.studentData.gender;
  birthdayInput.value = yyyymmddDateString(studentData.studentData.birthday);
  forkInput.value = studentData.studentData.fork;
  addressInput.value = studentData.studentData.address;
  nationInput.value = studentData.studentData.nation;
  placeOfBirthInput.value = studentData.studentData.placeOfBirth;
  statusInput.value = studentData.studentData.status;

  // parentListForDisplay.value = [
  //   ...parentListForDisplay.value,
  //   ...parentRemoved.value,
  // ];
  // studentData.studentData.parents = parentListForDisplay.value;
  // parentRemoved.value = [];
  emits("close");
}
const studentData = defineProps(["studentData"]);
</script>

<style scoped>
</style>