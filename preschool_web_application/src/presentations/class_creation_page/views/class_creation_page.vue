<template>
  <Layout :title="'Tạo lớp học mới'">
    <template #content>
      <form
        @submit.prevent="handleSubmitAddNewClass"
        class="px-[40px] relative text-[15px] text-start"
      >
        <!--Add Avatar-->
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
        <p class="w-full text-center">Ảnh đại diện lớp</p>
        <!--Name class input-->
        <!-- <div id="input-side-4" class="flex w-full gap-5 mx-[20px] mb-[20px]">
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Địa chỉ</span>
              <input
                v-model="addressInput"
                type="text"
                placeholder="23 abc/3123, Tp.Hồ Chí Minh, Việt Nam"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>

            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Nguyên quân</span>
              <input
                v-model="placeOfOriginInput"
                type="text"
                placeholder="Việt Nam"
                class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
              />
            </label>
          </div> -->
        <label class="w-full text-start">
          <span class="pl-4">Tên lớp</span>
          <input
            v-model="classNameInput"
            type="text"
            placeholder="Nhap ten lop hoc"
            class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
          />
          <div class="h-[20px] valid">
            <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
          </div>
        </label>
        <!--Class type input-->
        <div class="flex justify-between w-full gap-4">
          <label class="w-full">
            <span class="pl-4">Levels</span>
            <!-- <input v-model="nameClassInput" type="text" placeholder="Nhap ten lop hoc" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4" :class="{'invalid-input' : isStudentNameValid}"> -->
            <select
              @change="selectLevels"
              class="mb-0 h-[45px] rounded-md my-[5px] w-full outline-none border-[0.12rem] focus:border-blue-500 px-4"
            >
              <option value="level1" selected disabled>Selected</option>
              <option v-for="item in levelList" :key="item" :value="item.value">
                {{ item.name }}
              </option>
              <!-- <option value="level1">Mầm</option>
              <option value="level2">Chồi</option>
              <option value="level3">Lá</option> -->
            </select>
            <div class="h-[20px] valid">
              <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
            </div>
          </label>
          <label class="w-full">
            <span class="pl-4">Loại chương trình</span>
            <!-- <input v-model="nameClassInput" type="text" placeholder="Nhap ten lop hoc" class="mb-0 h-[40px] rounded-md w-full outline-none border-2 focus:border-blue-500 px-4" :class="{'invalid-input' : isStudentNameValid}"> -->
            <select @change="selectType" class="input-text-default">
              <option value="none" selected disabled>Selected</option>
              <option
                v-for="item in syllabusList"
                :key="item"
                :value="item.value"
              >
                {{ item.name }}
              </option>
              <!-- <option value="0">Thường</option>
              <option value="1">Anh Ngữ</option>
              <option value="2">Pháp Ngữ</option> -->
            </select>
            <div class="h-[20px] valid">
              <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
            </div>
          </label>
        </div>
        <!--Time-->
        <div class="flex justify-between w-full gap-4">
          <label class="w-full">
            <span class="pl-4">Ngày mở lớp</span>
            <input
              v-model="dateBeginInput"
              type="date"
              class="input-text-default"
            />
            <div class="h-[20px] valid">
              <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
            </div>
          </label>
          <label class="w-full">
            <span class="pl-4">Kết thúc dự kiến</span>
            <input
              v-model="dateFinishInput"
              type="date"
              class="input-text-default"
            />
            <div class="h-[20px] valid">
              <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
            </div>
          </label>
        </div>

        <!--Limited member & Teacher-->
        <div class="flex justify-between w-full gap-4">
          <label class="w-full">
            <span class="pl-4">Số lượng tối đa</span>
            <input
              v-model="limitedStudent"
              type="number"
              class="input-text-default"
            />
            <div class="h-[20px] valid">
              <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
            </div>
          </label>
          <label class="w-full">
            <span class="pl-4">Giáo viên phụ trách</span>
            <input
              v-model="formTeacherInput"
              type="text"
              class="input-text-default"
            />
            <div class="h-[20px] valid">
              <!-- <p v-if="messageOfStudentName" class="mb-4 text-red-300">{{ messageOfStudentName }}</p> -->
            </div>
          </label>
        </div>
        <!--Button save & close-->
      </form>
    </template>
    <template #bottom>
      <SaveButton></SaveButton>
    </template>
  </Layout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useClassStore } from "@/stores/class_store.js";
import Layout from "@/components/edit_and_create_layout.vue";
import SaveButton from "@/components/save_button.vue";
import LevelsService from "../../../services/levels.service";
import SyllabusService from "../../../services/syllabus.service";

const classNameInput = ref("");
const dateBeginInput = ref(null);
const dateFinishInput = ref(null);
const limitedStudent = ref(0);
const formTeacherInput = ref("");
const classStore = useClassStore();
const classLevelInput = ref(null);
const classTypeInput = ref(null);
const levelList = ref([]);
const syllabusList = ref([]);

const isLeave = ref(false);

const avatarUpload = ref(null);
const avatarPath = ref(null);

onMounted(async () => {
  await getLevels();
  await getSyllabus();
});

// const emits = defineEmits(['close'])

// const closePage = () => {

//     isLeave.value = true

//     setTimeout(() => {
//         emits('close')
//         isLeave.value = false
//     }, 200)
// }

const selectLevels = (event) => {
  classLevelInput.value = event.target.value;
};

const selectType = (event) => {
  classTypeInput.value = event.target.value;
};

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

const handleSubmitAddNewClass = () => {
  classStore.addClass({
    avatar: "",
    name: classNameInput.value,
    teacher: formTeacherInput.value,
    member: 0,
    limitedMember: limitedStudent.value,
    levels: classLevelInput.value,
    type: classTypeInput.value,
    dateBegin: dateBeginInput.value,
    dateFinish: dateFinishInput.value,
    session: "2020-2021",
    created: new Date(),
    status: "Sắp bắt đầu",
  });
};

async function getLevels() {
  const response = await LevelsService.getLevels();
  if (response.status == 200 && response.data.success) {
    for (let index = 0; index < response.data.data.length; index++) {
      const element = response.data.data[index];
      levelList.value.push({
        name: element.levelsName,
        value: element.id,
      });
    }
  }
}

async function getSyllabus() {
  const response = await SyllabusService.getSyllabus();
  if (response.status == 200 && response.data.success) {
    for (let index = 0; index < response.data.data.length; index++) {
      const element = response.data.data[index];
      syllabusList.value.push({
        name: element.syllabusName,
        value: element.id,
      });
    }
  }
}
</script>

<style scoped>
.view {
  animation: enter 0.3s forwards normal;
}

@keyframes enter {
  0% {
    opacity: 0;
    translate: -100px 0;
  }
  100% {
    opacity: 1;
    translate: 100px 0;
  }
}

@keyframes leave {
  0% {
    opacity: 1;
    translate: 100px 0;
  }
  100% {
    opacity: 0;
    translate: -100px 0;
  }
}

.leave-active {
  animation: leave 0.5s forwards normal !important;
}
</style>