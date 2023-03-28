import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

import BaseTable from "@/commons/BaseTable";

const app = createApp(App)

createApp(App).use(store).use(router).mount('#app')

app.component('base-table', BaseTable)
