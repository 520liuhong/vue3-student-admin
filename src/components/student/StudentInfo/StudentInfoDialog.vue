<template>
  <div>
    <!--添加学生信息弹窗-->
    <el-dialog v-model="dialogVisible" @close="closelDialog" title="添加学生信息" width="400">
      <el-form
          ref="stuFormRef"
          :model="stuForm"
          :rules="stuFormRules"
          label-position="left"
          label-width="80px">

        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="stuForm.name"/>
        </el-form-item>

        <el-form-item label="学生性别" prop="sex">
          <el-radio-group v-model="stuForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="学生院系" prop="collegeId">
          <el-select v-model="stuForm.collegeId" placeholder="请选择" @change="chooseCollege">
            <el-option v-for="item in collegeList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="学生专业" prop="specialtyId">
          <el-select v-model="stuForm.specialtyId" placeholder="请选择" @change="chooseSpecialty">
            <el-option v-for="item in specialtyList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="学生班级" prop="classId">
          <el-select v-model="stuForm.classId" placeholder="请选择">
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
import {reactive, ref, onMounted, watch} from "vue";
import {ElMessage} from "element-plus";
import {get, post} from "@/http/http";
import {api} from "@/http/api";
// 声明props
const props = defineProps({
  type: {
    type: String
  },
  dialogVisible: {
    type: Boolean
  },
  editStuInfo: {
    type: Object
  }
})
// 声明emits
const $emit = defineEmits(['click'])

let dialogVisible = ref(false)

// data
// 添加信息form
let stuForm = reactive({
  name: '',
  sex: '0',
  collegeId: '',
  specialtyId: '',
  classId: ''
})

// form校验标准
const stuFormRules = ref({
  name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
  sex: [{required: true, message: '请选择性别', trigger: 'change'}],
  collegeId: [{required: true, message: '请选择院系', trigger: 'change'}],
  specialtyId: [{required: true, message: '请选择专业', trigger: 'change'}],
  classId: [{required: true, message: '请选择班级', trigger: 'blur'}]
})

let collegeList = ref([]) // 所有学院列表
let specialtyList = ref([]) // 所选学院下的专业列表
let classList = ref([]) // 所选专业下的班级列表
let stuFormRef = ref(null)

// 监听
watch(() => props.dialogVisible, (newVal) => {
  dialogVisible.value = newVal
  if (dialogVisible.value && Object.keys(props.editStuInfo).length) {
    stuForm.name = props.editStuInfo.name
    stuForm.sex = JSON.stringify(props.editStuInfo.sex)
    stuForm.collegeId = parseFloat(props.editStuInfo.college_id)
    stuForm.specialtyId = props.editStuInfo.specialty_id
    stuForm.classId = props.editStuInfo.class_id
    chooseCollege(stuForm.collegeId, 'init')
    chooseSpecialty(stuForm.specialtyId, 'init')
  } else {
    stuForm = reactive({name: '', sex: '0', collegeId: '', specialtyId: '', classId: ''})
  }
})

onMounted(() => {
  initCollegeList()
})

// methods
/**
 * 初始化学院列表
 */
const initCollegeList = (init) => {
  get(api.getAllCollege).then(res => {
    const data = res.data
    if (data && data.length) {
      collegeList.value = data
      if (init) {
        classList.value = []
        stuForm.classId = ''
      }
    }
  })
}
/**
 * 根据学院选择专业
 * @param id
 * @param init
 */
const chooseCollege = (id, init) => {
  post(api.getSpecialtyByCollege, {id: id}).then(res => {
    const data = res.data
    if (res.code === 200) {
      if (data && data.length) {
        specialtyList.value = data
        if (!init) {
          stuForm.specialtyId = ''
          classList.value = []
          stuForm.classId = ''
        }
      }
    }
  })
}
/**
 * 根据专业选择班级
 * @param id
 * @param init
 */
const chooseSpecialty = (id, init) => {
  post(api.getClassBySpecialty, {id: id}).then(res => {
    const data = res.data
    if (res.code === 200) {
      if (data && data.length) {
        classList.value = data
        if (!init) {
          stuForm.classId = ''
        }
      }
    }
  })
}

/**
 * 弹窗点击确定
 */
const confirmAddStu = () => {
  stuFormRef.value.validate((valid) => {
    if (valid) {
      console.log('点击提交前', stuForm)
      if (props.type === 'add') {
        post(api.addStu, stuForm).then(res => {
          if (res.code === 200) {
            // 关闭弹窗
            closelDialog()
            // 重置弹窗信息
            stuForm = reactive({name: '', sex: '0', collegeId: '', specialtyId: '', classId: ''})

            ElMessage({message: res.msg, type: 'success'})
          }
        })
      } else {
        //
      }
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
  name: "StudentInfoDialog"
}
</script>

<style scoped>

</style>
