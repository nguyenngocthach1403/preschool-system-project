<template>
        <button @mouseenter="onMouseOver" @mouseleave="onMouseLeave" class="w-full content-center active:opacity-50">
            <slot></slot>
            <div v-if="show" ref="tooltipShow" class="rounded-[7px] fixed bg-white border-2 text-black py-2 px-2 z-10 overflow-hidden" :style="{left: styleleft, top: styletop}">{{ toolTipText }}</div>
        </button>
        
</template>

<script setup>
    import {ref, computed, onMounted} from 'vue'

    const show = ref(true);

    defineProps({
        toolTipText: {
            Type:String
        }
    })

    const position = ref(
        {
            x: 0,
            y: 0
        }
    )
    
    const tooltipShow =ref(null)

    const widthOfToolTip = ref(0)

    onMounted(() =>{
        show.value = false
        widthOfToolTip.value = tooltipShow.value.offsetWidth 
    })

    const styleleft = computed(() => {
        return `${position.value.x}px`
    })

    const styletop = computed(() => {
        return `${position.value.y}px`
    })

    function onMouseOver(event)
    {
            let x = event.target.offsetLeft
            let y = event.target.offsetTop
            position.value.x = x - widthOfToolTip.value * 0.8
            position.value.y = y + event.target.offsetHeight + 5
            console.log(x, y)
            console.log(event)
            show.value = true
    }
    function onMouseLeave()
    {
        show.value = false
    }
</script>

<style  scoped>

</style>