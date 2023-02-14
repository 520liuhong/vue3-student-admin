<template>
  <div>
    <side-bar></side-bar>
    <div class="vab-main">
<!--      <div :class="header === 'fixed' ? 'fixed-header' : ''">-->
<!--        <vab-nav-bar />-->
<!--        <vab-tabs-bar v-if="tabsBar === 'true' || tabsBar === true" />-->
<!--      </div>-->
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
  // eslint-disable-next-line vue/multi-word-component-names
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
