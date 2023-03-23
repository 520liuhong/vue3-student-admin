<template>
  <div>
    <!--添加学生信息弹窗-->
    <el-dialog v-model="dialogVisible" @close="closeDialog" title="添加学生信息" width="550">
      <el-form
          ref="stuFormRef"
          :model="stuForm"
          :rules="stuFormRules"
          label-position="left"
          label-width="80px">

        <el-form-item label="学生年级" prop="classId">
          <el-select v-model="stuForm.gradeId" :placeholder="gradeList[0].name" :disabled="type==='add'">
            <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="stuForm.name" placeholder="请输入姓名"/>
        </el-form-item>

        <el-form-item label="学生学号" prop="stuId" v-if="type==='edit'">
          <el-input v-model="stuForm.stuId" disabled/>
        </el-form-item>

        <el-form-item label="学生性别" prop="sex">
          <el-radio-group v-model="stuForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <span style="display: flex">
            <el-date-picker
                v-model="stuForm.birthday"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择出生年月"
                @change="getAgeDate"
            />
          <el-input v-model="stuForm.age" class="add-input-age" placeholder="年龄" disabled/>
          </span>
        </el-form-item>

        <el-form-item label="生源地" prop="address">
          <el-input v-model="stuForm.address" placeholder="请输入生源地地址"/>
        </el-form-item>

        <el-form-item label="联系方式" prop="phoneNo">
          <el-input v-model="stuForm.phoneNo" placeholder="请输入联系方式"/>
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
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirmAddStu">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted, watch} from "vue";
import {get, post} from "@/http/http";
import {api} from "@/http/api";
import {getTimeFromSomeDateToNow} from "@/utils/date-util";
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
const $emit = defineEmits(['closeDialog', 'confirmDialog'])

let dialogVisible = ref(false)

// data
// 添加信息form
const baseInfo = reactive({
  grade: '',
  name: '',
  stuId: '',
  sex: '0',
  birthday: (new Date().getFullYear() - 18) + '-01-01',
  age: '',
  address: '', // 目前是手输，后期改成select选择
  phoneNo: '',
  collegeId: '',
  specialtyId: '',
  classId: ''
})
let stuForm = reactive(JSON.parse(JSON.stringify(baseInfo)))

// form校验标准
const stuFormRules = reactive({
  grade: [{required: true, message: '2023', trigger: 'change'}],
  name: [{
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  }, {
    pattern: /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,18}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,18}[a-zA-Z]{1}$)/,
    message: '请输入正确的名字'
  }],
  stuId: [{required: true, message: '', trigger: 'blur'}],
  sex: [{required: true, message: '请选择性别', trigger: 'change'}],
  birthday: [{required: true, message: '请选择出生年月', trigger: 'blur'}],
  age: [{required: true, message: '请选择出生年月', trigger: 'blur'}],
  address: [{required: true, type: 'string', message: '请选择生源地', trigger: 'blur'}],
  phoneNo: [{
    required: false,
    message: '请输入联系方式',
    trigger: 'blur'
  }, {pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的手机号码或者座机号'}],
  collegeId: [{required: true, message: '请选择院系', trigger: 'change'}],
  specialtyId: [{required: true, message: '请选择专业', trigger: 'change'}],
  classId: [{required: true, message: '请选择班级', trigger: 'blur'}]
})

let gradeList = ref([]) // 年级列表
let collegeList = ref([]) // 所有学院列表
let specialtyList = ref([]) // 所选学院下的专业列表
let classList = ref([]) // 所选专业下的班级列表
let stuFormRef = ref(null) // form表单实例

// 监听
watch(() => props.dialogVisible, (newVal) => {
  dialogVisible.value = newVal
  if (dialogVisible.value && Object.keys(props.editStuInfo).length) {
    // 避免浅拷贝，导致弹窗修改时，影响表格数据
    stuForm = ref(JSON.parse(JSON.stringify(props.editStuInfo)))
    stuForm.value.sex = JSON.stringify(stuForm.value.sex)
    stuForm.value.collegeId = parseFloat(stuForm.value.collegeId)

    getGradeList()
    chooseCollege(stuForm.value.collegeId, 'init')
    chooseSpecialty(stuForm.value.specialtyId, 'init')
  } else {
    stuForm = reactive(JSON.parse(JSON.stringify(baseInfo)))
  }
})

onMounted(() => {
  initCollegeList()
  getGradeList()
})

// methods
/**
 * 获取年龄框
 */
const getAgeDate = (params) => {
  if (params) {
    const time = getTimeFromSomeDateToNow(params)
    stuForm.age = time.year
  } else {
    stuForm.age = ''
  }
}
/**
 * 获取年级列表
 */
const getGradeList = () => {
  post(api.getGrade).then(res => {
    const data = res.data
    if (data && data.length) {
      gradeList.value = data
    }
  })
}
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
      let url = api.addStu
      let param = stuForm
      if (props.type === 'add') {
        stuForm.age = parseFloat(stuForm.age)
        stuForm.gradeId = gradeList.value[0].id
      } else {
        url = api.updateStu
        stuForm.age = parseFloat(stuForm.age)
        // todo 此处用户记得修改
        stuForm.value.user = 'admin'
        param = stuForm.value
      }

      post(url, param).then(res => {
        if (res.code === 200) {
          // 关闭弹窗
          confirmDialog()
          // 重置弹窗信息
          stuForm = reactive(JSON.parse(JSON.stringify(baseInfo)))
          ElMessage({message: res.msg, type: 'success'})
        } else {
          ElMessage.error(res.msg)
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
const closeDialog = () => {
  dialogVisible.value = false
  $emit('closeDialog', dialogVisible)
}
/**
 * 点击确定，关闭弹窗
 */
const confirmDialog = () => {
  dialogVisible.value = false
  $emit('confirmDialog', dialogVisible)
}
</script>
<script>
export default {
  name: "StudentInfoDialog"
}
</script>

<style scoped>
.add-input-age {
  width: 50px;
  height: 30px;
}
</style>
