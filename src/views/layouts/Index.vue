<template>
  <div>
    <div class="na-layout">
      <el-container>
        <el-aside :width="sideBarWidth + 'px'" class="side-bar">
          <side-bar></side-bar>
        </el-aside>
        <el-container>
          <el-main :class="store.state.isCollapse?'main-margin-collapse':'main-margin'">
            <div class="na-main-top" :style="topBarWidth">
              <tabs-bar></tabs-bar>
              <nav-bar></nav-bar>
            </div>
            <app-main class="na-main-content"></app-main>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";

const store = useStore()
let isCollapse = ref(store.state.isCollapse)
const sideBarWidth = ref(store.state.sideBarWidth)

watch(() => store.state.isCollapse, (newVal) => {
  if (newVal) {
    isCollapse.value = store.state.isCollapse
  }
})

const topBarWidth = computed(() => {
  const width = store.state.sideBarWidth || 0
  return "width: calc(100% - " + width + "px)"
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
.na-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-margin {
  margin-left: 0;
  transition: width 1s;
}

.main-margin-collapse {
  margin-left: -136px;
  transition: width 0.3s;
}

.na-main-top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}

.na-main-content {
  margin-top: 135px
}
</style>
