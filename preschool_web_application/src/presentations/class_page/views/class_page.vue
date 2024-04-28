<template>
    <div class="bg-white h-dvh ml-4 rounded-3xl text-center text-3xl  pb-[200px] overflow-hidden">
        <!-- Header -->
        <div class="text-left px-[20px] pt-[10px] text-[36px] font-bold ">Class</div>

        <div class="my-3">
            <SearchFormComp v-on:passSearchText="getSearchText($event)"></SearchFormComp>
        </div>
        
        <div class="w-full h-full flex flex-wrap content-start mx-[15px] pb-[20px] overflow-auto">
            <ClassCardComp v-for="(item) in filteredClass" :key="item" :class-data="item" class="hover:bg-gray-200"/>
        </div>
    </div>  
</template>

<script setup>
    import {ref, computed} from 'vue'

    import ClassCardComp from '../components//class_card.vue'
    import SearchFormComp from '@/components/search_form_comp.vue'

    const searchText = ref('')

    const getSearchText = (event) => {
        searchText.value = event;
    }
    

    const filteredClass = computed(() => {
        return classDataDemo.value.filter((e) => {
            return (e.name.match(searchText.value) || e.teacher.match(searchText.value) || e.type.match(searchText.value) || e.status.match(searchText.value) || e.session.match(searchText.value))
        })
    })

    const classDataDemo = ref([
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'Lop123',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Kết thúc',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'Lopda3',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'dadada',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'On',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'dadadada',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Off',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'Lop11231223',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai C'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'bvbfgsfg',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.w-5sI6XWm3gGn7nUeBYuFwHaE8?rs=1&pid=ImgDetMainhttps://th.bing.com/th/id/OIP.w-5sI6XWm3gGn7nUeBYuFwHaE8?rs=1&pid=ImgDetMain',
            name: 'bgmjyikyukjy',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'sfdgwgshjgwej',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'abfbabafdba',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.zlRoUz7KpSdC_AxwnLpXmAHaE8?w=255&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'Lop11231223',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai C'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'bvbfgsfg',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'bgmjyikyukjy',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai A'
        },
        {
            avatar: 'https://th.bing.com/th/id/OIP.YEBNakGnuRtmoLbisYedDwHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7',
            name: 'sfdgwgshjgwej',
            teacher: 'Copp',
            member: 30,
            limitedMenber: 40,
            session: '2020-2021',
            status: 'Đang hoạt động',
            type: 'Loai B'
        },
    ])
</script>

<style scoped>

</style>