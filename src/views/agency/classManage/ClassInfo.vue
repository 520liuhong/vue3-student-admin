<template>
  <div>
    <main-header
        :selectIdList="selectClassList"
        @onAdd="addClass"
        @onDel="onDel('', selectClassList)"
        @onSearch="onSearch"/>

    <base-table
        :tableData="tableData"
        :options="options"
        @onDel="onDel"
        @onEdit="onEdit"
        @onSelect="selectClass"
        @onSelectAll="selectAllClass"
    />

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

    <class-edit-dialog
        :type="dialogType"
        :dialogVisible="dialogVisible"
        :editClassInfo="editClassInfo"
        @closeDialog="closeDialog"
        @confirmDialog="confirmDialog"
    />
  </div>
</template>

<script setup>
import {post} from "@/http/http";
import {api} from "@/http/api";
import {onMounted, reactive, ref} from "vue";
import ClassEditDialog from "@/components/agency/class/ClassEditDialog";

// 表格数据
let tableData = ref([])
const options = reactive([
  {prop: 'id', label: '序号', width: 100},
  {prop: 'classId', label: '班号', width: 200},
  {prop: 'class', label: '班级名称', width: 230},
  {prop: 'college', label: '学院', width: 230},
  {prop: 'specialty', label: '专业', width: 230},
  {prop: 'teacher', label: '班主任', width: 200},
  {prop: 'handel', label: '操作', width: 180}
])
// 弹窗的类型，默认为新增班级弹窗
let dialogType = ref('add')
// 显示新增信息弹窗
let dialogVisible = ref(false)
// 编辑班级信息时，携带的班级信息
let editClassInfo = ref({})
// 数据总条数
let total = ref(0)
// 当前页码
const currentPage = ref(1)
// 每页条数
const pageSize = ref(10)
// 选中班级
let selectClassList = ref([])

onMounted(() => {
  getClassInfo()
})

const getClassInfo = () => {
  const param = {
    pageNo: currentPage.value,
    pageSize: pageSize.value
  }
  post(api.agency.getClass, param).then(res => {
    const data = res.data
    if (res.code === 200) {
      if (data && data.length) {
        tableData.value = data
        total.value = res.total
      }
    }
  })
}
/** 多选班级 */
const selectClass = (list) => {
  const arr = []
  if (list) {
    list.forEach(item => {
      arr.push(item.id)
    })
    selectClassList.value = arr
  }
}
/** 全选班级 */
const selectAllClass = (list) => {
  selectClass(list)
}
/** 删除班级 */
const onDel = (e, list) => {
  let ids = []
  if (list && list.length > 0) {
    ids = list
  } else {
    ids.push(e.id)
  }

  post(api.agency.delClass, {ids: ids}).then(res => {
    if (res.code === 200) {
      if (list && list.length > 0) {
        // 隐藏删除按钮
        selectClassList.value = []
      }
      ElMessage({message: '删除成功', type: 'success'})
      getClassInfo()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
/** 点击添加班级 */
const addClass = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
  editClassInfo.value = {}
}
/** 编辑单个班级 */
const onEdit = (e) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  editClassInfo.value = e
}

/** 获取弹窗子组件 */
function closeDialog(e) {
  dialogVisible.value = e
}

/** 点击确定，关闭弹窗 */
function confirmDialog(e) {
  dialogVisible.value = e
  getClassInfo()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  getClassInfo()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  getClassInfo()
}

/** 模糊搜索班级信息 */
const onSearch = (e) => {
  const param = {
    q: e,
    pageNo: 1,
    pageSize: pageSize.value
  }
  post(api.agency.getClass, param).then(res => {
    const data = res.data
    if (res.code === 200) {
      tableData.value = data
      total.value = res.total
    } else {
      tableData.value = []
      total.value = 0
    }
  })
}
</script>

<script>
import mainHeader from "@/components/baseComponents/mainHeader";

export default {
  name: "ClassInfo",
  components: {
    mainHeader
  }
}
</script>
