<template>
  <div>
    <el-menu
        class="side-bar-container"
        router
        active-text-color="#ffd04b"
        background-color="#21252b"
        :default-openeds="routes"
        :default-active="path"
        :collapse="isCollapse"
        unique-opened
        text-color="#fff"
        mode="vertical"
    >
      <div class="logo-title">
        <span>图</span>
        <span v-show="!isCollapse">学生管理系统</span>
      </div>
      <div v-for="(item, index) in routes" :index="index+''" :key="index">
        <div v-for="item2 in item.children" :key="item2.path">
          <el-sub-menu v-if="item2.children" :index="item2.path">
            <template v-slot:title>
              <span>图</span>
              <span v-show="!isCollapse">{{ item2.meta.title }}</span>
            </template>
            <el-menu-item v-for="item3 in item2.children" :index="item3.path" :key="item3.path">
              {{ item3.meta.title }}
            </el-menu-item>
          </el-sub-menu>
          <!--首页-->
          <el-menu-item v-else :index="item2.path">
            <span>图</span>
            <span v-show="!isCollapse">{{ item2.meta.title }}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import router from "@/router";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref, watch} from "vue";

const store = useStore()

const routes = router.options.routes
const path = useRoute().path
let isCollapse = ref(store.state.isCollapse)

watch(() => store.state.isCollapse, (newVal) => {
  isCollapse.value = store.state.isCollapse
})
</script>

<script>
export default {
  name: "SideBar"
}
</script>

<style scoped>
.side-bar-container {
  z-index: 999;
  height: 100vh;
  overflow: hidden;
  background: #21252b;
}

.logo-title {
  height: 56px;
  line-height: 56px;
  margin-left: 20px;
  color: #fff;
  font-size: 22px;
  overflow: hidden;
}
</style>
