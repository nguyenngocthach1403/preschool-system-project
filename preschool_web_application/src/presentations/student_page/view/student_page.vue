<template>
    
    <div class="bg-white ml-4 rounded-3xl text-center text-5xl h-dvh">
        <!-- Header -->
        <div class="text-left p-[20px] text-[36px] font-bold ">Student</div>

        <!-- Search-->


        <!-- Quick search -->

        <!-- Table components -->
        <TableComp v-bind:title-heads="titleHeads" :data-table="dataOfTable"></TableComp>
    </div>  
</template>

<script setup>
    /* Import component here */
    import TableComp from '@/presentations/student_page/components/table_comp.vue'
    import {ref} from 'vue'

    /* Another import here */

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