<template>
  <div
    :class="{
      'status-0': props.id === 0 && props.checked == true,
      'status-1': props.id === 1 && props.checked == true,
      'status-2': props.id === 2 && props.checked == true,
      'status-3': props.id === 3 && props.checked == true,
      'status-4': props.id === 4 && props.checked == true,
      'status-5': props.id === 5 && props.checked == true,
    }"
    class="w-fit bg-gray-200 rounded-md flex items-center px-2 py-1 gap-2"
  >
    <label class="relative flex items-center rounded-full cursor-pointer">
      <input
        type="checkbox"
        class="before:content[''] hover:ring-2 peer relative h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#3B44D1] checked:border-none hover:before:opacity-10"
        id="check"
        :checked="props.checked"
        @change="$emit('change', $event)"
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
    <span>{{ props.content }}</span>
    <span>({{ props.total }})</span>
  </div>
</template>

<script setup>
const props = defineProps(["content", "checked", "total", "id"]);
</script>

<style scoped>
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