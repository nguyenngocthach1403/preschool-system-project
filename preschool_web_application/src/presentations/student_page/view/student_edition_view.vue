<template>
    <div class="z-20 h-screen w-screen bg-gray-500/75 content-center">
        <div class="body w-[800px] h-[800px] bg-white m-auto relative rounded-[15px]" :class="{'leave-active': isLeave}">
            <!--Header-->
            <div class="heade w-full pl-[20px] absolute top-0 right-0 flex justify-between">
                <span class="text-[19px]">Cập nhật thông tin</span> 
                <button class="bg-green-200 px-[12px]" @click="closeView">Close</button>
            </div>


            <div class="footer absolute bottom-0">
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    

    const isLeave = ref(false)
    
    const emits = defineEmits(['close'])
    const closeView = () => {
        isLeave.value = true
        setTimeout(() => {
            emits('close')
        }, 200)
    }
</script>

<style scoped>

    .body
    {
        animation: enter 0.5s forwards normal;
    }

    .leave-active
    {
        animation: leave 0.5s forwards normal !important;
    }

    @keyframes leave {
        0%{
            opacity: 1;
            translate: 100px 0;
        }
        100%{
            opacity: 0;
            translate: -100px 0;
        }
    }

    @keyframes enter {
            0%{
                opacity: 0;
                translate: -100px 0;
            }
            100%{
                opacity: 1;
                translate: 100px 0;
            }
        }
</style>