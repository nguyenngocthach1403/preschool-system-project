<template>
    <div class='flex'>
        <div class="relative mb-[10px] ml-[20px] w-[400px]">
            <input type="text" placeholder="Search here" class="rounded-[8px] border-[2px] h-[45px] pl-3 text-[17px] w-full focus:outline-0 focus:ring-2 focus:border-blue">
            <div class="h-[45px] active:scale-90 rounded-r-lg content-center bg-blue-300 w-[45px] absolute bottom-0 right-0 hover:opacity-50"><img :src="search_white_icon" class="w-[25px] m-auto"></div>
        </div>
    </div>
</template>

<script setup>
     /* Inmport Icons */
     import search_white_icon from '@/assets/icons/search-white.svg'

</script>

<style scoped>
   

</style>