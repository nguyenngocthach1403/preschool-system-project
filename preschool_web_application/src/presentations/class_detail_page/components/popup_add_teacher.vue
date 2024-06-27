<template>
  <LayoutPopup
    :title="'Thêm giáo viên quản lý lớp học'"
    @close="$emit('close')"
    class="absolute top-0 left-0"
  >
    <template #content>
      <div class="w-full h-[500px] px-10 overflow-y-auto align-center">
        <SearchForm class="w-[700px] m-auto" />
        <div
          class="w-full h-[420px] border rounded-md flex flex-wrap justify-between px-3 overflow-y-auto"
        >
          <div
            class="my-3 h-[250px] w-[440px] rounded-xl border-[1px] border-blue-500 bg-blue-100/50 hover:border-black"
          >
            <div class="w-full flex gap-2">
              <div class="my-2 mx-2">
                <div
                  class="w-[90px] h-[90px] rounded-full border-[1px] border-gray-300"
                ></div>
              </div>
              <div
                class="border-[1px] my-2 mr-2 bg-white rounded-md border-gray-300 w-full text-start px-2"
              >
                <p>Nguyễn Thị Mỹ Linh</p>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Ngày sinh: </span
                    ><span>1/1/1999</span>
                  </p>
                  <p>
                    <span class="text-gray-500">Giới tính: </span
                    ><span>Nữ</span>
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p><span class="text-gray-500">Thâm niên: </span> 11 năm</p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Số lớp đã quản lý: </span> 11
                    lớp
                  </p>
                </div>
              </div>
            </div>
            <div
              class="border-[1px] bg-white h-[130px] overflow-y-auto my-1 mx-2 rounded-md text-start px-2 border-gray-300"
            >
              <p>Kinh nghiệm</p>
              <ul class="px-5 text-[13px] list-disc">
                <li>Chăm sóc trẻ</li>
                <li>
                  Tiếp đón các trẻ mới đến daddddddddddddddđ asdasd asd asdasd
                  asd asdas da sd
                </li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
              </ul>
            </div>
          </div>
          <div
            class="my-3 h-[250px] w-[440px] rounded-xl border-[1px] border-blue-500 bg-blue-100/50"
          >
            <div class="w-full flex gap-2">
              <div class="my-2 mx-2">
                <div
                  class="w-[90px] h-[90px] rounded-full border-[1px] border-gray-500"
                ></div>
              </div>
              <div
                class="border-[1px] my-2 mr-2 bg-white rounded-md border-gray-300 w-full text-start px-2"
              >
                <p>Nguyễn Thị Mỹ Linh</p>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Ngày sinh: </span
                    ><span>1/1/1999</span>
                  </p>
                  <p>
                    <span class="text-gray-500">Giới tính: </span
                    ><span>Nữ</span>
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p><span class="text-gray-500">Thâm niên: </span> 11 năm</p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Số lớp đã quản lý: </span> 11
                    lớp
                  </p>
                </div>
              </div>
            </div>
            <div
              class="border-[1px] bg-white h-[130px] overflow-y-auto my-1 mx-2 rounded-md text-start px-2 border-gray-300"
            >
              <p>Kinh nghiệm</p>
              <ul class="px-5 text-[13px] list-disc">
                <li>Chăm sóc trẻ</li>
                <li>
                  Tiếp đón các trẻ mới đến daddddddddddddddđ asdasd asd asdasd
                  asd asdas da sd
                </li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
              </ul>
            </div>
          </div>
          <div
            class="my-3 h-[250px] w-[440px] rounded-xl border-[1px] border-blue-500 bg-blue-100/50"
          >
            <div class="w-full flex gap-2">
              <div class="my-2 mx-2">
                <div
                  class="w-[90px] h-[90px] rounded-full border-[1px] border-gray-500"
                ></div>
              </div>
              <div
                class="border-[1px] my-2 mr-2 bg-white rounded-md border-gray-300 w-full text-start px-2"
              >
                <p>Nguyễn Thị Mỹ Linh</p>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Ngày sinh: </span
                    ><span>1/1/1999</span>
                  </p>
                  <p>
                    <span class="text-gray-500">Giới tính: </span
                    ><span>Nữ</span>
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p><span class="text-gray-500">Thâm niên: </span> 11 năm</p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Số lớp đã quản lý: </span> 11
                    lớp
                  </p>
                </div>
              </div>
            </div>
            <div
              class="border-[1px] bg-white h-[130px] overflow-y-auto my-1 mx-2 rounded-md text-start px-2 border-gray-300"
            >
              <p>Kinh nghiệm</p>
              <ul class="px-5 text-[13px] list-disc">
                <li>Chăm sóc trẻ</li>
                <li>
                  Tiếp đón các trẻ mới đến daddddddddddddddđ asdasd asd asdasd
                  asd asdas da sd
                </li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
              </ul>
            </div>
          </div>
          <div
            class="my-3 h-[250px] w-[440px] rounded-xl border-[1px] border-blue-500 bg-blue-100/50"
          >
            <div class="w-full flex gap-2">
              <div class="my-2 mx-2">
                <div
                  class="w-[90px] h-[90px] rounded-full border-[1px] border-gray-500"
                ></div>
              </div>
              <div
                class="border-[1px] my-2 mr-2 bg-white rounded-md border-gray-300 w-full text-start px-2"
              >
                <p>Nguyễn Thị Mỹ Linh</p>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Ngày sinh: </span
                    ><span>1/1/1999</span>
                  </p>
                  <p>
                    <span class="text-gray-500">Giới tính: </span
                    ><span>Nữ</span>
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p><span class="text-gray-500">Thâm niên: </span> 11 năm</p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Số lớp đã quản lý: </span> 11
                    lớp
                  </p>
                </div>
              </div>
            </div>
            <div
              class="border-[1px] bg-white h-[130px] overflow-y-auto my-1 mx-2 rounded-md text-start px-2 border-gray-300"
            >
              <p>Kinh nghiệm</p>
              <ul class="px-5 text-[13px] list-disc">
                <li>Chăm sóc trẻ</li>
                <li>
                  Tiếp đón các trẻ mới đến daddddddddddddddđ asdasd asd asdasd
                  asd asdas da sd
                </li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
              </ul>
            </div>
          </div>
          <div
            class="my-3 h-[250px] w-[440px] rounded-xl border-[1px] border-blue-500 bg-blue-100/50"
          >
            <div class="w-full flex gap-2">
              <div class="my-2 mx-2">
                <div
                  class="w-[90px] h-[90px] rounded-full border-[1px] border-gray-500"
                ></div>
              </div>
              <div
                class="border-[1px] my-2 mr-2 bg-white rounded-md border-gray-300 w-full text-start px-2"
              >
                <p>Nguyễn Thị Mỹ Linh</p>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Ngày sinh: </span
                    ><span>1/1/1999</span>
                  </p>
                  <p>
                    <span class="text-gray-500">Giới tính: </span
                    ><span>Nữ</span>
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p><span class="text-gray-500">Thâm niên: </span> 11 năm</p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Số lớp đã quản lý: </span> 11
                    lớp
                  </p>
                </div>
              </div>
            </div>
            <div
              class="border-[1px] bg-white h-[130px] overflow-y-auto my-1 mx-2 rounded-md text-start px-2 border-gray-300"
            >
              <p>Kinh nghiệm</p>
              <ul class="px-5 text-[13px] list-disc">
                <li>Chăm sóc trẻ</li>
                <li>
                  Tiếp đón các trẻ mới đến daddddddddddddddđ asdasd asd asdasd
                  asd asdas da sd
                </li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
              </ul>
            </div>
          </div>
          <div
            class="my-3 h-[250px] w-[440px] rounded-xl border-[1px] border-blue-500 bg-blue-100/50"
          >
            <div class="w-full flex gap-2">
              <div class="my-2 mx-2">
                <div
                  class="w-[90px] h-[90px] rounded-full border-[1px] border-gray-500"
                ></div>
              </div>
              <div
                class="border-[1px] my-2 mr-2 bg-white rounded-md border-gray-300 w-full text-start px-2"
              >
                <p>Nguyễn Thị Mỹ Linh</p>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Ngày sinh: </span
                    ><span>1/1/1999</span>
                  </p>
                  <p>
                    <span class="text-gray-500">Giới tính: </span
                    ><span>Nữ</span>
                  </p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p><span class="text-gray-500">Thâm niên: </span> 11 năm</p>
                </div>
                <div class="text-[13px] flex gap-5">
                  <p>
                    <span class="text-gray-500">Số lớp đã quản lý: </span> 11
                    lớp
                  </p>
                </div>
              </div>
            </div>
            <div
              class="border-[1px] bg-white h-[130px] overflow-y-auto my-1 mx-2 rounded-md text-start px-2 border-gray-300"
            >
              <p>Kinh nghiệm</p>
              <ul class="px-5 text-[13px] list-disc">
                <li>Chăm sóc trẻ</li>
                <li>
                  Tiếp đón các trẻ mới đến daddddddddddddddđ asdasd asd asdasd
                  asd asdas da sd
                </li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
                <li>Chăm sóc trẻ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #bottom> a </template>
  </LayoutPopup>
</template>

<script setup>
import LayoutPopup from "../../../components/edit_and_create_layout.vue";
import SearchForm from "../../../components/search_form_comp.vue";

//prop
const props = defineProps({
  classRole: {
    type: Number,
    require: true,
  },
});
</script>

<style lang="scss" scoped>
</style>