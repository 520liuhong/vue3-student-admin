<!--
@name:
@description: 班级信息编辑弹窗
@author: newhome
@time: 2023-04-10 11:23:17
-->
<template>
  <div>
    <!--添加学生信息弹窗-->
    <el-dialog v-model="dialogVisible" @close="closeDialog" title="编辑班级信息" width="550">
      <el-form
          ref="classFormRef"
          :model="classForm"
          :rules="classFormRules"
          label-position="left"
          label-width="80px">

        <el-form-item label="年级" prop="grade">
          <el-select v-model="classForm.gradeId" placeholder="请选择" @change="getGradeList">
            <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="院系" prop="collegeId">
          <el-select v-model="classForm.collegeId" placeholder="请选择" @change="chooseCollege">
            <el-option v-for="item in collegeList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="专业" prop="specialtyId">
          <el-select v-model="classForm.specialtyId" placeholder="请选择" @change="chooseSpecialty">
            <el-option v-for="item in specialtyList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="班级编号" prop="classId">
          <el-input v-model="classForm.classId"/>
        </el-form-item>

        <el-form-item label="班级名称" prop="class">
          <el-input v-model="classForm.class"/>
        </el-form-item>

        <el-form-item label="班主任" prop="teacherId">
          <el-select v-model="classForm.teacherId" placeholder="请选择">
            <el-option v-for="item in teacherList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="confirmAddClass">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted, watch} from "vue";
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
  editClassInfo: {
    type: Object
  }
})
// 声明emits
const $emit = defineEmits(['closeDialog', 'confirmDialog'])

let dialogVisible = ref(false)

// data
// 添加信息form
const baseInfo = reactive({
  gradeId: '',
  collegeId: '',
  specialtyId: '',
  classId: '',
  class: '',
  teacherId: ''
})
let classForm = reactive(JSON.parse(JSON.stringify(baseInfo)))

// form校验标准
const classFormRules = reactive({
  gradeId: [{required: true, message: '请选择年级', trigger: 'change'}],
  collegeId: [{required: true, message: '请选择院系', trigger: 'change'}],
  specialtyId: [{required: true, message: '请选择专业', trigger: 'change'}],
  classId: [{required: true, message: '请选择班级', trigger: 'blur'}],
  class: [{required: true, message: '请输入名称', trigger: 'blur'}],
  teacherId: [{required: true, message: '请选择班主任', trigger: 'change'}]
})

let gradeList = ref([]) // 年级列表
let teacherList = ref([]) // 年级列表
let collegeList = ref([]) // 所有学院列表
let specialtyList = ref([]) // 所选学院下的专业列表
let classList = ref([]) // 所选专业下的班级列表
let classFormRef = ref(null) // form表单实例

// 监听
watch(() => props.dialogVisible, (newVal) => {
  dialogVisible.value = newVal
  if (dialogVisible.value && Object.keys(props.editClassInfo).length) {
    // 避免浅拷贝，导致弹窗修改时，影响表格数据
    classForm = ref(JSON.parse(JSON.stringify(props.editClassInfo)))
    classForm.value.collegeId = parseFloat(classForm.value.collegeId)

    getGradeList()
    chooseCollege(classForm.value.collegeId, 'init')
    chooseSpecialty(classForm.value.specialtyId, 'init')
  } else {
    classForm = reactive(JSON.parse(JSON.stringify(baseInfo)))
  }
})

onMounted(() => {
  initCollegeList()
  getGradeList()
})

// methods
/** 获取年级列表 */
const getGradeList = () => {
  post(api.getGrade).then(res => {
    const data = res.data
    if (data && data.length) {
      gradeList.value = data
    }
  })
  getTeacherList()
}
/** 初始化学院列表 */
const initCollegeList = (init) => {
  get(api.getAllCollege).then(res => {
    const data = res.data
    if (data && data.length) {
      collegeList.value = data
      if (init) {
        classList.value = []
        classForm.classId = ''
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
          classForm.value.specialtyId = ''
          classList.value = []
          classForm.value.classId = ''
          teacherList.value = []
          classForm.value.teacherId = ''
        }
        getTeacherList('college')
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
    if (res.code === 200 && data) {
      classList.value = data
      if (!init) {
        classForm.classId = ''
        classForm.value.teacherId = ''
      }
      getTeacherList('specialty')
    }
  })
}
/** 获取教师列表 */
const getTeacherList = (e) => {
  let params = {}
  if (e === 'college') {
    params = {collegeId: classForm.value.collegeId}
  } else if (e === 'specialty') {
    params = {specialtyId: classForm.value.specialtyId}
  }

  post(api.agency.getTeacher, params).then(res => {
    const data = res.data
    if (res.code === 200 && data) {
      teacherList.value = data
    }
  })
}
/** 关闭dialog弹窗 */
const closeDialog = () => {
  dialogVisible.value = false
  $emit('closeDialog', false)
}
/** 点击弹窗的确定按钮 */
const confirmAddClass = () => {
  classFormRef.value.validate((valid) => {
    if (valid) {
      let url = api.agency.addClass
      let param = classForm

      if (props.type === 'add') {
        param.gradeId = gradeList.value[0].id
      } else {
        url = api.agency.updateClass
        // todo 此处用户记得修改
        classForm.value.user = 'admin'
        param = classForm.value
      }

      post(url, param).then(res => {
        if (res.code === 200) {
          // 关闭弹窗
          dialogVisible.value = false
          $emit('confirmDialog', false)
          // 重置弹窗信息
          classForm = reactive(JSON.parse(JSON.stringify(baseInfo)))
          ElMessage({message: '修改成功', type: 'success'})
        } else {
          ElMessage.error('修改失败')
        }
      }).catch(err => {
        console.error(err)
        ElMessage.error('请求失败')
      })
    } else {
      return false
    }
  })
}
</script>

<script>
export default {
  name: "ClassEditDialog"
}
</script>

<style scoped>

</style>