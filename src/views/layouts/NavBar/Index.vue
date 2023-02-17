<template>
  <div class="nav-tab">
    <el-tabs
        v-model="tabActive"
        type="card"
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
import {ref} from "vue";
import {useRouter, useRoute} from "vue-router";

const router = useRouter()
const route = useRoute()

const tabActive = ref('')
const visitedRoutes = ref([
  {
    "fullPath": "/index",
    "path": "/index",
    "name": "Index",
    "meta": {
      "title": "首页",
      "icon": "home",
      "affix": true
    }
  },
  {
    "fullPath": "/studentManage",
    "path": "/studentManage",
    "name": "student1",
    "meta": {
      "title": "student1",
      "icon": "home",
      "affix": true
    }
  }
])

const handleTabClick = (tab) => {
  console.log('点击', tab)
  const item = visitedRoutes.value.filter((item, index) => {
    if (parseInt(tab.index) === index) return item
  })[0]
  console.log('线上', item)
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
const handleTabRemove = () => {
  console.log('删除')
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
