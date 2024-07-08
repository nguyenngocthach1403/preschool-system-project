<template>
  <PopupLayout
    :title="'Sửa món ăn'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-[600px]">
        <form @submit="createDish()" action="" class="px-10">
          <div class="text-start">
            <span>Tên món ăn</span><span class="text-red-500"> (*)</span
            ><input
              v-model="dishName"
              type="text"
              class="input-text-default"
              :class="{ invalid: messageOfName }"
            />
            <div class="h-[20px] my-1 text-red-500">{{ messageOfName }}</div>
          </div>
          <div class="text-start">
            <span>Loại</span><span class="text-red-500"> (*)</span
            ><select
              v-model="category"
              class="input-text-default"
              :class="{ invalid: messageOfCategory }"
            >
              <option disabled selected value="">Chọn loại món ăn</option>
              <option
                v-for="item in categories"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <div class="h-[20px] my-1 text-red-500">
              {{ messageOfCategory }}
            </div>
          </div>
          <!-- <div class="text-start">
              <span>Mô tả</span>
              <div class="w-full p-1">
                <textarea
                  v-model="description"
                  class="w-full px-2 py-2 outline-none focus:ring-1 focus:border-none hover:border hover:border-black rounded-md"
                  cols="30"
                  rows="10"
                >
                </textarea>
              </div>
            </div> -->
        </form>
      </div>
    </template>
    <template #button>
      <div
        id="button-side"
        class="w-full flex justify-center gap-5 basis-1/6 text-[14px]"
      >
        <button
          v-if="!creating"
          @click="createDish()"
          type="button"
          class="h-[35px] my-[5px] border border-[#3B44D1] bg-[#3B44D1] hover:bg-blue-900 text-white px-3 rounded-md ]"
        >
          Cập nhật
        </button>
        <button
          v-if="creating"
          type="button"
          class="h-[35px] basis-1/11 rounded-md my-[5px] w-fit outline-none border-[0.12rem] focus:border-blue-500 px-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#3B44D1] hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
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
  </PopupLayout>
</template>
    
    <script setup>
import { onMounted, ref } from "vue";
import PopupLayout from "../../../components/popup_layout.vue";
import { isEmpty, isValidTime } from "../../../utils/resources/check_valid";

//Service
import MenuService from "../../../services/menu.service";
//list
const categories = ref([
  { id: 1, name: "Món nước" },
  { id: 2, name: "Nước" },
  { id: 3, name: "Món chiên" },
  { id: 4, name: "Cơm" },
  { id: 5, name: "Trái cây" },
  { id: 6, name: "Món luộc" },
  { id: 7, name: "Món mặn" },
]);

//   //model
//   const startTime = ref(null);
const category = ref(null);
const dishName = ref("");
const description = ref("");

const creating = ref(false);

//   //Message Valid
const messageOfName = ref(null);
const messageOfCategory = ref(null);

//emits
const emits = defineEmits(["add-toast", "close"]);
const props = defineProps({
  dish: {
    type: Object,
    require: true,
  },
});

function fillValue(dish) {
  if (!dish) return;
  dishName.value = dish.name;
  category.value = dish.category;
}

/**
 * Phương thức kiểm tra các giá trị nhập của người dùng
 * @return True or False
 */
function checkValid() {
  let invalid = false;
  if (isEmpty(dishName.value)) {
    invalid = true;
    messageOfName.value = "Vui lòng nhập tên món ăn";
  }

  if (isEmpty(category.value)) {
    invalid = true;
    messageOfCategory.value = "Vui lòng chọn loại món ăn";
  }
  return invalid;
}

onMounted(() => {
  fillValue(props.dish);
});

// async function createDish() {
//   if (checkValid()) return;

//   try {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) return;
//     creating.value = true;
//     const response = await MenuService.addDish({
//       dishName: dishName.value,
//       category: category.value,
//       description: description.value,
//       create_by: user.id,
//     });

//     emits("add-toast", {
//       title: "Thành công!",
//       type: 0,
//     });
//     emits("close", true);
//   } catch (error) {
//     emits("add-toast", {
//       title: "Thất bại!",
//       type: 1,
//     });
//   } finally {
//     creating.value = false;
//   }
// }
</script>
    
    <style  scoped>
.invalid {
  border: 1px solid red;
}
</style>