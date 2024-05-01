<template>
    <div class="bg-white ml-4 rounded-3xl text-center h-dvh">
        <ConfirmDialog v-if='showConfirmDialog' class="absolute top-0 left-0" :content="showConfirmDialog"  @confirm="getConfirm"/>
        <EditStudentView v-if='showStudentEdit' class="absolute top-0 left-0" :student-data='showStudentEdit' @close="showStudentEdit = false" />
        
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
        <TableComp :data-table="filteredStudentData" @delete-student="deleteStudentById" @edit-student="editStudent"></TableComp>
    </div>  
</template>

<script setup>
    /* Import component here */
    import TableComp from '@/presentations/student_page/components/table_comp.vue'
    import SearchFormComp from '@/components/search_form_comp.vue'
    import ToolTipComp from '@/utils/resources/tooltip.vue'
    import CreateButtonComp from '@/components/create_button.vue'
    import ConfirmDialog from '@/components/confirm_dialog.vue'
    import EditStudentView from "./student_edition_view.vue"
    
    import {ref, computed , onMounted} from 'vue'
    import { useStudentStore } from '@/stores/student_store.js'
    /* Another import here */
    import add_icon from '@/assets/icons/pls.svg'

    
    const tooltip = ref(false)
    const searchText = ref('')
    const studentStore = useStudentStore()
    /* Data demo of Student Table */
    const dataOfTable = ref([])
    const studentDel = ref(null)
    const showConfirmDialog = ref('')
    const showStudentEdit = ref(null)

    onMounted(() => {
        dataOfTable.value = studentStore.students
    })

    const getSearchText= (event) =>
    {
        searchText.value = event
    }

    const filteredStudentData = computed(() => {
        return dataOfTable.value.filter((e) => {
            return (e.name.match(searchText.value) || e.class.match(searchText.value) || e.birthday.match(searchText.value))
        })
    })

    const getConfirm = (event) => {
        
        if(event) 
        { 
            studentStore.deleteStudent(localStorage.getItem('studentIDToDel'))
        }
        showConfirmDialog.value = null
    }
    
    const deleteStudentById = (event) => {
        localStorage.setItem('studentIDToDel', event.id)
        showConfirmDialog.value = 'Bạn có muốn xóa bé ' + event.name + ' không?'
    }

    const editStudent = (event) => {
        showStudentEdit.value = event
    }

</script>

<style scoped>

</style>