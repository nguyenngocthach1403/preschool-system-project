<template>
  <div class="w-full h-full bg-white rounded-xl">
    <PopupCreateMenu
      @close="closePopupCreateMenu($event)"
      class="absolute top-0 left-0"
      v-if="isShowCreateMenu"
      :data-to-create="isShowCreateMenu"
      :class-id="props.classId"
      @add-toast="$emit('add-toast', $event)"
    />
    <PopupEditMenu
      v-if="isShowEditMenu"
      :menu-detail="isShowEditMenu"
      @close="isShowEditMenu = null"
      @delete="isComfirmPopup = $event"
    />
    <PopupComfirm
      :content="`Bạn có chắc muốn xóa ${isComfirmPopup.dish_name} khỏi danh sách?`"
      v-if="isComfirmPopup"
      class="absolute top-0 left-0"
      :value="isComfirmPopup"
      @confirm="isComfirmPopup = null"
    />
    <div class="py-4 px-7 text-start border-b flex justify-between">
      <span class="text-[20px] font-bold">Thực đơn hàng tuần</span>
    </div>
    <!--Body-->
    <!--Table-->
    <MenuTable
      :menu-list="menu"
      @create-meal-of-day-menu="isShowCreateMenu = $event"
      @edit-menu="isShowEditMenu = $event"
    />
  </div>
</template>

<script setup>
//component
import LoadingComp from "../../../components/loading_comp.vue";
import MenuTable from "../components/menu_table.vue";
import PopupCreateMenu from "../components/create_menu_popup.vue";
import PopupEditMenu from "../../menu_page/components/popup_detail_menu.vue";
import PopupComfirm from "../../../components/confirm_dialog.vue";
import { onMounted, ref } from "vue";
import menuService from "../../../services/menu.service";

//  @valiable state
const loading = ref(false);
const isShowCreateMenu = ref(false);
const isShowEditMenu = ref(null);
const isComfirmPopup = ref(false);

//valiable data
const meals = ref([]);
const menu = ref(null);

const props = defineProps({
  classId: {
    type: Number,
    require: true,
  },
});

async function fetchMenuList(classId) {
  try {
    loading.value = true;

    const response = await menuService.fetchMenuList(classId);

    const dataResponse = response.data.data;

    return dataResponse;
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  if (props.classId) {
    menu.value = await fetchMenuList(props.classId);
  }
});
async function closePopupCreateMenu(event) {
  isShowCreateMenu.value = null;

  if (event) {
    menu.value = await fetchMenuList(props.classId);
  }
}
</script>

<style  scoped>
</style>