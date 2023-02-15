<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px" style="height: 100vh">
          <el-menu
              router
              active-text-color="#ffd04b"
              background-color="#21252b"
              :default-openeds="routes"
              :default-active="path"
              text-color="#fff"
              mode="vertical"
          >
            <div v-for="item in routes" :key="item.path">
              <el-sub-menu v-if="item.meta" :index="item.path+''">
                <template v-slot:title>{{ item.meta.title }}{{ item.path }}</template>
                <el-menu-item
                    v-for="item2 in item.children"
                    :key="item2.path"
                    :index="item2.path">
                  {{ item2.path }}
                </el-menu-item>
              </el-sub-menu>
            </div>
          </el-menu>
<!--          <el-menu-->
<!--              class="el-menu-vertical-demo"-->
<!--              :default-active="path"-->
<!--              router-->
<!--          >-->
<!--            <el-menu-item index="/student">item one</el-menu-item>-->
<!--            <el-menu-item index="/teacher">item two</el-menu-item>-->
<!--          </el-menu>-->
        </el-aside>
        <el-container>
          <el-main style="border: 1px red solid">
            098765
            <router-view/>
          </el-main>
        </el-container>

      </el-container>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
// import {useRoute} from "vue-router";

const routes = router.options.routes
const path = '/student'
// const path = useRoute().path
console.log('打印路由', routes, path)

</script>
<script>
// import SideBar from '@/views/layouts/SideBar/Index'
// import NavBar from '@/views/layouts/NavBar/Index'
// import TabsBar from '@/views/layouts/TabsBar/Index'
// import AppMain from '@/views/layouts/AppMain/Index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "LayoutByElement",
  components: {
    // 'side-bar': SideBar,
    // 'nav-bar': NavBar,
    // 'tabs-bar': TabsBar,
    // 'app-main': AppMain
  }
}
</script>

<style scoped>
.common-layout {
  height: 100vh;
}

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
