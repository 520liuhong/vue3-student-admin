<template>
  <div>
    <el-menu
        class="side-bar-container"
        router
        active-text-color="#ffd04b"
        background-color="#21252b"
        :default-openeds="routes"
        :default-active="activeMenu"
        :collapse="isCollapse"
        unique-opened
        text-color="#fff"
        mode="vertical"
        @select="selectPath"
    >
      <div class="logo-title">
        <span>图</span>
        <span v-show="!isCollapse">学生管理系统</span>
      </div>
      <div v-for="(item, index) in routes" :index="item.path" :key="index">
        <el-sub-menu v-if="item.children && !item.meta.home" :index="item.path">
          <template v-slot:title>
            <i :class="item.meta.icon" style="margin-right: 6px"></i>
            <span v-show="!isCollapse">{{ item.meta.title }}</span>
          </template>

          <div v-for="item2 in item.children" :key="item2.path">
            <!--无三级菜单-->
            <el-menu-item v-if="!item2.children" :index="item2.path" @click="clickPath(item2)">
              {{ item2.meta.title }}
            </el-menu-item>

            <!--有三级菜单-->
            <div v-if="item2.children">
              <el-sub-menu :index="item2.path">
                <template #title>{{ item2.meta.title }}</template>
                <el-menu-item v-for="item3 in item2.children" :index="item3.path" :key="item3.path"
                              @click="clickPath(item3)">
                  {{ item3.meta.title }}
                </el-menu-item>
              </el-sub-menu>
            </div>
          </div>
        </el-sub-menu>
        <!--首页-->
        <el-menu-item v-else-if="item.meta && item.meta.home" index="/index">
          <i :class="item.meta.icon" style="margin-right: 6px"></i>
          <span v-show="!isCollapse">{{ item.meta.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import router from "@/router";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";

const store = useStore()
const route = useRoute()
const clickItem = ref({})

const routes = router.options.routes
let isCollapse = ref(store.state.isCollapse)

watch(() => store.state.isCollapse, (newVal) => {
  isCollapse.value = newVal
})

const activeMenu = computed(() => {
  const {meta, path} = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

/**
 * 菜单栏点击菜单时，往顶部navTabs添加路由
 * @param e
 */
const selectPath = (e) => {
  setTimeout(() => {
    const list = store.getters.getNavTabs
    const item = list.find(item => item.path === e)
    if (!item && clickItem.value.path === e) {
      list.push({path: clickItem.value.path, meta: clickItem.value.meta})
      store.commit('setNavTabs', list)
    }
  }, 100)
}
const clickPath = (e) => {
  clickItem.value = e
}
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
