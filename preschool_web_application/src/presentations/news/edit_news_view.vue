<template>
  <div class="bg-white ml-4 rounded-3xl text-center">
    <div
      class="bg-white ml-4 mt-[20px] rounded-xl mr-2 text-center h-fit pb-[60px]"
    >
      <div id="head">Chi tiết tin tức</div>
      <div id="site" class="flex px-[30px] py-[30px]">
        <div class="add-avatar w-fit h-fit rounded-md">
          <img
            :src="newsAvatarPath"
            class="w-[150px] h-[150px] object-cover bg-[#D9D9D9] rounded-md"
          />
          <div class="button-side flex my-4 gap-2">
            <input
              type="file"
              class="w-[150px] file:w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#3B44D1] file:text-white hover:file:text-black hover:file:bg-violet-100"
              accept=".png, .jpeg, .jpg"
              @change="handleUploadNewsImg"
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
              <span class="pl-4 text-blue-700">Tiêu đề</span
              ><span class="text-red-600"> * </span>
              <input
                type="text"
                placeholder="Tiêu đề"
                class="input-text-default"
                v-model="title"
                :class="{ 'in-valid': messageOfTitle }"
              />
              <div
                class="mt-1 mb-2 h-[25px] text-red-500"
                v-if="messageOfTitle"
              >
                <span>{{ messageOfTitle }}</span>
              </div>
            </label>
            <label class="w-full text-start">
              <span class="pl-4 text-blue-700">Trạng thái tin tức</span>
              <select id="status" v-model="status" class="input-text-default">
                <option value="0">Khoá</option>
                <option value="1">Hiển thị</option>
              </select>
            </label>
          </div>
          <div class="p-4 text-start w-full pr-[20px]">
            <label class="text-blue-700 pl-4">Nội dung</label>
            <textarea
              v-model="description"
              rows="5"
              class="w-full h-[500px] border rounded-md p-2 input-text-default"
              placeholder="Thêm nội dung ......."
            ></textarea>
          </div>
        </div>
      </div>
      <div id="button-side" class="w-full flex text-start mx-[50px] gap-5">
        <button
          @click.prevent="updateNews"
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
import { ref, onMounted } from "vue";
import { isEmpty } from "../../utils/resources/check_valid";
import newsService from "../../services/news.service";

const title = ref("");
const description = ref("");
const status = ref(0);
const emits = defineEmits(["add-toast"]);
const creating = ref(false);
const fileUpload = ref(null);
const newsAvatarPath = ref(null);
const messageOfTitle = ref("");
const updating = ref(false);

import router from "@/router/router";

onMounted(() => {
  if (router.currentRoute.value.params.id) {
    getNews();
  }
});

async function getNews() {
  const newsId = router.currentRoute.value.params.id;
  const response = await newsService.getNewsById(newsId);

  console.log(response);

  if (response.status !== 200) {
    emits("add-toast", {
      title: "Lỗi tải dữ liệu",
      content: response.data.error,
      type: 3,
    });
    return;
  }

  const news = response.data.data[0];

  if (news) {
    title.value = news.title;
    description.value = news.description;
    status.value = news.status;
    newsAvatarPath.value = news.img;
  }
}

function checkValidNews() {
  let invalid = false;

  if (isEmpty(title.value)) {
    invalid = true;
    messageOfTitle.value = "Vui lòng nhập tiêu đề";
  }

  return invalid;
}

async function updateNews() {
  if (checkValidNews()) {
    return;
  }
  updating.value = true;
  const id = router.currentRoute.value.params.id;
  const formData = new FormData();
  if (fileUpload.value !== null) {
    formData.append("files", fileUpload.value);
  }
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("status", status.value);

  const response = await newsService.updateNews(id, formData);

  updating.value = false;

  if (response.status !== 500 && response.status != 200) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.error,
      type: 1,
    });
    return;
  }

  if (response.status === 500) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.error,
      type: 3,
    });
    return;
  }
  if (!response.data.success) {
    emits("add-toast", {
      title: "Cập nhật thất bại",
      content: response.data.message,
      type: 2,
    });
    return;
  }

  emits("add-toast", {
    title: "Cập nhật tin tức thành công",
    type: 0,
  });
}

// Sử lý và ràn buộc lấy hình ảnh
const handleUploadNewsImg = (event) => {
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
  newsAvatarPath.value = URL.createObjectURL(fileUpload.value);
  console.log(URL.createObjectURL(fileUpload.value));
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
