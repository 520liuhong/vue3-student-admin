<!--
@name: 用户管理页
@author: newhome
@time: 2023-03-01 10:21:51
-->
<template>
  <div>
    <main-header @onAdd="createAdmin" @onSearch="onSearch"/>

    <el-table
        height="488"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="tableHeader">
      <!--使用prop作为键值，是避免列表间距重复点击时变大-->
      <template v-for="item in options" :key="item.prop">
        <el-table-column :fixed="item.prop==='handel'?'right':null" :min-width="item.width">
          <template #header>
            <div :style="{'text-align':item.prop==='handel'?'center':''}">{{ item.label }}</div>
          </template>
          <template #default="scope">
            <div v-if="item.prop !== 'handel'">
              <span v-if="scope.row[item.prop] !== ''&&scope.row[item.prop] !== null">
                <el-switch v-if="item.switch" v-model="scope.row.status1" @change="onChange(scope.row)"/>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </span>
              <span v-else>-</span>
            </div>
            <div v-else style="text-align: center;">
              <el-button link type="primary" @click="onDel(scope.row)">删除</el-button>
              <el-button link type="primary" @click="onEdit(scope.row)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <admin-edit-dialog
        :type="dialogType"
        :dialogVisible="dialogVisible"
        :editObj="editObj"
        @closeDialog="closeDialog"
        @confirmDialog="confirmDialog"
    />

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
import {onMounted, reactive, ref, watch} from "vue";
import {getNameByRoleId, getStatusOfRole} from "@/utils/tools";

// 表头样式
const tableHeader = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px'
}
// 表格数据
let tableData = ref([])
const options = reactive([
  {prop: 'id', label: 'ID', width: 100},
  {prop: 'name', label: '账号', width: 120},
  {prop: 'role1', label: '角色权限', width: 120},
  {prop: 'status', switch: true, label: '状态', width: 100},
  {prop: 'remark', label: '备注信息', width: 180},
  {prop: 'lastLoginTime', label: '最后登录时间', width: 180},
  {prop: 'lastLoginIp', label: '最后登录ip', width: 180},
  {prop: 'createTime', label: '创建时间', width: 180},
  {prop: 'updateTime', label: '更新时间', width: 180},
  {prop: 'handel', label: '操作', width: 180}
])
// 数据总条数
let total = ref(0)
// 弹窗的类型，默认为新增班级弹窗
let dialogType = ref('add')
// 显示新增信息弹窗
let dialogVisible = ref(false)
let editObj = ref({})
// 当前页码
const currentPage = ref(1)
// 每页条数
const pageSize = ref(10)
let loading = ref(true)

watch(() => tableData.value, (newVal) => {
  if (newVal) {
    loading.value = false
  }
})

onMounted(() => {
  initData()
})

const initData = () => {
  const param = {
    pageNo: currentPage.value,
    pageSize: pageSize.value
  }
  post(api.admin.getAdminInfo, param).then(res => {
    const data = res.data
    if (res.code === 200) {
      if (data && data.length) {
        data.forEach(item => {
          item.role1 = getNameByRoleId(item.role)
          item.status1 = getStatusOfRole(item.status)
        })
        tableData.value = data
        total.value = res.total
      }
    }
  })
}
/** 删除管理员 */
const onDel = (e) => {
  ElMessageBox.confirm('此为删除操作, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    post(api.admin.delAdmin, {ids: e.id}).then(res => {
      if (res.code === 200) {
        ElMessage({message: '删除成功', type: 'success'})
        initData()
      } else {
        ElMessage.error('删除失败')
      }
    })
  }).catch(() => {
  })
}
/** 点击添加管理员 */
const createAdmin = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
  editObj.value = {}
}
/** 编辑单行 */
const onEdit = (e) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  editObj.value = e
}

/** 获取弹窗子组件 */
function closeDialog(e) {
  dialogVisible.value = e
}

/** 点击确定，关闭弹窗 */
function confirmDialog(e) {
  dialogVisible.value = e
  initData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  initData()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initData()
}
const onChange = (e) => {
  // 请求接口，修改管理员状态，0禁用（不可登录账号），1启用
}

/** 模糊搜索 */
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
import AdminEditDialog from "@/components/agency/class/AdminEditDialog";

export default {
  name: "AdminInfo",
  components: {
    mainHeader,
    AdminEditDialog
  }
}
</script>

