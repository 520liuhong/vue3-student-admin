<template>
  <div class="top-tabs-bar">
    <el-radio-group v-model="isCollapse" @change="changeBtn" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">关闭</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
const store = useStore()

const isCollapse = ref(true)

const changeBtn = () => {
  console.log('状态', isCollapse.value)
  store.commit('setCollapse', isCollapse.value)
}
</script>

<script>
export default {
  name: "TabsBar"
}
</script>

<style scoped>
.top-tabs-bar {
  height: 55px;
  padding: 0 20px;
  background: #ffffff;
}
</style>
