<template>
  <div class="bg-white ml-4 rounded-3xl text-center">
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Tạo SlideShow</div>
      <div id="site" class="flex px-[30px] py-[30px]">
        <div class="w-full my-3">
          <label>
            <span class="pl-5">Hình ảnh SlideShow</span>
            <div
              class="relative w-full content-center text-center gap-10 h-[300px] rounded-md border border-gray-400 border-dotted object-contain"
            >
              <img v-if="fileUpload" :src="imageUpload" class="h-full" />
              <input
                type="file"
                class="absolute top-0 w-full h-full opacity-0"
                @change="handleUploadSlideImg($event)"
              />
              <div v-if="!fileUpload">
                <img :src="image_default" class="w-10 m-auto my-5" />
                <span class="text-blue-700">Click</span>
                <span> để thêm ảnh</span>
              </div>
            </div>
          </label>
          <div id="input-side" class="w-full pr-[20px]">
            <div
              id="input-side-1"
              class="flex justify-end w-full gap-5 mx-[20px]"
            >
              <label class="w-[400px] text-start">
                <span class="pl-4 text-blue-700">Trạng thái hình ảnh</span>
                <select id="status" v-model="status" class="input-text-default">
                  <option value="0">Khoá</option>
                  <option value="1">Hiển thị</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
        <button
          @click.prevent="createSilde()"
          v-if="!creating"
          type="submit"
          class="h-[48px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-[25px] rounded-md text-[20px]"
        >
          Lưu
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { isEmpty } from "../../utils/resources/check_valid";
import slideService from "../../services/slideshow.service";

const status = ref(0);
const emits = defineEmits(["add-toast"]);
const creating = ref(false);
const fileUpload = ref(null);
const imageUpload = ref(null);

async function createSilde() {
  creating.value = true;
  const formData = new FormData();
  if (fileUpload.value !== null) {
    formData.append("files", fileUpload.value);
  }
  formData.append("status", status.value);

  const response = await slideService.createSlide(formData);

  creating.value = false;

  if (response.status !== 500 && response.status != 200) {
    emits("add-toast", {
      title: "Thất hình ảnh bại.",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  if (response.status === 500) {
    emits("add-toast", {
      title: "Tạo hình ảnh thất bại",
      content: response.data.error,
      type: 3,
    });
    return;
  }
  if (!response.data.success) {
    emits("add-toast", {
      title: "Tạo hình ảnh thất bại",
      content: response.data.message,
      type: 2,
    });
    return;
  }

  emits("add-toast", {
    title: "Tạo hình ảnh thành công",
    type: 0,
  });
}
// Sử lý và ràn buộc lấy hình ảnh
const handleUploadSlideImg = (event) => {
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
  imageUpload.value = URL.createObjectURL(fileUpload.value);
};
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
