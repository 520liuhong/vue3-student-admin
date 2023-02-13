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
            <div v-if="item.prop !== 'handel'" style="padding-left: 10px">{{ scope.row[item.prop] }}</div>
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
        <el-form-item label="学生姓名" prop="stuName">
          <el-input v-model="addStuForm.stuName"/>
        </el-form-item>
        <el-form-item label="学生性别" prop="stuSex">
          <el-radio-group v-model="addStuForm.stuSex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学生院系" prop="stuCollege">
          <el-select v-model="addStuForm.stuCollege" placeholder="请选择" @change="chooseCollege">
            <el-option v-for="item in collegeList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="学生专业" prop="stuSpecialty">
          <el-select v-model="addStuForm.stuSpecialty" placeholder="请选择">
            <el-option v-for="item in collegeList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="学生班级" prop="stuClass">
          <el-select v-model="addStuForm.stuClass" placeholder="请选择">
            <el-option v-for="item in collegeList" :key="item.value" :label="item.label" :value="item.value"/>
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

export default {
  name: 'HelloWorld',
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
    const tableData = [
      {
        "stu_id": 2015101101,
        "stu_name": "王三男",
        "stu_sex": "男",
        "stu_college": "农学院",
        "stu_specialty": "园林",
        "stu_class": "园林15（1）班"
      },
      {
        "stu_id": 2015307101,
        "stu_name": "王思楠",
        "stu_sex": "男",
        "stu_college": "工程学院",
        "stu_specialty": "土木工程",
        "stu_class": "土木15（1）班"
      },
      {
        "stu_id": 2015407101,
        "stu_name": "王沂南",
        "stu_sex": "男",
        "stu_college": "电气与信息学院",
        "stu_specialty": "计算机科学与技术",
        "stu_class": "计算机15（1）班"
      }
    ]
    const options = [
      {prop: 'stu_id', label: '学号'},
      {prop: 'stu_name', label: '姓名'},
      {prop: 'stu_sex', label: '性别'},
      {prop: 'stu_college', label: '院系'},
      {prop: 'stu_specialty', label: '专业'},
      {prop: 'stu_class', label: '班级'},
      {prop: 'handel', label: '操作'}
    ]

    const addStuForm = reactive({
      stuName: '',
      stuSex: '',
      stuCollege: '',
      stuSpecialty: '',
      stuClass: ''
    })

    const addStuFormRules = reactive({
      stuName: [{required: true, message: '请输入姓名', trigger: 'blur'}],
      stuSex: [{required: true, message: '请选择性别', trigger: 'change'}],
      stuCollege: [{required: true, message: '请选择院系', trigger: 'change'}],
      stuSpecialty: [{required: true, message: '请选择专业', trigger: 'change'}],
      stuClass: [{required: true, message: '请选择班级', trigger: 'blur'}]
    })

    let dialogVisible = ref(false)
    const searchValue = ref('')
    let addStuFormRef = ref(null)
    const currentPage = ref(1)
    const pageSize = ref(5)

    // 所有学院列表
    let collegeList = ref([])

    onMounted (() => {
      initCollegeList()
    })

    // methods
    const initCollegeList = () => {
      axios.get('http://localhost:8088/api/getAllCollege').then(res => {
        console.log('返回所有院系', res.data)
        const data = res.data.data
        const list = []
        if (data && data.length) {
          data.forEach(item => {
            list.push({value: item.college_id, label: item.college_name})
          })
          collegeList.value = list
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
        console.log('form表单情况', valid)
        if (valid) {
          // 请求接口
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

    const chooseCollege = (index) => {
      console.log('打印选择项目', index)
      const id = collegeList.value[index-1].value
      console.log('打印id', id)
      axios.post('http://localhost:8088/api/getSpecialtyByCollege', {id: id}).then(res => {
        console.log('查看返回数据', res.data)
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
      currentPage,
      pageSize,
      handleClick,
      columnWidth,
      handleClose,
      confirmAddStu,
      handleSizeChange,
      handleCurrentChange,
      register,
      chooseCollege
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
