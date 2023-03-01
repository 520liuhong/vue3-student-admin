<template>
  <div>
    登录页
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const login = () => {
  router.push({path: '/index'})
}
</script>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>
