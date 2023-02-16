<template>
  <div class="app-main-container">
    <router-view class="app-main-height"/>
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
