<template>
  <el-scrollbar class="side-bar-container">
    <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#21252b"
        :default-openeds="routes"
        text-color="#fff"
        mode="vertical"
    >
      <div v-for="(item,index) in routes" :key="index" :index="index+''">
        <el-sub-menu v-if="item.meta">
          <template v-slot:title>{{ item.meta.title }}</template>
          <el-menu-item
              v-for="(item2,index2) in item.children"
              :key="index2"
              :index="item2.path">
            {{ item2.meta.title }}
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import router from "@/router";
import {useRoute} from "vue-router";

const routes = router.options.routes
const path = useRoute().path
console.log('打印路由', routes, path)

</script>
<script>
export default {
  name: "SideBar"
}
</script>

<style>
.side-bar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 200px;
  height: 100vh;
  overflow: hidden;
  background: #21252b;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.3s;
}
</style>
