<template>
  <div class="top-tabs-bar">
    <div class="open-btn-list" @click="changeSideBar">
      <i v-show="closeSideBar" class="iconfont icon-close-sidebar icons-size"></i>
      <i v-show="!closeSideBar" class="iconfont icon-open-sidebar icons-size"></i>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
let closeSideBar = ref(true)

const changeSideBar = () => {
  store.commit('setCollapse', closeSideBar.value)
  closeSideBar.value = !closeSideBar.value
}

</script>

<script>
export default {
  name: "TabsBar"
}
</script>

<style lang="scss" scoped>
$width: 24px;
.top-tabs-bar {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background: #ffffff;
  border-bottom: 1px #eeeeee solid;
}
.open-btn-list {
  width: $width;
}
.icons-size {
  cursor: pointer;
  font-size: $width;
}
</style>
