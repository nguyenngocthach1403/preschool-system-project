<template>
  <!-- <div class="w-full relative"> -->
  <div class="ml-4 rounded-3xl text-center h-fit pb-[10px]">
    <ConfirmDialog
      v-if="showConfirmDialog"
      class="absolute top-0 left-0"
      :content="`Bạn có chắc chắn cập nhật thông tin tài khoản không?`"
      @confirm="getConfirm($event)"
    />
    <!--background-->
    <div class="w-full h-[200px] bg-blue-800"></div>
    <div class="w-full h-[140px] flex items-center">
      <!--Avatar-->
      <div
        class="w-[130px] h-[130px] rounded-full absolute bottom-[60px] left-10 border-[5px] border-white relative"
      >
        <img :src="avatarPath" alt="" class="w-full h-full rounded-full" />
        <!-- <div
          class="feature w-7 h-7 absolute rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(53,61,186)] content-center bottom-0 right-0 rounded-full z-40"
        >
          <img :src="edit_icon" class="w-[14px] m-auto" />
          <label>
            <input
              id="fileInput"
              type="file"
              accept=".png, .jpeg, .jpg"
              class="hidden"
              @change="handleUploadParentImg"
            />
            <img :src="edit_icon" class="w-[14px] m-auto" />
          </label>
        </div> -->
      </div>

      <!--Name and gender-->
      <div class="mx-[60px] text-start">
        <p class="text-2xl font-bold">{{ name }}</p>
      </div>
    </div>
    <div class="m-10 border rounded-md">
      <div
        class="w-full py-4 px-10 font-bold text-[18px] border-b text-start flex items-center star"
      >
        <span>Thông tin cá nhân</span>
        <span class="ml-5"
          ><div
            class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
            @click="toggleEditParent"
          >
            <img :src="edit_icon" class="w-[14px] m-auto" /></div
        ></span>
        <span
          v-if="allowEditParent == false"
          class="text-gray-500 text-sm font-italic ml-8"
          >Nếu muốn chỉnh sửa thông tin vui lòng bấm icon</span
        >
        <span
          v-if="allowEditParent == true"
          class="text-gray-500 text-sm font-italic ml-8"
          >Thông tin đang được mở khoá để sửa, bấm icon để tắt hoặc bấm cập nhật
          thông tin mới</span
        >
      </div>
      <div class="w-full px-10 py-5 content-center text-start">
        <!--Form-->
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Họ và tên</span>
              <input
                type="text"
                class="input-text-default"
                v-model="name"
                :disabled="!allowEditParent"
                :class="{ 'in-valid': messageOfParentName }"
              />
              <div
                v-if="messageOfParentName"
                class="mt-1 mb-2 h-[25px] text-red-500"
              >
                <span>{{ messageOfParentName }}</span>
              </div>
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Vai trò</span>
              <select
                v-model="role"
                class="input-text-default"
                :disabled="!allowEditParent"
              >
                <option value="null">Chọn mối quan hệ</option>
                <option value="0">Bố</option>
                <option value="1">Mẹ</option>
                <option value="2">Người giám hộ</option>
              </select>
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Ngày sinh</span>
              <VueDatePicker
                :enable-time-picker="false"
                v-model="birthday"
                :disabled="!allowEditParent"
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Giới tính</span>
              <select
                type="text"
                class="input-text-default"
                v-model="gender"
                :disabled="!allowEditParent"
              >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Số điện thoại</span>
              <input
                type="text"
                class="input-text-default"
                :disabled="!allowEditParent"
                v-model="phone_parent"
                :class="{ 'in-valid': messageOfParentPhone }"
              />
              <div
                v-if="messageOfParentPhone"
                class="mt-1 mb-2 h-[25px] text-red-500"
              >
                <span>{{ messageOfParentPhone }}</span>
              </div>
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Địa chỉ</span>
              <input
                type="text"
                class="input-text-default"
                v-model="address"
                :disabled="!allowEditParent"
              />
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Email</span>
              <input
                type="text"
                class="input-text-default"
                :disabled="!allowEditParent"
                v-model="email_parent"
                :class="{ 'in-valid': messageOfParentEmail }"
              />
              <div
                v-if="messageOfParentEmail"
                class="mt-1 mb-2 h-[25px] text-red-500"
              >
                <span>{{ messageOfParentEmail }}</span>
              </div>
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Nghề nghiệp</span>
              <input
                type="text"
                class="input-text-default"
                :disabled="!allowEditParent"
                v-model="job"
              />
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Số lượng con theo học tại trường</span>
              <input
                type="text"
                class="input-text-default"
                v-model="countStudent"
                disabled
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Trạng thái hoạt động</span>
              <select
                v-model="status_parent"
                class="input-text-default"
                disabled
              >
                <option value="null">selected</option>
                <option value="0">Không hoạt động</option>
                <option value="1">Hoạt động</option>
              </select>
            </label>
          </div>
        </section>
      </div>
      <!-- </div> -->
      <!-- <div id="button-side" class="w-full flex justify-end px-10 py-5">
        <button
          @click.prevent="updateParent()"
          v-if="!updating"
          type="submit"
          class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
        >
          Cập nhật
        </button>
        <button
          v-if="updating"
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
      </div> -->
    </div>
    <!-- Thông tin account -->
    <div class="m-10 border rounded-md">
      <div
        class="w-full py-4 px-10 font-bold text-[18px] border-b text-start flex items-center star"
      >
        <span>Thông tin tài khoản</span>
        <span class="ml-3"
          ><div
            class="feature w-[35px] h-[30px] rounded-[50px] bg-gray-100/75 mr-[3px] hover:bg-[rgb(206,44,44)] content-center"
            @click="toggleEditAccount"
          >
            <img :src="edit_icon" class="w-[14px] m-auto" /></div
        ></span>
        <span
          v-if="allowEditAccount == false"
          class="text-gray-500 text-sm font-italic ml-8"
          >Nếu muốn chỉnh sửa thông tin vui lòng bấm icon</span
        >
        <span
          v-if="allowEditAccount == true"
          class="text-gray-500 text-sm font-italic ml-8"
          >Thông tin đang được mở khoá để sửa, bấm icon để tắt hoặc bấm cập nhật
          thông tin mới</span
        >
      </div>
      <div class="w-full px-10 py-5 content-center text-start">
        <!--Form-->
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Tên tài khoản</span>
              <input
                type="text"
                class="input-text-default"
                disabled
                v-model="username"
              />
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Mật khẩu</span>
              <input
                type="text"
                class="input-text-default"
                v-model="password"
                :disabled="!allowEditAccount"
                :class="{ 'in-valid': messageOfAccountPassword }"
              />
              <div
                v-if="messageOfAccountPassword"
                class="mt-1 mb-2 h-[25px] text-red-500"
              >
                <span>{{ messageOfAccountPassword }}</span>
              </div>
            </label>
          </div>
        </section>
        <section class="w-full my-5 flex gap-5">
          <div class="w-full">
            <label class="pl-2">
              <span>Email</span>
              <input
                type="text"
                class="input-text-default"
                :disabled="!allowEditAccount"
                v-model="email_account"
                :class="{ 'in-valid': messageOfAccountEmail }"
              />
              <div
                v-if="messageOfAccountEmail"
                class="mt-1 mb-2 h-[25px] text-red-500"
              >
                <span>{{ messageOfAccountEmail }}</span>
              </div>
            </label>
          </div>
          <div class="w-full">
            <label class="pl-2">
              <span>Số điện thoại</span>
              <input
                type="text"
                class="input-text-default"
                :disabled="!allowEditAccount"
                v-model="phone_account"
                :class="{ 'in-valid': messageOfAccountPhone }"
              />
              <div
                v-if="messageOfAccountPhone"
                class="mt-1 mb-2 h-[25px] text-red-500"
              >
                <span>{{ messageOfAccountPhone }}</span>
              </div>
            </label>
          </div>
        </section>
      </div>
      <div id="button-side" class="w-full flex justify-end px-10 py-5">
        <button
          @click.prevent="showConfirmDialog = $event"
          v-if="!updating"
          type="submit"
          class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
        >
          Cập nhật
        </button>
        <button
          v-if="updating"
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import accountService from "../../../services/account.service";
import edit_icon from "@/assets/icons/edit.svg";
import parentService from "../../../services/parent.service";
import ConfirmDialog from "@/components/confirm_dialog.vue";

import {
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/resources/check_valid";
const emits = defineEmits(["add-toast"]);
const name = ref("");
const gender = ref("");
const birthday = ref("");
const address = ref("");
const job = ref("");
const email_parent = ref("");
const phone_parent = ref("");
const status_parent = ref("");
const status_account = ref("");
const phone_account = ref("");
const email_account = ref("");
const username = ref("");
const password = ref("");
const countStudent = ref("");
const role = ref("");
const avatarPath = ref("");
const allowEditParent = ref(false);
const allowEditAccount = ref(false);
const fileUpload = ref(null);
const updating = ref(false);

const messageOfAccountPhone = ref("");
const messageOfAccountEmail = ref("");
const messageOfAccountPassword = ref("");

const messageOfParentName = ref("");
const messageOfParentPhone = ref("");
const messageOfParentEmail = ref("");
// console.log(window.user);

const showConfirmDialog = ref("");

onMounted(() => {
  getParent();
  count();
});
async function getParent() {
  const accountId = window.user.id;
  const response = await accountService.getParentById(accountId);

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu phụ huynh",
      content: response.data.error,
      type: 3,
    });
    return;
  }

  const account = response.data[0];
  if (account) {
    name.value = account.name;
    gender.value = account.gender;
    const partsDate = new Date(account.birthday)
      .toLocaleDateString()
      .split("/");
    birthday.value = `${partsDate[2]}-${partsDate[0] < 10 ? "0" : ""}${
      partsDate[0]
    }-${partsDate[1]}`;
    role.value = account.RoleParent;
    phone_parent.value = account.PhoneParent;
    email_parent.value = account.EmailParent;
    address.value = account.address;
    job.value = account.job;
    avatarPath.value = account.avatar;
    username.value = account.username;
    password.value = account.password;
    phone_account.value = account.PhoneAccount;
    email_account.value = account.EmailAccount;
    avatarPath.value = account.avatar;
    status_parent.value = account.StatusParent;
    status_account.value = account.StatusAccount;
  }
}
async function count() {
  const accountId = window.user.id;
  const response = await accountService.getParentById(accountId);
  // console.log(response.data[0].ParentID);
  const result = await parentService.countStudentByParentId(
    response.data[0].ParentID
  );
  // console.log(result.data.data);
  const countstudent = result.data;
  if (countstudent) {
    countStudent.value = countstudent.data;
    console.log(countStudent.value);
  }
}
function toggleEditParent() {
  allowEditParent.value = !allowEditParent.value;
}
function toggleEditAccount() {
  allowEditAccount.value = !allowEditAccount.value;
}
const handleUploadParentImg = (event) => {
  //Lấy hình
  fileUpload.value = event.target.files[0];
  //Kiểm tra tồn tại
  if (!fileUpload) return;

  //Kiểm tra size
  if (fileUpload.value.size / 1024 > 5120) {
    //Bỏ nếu quá dung lượng cho phếp
    fileUpload.value = null;
    return;
  }

  //Tạo đường dẫn của ảnh
  avatarPath.value = URL.createObjectURL(fileUpload.value);
  console.log(URL.createObjectURL(fileUpload.value));
};

// function checkValidParent() {
//   let invalid = false;

//   if (isEmpty(phone_parent.value)) {
//     invalid = true;
//     messageOfParentPhone.value = "Vui lòng nhập số điện thoại";
//   }
//   if (isEmpty(email_parent.value)) {
//     invalid = true;
//     messageOfParentEmail.value = "Vui lòng nhập email";
//   }

//   if (!isEmpty(phone_parent.value) && !isPhoneValid(phone_parent.value)) {
//     invalid = true;
//     messageOfParentPhone.value =
//       "Số điện thoại không đúng định dạng, phải đủ 10 số";
//   }

//   if (!isEmpty(email_parent.value) && !isEmailValid(email_parent.value)) {
//     invalid = true;
//     messageOfParentEmail.value = "Email sai định dạng";
//   }

//   if (isEmpty(name.value)) {
//     invalid = true;
//     messageOfParentName.value = "Không được đển trống tên";
//   }

//   return invalid;
// }
// async function updateParent() {
//   if (checkValidParent()) {
//     return;
//   }
//   updating.value = true;

//   const accountId = window.user.id;
//   const getIDParent = await accountService.getParentById(accountId);
//   //   console.log(getIDParent.data[0].ParentID);
//   const parentId = getIDParent.data[0].ParentID;
//   const formData = new FormData();
//   if (fileUpload.value !== null) {
//     formData.append("files", fileUpload.value);
//   }
//   formData.append("name", name.value);
//   formData.append("gender", gender.value);
//   formData.append("birthday", birthday.value);
//   formData.append("address", address.value);
//   formData.append("job", job.value);
//   formData.append("email", email_parent.value);
//   formData.append("phone", phone_parent.value);
//   formData.append("role", role.value);
//   formData.append("status", status_parent.value);

//   const result = await parentService.updateParent(parentId, formData);
//   console.log(result.data);
//   updating.value = false;

//   if (result.data.status !== 500 && result.data.status != 200) {
//     emits("add-toast", {
//       title: "Cập nhật thất bại",
//       content: result.data.error,
//       type: 1,
//     });
//     return;
//   }

//   if (result.data.status === 500) {
//     emits("add-toast", {
//       title: "Cập nhật thất bại",
//       content: result.data.error,
//       type: 3,
//     });
//     return;
//   }
//   if (!result.data.success) {
//     emits("add-toast", {
//       title: "Cập nhật thất bại",
//       content: result.data.message,
//       type: 2,
//     });
//     return;
//   }

//   emits("add-toast", {
//     title: "Cập nhật thành công",
//     content: `Cập nhật thông tin thành công.`,
//     type: 0,
//   });
// }
function checkValidAccount() {
  let invalid = false;

  if (isEmpty(phone_account.value)) {
    invalid = true;
    messageOfAccountPhone.value = "Vui lòng nhập số điện thoại.";
  }
  if (isEmpty(email_account.value)) {
    invalid = true;
    messageOfAccountEmail.value = "Vui lòng nhập email.";
  }

  if (!isEmpty(phone_account.value) && !isPhoneValid(phone_account.value)) {
    invalid = true;
    messageOfAccountPhone.value =
      "Số điện thoại không đúng định dạng, phải đủ 10 số.";
  }

  if (!isEmpty(email_account.value) && !isEmailValid(email_account.value)) {
    invalid = true;
    messageOfAccountEmail.value = "Email sai định dạng";
  }
  if (isEmpty(password.value)) {
    invalid = true;
    messageOfAccountPassword.value = "Không được để trống mật khẩu";
  }
  return invalid;
}
const getConfirm = (event) => {
  if (event) {
    showConfirmDialog.value = null;
    return;
  }
  updateAccount();
  showConfirmDialog.value = null;
};

async function updateAccount() {
  if (checkValidAccount()) {
    return;
  }
  const Username = window.user.username;
  console.log(Username);
  const AccountToUpdate = {
    email: email_account.value,
    phone: phone_account.value,
    password: password.value,
    status: status_account.value,
  };
  const result = await accountService.updateAccount(Username, AccountToUpdate);
  if (result.status === 400) {
    emits("add-toast", {
      title: "Cập nhật tài khoản thất bại",
      type: 1,
    });
    return;
  }
  emits("add-toast", {
    title: "Cập nhật tài khoản thành công",
    type: 0,
  });
}
</script>

<style scoped>
.dp__theme_light {
  --dp-button-height: 35px;
  --dp-border-radius: 5px;
  --dp-input-padding: 11px 30px 10px 12px;
  margin: 7px 0px;
}
</style>
