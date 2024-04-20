<script setup>
import MenuComp from '@/components/menu_comp.vue';

import {ref } from 'vue'

const menuStyle = ref('full-menu');

const isMenuClose = ref(true);

const closeMenu = (is) => {
    if(is) 
    {
        menuStyle.value = 'hide-menu';
        return
    }
    menuStyle.value = 'full-menu';
    
}
</script>

<template>
 <main v-bind:class="menuStyle">
    <section class="menu h-screen">
        <MenuComp :menu-style="menuStyle" @close-menu="closeMenu"/>
    </section>
    <section class="view h-screen ">
        <header class="h-20 ml-3 rounded-xl"></header>
        <router-view></router-view>
    </section>
 </main>
</template>

<style scoped>
    .full-menu{
        display: grid;
        grid-template-columns: 250px auto;
        transition: 0.5s ease;
    }
    .hide-menu{
        display: grid;
        grid-template-columns: 90px auto;
        transition: 0.5s  ease;
    }
    .menu 
    {
        padding: 10px;
    }
    .view{
        display: grid;
        grid-template-rows: 100px auto;
    }
</style>
