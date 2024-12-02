<template lang="">
  <div class="overflow-hidden h-fit rounded-[8px]">
    <div
      class="overflow-x-auto h-fit mx-3 rounded-[8px]"
      ref="tableContainer">
      <table class="w-[max-content] border border-collapse">
        <thead class="bg-[#3B44D1] text-white">
          <tr>
            <th class="sticky left-[-1px] bg-[#3B44D1] px-4"></th>
            <th
              class="sticky left-[49px] bg-[#3B44D1] py-2 px-4 text-left"
              :class="{
                'sticky-shadow-header': isTitleSticky,
              }">
              Thông tin đơn
            </th>
            <th class="py-2 px-4 text-left">Thông tin phụ huynh</th>
            <th class="py-2 px-4 text-left">Liên hệ</th>
            <th class="py-2 px-4 text-left">Lớp đăng ký</th>
            <th class="py-2 px-4 text-left">Trạng thái</th>
            <th class="py-2 px-4 text-left absulute top-0">
              Trạng thái thanh toán
            </th>
            <th
              class="sticky bg-[#3B44D1] py-2 px-4 text-left absulute top-0 right-0">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody class="text-[13px]">
          <tr
            v-for="item in lst"
            :key="item">
            <td
              :class="{
                'sticky-shadow': isTitleSticky,
              }"
              class="left-[-1px] bg-white px-4 py-[15px] w-[40px] content-start min-w-[30px] border-y-[1px]">
              <CheckBox />
            </td>
            <td
              :class="{
                'sticky-shadow': isTitleSticky,
              }"
              class="left-[49px] text-left pl-4 pr-[50px] py-[5px] w-dvw max-w-[280px] min-w-[200px] content-start border-y-[1px]">
              <div class="py-1 text-[15px] text-blue-800 font-[500]">
                Nguyễn Ngọc Thach
              </div>
              <div class="flex place-content-between">
                <dl class="py-1">Giới tính: Nu</dl>
                <dl class="py-1">Tuổi: 9</dl>
              </div>
              <dl class="py-1 text-[#536076] flex gap-2">
                <p>Địa chỉ:</p>
                <p class="text-[#23272e]">ấp 3, xã Long Kh....</p>
              </dl>
            </td>
            <td
              class="text-left w-dvw px-4 py-[5px] max-w-[320px] min-w-[280px] text-[14px] font-[350] text-[#536076] content-start border-y-[1px]">
              <div class="py-1 flex place-content-between">
                <p class="">Tên:</p>
                <p class="text-[#23272e]">Nguyễn Ngọc Thach</p>
              </div>
              <div class="py-1 flex place-content-between">
                <p class="">Quan hệ:</p>
                <p class="text-[#23272e]">Bố</p>
              </div>
              <div class="py-1 flex place-content-between">
                <p class="">Nghề nghiệp:</p>
                <p class="text-[#23272e]">Công nhân</p>
              </div>
              <div class="h-[14px]"></div>
            </td>
            <td
              class="text-left w-dvw px-4 py-[5px] 2xl:max-w-[280px] min-w-[200px] text-[14px] font-[350] text-[#536076] content-start border-y-[1px]">
              <div class="py-1 flex place-content-between">
                <p class="">Email:</p>
                <p class="text-[#23272e]">--</p>
              </div>
              <div class="py-1 flex place-content-between">
                <p class="">Sđt:</p>
                <p class="text-[#23272e]">0899982782</p>
              </div>
            </td>
            <td
              class="text-left w-dvw px-4 py-[5px] max-w-[300px] text-[14px] min-w-[200px] font-[350] text-[#536076] content-start border-y-[1px]">
              <div class="py-1 flex place-content-between">
                <p class="">Tên lớp:</p>
                <p class="text-[#23272e]">Lớp Mầm non Tinh Hoa</p>
              </div>
              <div class="py-1 flex place-content-between">
                <p class="">Chương trình:</p>
                <p class="text-[#23272e]">Hội nhập Quốc Tế</p>
              </div>
              <div class="py-1 flex place-content-between">
                <p class="">Số lượng:</p>
                <p class="text-[#23272e]">30/40</p>
              </div>
            </td>
            <td
              class="text-left w-dvw px-4 py-[5px] max-w-[350px] min-w-[350px] text-[13px] font-[350] text-[#536076] content-start border-y-[1px]">
              <div class="py-[2px] flex place-content-between">
                <p class="">Trạng thái:</p>
                <div
                  class="py-[3px] px-3 border rounded-md border-[#00c05e] text-[#00c05e]">
                  Đã đăng ký
                </div>
              </div>
              <div class="py-[2px] flex place-content-between">
                <p class="">Hồ sơ:</p>
                <div
                  class="py-[3px] px-3 border rounded-md border-[#000000d9] text-[#000000d9]">
                  Chưa nộp
                </div>
              </div>
            </td>
            <td
              class="text-left px-4 py-[5px] w-[400px] min-w-[350px] absulute top-0 text-[13px] font-[350] text-[#536076] content-start border-y-[1px]">
              <div class="py-[2px] flex place-content-between">
                <p class="">Trạng thái:</p>
                <div class="py-[3px] px-3 border rounded-md">Chưa</div>
              </div>
              <div class="py-[2px] flex place-content-between">
                <p class="">Hình thức:</p>
                <div class="py-[3px] px-3 border rounded-md">-</div>
              </div>
              <div class="py-[2px] flex place-content-between">
                <p class="">Thời hạn thanh toán</p>
                <div class="py-[3px] px-3 border rounded-md">
                  1/1/2024 (còn 5 ngày)
                </div>
              </div>
            </td>
            <td
              :class="{
                '--tool-sticky-shadow': !isToolSticky,
              }"
              class="sticky top-0 right-0 bg-white text-left px-4 py-[5px] w-[200px] min-w-[100px] absulute top-0 text-[13px] font-[350] text-[#536076] content-center border-y-[1px]">
              <div class="flex gap-1">
                <button
                  class="bg-white px-[12px] py-[7px] rounded-[20px] border hover:border-red-500 hover:drop-shadow-xl active:drop-shadow-md"
                  type="">
                  <img :src="deleteIcon" />
                </button>
                <button
                  class="bg-white px-[12px] py-[7px] rounded-[20px] border hover:border-blue-500 hover:drop-shadow-xl active:drop-shadow-md"
                  type="">
                  <img :src="deleteIcon" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-5 flex place-content-end">
      <Pagination />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
//Assets
import deleteIcon from "@/assets/icons/delete.svg";
//Components
import CheckBox from "@/components/checkbox.vue";
import Pagination from "@/components/pagination.vue";
const tableContainer = ref(null);
const isTitleSticky = ref(false);
const isToolSticky = ref(false);

const lst = ref([1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5]);
const handleScrollTableContainer = () => {
  isTitleSticky.value = isTalbleContainerScrolling();
  isToolSticky.value = isTableContainerScrollEnd();
};
function isTableContainerScrollEnd() {
  const scrolledToEnd =
    tableContainer.value.scrollLeft + tableContainer.value.clientWidth >=
    tableContainer.value.scrollWidth;
  return scrolledToEnd;
}
function isTalbleContainerScrolling() {
  const scrollLeft = tableContainer.value?.scrollLeft || 0;
  return scrollLeft > 0;
}

onMounted(() => {
  tableContainer.value?.addEventListener("scroll", handleScrollTableContainer);
});

onUnmounted(() => {
  tableContainer.value?.removeEventListener(
    "scroll",
    handleScrollTableContainer
  );
});
</script>
<style scoped>
.sticky-shadow {
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: 4px 4px 10px rgba(0, 0, 0);
  background-color: white;
  transform: translateZ(0);
}
.--tool-sticky-shadow {
  position: sticky;
  top: 0;
  right: 0;
  z-index: 2;
  box-shadow: 4px 4px 10px rgba(0, 0, 0);
  background-color: white;
  transform: translateZ(0);
}
.sticky-shadow-header {
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: -10px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #3b44d1;
  transform: translateZ(0);
}
.--tool-sticky-shadow::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  box-shadow: -10px 4px 10px rgba(0, 0, 0, 0.2);
}
.sticky-shadow-header::before,
.sticky-shadow::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.2);
  /* filter: blur(10px); */
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px; /* Width of the entire scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: #6f6f6f; /* Color of the thumb */
  border-radius: 4px; /* Rounded corners */
}

/* Target the scrollbar thumb when hovered */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the thumb when hovered */
}

/* Target the scrollbar track */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* Color of the track */
}

.file-not-yet {
  border: 1px solid #000000d9;
  color: #000000d9;
}
.file-completed {
  border: 1px solid #00c05e;
  color: #00c05e;
}
.new-status {
  border: 1px solid #0c81ff;
  color: #0c81ff;
}

.completed-status {
  border: 1px solid #00c05e;
  color: #00c05e;
}
</style>
