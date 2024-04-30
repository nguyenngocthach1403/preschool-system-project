<template>
    <button class="w-fit text-[16px] flex justify-center h-[40px] bg-green-500 rounded-[5px] px-[10px] text-white py-2 shadow-card content-center">
        <img :src="create_icon" class="w-[25px]">
        <div class="ml-2 h-full content-center">Create class</div>
    </button>
</template>

<script setup>
    import create_icon from '@/assets//icons//pls.svg'
</script>

<style scoped>

</style>