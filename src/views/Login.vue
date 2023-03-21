<template>
  <div class="login-bg">
    <div class="login-content">
      <div class="login-content-top">
        <img class="login-logo" :src="require('../assets/images/logo.svg')">
      </div>
      <div class="login-content-bottom">
        <el-input class="login-input" v-model="loginInfo.name"></el-input>
        <el-input class="login-input" v-model="loginInfo.password"></el-input>
        <el-button class="login-btn" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const loginInfo = ref({
  name: '',
  password: ''
})

const login = () => {
  router.push({path: '/index'})
}
</script>

<script>
export default {
  name: "Login"
}
</script>

<style lang="scss" scoped>
.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/images/login-bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-content {
  display: flex;
  flex-direction: column;
  width: 455px;
  height: 520px;
  background: url("../assets/images/login-bg.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 0 15px 10px rgb(52, 69, 107);

  .login-content-top {
    width: 100%;
    height: 190px;
    color: #fff;
    display: flex;
    justify-content: center;

    .login-logo {
      width: calc(100% - 50px);
    }
  }

  .login-content-bottom {
    width: 355px;
    height: 100%;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .login-input {
      margin-bottom: 25px !important;
    }

    :deep .el-input__inner {
      color: #8cbce6;
    }

    :deep .el-button {
      color: #fff;
      border: none;
    }

    .login-btn {
      height: 52px;
      margin-top: 25px;
      background: #1541a1;
    }

    :deep .el-input__wrapper {
      background-color: rgba(0, 0, 0, 0);
      box-shadow: none;
      border-bottom: 2px #53749b solid;
    }
  }
}
</style>
