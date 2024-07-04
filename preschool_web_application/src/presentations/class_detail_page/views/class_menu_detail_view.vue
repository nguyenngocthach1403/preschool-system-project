<template>
  <div class="w-full h-full bg-white rounded-xl">
    <PopupCreateMenu
      @close="isShowCreateMenu = null"
      class="absolute top-0 left-0"
      v-if="isShowCreateMenu"
      :data-to-create="isShowCreateMenu"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Thực đơn hàng tuần</span>
    </div>
    <div class="flex">
      <div class="menu-navigation">
        <button onclick="prevWeek()">Tuần trước</button>
        <button onclick="nextWeek()">Hiện tại</button>
        <button onclick="nextWeek()">Tuần sau</button>
      </div>
    </div>
    <!--Body-->
    <!--Table-->
    <MenuTable @create-meal-of-day-menu="isShowCreateMenu = $event" />
  </div>
</template>

<script setup>
//component
import LoadingComp from "../../../components/loading_comp.vue";
import MenuTable from "../components/menu_table.vue";
import PopupCreateMenu from "../components/create_menu_popup.vue";
import { onMounted, ref } from "vue";

//  @valiable state
const loading = ref(false);
const isShowCreateMenu = ref(false);

//valiable data
const meals = ref([]);
const menu = ref();
</script>

<style  scoped>
.menu-navigation {
  margin: 10px 0px;
}

.menu-navigation button:hover {
  background-color: #2d3d99;
}

.menu-navigation button {
  background-color: #3f51b5;
  color: white;
  border-radius: 7px;
  margin: 0 0px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>