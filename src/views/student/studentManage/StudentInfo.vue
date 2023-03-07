<template>
  <div>
    <div class="na-header-btn-list">
      <el-button type="primary" @click="dialogVisible=true">添 加</el-button>
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
              <el-button link type="primary" @click="delStu(scope.row)">删除</el-button>
              <el-button link type="primary" @click="editStu(scope.row)">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />

    <!--新增学生信息弹窗-->
    <add-student-dialog
        :dialogVisible="dialogVisible"
        @closeDialog="closeDialog"
    />

    <el-button @click="register">测试</el-button>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import AddStudentDialog from "@/components/student/StudentInfo/AddStudentDialog";
import {post} from "@/http/http";
import {api} from "@/http/api";

// data
// 表头样式
const tableHeader = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px',
  paddingLeft: '10px'
}

// 学生表格数据
const tableData = ref([])
// 显示新增信息弹窗
let dialogVisible = ref(false)

const options = reactive([
  {prop: 'id', label: '学号'},
  {prop: 'name', label: '姓名'},
  {prop: 'sex', label: '性别'},
  {prop: 'college', label: '院系'},
  {prop: 'specialty', label: '专业'},
  {prop: 'class', label: '班级'},
  {prop: 'handel', label: '操作'}
])

// 搜索框的值
const searchValue = ref('')

// 当前页码
const currentPage = ref(1)
// 每页条数
const pageSize = ref(5)

onMounted(() => {
  initCollegeList()
})

// methods
/**
 * 获取表格数据
 */
const initCollegeList = () => {
  const param = {
    pageNo: currentPage.value,
    pageSize: 10
  }
  post(api.getStuInfo, param).then(res => {
    const data = res.data
    if (data && data.length) {
      tableData.value = data
    }
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
 * 单个删除学生
 * @param e
 */
const delStu = (e) => {
  post(api.delStu, {id: e.id}).then(res => {
    if (res.code === 200) {
      initCollegeList()
    } else {
      // 提示删除失败
    }
  })
}
const editStu = (e) => {
  console.log('click----', e)
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

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

const register = () => {
  const params = {
    name: '农学'
  }
  post(api.getStuByName, params).then(res => {
    console.log('查看返回数据', res)
  })
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

:deep .el-table__header-wrapper {
  //border-top: 1px #eae8e8 solid;
  //border-bottom: 1px #eae8e8 solid;
}
</style>
