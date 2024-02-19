import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.scss'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import {myHighLight} from "@/utils/tools";
import 'element-plus/theme-chalk/dark/css-vars.css'

import BaseTable from "@/commons/BaseTable";

const app = createApp(App)

app.use(store).use(router).mount('#app')

app.component('base-table', BaseTable)
app.directive('high-light', myHighLight)
