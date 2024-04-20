// import css taiwind
import './assets/css/index.css';
// import vue module
import { createApp } from 'vue';
// import state manegement
import { createPinia } from 'pinia';
//import app template
import App from './App.vue';

// import router
import router from './router/router'

const app = createApp(App)

app.use(createPinia())
// use router
app.use(router)

app.mount('#app')
