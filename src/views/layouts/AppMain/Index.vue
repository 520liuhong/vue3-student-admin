<template>
  <div v-if="routerView" class="app-main-container">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
        <router-view :key="path" class="app-main-height"/>
      </keep-alive>
    </transition>
    <footer v-show="footerCopyright" class="footer-copyright">
      Copyright
      <vab-icon :icon="['fas', 'copyRight']"></vab-icon>
      一叶知秋 {{ fullYear }}
    </footer>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";

const fullYear = new Date().getFullYear()
const cachedRoutes = ref(['Index', 'Table'])
const keepAliveMaxNum = ref(99)
const routerView = ref(true)
const footerCopyright = ref(true)
const path = useRoute().path

</script>
<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss" scoped>
.app-main-container {
  position: relative;
  width: calc(100% - 20px - 20px);
  margin: 20px auto;
  overflow: hidden;
  border-radius: 4px;

  .vab-keel {
    margin: 20px;
  }

  .app-main-height {
    padding: 20px;
    min-height: calc(
        100vh - 60px - 55px - 20px -
        20px - 55px - 55px
    );
    background: #fff;
  }

  .footer-copyright {
    min-height: 55px;
    line-height: 55px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    border-top: 1px dashed #dcdfe6;
    background: #fff;
  }
}
</style>
