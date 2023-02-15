<template>
  <div>
    <side-bar></side-bar>
    <div class="vab-main">
      <nav-bar></nav-bar>
      <tabs-bar></tabs-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

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
.vab-main {
  min-height: calc(100vh - 2px);
  height: 100%;
  margin-left: 256px;
}
</style>
