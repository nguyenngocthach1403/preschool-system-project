<template>
    <div class="bg-[#F4F4F4] w-[300px] h-[320px] rounded-[16px] grid shadow-card grid-rows-2 mt-[10px] mx-[10px] border-2">
        <!--Avatar & Status -->
        <div id="head" class="p-[8px] rounded-[16px] relative">
            <div class="status text-[10px] absolute bg-white top-[12px] left-[12px] px-[8px] rounded-[10px] h-[25px] content-center" :class="status(classData.status)">{{ classData.status }}</div>
            <div class="absolute bottom-3 left-3 flex">
                <!--Class Type-->
                <div class="bg-white text-[13px] px-[8px] h-[20px] content-center rounded-[10px]">{{ classData.type }}</div>
                <!--Session-->
                <div class="bg-white text-[13px] ml-1 px-[8px] h-[20px] content-center rounded-[10px]">{{ classData.session }}</div>
            </div>
            <div class="avatar w-full h-full rounded-[8px]">
                <img :src='classData.avatar' class=" rounded-[8px] h-full w-full object-cover" alt="">
            </div>
        </div>
        <div id="body" class="px-[15px]">
            <div class="title text-[19px] w-full text-start">
                <span>{{ classData.name }}</span>
            </div>
            <div class="teacher flex text-[13px] text-gray-500 content-center h-[25px]">
                <img src="https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7" class="rounded-[50px] h-[25px] w-[25px]">
                <div class="ml-5 h-full content-center">Mr. {{ classData.teacher }}</div>
            </div>
            <div class="number-of-membver flex text-[13px] text-gray-500 h-[25px] my-1">
                <img :src="member_icon" class="rounded-[50px] h-[25px] w-[25px]">
                <span class="ml-5 h-full content-center">Member: 30/45</span>
            </div>
            <div class="number-of-membver flex text-[13px] text-gray-500 content-center h-[25px] my-1">
                <img :src="member_icon" class="rounded-[50px] h-[25px] w-[25px]">
                <span class="ml-5 h-full content-center">In class: 29/30</span>
            </div>
            <div class="divider h-[1px] w-full bg-[#B4B4B4]"></div>
            <div class="number-of-membver flex text-[13px] text-gray-500 content-center h-[25px] my-1">
                <span class="ml-2 h-full content-center">11-11-1111</span>
                <span class="ml-2 h-full content-center">-</span>
                <span class="ml-2 h-full content-center">11-11-1111</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import member_icon from '@/assets/icons/member.svg'
    import {ref} from 'vue'

    defineProps({
        classData: {
            type: Object,
            required: true,
        }
    })


    const status = (status) =>
    {
        switch (status) {
            case 'Đang hoạt động':
                return 'in-progress'
            case 'Kết thúc':
                return 'end'
            default:
                return 'none'
        }
    }



</script>

<style scoped>
    .in-progress{
        background-color: rgb(79, 163, 79) !important;
        color: #FFF;
    }
    .end
    {
        background-color: rgb(163, 79, 79) !important;
        color: #FFF;
    }
</style>