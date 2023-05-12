<template>
  <div v-loading="loading">
    <div class="na-header-btn-list">
      <el-button type="primary" @click="addStu">添 加</el-button>
      <div class="na-header-btn-list-right">
        <el-button v-show="selectStuIdList.length>0" class="na-header-del-btn" type="danger"
                   @click="delStu('', selectStuIdList)">删除
        </el-button>
        <el-input placeholder="请输入学号或名字" v-model="searchValue" clearable></el-input>
        <el-button type="primary" @click="searchStu">搜索</el-button>
      </div>
    </div>

    <el-table height="488" :data="tableData" style="width: 100%;margin-bottom: 12px" :header-cell-style="tableHeader" @select="selectStu"
              @select-all="selectAllStu">
      <el-table-column type="selection" width="55" style="padding-left: -10px"></el-table-column>
      <template v-for="(item, index) in options" :key="index">
        <el-table-column :fixed="item.prop==='handel'?'right':null" :width="columnWidth(index)">
          <template #header>
            <div :style="{'text-align':item.prop==='handel'?'center':''}">{{ item.label }}</div>
          </template>
          <template #default="scope">
            <div v-if="item.prop !== 'handel'">
              <span v-if="item.prop==='sex'">{{ getSex(scope.row[item.prop]) }}</span>
              <span v-else>
                <span v-if="scope.row[item.prop] !== ''&&scope.row[item.prop] !== null">
                  {{ scope.row[item.prop] }}
                </span>
                <span v-else>-</span>
              </span>
            </div>
            <div v-else style="text-align: center;">
              <el-button link type="primary" @click="delStu(scope.row)">删除</el-button>
              <el-button link type="primary" @click="editStu(scope.row)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div style="display: flex;justify-content: center;">
      <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :key="new Date().getTime()"
      />
    </div>

    <!--新增学生信息弹窗-->
    <student-info-dialog
        :type="dialogType"
        :dialogVisible="dialogVisible"
        :editStuInfo="editStuInfo"
        @closeDialog="closeDialog"
        @confirmDialog="confirmDialog"
    />
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import StudentInfoDialog from "@/components/student/StudentInfo/StudentInfoDialog";
import {post} from "@/http/http";
import {api} from "@/http/api";

// data
// loading加载
let loading = ref(true)

// 表头样式
const tableHeader = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px'
}

// 学生表格数据
const tableData = ref([])
// 显示新增信息弹窗
let dialogVisible = ref(false)
// 弹窗的类型，默认为新增用户弹窗
let dialogType = ref('add')
// 编辑学生信息时，携带的学生信息
let editStuInfo = ref({})
// 数据总条数
let total = ref(0)
// 选中学生列表
let selectStuIdList = ref([])
// 搜索框的值
const searchValue = ref('')
// 当前页码
const currentPage = ref(1)
// 每页条数
const pageSize = ref(10)

const options = reactive([
  {prop: 'id', label: '序号'},
  {prop: 'stuId', label: '学号'},
  {prop: 'name', label: '姓名'},
  {prop: 'sex', label: '性别'},
  {prop: 'college', label: '院系'},
  {prop: 'specialty', label: '专业'},
  {prop: 'class', label: '班级'},
  {prop: 'age', label: '年龄'},
  {prop: 'address', label: '生源地'},
  {prop: 'phoneNo', label: '联系方式'},
  {prop: 'handel', label: '操作'}
])

onMounted(() => {
  initCollegeList()
})

// methods
/**
 * 获取表格数据
 */
const initCollegeList = () => {
  loading.value = true
  const param = {
    pageNo: currentPage.value,
    pageSize: pageSize.value
  }
  post(api.getStuInfo, param).then(res => {
    const data = res.data
    if (res.code === 200) {
      if (data && data.length) {
        tableData.value = data
        total.value = res.total
      }
    }
  }).finally(() => {
    loading.value = false
  })
}

/**
 * 获取弹窗子组件
 * @param e
 */
function closeDialog(e) {
  dialogVisible.value = e.value
}

/**
 * 点击确定，关闭弹窗
 * @param e
 */
function confirmDialog(e) {
  dialogVisible.value = e.value
  initCollegeList()
}

/**
 * 点击添加学生
 */
const addStu = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
  editStuInfo.value = {}
}
/**
 * 删除学生
 * @param e
 * @param list
 */
const delStu = (e, list) => {
  ElMessageBox.confirm('此为删除操作, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    let ids = []
    if (list && list.length > 0) {
      ids = list
    } else {
      ids.push(e.id)
    }

    post(api.delStu, {ids: ids}).then(res => {
      if (res.code === 200) {
        if (list && list.length > 0) {
          // 隐藏删除按钮
          selectStuIdList = []
        }
        ElMessage({message: '删除成功', type: 'success'})
        initCollegeList()
      } else {
        ElMessage.error('删除失败')
      }
    })
  }).catch(() => {
  })
}
/**
 * 多选学生
 * @param list
 */
const selectStu = (list) => {
  const arr = []
  if (list) {
    list.forEach(item => {
      arr.push(item.id)
    })
  }
  selectStuIdList.value = arr
}
/**
 * 全选学生
 * @param list
 */
const selectAllStu = (list) => {
  selectStu(list)
}
/**
 * 编辑单个学生
 * @param e
 */
const editStu = (e) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  editStuInfo.value = e
}
/**
 * 模糊搜索学生信息
 */
const searchStu = () => {
  const param = {
    q: searchValue.value,
    pageNo: 1,
    pageSize: pageSize.value
  }
  post(api.getStuByNameOrId, param).then(res => {
    if (res.code === 200) {
      tableData.value = res.data
      total.value = res.total
    } else {
      ElMessage.error(res.msg)
    }
  })
}
const columnWidth = (index) => {
  if (index === 0 || index === 3) {
    return '100'
  } else if (index === 4) {
    return '230'
  } else {
    return '180'
  }
}

const handleSizeChange = (val) => {
  pageSize.value = val
  initCollegeList()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initCollegeList()
}

const getSex = (e) => {
  return (e === 1 || e === '1') ? '女' : '男'
}

</script>
<script>
export default {
  name: 'StudentInfo'
}
</script>

<style lang="scss">
.na-header-btn-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  .el-button {
    border-radius: 0;
  }

  .na-header-btn-list-right {
    display: flex;

    .el-input__wrapper {
      border-radius: 0 !important;
    }

    .na-header-del-btn {
      margin: 0 12px;
    }
  }
}
</style>
