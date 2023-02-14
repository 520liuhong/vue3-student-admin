<template>
  <el-scrollbar class="side-bar-container">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#21252b"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        mode="vertical"
    >
      <el-sub-menu index="1">
        <template #title>
          <!--            <el-icon><location/></el-icon>-->
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <!--          <el-icon><icon-menu/></el-icon>-->
        <span>Navigator Two</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: "SideBar",
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    return {
      handleOpen,
      handleClose
    }
  }
}
</script>

<style scoped>
.side-bar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 256px;
  height: 100vh;
  overflow: hidden;
  background: #21252b;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.3s;
}
</style>
