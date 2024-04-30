<template>
    <div class="bg-white ml-4 rounded-3xl text-center h-dvh">
        <!-- Header -->
        <div class="text-left px-[20px] text-[36px] font-bold ">Student</div>

        <!-- Search-->
        <div class="flex justify-between content-center mr-3">
            <SearchFormComp @passSearchText="getSearchText" ></SearchFormComp>
            

            <router-link to="/students/create">
                <CreateButtonComp></CreateButtonComp>
            </router-link>
            
        </div>

        <!-- Quick search -->

        <!-- Table components -->
        <TableComp :data-table="filteredStudentData"></TableComp>
    </div>  
</template>

<script setup>
    /* Import component here */
    import TableComp from '@/presentations/student_page/components/table_comp.vue'
    import SearchFormComp from '@/components/search_form_comp.vue'
    import ToolTipComp from '@/utils/resources/tooltip.vue'
    import CreateButtonComp from '@/components/create_button.vue'
    import {ref, computed} from 'vue'

    /* Another import here */
    import add_icon from '@/assets/icons/pls.svg'

    const tooltip = ref(false)
    const searchText = ref('')

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
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Quoc Thach', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
        {'avatar' : 'https://th.bing.com/th/id/OIP.62UW2I5_9IgQNmE5f305WAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7', 'name': 'Nguyen Van A', 'gender': 0, 'class': 'CD TH 21DD', 'birthday': '1/4/2004', 'status' :2},
    ])

    const getSearchText= (event) =>
    {
        searchText.value = event
    }

    const filteredStudentData = computed(() => {
        return dataOfTable.value.filter((e) => {
            return (e.name.match(searchText.value) || e.class.match(searchText.value) || e.birthday.match(searchText.value))
        })
    })



</script>

<style scoped>

</style>