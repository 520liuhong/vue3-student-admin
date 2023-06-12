<template>
  <div class="app-main-container">
    <router-view class="app-main-height" :key="key" />
    <footer class="footer-copyright">
      Copyright
      一叶知秋 {{ fullYear }}
    </footer>
  </div>
</template>

<script setup>
const fullYear = new Date().getFullYear()
</script>
<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main-container {
  position: relative;
  width: calc(100% - 20px - 20px);
  height: calc(100vh - 55px - 60px - 50px);
  margin: 20px auto;
  border-radius: 4px;

  .vab-keel {
    margin: 20px;
  }

  .app-main-height {
    padding: 20px;
    background: #fff;
    height: calc(100vh - 55px - 60px - 20px - 50px - 55px);
  }

  .footer-copyright {
    min-height: 50px;
    line-height: 50px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    border-top: 1px dashed #dcdfe6;
    background: #fff;
  }
}
</style>
