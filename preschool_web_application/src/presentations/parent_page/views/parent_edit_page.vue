<template>
  <div>
    <form @submit.prevent="submitCreateStudent">
      <div
        class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
      >
        <div id="head">Chi tiết phụ huynh</div>
        <div id="site" class="flex px-[30px] py-[30px]">
          <div class="add-avatar w-fit h-fit rounded-md">
            <img
              :src="studentAvatarPath"
              class="w-[150px] h-[150px] object-cover bg-[#D9D9D9] rounded-md"
            />
            <div class="button-side flex my-4 gap-2">
              <input
                type="file"
                class="w-[150px] file:w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3B44D1] file:text-white hover:file:text-black hover:file:bg-violet-100"
                accept=".png, .jpeg, .jpg"
                @change="handleUploadStudentImg"
              />
              <button
                class="w-[150px] border h-[35px] rounded-md hover:bg-red-100"
              >
                Xóa ảnh
              </button>
            </div>
          </div>
          <div id="input-side" class="w-full pr-[20px]">
            <div id="input-side-1" class="flex w-full gap-5 mx-[20px]">
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Họ và tên</span
                ><span class="text-red-600"> * </span>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  class="h-[45px] rounded-md mb-[25px] my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                  v-model="name_parent"
                />
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Giới tính</span>
                <select
                  id="gender"
                  v-model="gender_parent"
                  class="h-[45px] rounded-md mb-[25px] my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                >
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                  <option value="2">Khác</option>
                </select>
              </label>
            </div>
            <div
              id="input-side-2"
              class="flex w-full gap-5 mx-[20px] mb-[20px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Ngày sinh</span>
                <input
                  v-model="birthday"
                  type="date"
                  class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                />
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Nghề nghiệp</span>
                <input
                  type="text"
                  placeholder="Nghề nghiệp"
                  class="h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                  v-model="job"
                />
              </label>
            </div>
            <div
              id="input-side-3"
              class="flex w-full gap-5 mx-[20px] mb-[20px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Số điện thoại</span>
                <input
                  type="text"
                  placeholder="0xxxxxxxx"
                  class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                  v-model="phone_parent"
                />
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Email</span>
                <input
                  type="text"
                  placeholder="abc@abc.com"
                  class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                  v-model="email_parent"
                />
              </label>
            </div>
            <div
              id="input-side-4"
              class="flex w-full gap-5 mx-[20px] mb-[20px]"
            >
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Địa chỉ</span>
                <input
                  v-model="address"
                  type="text"
                  placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam"
                  class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                />
              </label>
              <label class="w-full text-start">
                <span class="pl-4 text-blue-700">Vai trò</span>
                <select
                  id="role"
                  v-model="role"
                  class="h-[45px] rounded-md mb-[25px] my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                >
                  <option value="0">Chọn mối quan hệ</option>
                  <option value="1">Bố</option>
                  <option value="2">Mẹ</option>
                  <option value="3">Anh, Chị</option>
                  <option value="4">Ông, Bà</option>
                  <option value="5">Người giám hộ</option>
                </select>
              </label>
            </div>
            <!-- <div class="text-gray-500 h-10">
              <span>Thông tin tài khoản</span>
            </div>

             -->
            <!-- <div class="text-gray-500 h-10">
              <span>Thông tin đơn đăng ký</span>
            </div> -->
          </div>
        </div>
        <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
          <button
            @click.prevent="updateParent"
            v-if="status !== 'creating'"
            type="submit"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
          >
            Save
          </button>
          <button
            v-if="status === 'creating'"
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
    </form>
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Thông tin tài khoản</div>

      <!--Hiện thị khi người dùng chưa có tài khoản 
            Nhập mã tài khoản để thêm
          -->
      <div v-if="account === null">
        <div class="text-start px-10 py-3 text-gray-500">
          * Phụ huynh hiện tại chưa được thêm tài khoản
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px] py-5 items-center">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Tên tài khoản</span>
            <div class="flex gap-5">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
                v-model="create_account"
              />
              <div
                id="button-side"
                class="w-full flex text-start gap-5 my-[5px]"
              >
                <button
                  @click.prevent="updateParent"
                  v-if="status !== 'creating'"
                  type="submit"
                  class="h-[45px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
                >
                  Save
                </button>
                <button
                  v-if="status === 'creating'"
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
          </label>
        </div>
      </div>

      <!-- Hiện thị khi người dùng đã có tài khoản -->
      <div class="w-full px-40" v-if="account !== null">
        <div class="flex w-full gap-5 mx-[20px] mb-[20px] py-5">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Tên tài khoản</span>
            <input
              disabled
              type="text"
              placeholder="Tên đăng nhập"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="account"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Số điện thoại</span>
            <input
              type="text"
              placeholder="0xxxxxxxxx"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="phone_account"
            />
          </label>
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Trạng thái</span>
            <!-- <SelectStatusComp
              class="h-[45px] rounded-md my-[5px] w-full outline-none focus:border-blue-500"
              @choose="statusAccount = $event"
              :active="1"
              :choose="status_account"
            /> -->
            <select
              id="status_account"
              v-model="status_account"
              class="h-[45px] rounded-md mb-[25px] my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            >
              <option value="0">Đang khoá</option>
              <option value="1">Đang hoạt động</option>
            </select>
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Email</span>
            <input
              type="text"
              placeholder="abc@abc.com"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="email_account"
            />
          </label>
        </div>
        <div id="button-side" class="w-full flex text-start mx-5 gap-5">
          <button
            @click.prevent="updateAccount"
            v-if="status !== 'creating'"
            type="submit"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
          >
            Save
          </button>
          <button
            v-if="status === 'creating'"
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
    <!-- <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Thông tin đơn đăng ký</div>
      
      <div class="w-full px-40 py-5">
        <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Tên người đăng ký</span>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="registerName"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Mã đơn</span>
            <input
              type="text"
              placeholder="0xxxxxxxxx"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="registerId"
            />
          </label>
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Số điện thoại đăng ký</span>
            <input
              type="text"
              placeholder="0xxxxxxxxx"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="registerPhone"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Email đăng ký</span>
            <input
              type="text"
              placeholder="abc@abc.com"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              v-model="registerEmail"
            />
          </label>
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Chương trình đăng ký</span>
            <SelectReturnNumComp
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Cấp độ đăng ký</span>
            <SelectReturnNumComp
              :list-select="levelsList"
              @choose="levels = $event"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
              :active="1"
            />
          </label>
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Xã/Thị Xã</span>
            <SelectSearchComp
              :list-select="townList"
              @choose="town = $event"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Quận/Huyện</span>
            <SelectSearchComp
              :list-select="districtList"
              @choose="district = $event"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
            /> </label
          ><label class="w-full text-start">
            <span class="pl-4 text-blue-700">Thành phố</span>
            <SelectSearchComp
              :list-select="cityList"
              @choose="city = $event"
              :active="'Hà Nội'"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
            />
          </label>
        </div>
        <div class="flex w-full gap-5 mx-[20px] mb-[20px]">
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Trạng thái hồ sơ</span>
            <SelectReturnNumComp
              :list-select="fileStatusList"
              :active="fileStatus"
              @choose="fileStatus = $event"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500"
            />
          </label>
          <label class="w-full text-start">
            <span class="pl-4 text-blue-700">Trạng thái</span>
            <SelectStatusComp
              class="h-[45px] rounded-md my-[5px] w-full outline-none focus:border-blue-500"
              :select-list="registerStatusList"
              @choose="statusAccount = $event"
              :active="1"
            />
          </label>
        </div>
        <div class="text-start w-full gap-5 mx-[20px] mb-[20px]">
          <span class="my-2">Hình ảnh đơn đăng ký</span>

          <div
            class="w-full my-3 border border-dotted border-2 border-gray-500 ob rounded-xl h-[500px] max-h-68"
          >
            <img
              src="https://th.bing.com/th/id/OIP.pRc56eeZPk-f1ticsni6YwHaEK?w=326&h=183&c=7&r=0&o=5&pid=1.7"
              alt=""
              class="object-contain w-full h-full"
            />
          </div>
          <input clas="mx-3" type="file" name="" id="" />
        </div>
        <div id="button-side" class="w-full flex text-start mx-5 gap-5">
          <button
            v-if="status !== 'creating'"
            type="submit"
            class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
            @click="updateParent"
          >
            Save
          </button>
          <button
            v-if="status === 'creating'"
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
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import saveButton from "@/components/save_button.vue";
import closeButton from "@/components/close_button.vue";
import SelectReturnStringComp from "../../../components/select_return_string_comp.vue";
import SelectReturnNumComp from "@/components/select_return_num_comp.vue";
import SelectStatusComp from "../../../components/select_status_comp.vue";
import SelectSearchComp from "../../../components/select_search_input.vue";
import select_locantion from "@/components/select_location.vue";
import { useParentStore } from "../../../stores/parent_store";
import { useAccountStore } from "../../../stores/account_store";
import { storeToRefs } from "pinia";
const name_parent = ref("");
const gender_parent = ref("");
const birthday = ref("");
const address = ref("");
const job = ref("");
const email_parent = ref("");
const phone_parent = ref("");
const role = ref("");
const status = ref("");
const emits = defineEmits(["add-toast"]);
const router = useRouter();
const account = ref("");
const create_account = ref("");
const email_account = ref("");
const phone_account = ref("");
const status_account = ref("");
const parentStore = useParentStore();
const accountStore = useAccountStore();
const getParent = async () => {
  try {
    const parentId = router.currentRoute.value.params.id;
    console.log(parentId);
    const response = await axios.get(
      `http://localhost:9000/parents/${parentId}`
    );
    const parents = response.data[0];
    console.log(parents);
    const parsedBirthday = new Date(parents.birthday);
    const formattedBirthday = `${parsedBirthday.getFullYear()}-${String(
      parsedBirthday.getMonth() + 1
    ).padStart(2, "0")}-${String(parsedBirthday.getDate()).padStart(2, "0")}`;
    if (parents) {
      name_parent.value = parents.NameParent;
      gender_parent.value = parents.gender;
      birthday.value = formattedBirthday;
      address.value = parents.AddressParent;
      job.value = parents.job;
      email_parent.value = parents.EmailParent;
      phone_parent.value = parents.PhoneParent;
      role.value = parents.role;
      status.value = parents.status;
      account.value = parents.account;
      email_account.value = parents.EmailAccount;
      phone_account.value = parents.PhoneAccount;
      status_account.value = parents.StatusAccount;
    }
  } catch (error) {
    console.error("Error fetching parents:", error);
  }
};
async function updateParent() {
  const parentId = router.currentRoute.value.params.id;
  const ParentToUpdate = {
    name: name_parent.value,
    gender: gender_parent.value,
    birthday: birthday.value,
    address: address.value,
    job: job.value,
    email: email_parent.value,
    phone: phone_parent.value,
    role: role.value,
    status: status.value,
    account: create_account.value,
  };
  const result = await parentStore.updateParent(parentId, ParentToUpdate);

  if (result.status === 500) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: " Hãy kiểm tra lại thông tin!",
      type: 1,
    });
    return;
  }
  if (result.status === 400) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: "Account đã tồn tại, kiểm tra lại!",
      type: 1,
    });
    return;
  }
  if (result.status === 404) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: "Account không tồn tại, kiểm tra lại!",
      type: 1,
    });
    return;
  }

  emits("add-toast", {
    title: "Cập nhật thành công",
    content: `Cập nhật học sinh ${name_parent.value} thành công.`,
    type: 0,
  });
}

async function updateAccount() {
  const Username = account.value;
  console.log(Username);
  const AccountToUpdate = {
    email: email_account.value,
    phone: phone_account.value,
    status: status_account.value,
  };
  const result = await accountStore.updateAccount(Username, AccountToUpdate);
  if (result.status === 400) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      type: 1,
    });
    return;
  }
  emits("add-toast", {
    title: "Cập nhật thành công",
    type: 0,
  });
}
// const updateParent = async () => {
//   try {
//     const parentId = router.currentRoute.value.params.id;
//     const response = await axios.put(
//       `http://localhost:9000/parents/${parentId}`,
//       {
//         name: name_parent.value,
//         gender: gender_parent.value,
//         birthday: birthday.value,
//         address: address.value,
//         job: job.value,
//         email: email_parent.value,
//         phone: phone_parent.value,
//         role: role.value,
//         status: status.value,
//       }
//     );
//     if (response.data.status === 200) {
//       emits("add-toast", {
//         title: "Cập nhật thông tin phụ huynh thành công!",
//         type: 0,
//       });
//       router.push({ name: "ParentView" });
//     } else if (response.data.status === 400) {
//       emits("add-toast", {
//         title: "Cập nhật thông tin phụ huynh thất bại!!",
//         type: 1,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating parent:", error);
//   }
// };

// const checkDuplicate = async () => {
//   try {
//     const checkDuplicateResponse = await axios.post(
//       "http://localhost:9000/parents/duplicateAccount",
//       {
//         account: create_account.value,
//       }
//     );
//     return checkDuplicateResponse.data;
//   } catch (error) {
//     console.log(e);
//   }
// };

// const updateParent1 = async () => {
//   try {
//     const isDuplicate = await checkDuplicate();
//     if (isDuplicate.status === 400) {
//       emits("add-toast", {
//         title: "Account đã tồn tại, hãy kiểm tra lại!",
//         type: 1,
//       });
//       return;
//     } else if (isDuplicate.status === 200) {
//       const parentId = router.currentRoute.value.params.id;
//       const response = await axios.put(
//         `http://localhost:9000/parents/${parentId}`,
//         {
//           name: name_parent.value,
//           gender: gender_parent.value,
//           birthday: birthday.value,
//           address: address.value,
//           job: job.value,
//           email: email_parent.value,
//           phone: phone_parent.value,
//           role: role.value,
//           status: status.value,
//           account: create_account.value,
//         }
//       );
//       if (response.data.status === 200) {
//         emits("add-toast", {
//           title: "Cập nhật thành công!",
//           type: 0,
//         });
//         router.push({ name: "ParentView" });
//       } else if (response.data.status === 400) {
//         emits("add-toast", {
//           title: "Tài khoản chưa tồn tại, hãy kiểm tra lại!",
//           type: 1,
//         });
//       }
//     }
//   } catch (error) {
//     console.error("Error updating parent:", error);
//   }
// };
// const updateAccount = async () => {
//   try {
//     const parentId = router.currentRoute.value.params.id;
//     const response = await axios.put(
//       `http://localhost:9000/parents/${parentId}`,
//       {
//         name: name_parent.value,
//         gender: gender_parent.value,
//         birthday: birthday.value,
//         address: address.value,
//         job: job.value,
//         email: email_parent.value,
//         phone: phone_parent.value,
//         role: role.value,
//         status: status.value,
//       }
//     );
//     const accountName = account.value;
//     // console.log(accountName);
//     const accountResponse = await axios.put(
//       `http://localhost:9000/account/update/${accountName}`,
//       {
//         email: email_account.value,
//         phone: phone_account.value,
//       }
//     );

//     if (accountResponse.data.status === 200) {
//       emits("add-toast", {
//         title: "Cập nhật thông tin thành công!",
//         type: 0,
//       });
//       router.push({ name: "ParentView" });
//     } else if (accountResponse.data.status === 400) {
//       emits("add-toast", {
//         title: "Cập nhật thông tin thất bại!!",
//         type: 1,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating parent:", error);
//   }
// };

onBeforeMount(async () => {
  await getParent();
});
</script>

<style scoped>
#head {
  text-align: start;
  padding: 20px;
  font-size: large;
  font-weight: 600;
  border-bottom: solid 1px rgb(221, 221, 221);
}
</style>
