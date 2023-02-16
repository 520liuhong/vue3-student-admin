<template>
  <div>

    <div class="common-layout">
      <el-container>
        <el-aside width="200px" class="side-bar">
          <side-bar></side-bar>
        </el-aside>
        <el-container>
          <el-main :class="store.state.isCollapse?'main-margin-collapse':'main-margin'">
            <tabs-bar></tabs-bar>
            <nav-bar></nav-bar>
            <app-main></app-main>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {ref, watch} from "vue";
const store = useStore()
let isCollapse = ref(store.state.isCollapse)

watch(() => store.state.isCollapse, (newVal) => {
  isCollapse.value = store.state.isCollapse
})
</script>
<script>
import SideBar from '@/views/layouts/SideBar/Index'
import NavBar from '@/views/layouts/NavBar/Index'
import TabsBar from '@/views/layouts/TabsBar/Index'
import AppMain from '@/views/layouts/AppMain/Index'

export default {
  name: "Layout",
  components: {
    'side-bar': SideBar,
    'nav-bar': NavBar,
    'tabs-bar': TabsBar,
    'app-main': AppMain
  }
}
</script>

<style scoped>
.main-margin {
  margin-left: 0;
  transition: width 1s;
}
.main-margin-collapse {
  margin-left: -136px;
  transition: width 0.3s;
}
</style>
