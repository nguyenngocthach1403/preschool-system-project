<template lang="">
  <div class="h-full overflow-hidden">
    <div class="h-[90%] overflow-y-auto">
      <table class="w-full h-fit">
        <thead class="sticky top-0">
          <tr class="bg-blue-700 text-white">
            <th class="py-[5px] text-left px-3">Đợt tuyển sinh</th>
            <th class="py-[5px] text-left px-3">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left px-3">
              <div class="">
                <p class="">Đợt tuyển sinh ABC</p>
                <p class="text-[14px] text-gray-600">1/1/2003 - 1/1/2003</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="h-full">
      <Pagination />
    </div>
  </div>
</template>
<script setup>
//Components
import Pagination from "@/components/pagination.vue";
</script>
<style scoped lang=""></style>
