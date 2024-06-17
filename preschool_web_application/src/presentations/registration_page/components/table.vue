<template>
  <div class="overflow-hidden h-fit mr-[10px] z-20">
    <!--Table here-->
    <table class="h-fit w-full">
      <thead class="text-[15px] text-white bg-[#3B44D1] sticky top-0 z-10">
        <tr>
          <th class="px-3 py-3 text-left"></th>
          <th class="px-3 text-left">
            <div class="flex">
              Mã đăng ký
              <img
                :src="sort_icon"
                class="w-[20px] hover:bg-gray-200/25 rounded-full"
              />
            </div>
          </th>
          <th class="px-3 text-left">
            <div class="flex">
              Tên người đăng ký
              <img
                :src="sort_icon"
                class="w-[20px] hover:bg-gray-200/25 rounded-full"
              />
            </div>
          </th>
          <th class="px-3 text-left w-fit">Tài khoản</th>
          <th class="px-3 text-left">Liên hệ</th>
          <th class="px-3 text-left">Địa chỉ</th>
          <th class="px-3 text-left">Nội dung</th>
          <th class="px-3 text-left">Hồ sơ</th>
          <th class="px-3 text-left">Trạng thái</th>
          <th class="px-3 text-left">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in drops.data"
          :key="index"
          class="text-[14px] h-[60px] text-left even:bg-gray-50 border-b-[1px]"
        >
          <td class="px-3">
            <div class="inline-flex items-center">
              <label
                class="relative flex items-center p-3 rounded-full cursor-pointer"
                htmlFor="check"
              >
                <input
                  type="checkbox"
                  class="before:content[''] hover:ring-2 peer relative h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#3B44D1] checked:border-none hover:before:opacity-10"
                  id="check"
                />
                <span
                  class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          </td>
          <td class="hidden 2xl:table-cell px-3 w-[500px]">
            <span>{{ item.id }}</span>
          </td>
          <td class="w-[1000px] px-3 py-2">
            <span>{{ item.name }}</span>
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Vai trò:</span> {{ checkRole(item.role) }}
            </dd>
          </td>
          <td class="px-3 w-[400px]">
            <button
              @click.prevent
              v-if="item.user == null"
              @click="$emit('click-create-acount', item)"
              class="hover:bg-yellow-500/50 active:scale-95 rounded-[5px] h-[30px] w-fit px-2 content-center text-center border-yellow-300 text-[12px] border bg-yellow-200/25 text-yellow-600 cursor-default"
            >
              Tạo tài khoản
            </button>
            <dd class="text-gray-500 text-[14px] my-[5px]" v-else>
              <span>
                <span class="font-bold">Tài khoản:</span> {{ item.user }}</span
              >
            </dd>
          </td>
          <td class="hidden 2xl:table-cell px-3 w-[600px] text-blue-900">
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Email:</span> {{ item.email ?? "None" }}
            </dd>
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">SDT:</span> {{ item.phone ?? "None" }}
            </dd>
          </td>

          <td class="w-[1000px] px-3">
            <span>{{ item.address }}</span>
            <!-- <span v-if="!item.class" class="italic">None</span> -->
          </td>
          <td class="px-3 w-[600px]">
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Cấp:</span> {{ item.levels ?? "None" }}
            </dd>
            <dd class="text-gray-500 text-[14px] my-[5px]">
              <span class="font-bold">Chương trình:</span>
              {{ item.syllabus ?? "None" }}
            </dd>
          </td>
          <td class="px-3 w-[600px]">
            <button
              class="rounded-[5px] h-[30px] w-fit px-2 content-center text-center text-[12px] border relative"
              :class="classStatus(item.profileStatus)"
              @click="$emit('show-register-img', item.register_img)"
            >
              {{ checkStatus(item.profileStatus) }}
            </button>
          </td>
          <td class="px-3 w-[600px] relative">
            <button
              :class="{
                'status-0': item.status === 0,
                'status-1': item.status === 1,
                'status-2': item.status === 2,
                'status-3': item.status === 3,
                'status-4': item.status === 4,
                'status-5': item.status === 5,
              }"
              class="hover:bg-gray-200 rounded-[5px] h-[30px] w-fit px-2 content-center text-center text-[12px]"
              @click="selectStatus($event, item.id)"
            >
              {{ convertRegisterStatus(item.status) }}
            </button>
          </td>
          <td class="content-center px-3 cursor-default hover:text-blue-700">
            <button
              @click="selectMenu($event, item)"
              class="p-1 hover:bg-gray-300 rounded-md"
            >
              <img
                v-if="showMenu && showMenu.id == item.id"
                :src="close_icon"
                class="w-[20px]"
                alt=""
              />
              <img v-else :src="menu_icon" class="w-[20px]" alt="" />
            </button>
          </td>
        </tr>
        <Transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            @mouseleave="closeMenu"
            v-if="showMenu"
            class="absolute mt-2 w-[150px] top-0 h-fit z-40 bg-white drop-shadow rounded-md z-30"
            :style="{ top: y + 'px', left: x - 150 + 'px' }"
          >
            <ul @click="closeMenu" class="text-start cursor-default">
              <li
                @click="$emit('delete-item', showMenu)"
                class="w-full py-2 rounded-md hover:bg-gray-100 px-2 flex gap-3"
              >
                <img :src="delete_icon" class="w-[15px]" /> Xóa
              </li>
              <li
                @click="$emit('edit-item', showMenu)"
                class="w-full py-2 rounded-md hover:bg-gray-100 px-2 flex gap-3"
              >
                <img :src="edit_icon" class="w-[15px]" /> Sửa
              </li>
            </ul>
          </div>
        </Transition>
        <Transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            @mouseleave="closeChangeStatus"
            v-if="show"
            class="absolute mt-2 w-[150px] top-0 h-fit z-40 bg-white drop-shadow rounded-md z-30"
            :style="{ top: y + 'px', left: x + 'px' }"
          >
            <ul @click="closeChangeStatus" class="text-start">
              <li
                v-for="(item, index) in registerStatusList"
                :key="index"
                class="w-full py-1 hover:bg-gray-100 px-2"
                @click="updateRegisterStatus(index)"
              >
                {{ item }}
              </li>
              <!-- <li
                @click="updateRegisterStatus(0)"
                class="w-full py-1 hover:bg-gray-100 px-2"
              >
                Đơn mới
              </li>
              <li
                @click="updateRegisterStatus(1)"
                class="w-full py-1 hover:bg-gray-100 px-2"
              >
                Đã hẹn
              </li>
              <li
                @click="updateRegisterStatus(2)"
                class="w-full py-1 hover:bg-gray-100 px-2"
              >
                Liên hệ lại
              </li>
              <li
                @click="updateRegisterStatus(3)"
                class="w-full py-1 hover:bg-gray-100 px-2"
              >
                Đơn ảo
              </li>
              <li
                @click="updateRegisterStatus(4)"
                class="w-full py-1 hover:bg-gray-100 px-2"
              >
                Hoàn thành
              </li>
              <li
                @click="updateRegisterStatus(5)"
                class="w-full py-1 hover:bg-gray-100 px-2"
              >
                Chờ hủy
              </li> -->
            </ul>
          </div>
        </Transition>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import sort_icon from "@/assets/icons/Sorting arrowheads.svg";
import { convertRegisterStatus } from "../../../utils/resources/converter";
import menu_icon from "../../../assets/icons/menu.svg";
import close_icon from "../../../assets/icons/close.svg";
import delete_icon from "../../../assets/icons/delete.svg";
import edit_icon from "../../../assets/icons/edit.svg";
const showChangeStatusViewIndex = ref(null);
const showMenu = ref(false);

const emits = defineEmits(["update-status"]);
const drops = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
const show = ref(false);
function closeChangeStatus() {
  setTimeout(() => {
    show.value = false;
  }, 50);
}
function closeMenu() {
  setTimeout(() => {
    showMenu.value = null;
  }, 50);
}

const x = ref();
const y = ref();
const registerId = ref();

function selectMenu(event, register) {
  showMenu.value == null
    ? (showMenu.value = register)
    : (showMenu.value = null);
  x.value = event.clientX;
  y.value = event.clientY;
}

const registerStatusList = ref([
  "Đơn mới",
  "Đã hẹn",
  "Liên hệ lại",
  "Đơn ảo",
  "Hoàn thành",
  "Chờ hủy",
]);

function selectStatus(event, id) {
  show.value = !show.value;
  showChangeStatusViewIndex.value = id;
  registerId.value = id;
  x.value = event.clientX;
  y.value = event.clientY;
}
function updateRegisterStatus(status) {
  emits("update-status", { id: registerId.value, status: status });
}
function checkStatus(value) {
  switch (value) {
    case 1:
      return "Hoàn thành";
    case 0:
      return "Chưa hoàn thành";
    case 3:
      return "Thiếu";

    default:
      return "None";
  }
}

function checkRole(value) {
  switch (value) {
    case 0:
      return "Bố";
    case 1:
      return "Mẹ";
    case 2:
      return "Người giám hộ";

    default:
      return "None";
  }
}
function classStatus(value) {
  switch (value) {
    case 1:
      return "done";
    case 0:
      return "unfinished";
    case 3:
      return "lack";

    default:
      return "None";
  }
}
</script>

<style scoped>
.done {
  color: rgb(8, 142, 64) !important;
  background-color: rgba(7, 162, 43, 0.116);
  border: solid 1px rgb(105, 246, 124);
}
.lack {
  color: rgb(132, 122, 33) !important;
  background-color: rgba(162, 157, 7, 0.116);
  border: solid 1px rgb(246, 213, 105);
}
.unfinished {
  background-color: rgba(252, 165, 165, 0.3) !important;
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}

.status-0 {
  background-color: rgb(186 230 253);
  border: 1px solid rgb(125 211 252) !important;
  color: rgb(14 165 233);
}
.status-1 {
  background-color: rgb(221 214 254) !important;
  border: 1px solid rgb(196 181 253) !important;
  color: rgb(139 92 246) !important;
}
.status-2 {
  color: rgb(142, 73, 8) !important;
  background-color: rgba(162, 103, 7, 0.2);
  border: solid 1px rgb(246, 199, 105);
}
.status-3 {
  background-color: rgb(254, 254, 202);
  border: 1px solid rgb(252, 230, 165) !important;
  color: rgb(220, 162, 38);
}
.status-4 {
  background-color: rgb(217 249 157);
  border: 1px solid rgb(190 242 100) !important;
  color: rgb(132 204 22);
}
.status-5 {
  background-color: rgba(252, 165, 165, 0.3) !important;
  border: 1px solid rgb(252 165 165) !important;
  color: rgb(220 38 38);
}
</style>