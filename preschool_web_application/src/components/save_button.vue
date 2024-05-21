<template> 
    <button class="text-[15px] h-[40px] content-center px-[12px] gap-2 bg-green-400 rounded-md flex text-white m-auto mt-[15px] hover:bg-green-500 active:scale-95">
        <img :src="saveIcon" alt="" class="w-[20px] m-auto">
        <div class="h-full content-center">Lưu</div>
    </button>
</template>

<script setup>
    import saveIcon from '@/assets/icons/save.svg'
</script>

<style lang="scss" scoped>

</style>