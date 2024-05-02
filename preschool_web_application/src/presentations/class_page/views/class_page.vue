<template>
    <div class="bg-white h-dvh ml-4 rounded-3xl text-center text-3xl  pb-[200px] overflow-hidden">
        <ClassCreationView class="w-screen h-screen bg-black absolute z-10 left-0 top-0" v-show="showCreateClass" @close="closeCreateClassPage($event)" />
        <!-- Header -->
        <div class="text-left px-[20px] pt-[10px] text-[36px] font-bold ">Class</div>

        <div class="my-3 flex justify-between content-center mr-3">
            <SearchFormComp v-on:passSearchText="getSearchText($event)"></SearchFormComp>
            <CreateButtonComp class="active:scale-95" @click="showCreateClass = !showCreateClass"/>
        </div>
        
        <div class="w-full h-full flex flex-wrap content-start mx-[15px] pb-[20px] overflow-auto">
            <ClassCardComp v-for="(item) in filteredClass" :key="item" :class-data="item" class="hover:bg-gray-200"/>
        </div>
    </div>  
</template>

<script setup>
    import {ref, computed, onMounted} from 'vue'

    import ClassCardComp from '../components//class_card.vue'
    import SearchFormComp from '@/components/search_form_comp.vue'
    import CreateButtonComp from '@/components/create_button.vue'
    import ClassCreationView from '..//..//class_creation_page//views//class_creation_page.vue'
    import {useClassStore} from '@/stores//class_store.js'
    const searchText = ref('')
    const classStore = useClassStore()
    const showCreateClass = ref(false)

    onMounted(() => {
        classDataDemo.value = classStore.classes
    })

    const getSearchText = (event) => {
        searchText.value = event;
    }
    
    const closeCreateClassPage = (event) =>
    {
        showCreateClass.value = event
    }

    const filteredClass = computed(() => {
        return classDataDemo.value.filter((e) => {
            return (e.name.match(searchText.value) || e.teacher.match(searchText.value) || e.type.match(searchText.value) || e.status.match(searchText.value) || e.session.match(searchText.value))
        })
    })

    const classDataDemo = ref([])
</script>

<style scoped>

</style>