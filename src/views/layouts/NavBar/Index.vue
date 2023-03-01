<template>
  <div class="nav-tab">
    <el-tabs
        v-model="tabActive"
        type="card"
        closable
        class="tabs-content"
        @tab-click="handleTabClick"
        @tab-remove="handleTabRemove"
    >
      <el-tab-pane
          v-for="item in visitedRoutes"
          :key="item.path"
          :label="item.meta.title"
          :name="item.path"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import {useRouter, useRoute} from "vue-router";
import store from "@/store";

const router = useRouter()
const route = useRoute()

let tabActive = ref('') // 当前点击的tab
const visitedRoutes = ref([]) // 导航tabs列表
visitedRoutes.value = store.getters.getNavTabs

// 初始化，当前路由在tabs列表中，则显示该路由，否则往tabs列表中添加当前路由
const obj = visitedRoutes.value.find(item => item.path === route.path)
if (obj) {
  tabActive.value = obj.path
} else {
  visitedRoutes.value.push({path: route.path, meta: route.meta})
  tabActive.value = route.path
}

watchEffect(()=>{
  tabActive.value = route.path
})

/**
 * 点击tabs，界面跳转
 * @param tab
 * @returns {boolean}
 */
const handleTabClick = (tab) => {
  const item = visitedRoutes.value.find((item, index) => parseInt(tab.index) === index)

  if (route.path !== item.path) {
    router.push({
      path: item.path,
      query: item.query,
      fullPath: item.fullPath,
    })
  } else {
    return false
  }
}
/**
 * 删除tabs
 * @param path
 */
const handleTabRemove = (path) => {
  let key = -1
  visitedRoutes.value.forEach((item, index) => {
    if (item.path === path) {
      key = index
    }
  })
  if (key > -1) {
    visitedRoutes.value.splice(key, 1)
    // 如果key为0，则路由向后跳转，否则向前跳转

    // router.push({
    //   path: item.path,
    //   query: item.query,
    //   fullPath: item.fullPath,
    // })
  }
}
</script>

<script>
export default {
  name: "NavBar"
}
</script>

<style lang="scss" scoped>
.nav-tab {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background: #ffffff;
  border-bottom: 1px #eeeeee solid;
}

.tabs-content {
  width: calc(100% - 90px);
  height: 34px;

  ::v-deep {
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      height: 34px;
      line-height: 34px;
    }

    .el-tabs__header {
      border-bottom: 0;

      .el-tabs__nav {
        border: 0;
      }

      .el-tabs__item {
        box-sizing: border-box;
        height: 34px;
        margin-right: 5px;
        line-height: 34px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

        &.is-active {
          border: 1px solid #0187fb;
        }
      }
    }
  }
}
</style>
