<template>
  <Layout :title="'Tạo tài khoản'">
    <template #content>
      <form @submit.prevent="" class="w-full h-full px-[40px] text-start">
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
            <span class="pl-3">Email</span>
            <SelectComp
              :option-list="roleList"
              :value-active="drops.registration ? 4 : role"
              @choose-item="role = $event.id"
              class="mb-0 h-[45px] rounded-md w-full outline-none focus:border-blue-500"
              :disable="drops.registration ? true : false"
            />
          </label>
        </div>
      </form>
    </template>
    <template #bottom>
      <SaveButton></SaveButton>
    </template>
  </Layout>
</template>

<script setup>
import Layout from "@/components/edit_and_create_layout.vue";
import { onMounted, ref } from "vue";
import SaveButton from "../../../components/save_button.vue";
import SelectComp from "../../../components/select_comp.vue";

const role = ref(null);

onMounted(() => {
  if (drops.registration) {
    phoneInput.value = drops.registration.phone;
    emailInput.value = drops.registration.email;
    role.value = 4;
  }
});

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
</script>

<style lang="scss" scoped>
</style>