<template>
  <div>
    教师测试页
    <el-button @click="open">点击</el-button>
  </div>
</template>

<script setup>
const open = () => {
  ElMessageBox.confirm('proxy will permanently delete the file. Continue?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    type: 'warning',
  }).then(() => {

  }).catch(() => {

  })
}
</script>

<script>
export default {
  name: "teacher1"
}
</script>

<style scoped>

</style>
