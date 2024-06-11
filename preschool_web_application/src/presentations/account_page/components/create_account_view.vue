<template>
  <Layout :title="'Tạo tài khoản'">
    <template #content>
      <form class="w-full h-full px-[40px] text-start">
        <div class="gap-5 flex mt-4">
          <div id="Username" class="w-full">
            <label for="">
              <span class="pl-3">Tên đăng nhập</span
              ><span class="text-red-500"> * </span>
              <input
                v-model="usernameInput"
                type="text"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
          <div id="Password" class="w-full">
            <label for="">
              <span class="pl-3">Mật khẩu</span
              ><span class="text-red-500"> * </span>
              <input
                v-model="passwordInput"
                type="password"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
        </div>
        <div class="gap-5 flex mt-4 mb-[20px]">
          <div id="Phone" class="w-full">
            <label for="">
              <span class="pl-3">Số điện thoại</span>
              <input
                v-model="phoneInput"
                type="tel"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
          <div id="Email" class="w-full">
            <label for="">
              <span class="pl-3">Email</span>
              <input
                v-model="emailInput"
                type="email"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div>
        </div>
        <div id="Email" class="w-full">
          <label for="">
            <span class="pl-3">Vai trò</span>
            <SelectComp
              :option-list="roleList"
              :value-active="drops.registration ? 4 : role"
              @choose-item="role = $event.id"
              class="mb-[20px] h-[45px] rounded-md w-full outline-none focus:border-blue-500"
              :disable="drops.registration ? true : false"
            />
          </label>
        </div>
      </form>
    </template>
    <template #bottom>
      <div>
        <button
          v-if="!creating"
          @click="createAccount"
          type="button"
          class="px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 active:scale-95"
        >
          Save
        </button>
        <button
          v-if="creating"
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
    </template>
  </Layout>
</template>

<script setup>
import Layout from "@/components/edit_and_create_layout.vue";
import { onMounted, ref } from "vue";
import SelectComp from "../../../components/select_comp.vue";
import { useAccountStore } from "../../../stores/account_store";
import { storeToRefs } from "pinia";

const role = ref(null);

const accountStore = useAccountStore();

const { status } = storeToRefs(accountStore);

onMounted(() => {
  if (drops.registration) {
    phoneInput.value = drops.registration.phone;
    emailInput.value = drops.registration.email;
    role.value = 4;
  }
});

const creating = ref(false);

const emits = defineEmits(["add-toast"]);

const usernameInput = ref(null);
const passwordInput = ref(null);
const phoneInput = ref(null);
const emailInput = ref(null);

const roleList = ref([
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Quản lý",
  },
  {
    id: 3,
    name: "Giáo viên",
  },
  {
    id: 4,
    name: "Phụ huynh",
  },
]);

const drops = defineProps({
  registration: {
    type: Object,
    require: false,
  },
});

async function createAccount() {
  creating.value = true;
  const accountToCreate = {
    username: usernameInput.value,
    password: passwordInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
  };

  if (drops.registration) {
    accountToCreate.role = 4;
    accountToCreate.registrationId = drops.registration.id;
  } else {
    accountToCreate.role = role.value;
  }

  const result = await accountStore.createAccount(accountToCreate);

  creating.value = false;

  if (!result.success) {
    return emits("add-toast", {
      title: "Create failed",
      content: "Tạo tài khoản thất bại!",
      type: 1,
    });
  }
  emits("add-toast", {
    title: "Create successful",
    content: "Tạo tài khoản thành công!",
    type: 0,
  });
}
</script>

<style lang="scss" scoped>
</style>