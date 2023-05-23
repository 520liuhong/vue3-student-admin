<!--
@name: 管理员信息编辑弹窗
@description: 创建、编辑管理员信息
@author: newhome
@time: 2023-05-23 17:42:25
-->
<template>
  <div>
    <el-dialog v-model="dialogVisible" @close="closeDialog" title="编辑班级信息" width="550">
      <el-form
          ref="myFormRef"
          :model="myForm"
          :rules="myFormRules"
          label-position="left"
          label-width="80px">

        <el-form-item label="账号名称" prop="name">
          <el-input v-model="myForm.name" :disabled="type === 'edit'" />
        </el-form-item>

        <el-form-item label="登陆密码" prop="password" v-if="type==='add'">
          <el-input v-model="myForm.password" />
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select v-model="myForm.role" placeholder="请选择角色">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="备注信息">
          <el-input type="textarea" show-word-limit :rows="4" resize='none' maxlength="255" v-model="myForm.remark" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted, watch} from "vue";
import {get, post} from "@/http/http";
import {api} from "@/http/api";
import {storagekey} from "@/utils/constants";

// 声明props
const props = defineProps({
  type: {
    type: String
  },
  dialogVisible: {
    type: Boolean
  },
  editObj: {
    type: Object
  }
})
// 声明emits
const $emit = defineEmits(['closeDialog', 'confirmDialog'])

let dialogVisible = ref(false)

// data
// 添加信息form
const baseInfo = {
  name: '',
  password: '',
  role: '',
  remark: ''
}
let myForm = ref(JSON.parse(JSON.stringify(baseInfo)))

// form校验标准
const myFormRules = reactive({
  name: [{required: true, message: '请输入账号名称', trigger: 'blur'}],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
  role: [{required: true, message: '请选择角色', trigger: 'blur'}],
  remark: [{required: false, message: '请输入备注信息', trigger: 'blur'}]
})

let roleList = ref([]) // 角色列表
let myFormRef = ref(null) // form表单实例

// 监听
watch(() => props.dialogVisible, (newVal) => {
  dialogVisible.value = newVal
  if (dialogVisible.value && Object.keys(props.editObj).length) {
    // 避免浅拷贝，导致弹窗修改时，影响表格数据
    myForm = ref(JSON.parse(JSON.stringify(props.editObj)))
  } else {
    myForm = ref(JSON.parse(JSON.stringify(baseInfo)))
  }
})

onMounted(() => {
  initData()
})

// methods
const initData = () => {
  post(api.admin.getRoleList).then(res => {
    const data = res.data
    if (data && data.length) {
      roleList.value = data
    }
  })
}
/** 关闭dialog弹窗 */
const closeDialog = () => {
  dialogVisible.value = false
  $emit('closeDialog', false)
}
/** 点击弹窗的确定按钮 */
const confirmAdd = () => {
  myFormRef.value.validate((valid) => {
    if (valid) {
      let url = api.agency.addClass
      let param = myForm.value

      param.user = localStorage.getItem(storagekey.username)
      console.log('查看参数', param)
      // if (props.type === 'add') {
      //   param.gradeId = gradeList.value[0].id
      // } else {
      //   url = api.agency.updateClass
      // }

      // post(url, param).then(res => {
      //   if (res.code === 200) {
      //     // 关闭弹窗
      //     dialogVisible.value = false
      //     $emit('confirmDialog', false)
      //     // 重置弹窗信息
      //     myForm = ref(JSON.parse(JSON.stringify(baseInfo)))
      //
      //     if (props.type === 'add') {
      //       ElMessage({message: '新增成功', type: 'success'})
      //     } else {
      //       ElMessage({message: '修改成功', type: 'success'})
      //     }
      //   } else {
      //     if (props.type === 'add') {
      //       ElMessage.error('新增失败')
      //     } else {
      //       ElMessage.error('修改失败')
      //     }
      //   }
      // }).catch(err => {
      //   console.error(err)
      //   ElMessage.error('请求失败')
      // })
    } else {
      return false
    }
  })
}
</script>

<script>
export default {
  name: "AdminEditDialog"
}
</script>
