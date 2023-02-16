<template>
  <div>
    <div class="na-header-btn-list">
      <el-button type="primary" @click="dialogVisible = true">添 加</el-button>
      <div class="na-header-btn-list-right">
        <el-input placeholder="搜索" v-model="searchValue"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" :header-cell-style="tableHeader">
      <template v-for="(item, index) in options" :key="index">
        <el-table-column :fixed="item.prop==='handel'?'right':null" :width="columnWidth(index)">
          <template #header>
            <div :style="{'text-align':item.prop==='handel'?'center':''}">{{ item.label }}</div>
          </template>
          <template #default="scope">
            <div v-if="item.prop !== 'handel'" style="padding-left: 10px">
              <span v-if="item.prop==='stu_sex'">{{ getSex(scope.row[item.prop]) }}</span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </div>
            <div v-else style="padding-left: 10px;text-align: center">
              <el-button color="#f00" @click="handleClick(scope.row)">删除</el-button>
              <el-button type="primary" @click="handleClick(scope.row)">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!--添加学生信息弹窗-->
    <el-dialog v-model="dialogVisible" title="添加学生信息" width="400">
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
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddStu">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

    <el-button @click="register">测试</el-button>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: 'Student1',
  props: {
    msg: String
  },
  setup() {
    // data
    const tableHeader = {
      height: '50px',
      lineHeight: '50px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#409eff',
      paddingLeft: '10px'
    }

    const tableData = ref([])

    const options = reactive([
      {prop: 'stu_id', label: '学号'},
      {prop: 'stu_name', label: '姓名'},
      {prop: 'stu_sex', label: '性别'},
      {prop: 'college_name', label: '院系'},
      {prop: 'specialty_name', label: '专业'},
      {prop: 'class_name', label: '班级'},
      {prop: 'handel', label: '操作'}
    ])

    const addStuForm = reactive({
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

    let dialogVisible = ref(false)
    const searchValue = ref('')
    let addStuFormRef = ref(null)
    const currentPage = ref(1)
    const pageSize = ref(5)

    // 所有学院列表
    let collegeList = ref([])
    // 所选学院下的专业列表
    let specialtyList = ref([])
    // 所选专业下的班级列表
    let classList = ref([])

    onMounted (() => {
      initCollegeList()
    })

    // methods
    const initCollegeList = () => {
      axios.get('http://localhost:8088/api/getAllStu').then(res => {
        const data = res.data.data
        if (data && data.length) {
          tableData.value = data
        }
      })
      axios.get('http://localhost:8088/api/getAllCollege').then(res => {
        const data = res.data.data
        if (data && data.length) {
          collegeList.value = data
        }
      })
    }

    const handleClick = (e) => {
      console.log('click', e)
    }
    const columnWidth = (index) => {
      if (index === 2) {
        return '100'
      } else if (index === 3) {
        return '230'
      } else {
        return '200'
      }
    }

    const handleClose = () => {
      dialogVisible.value = false
    }

    const confirmAddStu = () => {
      console.log('查看选择情况', addStuForm)
      addStuFormRef.value.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8088/api/addStu', addStuForm).then(res => {
            if (res.data.code === 200) {
              dialogVisible.value = false
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
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }

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

    const register = () => {
      // axios.get('http://localhost:8088/api/getAll').then(res => {
      //   console.log('查看返回数据', res.data)
      // })
      const params = {
        name: '农学'
      }
      axios.post('http://localhost:8088/api/getStuByName', params).then(res => {
        console.log('查看返回数据', res.data)
      })
    }

    const getSex = (e) => {
      let sex = '男'
      if (e === 1) {
        sex = '女'
      }
      return sex
    }

    return {
      tableHeader,
      tableData,
      options,
      dialogVisible,
      addStuForm,
      addStuFormRef,
      searchValue,
      addStuFormRules,
      collegeList,
      specialtyList,
      classList,
      currentPage,
      pageSize,
      handleClick,
      columnWidth,
      handleClose,
      confirmAddStu,
      handleSizeChange,
      handleCurrentChange,
      register,
      chooseCollege,
      chooseClass,
      getSex
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.na-header-btn-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.na-header-btn-list-right {
  display: flex;
}

.na-header-btn-list .el-button {
  border-radius: 0;
}

.na-header-btn-list-right .el-input__wrapper {
  border-radius: 0 !important;
}
</style>
