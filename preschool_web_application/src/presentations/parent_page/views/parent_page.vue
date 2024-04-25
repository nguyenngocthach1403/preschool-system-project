<template>
    <div class="bg-white ml-4 rounded-3xl text-center text-3xl">
        <div class="text-left px-[20px] text-[25px] ">Parent</div>
        
        <TableData></TableData>
    </div>  
</template>

<script>
    import TableData from '../data/table_parent.vue'
    export default{
        components: {
            TableData,
        }
    }
</script>

<style scoped>

</style>