<template>
  <div class="top-tabs-bar">
    <div>
      <i v-show="closeSideBar" @click="changeSideBar" class="iconfont icon-closesidebar icons-size"></i>
      <i v-show="!closeSideBar" @click="changeSideBar" class="iconfont icon-opensidebar icons-size"></i>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
const store = useStore()

const isCollapse = ref(true)
let closeSideBar = ref(true)

const changeSideBar = () => {
  console.log('状态', isCollapse.value)
  store.commit('setCollapse', closeSideBar.value)
  closeSideBar.value = !closeSideBar.value
}

</script>

<script>
export default {
  name: "TabsBar"
}
</script>

<style scoped>
.top-tabs-bar {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background: #ffffff;
  border-bottom: 1px #eeeeee solid;
}
.icons-size {
  cursor: pointer;
  font-size: 24px
}
</style>
