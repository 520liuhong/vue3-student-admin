<!--
@name: 用户管理页
@author: newhome
@time: 2023-03-01 10:21:51
-->
<template>
  <div>
    <main-header
        :selectIdList="selectClassList"
        @onAdd="addClass"
        @onDel="onDel('', selectClassList)"
        @onSearch="onSearch" />

    用户管理页

<!--    <div style="display: flex;justify-content: center;">-->
<!--      <el-pagination-->
<!--          :current-page="currentPage"-->
<!--          :page-size="pageSize"-->
<!--          :page-sizes="[10, 20, 40]"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--          :total="total"-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :key="new Date().getTime()"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>

<script setup>
import {post} from "@/http/http";
import {api} from "@/http/api";
import {onMounted, ref} from "vue";

// 表格数据
let tableData = ref([])
// 数据总条数
let total = ref(0)
// 当前页码
const currentPage = ref(1)
// 每页条数
const pageSize = ref(10)
// 多选/单选
let selectClassList = ref([])

onMounted(() => {
  initData()
})

const initData = () => {
  const param = {
    pageNo: currentPage.value,
    pageSize: pageSize.value
  }
  // post(api.agency.getClass, param).then(res => {
  //   const data = res.data
  //   if (res.code === 200) {
  //     if (data && data.length) {
  //       tableData.value = data
  //       total.value = res.total
  //     }
  //   }
  // })
}
/** 删除班级 */
const onDel = (e, list) => {
  let ids = []
  if (list && list.length > 0) {
    ids = list
  } else {
    ids.push(e.id)
  }

  // post(api.agency.delClass, {ids: ids}).then(res => {
  //   if (res.code === 200) {
  //     if (list && list.length > 0) {
  //       // 隐藏删除按钮
  //       // selectCLassList.value = []
  //     }
  //     ElMessage({message: '删除成功', type: 'success'})
  //     initData()
  //   } else {
  //     ElMessage.error('删除失败')
  //   }
  // })
}
/** 点击添加班级 */
const addClass = () => {
  // dialogType.value = 'add'
  // dialogVisible.value = true
  // editClassInfo.value = {}
}
/** 编辑单个班级 */
const onEdit = (e) => {
  // dialogType.value = 'edit'
  // dialogVisible.value = true
  // editClassInfo.value = e
}

/** 获取弹窗子组件 */
function closeDialog(e) {
  // dialogVisible.value = e
}

/** 点击确定，关闭弹窗 */
function confirmDialog(e) {
  // dialogVisible.value = e
  // initData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  initData()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initData()
}

/** 模糊搜索班级信息 */
const onSearch = (e) => {
  const param = {
    q: e,
    pageNo: 1,
    pageSize: pageSize.value
  }
  // post(api.agency.getClass, param).then(res => {
  //   const data = res.data
  //   if (res.code === 200) {
  //     tableData.value = data
  //     total.value = res.total
  //   } else {
  //     tableData.value = []
  //     total.value = 0
  //   }
  // })
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

