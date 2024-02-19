<template>
  <div class="top-tabs-bar">
    <div class="top-tabs-bar-left">
      <!--左侧菜单栏展开收起按钮-->
      <div class="open-btn-list" @click="changeSideBar">
        <i v-show="closeSideBar" class="iconfont icon-close-sidebar icons-size"></i>
        <i v-show="!closeSideBar" class="iconfont icon-open-sidebar icons-size"></i>
      </div>

      <!--路由-面包屑导航-->
      <el-breadcrumb style="padding-left: 12px" :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in routeList" :key="item.path">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--修改信息下拉框-->
    <div class="top-tabs-bar-right">
      <el-dropdown @command="handleCommand">
        <div>
          <span class="top-tabs-bar-right-user">{{ username }}</span>
          <i class="iconfont icon-down"></i>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword" divided>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            <el-dropdown-item command="changeTheme">
              <span>暗黑模式</span>
              <el-switch v-model="isDark" size="large" class="mt-2" style="margin-left: 24px" inline-prompt/>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!--修改密码弹窗-->
    <el-dialog v-model="dialogVisible" @close="closelDialog" title="修改密码" width="400">
      <el-form
          ref="pwdStuFormRef"
          :model="changePwdForm"
          :rules="pwdFormRules"
          label-position="left"
          label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="changePwdForm.oldPassword"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="changePwdForm.newPassword"/>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmNewPassword">
          <el-input v-model="changePwdForm.confirmNewPassword"/>
        </el-form-item>
      </el-form>

      <template #footer>
          <span>
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="confirmPassword">确认</el-button>
          </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref, watchEffect} from "vue";
import {useStore} from "vuex";
import {ArrowRight} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import {storagekey} from "@/utils/constants";
import {useDark, useToggle} from '@vueuse/core'

const store = useStore()
const route = useRoute()
const router = useRouter()
let closeSideBar = ref(true) // 左侧菜单栏展开收起标识
let dialogVisible = ref(false) // 修改密码弹出框
let pwdStuFormRef = ref(null) // 修改密码弹窗的实例
const username = ref(localStorage.getItem(storagekey.username)) // 用户名称
const isDark = useDark()
// const toggleDark = useToggle(isDark)

if (!username.value) {
  router.push({path: '/'})
}

let changePwdForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const pwdFormRules = ref({
  oldPassword: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
  newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
  confirmNewPassword: [{required: true, message: '请确认新密码', trigger: 'blur'}]
})

// 路由列表，面包屑导航栏---start
const getBreadcrumb = () => {
  return route.matched.filter(
      (item) => item.name && item.meta.title
  )
}

const routeList = ref(getBreadcrumb())

watchEffect(() => {
  routeList.value = getBreadcrumb()
})
// 路由列表，面包屑导航栏---end

/**
 * 展开收起左侧菜单栏
 */
const changeSideBar = () => {
  store.commit('setCollapse', closeSideBar.value)
  closeSideBar.value = !closeSideBar.value
}
/**
 * 下拉面板操作
 * @param command
 */
const handleCommand = (command) => {
  switch (command) {
    case 'changePassword':
      changePassword()
      break
    case 'logout':
      logout()
      break
    case 'changeTheme':
      changeTheme()
      break
  }
}
const changeTheme = () => {
  useToggle(isDark)
}
const closelDialog = () => {
}
/**
 * 修改密码
 */
const changePassword = () => {
  dialogVisible.value = true
}

/**
 * 弹窗点击确定
 */
const confirmPassword = () => {
  pwdStuFormRef.value.validate((valid) => {
    if (valid) {
      // 请求接口
      // post(api.addStu, {changePwdForm}).then(res => {
      //   if (res.code === 200) {
      //   }
      // })
    } else {
      return false
    }
  })
}

/**
 * 退出登录
 */
const logout = () => {
  ElMessageBox.confirm('确定要退出吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    type: 'warning',
  }).then(() => {
    router.push({path: '/'})
    // 导航栏置为首页
    store.commit('setNavTabs', [{path: "/index", meta: {title: '首页'}}])
  }).catch(() => {

  })
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
  height: 55px;
  //line-height: 60px;
  padding: 0 20px;
  //background: #ffffff;
  background-color: var(--el-bg-color-overlay);
  border-bottom: 1px #eeeeee solid;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .top-tabs-bar-left {
    display: flex;
    align-items: center;

    .open-btn-list {
      width: $width;
    }

    .icons-size {
      cursor: pointer;
      font-size: $width;
    }
  }

  .top-tabs-bar-right {
    display: flex;
    align-items: center;
    cursor: pointer;

    .top-tabs-bar-right-user {
      margin-right: 6px;
    }
  }
}
</style>
