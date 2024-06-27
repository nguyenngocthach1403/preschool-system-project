<template>
  <div class="w-full h-full bg-white rounded-xl">
    <PopupAddTeacher
      v-if="showPopupAddTeacher"
      @close="showPopupAddTeacher = null"
      :class-role="showPopupAddTeacher"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Danh sách giáo viên quản lý</span>
    </div>

    <div v-if="loading" class="w-full flex flex-wrap my-5 mx-10 gap-3">
      <div
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] hover:border-black rounded-md flex"
      >
        <div class="mx-2 my-2">
          <div
            class="w-[100px] h-[100px] p-2 border-[2px] border-gray-400 rounded-full"
          >
            <img :src="user_icon" class="w-full h-full" alt="" />
          </div>
        </div>
        <div
          class="w-full border-[2px] border-gray-400 my-2 mx-2 px-2 content-center text-start rounded-md"
        >
          <p class="text-[18px]"></p>
          <div>
            <div class="w-full my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[200px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[300px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[320px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] hover:border-black rounded-md flex"
      >
        <div class="mx-2 my-2">
          <div
            class="w-[100px] h-[100px] p-2 border-[2px] border-gray-400 rounded-full"
          >
            <img :src="user_icon" class="w-full h-full" alt="" />
          </div>
        </div>
        <div
          class="w-full border-[2px] border-gray-400 my-2 mx-2 px-2 content-center text-start rounded-md"
        >
          <p class="text-[18px]"></p>
          <div>
            <div class="w-full my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[200px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[300px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[320px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] hover:border-black rounded-md flex"
      >
        <div class="mx-2 my-2">
          <div
            class="w-[100px] h-[100px] p-2 border-[2px] border-gray-400 rounded-full"
          >
            <img :src="user_icon" class="w-full h-full" alt="" />
          </div>
        </div>
        <div
          class="w-full border-[2px] border-gray-400 my-2 mx-2 px-2 content-center text-start rounded-md"
        >
          <p class="text-[18px]"></p>
          <div>
            <div class="w-full my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[200px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[300px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[320px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] hover:border-black rounded-md flex"
      >
        <div class="mx-2 my-2">
          <div
            class="w-[100px] h-[100px] p-2 border-[2px] border-gray-400 rounded-full"
          >
            <img :src="user_icon" class="w-full h-full" alt="" />
          </div>
        </div>
        <div
          class="w-full border-[2px] border-gray-400 my-2 mx-2 px-2 content-center text-start rounded-md"
        >
          <p class="text-[18px]"></p>
          <div>
            <div class="w-full my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[200px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[300px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[320px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading" class="w-full flex flex-wrap my-5 mx-10 gap-3">
      <div
        v-for="item in classManagerRoles"
        :key="item"
        class="w-[500px] bg-white border-[2px] border-gray-400 h-[200px] hover:border-black rounded-md flex"
        @click="showPopupAddTeacher = item.id"
      >
        <div class="mx-2 my-2">
          <div
            class="w-[100px] h-[100px] border-[2px] border-gray-400 p-2 rounded-full"
          >
            <img :src="user_icon" class="w-full h-full" alt="" />
          </div>
        </div>
        <div
          class="w-full border-[2px] border-gray-400 my-2 mx-2 px-2 text-start rounded-md"
        >
          <p class="text-[18px]">{{ item.name }}</p>
          <div>
            <div class="w-full my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[200px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[300px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
            <div class="w-[320px] my-6 h-[5px] bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import classService from "../../../services/class.service";
import PopupAddTeacher from "../components/popup_add_teacher.vue";

//icon
import user_icon from "../../../assets/icons/User.svg";

//status
const loading = ref(false);
const failed = ref(false);

//show
const showPopupAddTeacher = ref(null);

//data
const classManagerRoles = ref([]);

//emits
const emits = defineEmits(["add-toast"]);

async function getClassManagerRoles() {
  try {
    loading.value = true;
    const response = await classService.getClassManagerRoles();
    console.log(response);
    if (response.data.success) {
      classManagerRoles.value = response.data.data;
    }
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  } catch (error) {
    loading.value = false;
    failed.value = true;
    emits("add-toast", { title: "Tải dữ liệu thất bại!", type: 1 });
  }
}

//life circle
onMounted(() => {
  getClassManagerRoles();
});
</script>

<style scoped>
.loading {
  position: relative;
}
.loading::before {
  content: "";
  background-color: white;
  height: 100%;
  width: 30px;
  position: absolute;
  animation: loading 1.5s infinite ease-in-out;
}

@keyframes loading {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}
</style>