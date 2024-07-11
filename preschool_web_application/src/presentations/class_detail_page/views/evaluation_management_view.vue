<template>
  <div class="w-full h-full bg-white rounded-xl overflow-hidden">
    <PopupCreateEvaluation
      class="absolute top-0 left-0"
      v-if="isShowCreate"
      @close="closePopupCreate($event)"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Quản lý đánh giá</span>
    </div>
    <div class="w-full px-5 py-5">
      <!--Chức năng-->
      <div class="flex justify-between w-full">
        <SearchComp class="w-[450px]" />
        <CreateButtonComp
          @click="isShowCreate = true"
          :title="'Tạo đợt đánh giá mới'"
        />
      </div>
      <!--Body-->
      <div class="w-full grid grid-cols-3 gap-4 my-10">
        <div
          class="text-start bg-white border hover:ring-1 h-[180px] pb-10 px-3 py-2 drop-shadow-xl rounded-md"
        >
          <!--Title-->
          <div class="w-full text-[19px] font-bold text-start relative">
            Title TITL adasd áodkkÓAHDAJIDFOAILDHJFOADFI
          </div>
          <div class="text-[14px]">
            <div><span class="text-gray-600">Số phiếu: </span> 32</div>
            <div><span class="text-gray-600">Đã hoàn thành: </span> 12</div>
            <div><span class="text-gray-600">Chờ duyệt: </span> 20</div>
          </div>
          <span class="text-[14px] text-gray-500 absolute bottom-1 right-2"
            >Ngày tạo: 1/1/2024</span
          >
          <div class="flex items-center gap-3 absolute bottom-1 left-2">
            <img
              :src="avatar_default"
              class="w-7 h-7 rounded-full hover:border hover:border-black"
            />
            <span class="text-[14px]">Admin</span>
          </div>
        </div>
        <div
          class="text-start bg-white border hover:ring-1 h-[180px] pb-10 px-3 py-2 drop-shadow-xl rounded-md"
        >
          <!--Title-->
          <div class="w-full text-[19px] font-bold text-start relative">
            Title TITL adasd áodkkÓAHDAJIDFOAILDHJFOADFId
          </div>
          <div class="text-[14px]">
            <div><span class="text-gray-600">Số phiếu: </span> 32</div>
            <div><span class="text-gray-600">Đã hoàn thành: </span> 12</div>
            <div><span class="text-gray-600">Chờ duyệt: </span> 20</div>
          </div>
          <span class="text-[14px] text-gray-500 absolute bottom-1 right-2"
            >Ngày tạo: 1/1/2024</span
          >
          <div class="flex items-center gap-3 absolute bottom-1 left-2">
            <img
              :src="avatar_default"
              class="w-7 h-7 rounded-full hover:border hover:border-black"
            />
            <span class="text-[14px]">Admin</span>
          </div>
        </div>
        <div
          class="text-start bg-white border hover:ring-1 h-[180px] pb-10 px-3 py-2 drop-shadow-xl rounded-md"
        >
          <!--Title-->
          <div class="w-full text-[19px] font-bold text-start relative">
            Title TITL adasd áodkkÓAHDAJIDFOAILDHJFOADFI
          </div>
          <div class="text-[14px]">
            <div><span class="text-gray-600">Số phiếu: </span> 32</div>
            <div><span class="text-gray-600">Đã hoàn thành: </span> 12</div>
            <div><span class="text-gray-600">Chờ duyệt: </span> 20</div>
          </div>
          <span class="text-[14px] text-gray-500 absolute bottom-1 right-2"
            >Ngày tạo: 1/1/2024</span
          >
          <div class="flex items-center gap-3 absolute bottom-1 left-2">
            <img
              :src="avatar_default"
              class="w-7 h-7 rounded-full hover:border hover:border-black"
            />
            <span class="text-[14px]">Admin</span>
          </div>
        </div>
        <div
          class="text-start bg-white border hover:ring-1 h-[180px] pb-10 px-3 py-2 drop-shadow-xl rounded-md"
        >
          <!--Title-->
          <div class="w-full text-[19px] font-bold text-start relative">
            Title TITL adasd áodkkÓAHDAJI DFOAILDHJFOADFI
          </div>
          <div class="text-[14px]">
            <div><span class="text-gray-600">Số phiếu: </span> 32</div>
            <div><span class="text-gray-600">Đã hoàn thành: </span> 12</div>
            <div><span class="text-gray-600">Chờ duyệt: </span> 20</div>
          </div>
          <span class="text-[14px] text-gray-500 absolute bottom-1 right-2"
            >Ngày tạo: 1/1/2024</span
          >
          <div class="flex items-center gap-3 absolute bottom-1 left-2">
            <img
              :src="avatar_default"
              class="w-7 h-7 rounded-full hover:border hover:border-black"
            />
            <span class="text-[14px]">Admin</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
//component
import SearchComp from "../../../components/search_form_comp.vue";
import CreateButtonComp from "../../../components/create_button.vue";
import PopupCreateEvaluation from "../components/popup_create_evaluation.vue";
//icon
import avatar_default from "../../../assets/img/avartar_default.jpg";

const isShowCreate = ref(false);

//funciton
/**
 *
 * @param {Boolean} result
 * @returns TRUE or False
 */
function closePopupCreate(result) {
  isShowCreate.value = false;
}
</script>

<style lang="scss" scoped>
</style>