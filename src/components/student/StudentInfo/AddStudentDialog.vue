<template>
  <div>
    <!--添加学生信息弹窗-->
    <el-dialog v-model="dialogVisible" @close="closelDialog" title="添加学生信息" width="400">
      <el-form
          ref="addStuFormRef"
          :model="addStuForm"
          :rules="addStuFormRules"
          label-position="left"
          label-width="80px">

        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="addStuForm.name"/>
        </el-form-item>

        <el-form-item label="学生性别" prop="sex">
          <el-radio-group v-model="addStuForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="学生院系" prop="collegeId">
          <el-select v-model="addStuForm.collegeId" placeholder="请选择" @change="chooseCollege">
            <el-option v-for="item in collegeList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="学生专业" prop="specialtyId">
          <el-select v-model="addStuForm.specialtyId" placeholder="请选择" @change="chooseClass">
            <el-option v-for="item in specialtyList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="学生班级" prop="classId">
          <el-select v-model="addStuForm.classId" placeholder="请选择">
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="closelDialog">取消</el-button>
        <el-button type="primary" @click="confirmAddStu">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted, watchEffect} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
// 声明props
const props = defineProps({
  dialogVisible: {
    type: Boolean
  }
})
// 声明emits
const $emit = defineEmits(['click'])

let dialogVisible = ref(false)
// 监听
watchEffect(() => {
  dialogVisible.value = props.dialogVisible
})

// data
let addStuForm = reactive({
  name: '',
  sex: '',
  collegeId: '',
  specialtyId: '',
  classId: ''
})
const addStuFormRules = ref({
  name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
  sex: [{required: true, message: '请选择性别', trigger: 'change'}],
  collegeId: [{required: true, message: '请选择院系', trigger: 'change'}],
  specialtyId: [{required: true, message: '请选择专业', trigger: 'change'}],
  classId: [{required: true, message: '请选择班级', trigger: 'blur'}]
})
const user = ref('')

let collegeList = ref([]) // 所有学院列表
let specialtyList = ref([]) // 所选学院下的专业列表
let classList = ref([]) // 所选专业下的班级列表
let addStuFormRef = ref(null)

onMounted(() => {
  initCollegeList()
})

// methods
/**
 * 初始化学院列表
 */
const initCollegeList = () => {
  axios.get('http://localhost:8088/api/getAllCollege').then(res => {
    const data = res.data.data
    if (data && data.length) {
      collegeList.value = data
    }
  })
}

/**
 * 根据学院选择专业
 * @param id
 */
const chooseCollege = (id) => {
  axios.post('http://localhost:8088/api/getSpecialtyByCollege', {id: id}).then(res => {
    const data = res.data
    if (data.code === 200) {
      if (data.data && data.data.length) {
        specialtyList.value = data.data
      }
    }
  })
}
/**
 * 根据专业选择班级
 * @param id
 */
const chooseClass = (id) => {
  axios.post('http://localhost:8088/api/getClassBySpecialty', {id: id}).then(res => {
    const data = res.data
    if (data.code === 200) {
      if (data.data && data.data.length) {
        classList.value = data.data
      }
    }
  })
}

/**
 * 弹窗点击确定
 */
const confirmAddStu = () => {
  console.log('查看选择情况', addStuForm)
  addStuFormRef.value.validate((valid) => {
    if (valid) {
      axios.post('http://localhost:8088/api/addStu', addStuForm).then(res => {
        if (res.data.code === 200) {
          // 关闭弹窗
          closelDialog()
          // 重置弹窗信息
          addStuForm.value = {name: '', sex: '', collegeId: '', specialtyId: '', classId: ''}

          ElMessage({
            message: res.data.msg,
            type: 'success',
          })
        }
      })
    } else {
      return false
    }
  })
}

/**
 * 关闭dialog弹窗
 */
const closelDialog = () => {
  dialogVisible.value = false
  $emit('closeDialog', dialogVisible)
}

</script>
<script>
export default {
  name: "AddStudentProp"
}
</script>

<style scoped>

</style>
