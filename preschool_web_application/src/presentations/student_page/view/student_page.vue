<template>
    <div class="bg-white ml-4 rounded-3xl text-center h-dvh">
        <!-- Header -->
        <div class="text-left px-[20px] text-[36px] font-bold ">Student</div>

        <!-- Search-->
        <div class="flex justify-between content-center">
            <SearchFormComp></SearchFormComp>
            
            <ToolTipComp tool-tip-text="Add new student" class="text-[15px] text-white w-[60px] h-[40px] bg-black mr-3 rounded-md bg-green-500">
                 <img :src="add_icon" class="w-[30px] m-auto">
            </ToolTipComp>
        </div>

        <!-- Quick search -->

        <!-- Table components -->
        <TableComp v-bind:title-heads="titleHeads" :data-table="dataOfTable"></TableComp>
    </div>  
</template>

<script setup>
    /* Import component here */
    import TableComp from '@/presentations/student_page/components/table_comp.vue'
    import SearchFormComp from '@/components/search_form_comp.vue'
    import ToolTipComp from '@/utils/resources/tooltip.vue'
    import {ref, computed} from 'vue'

    /* Another import here */
    import add_icon from '@/assets/icons/pls.svg'

    const tooltip = ref(false)

    /* Data demo of Student Table */
    const dataOfTable = ref([
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :0},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 1, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :1},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Ngoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
    ])




</script>

<style scoped>

</style>