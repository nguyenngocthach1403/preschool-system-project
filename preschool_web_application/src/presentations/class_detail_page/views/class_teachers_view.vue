<template>
  <div class="w-full h-full bg-white rounded-xl overflow-hidden">
    <PopupAddTeacher
      v-if="showPopupAddTeacher"
      @close="closePopup()"
      :class-role="showPopupAddTeacher"
      :class-data="classs"
      @add-toast="$emit('add-toast', $event)"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Danh sách giáo viên quản lý</span>
    </div>

    <div v-if="loading" class="w-full flex flex-wrap my-5 mx-10 gap-3">
      <div
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] rounded-md flex"
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
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] rounded-md flex"
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
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] rounded-md flex"
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
        class="loading w-[500px] bg-white border-[2px] border-gray-400 h-[200px] rounded-md flex"
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
        class="w-[48%] bg-gradient-to-r from-indigo-300/40 via-violet-100/90 via-550% to-blue-200 hover:border-black rounded-md drop-shadow-xl hover:drop-shadow-2xl overflow-hidden"
        @click="showPopupAddTeacher = item.id"
      >
        <div v-if="!item.teacher" class="w-full">
          <div class="mx-2 my-2">
            <div
              class="w-[100px] h-[100px] border border-violet-400/25 border-gray-400 p-2 rounded-full"
            >
              <img :src="user_icon" class="w-full h-full" alt="" />
            </div>
            <p class="text-[18px]">{{ item.name }}</p>
          </div>
          <div
            class="w-full border border-violet-400/25 my-2 mx-2 px-2 text-start rounded-md"
          >
            <div>
              <div class="w-full my-6 h-[5px] bg-gray-500 rounded-full"></div>
              <div
                class="w-[200px] my-6 h-[5px] bg-gray-500 rounded-full"
              ></div>
              <div
                class="w-[300px] my-6 h-[5px] bg-gray-500 rounded-full"
              ></div>
              <div
                class="w-[320px] my-6 h-[5px] bg-gray-500 rounded-full"
              ></div>
            </div>
          </div>
        </div>
        <div v-if="item.teacher" class="flex w-full h-[300px] shadow">
          <div class="mx-2 my-2">
            <div
              class="w-[100px] h-[100px] mx-5 border border-violet-400/25 rounded-full overflow-hidden"
            >
              <img
                :src="item.teacher.avatar || user_icon"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
            <p class="text-[18px]">{{ item.name }}</p>
          </div>
          <div
            class="w-full border-[1px] border-gray-400 my-4 mx-4 px-2 text-start rounded-md"
          >
            <div>
              <div class="w-full">
                <span class="text-gray-500 text-[15px]"
                  >{{ item.teacher.gender == 0 ? "Thầy" : "Cô" }}:</span
                >
                <span class="text-blue-700 px-1 text-[20px]">{{
                  item.teacher.name
                }}</span>
              </div>
              <div class="w-full flex py-1 items-center text-bottom">
                <div>
                  <span class="text-gray-500 text-[15px]">Sdt:</span>
                  <span class="px-1 text-[17px]">{{ item.teacher.phone }}</span>
                </div>
              </div>
            </div>
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
const classs = ref(null);

//emits
const emits = defineEmits(["add-toast"]);

//props
const props = defineProps({
  classId: {
    type: Number,
    require: true,
  },
});

async function getClassManagerRoles() {
  try {
    const response = await classService.getClassManagerRoles();
    console.log(response);
    if (response.data.success) {
      classManagerRoles.value = response.data.data;
    }
  } catch (error) {
    emits("add-toast", { title: "Tải dữ liệu thất bại!", type: 1 });
  }
}

async function getClassById(classId) {
  try {
    loading.value = true;
    await getClassManagerRoles();

    const response = await classService.getClassById(classId);

    classs.value = response.data.data;

    fillTeacher(classs.value.teachers);
    setTimeout(() => {
      loading.value = false;
    }, 500);
  } catch (error) {
    loading.value = false;
    emits("add-toast", {
      title: "Tải dữ liệu thất bại!",
      content: error,
      type: 1,
    });
  }
}

function fillTeacher(teachers) {
  teachers.forEach((te) => {
    const index = classManagerRoles.value.findIndex((el) => el.id == te.role);
    classManagerRoles.value[index].teacher = te;
  });
}
function closePopup() {
  showPopupAddTeacher.value = null;
  if (props.classId) {
    getClassById(props.classId);
  }
}

//life circle
onMounted(() => {
  if (props.classId) {
    getClassById(props.classId);
  }
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