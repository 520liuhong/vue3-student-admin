<template>
  <div>
    <base-table
        :tableData="tableData"
        :options="options"
        @onDel="onDel"
        @onEdit="onEdit"
        @onSelect="selectClass"
        @onSelectAll="selectAllClass"
    />
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

onMounted(() => {
  getClassInfo()
})

const getClassInfo = () => {
  post(api.agency.getClass).then(res => {
    const data = res.data
    if (res.code === 200) {
      if (data && data.length) {
        tableData.value = data
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
  }
}
/** 全选班级 */
const selectAllClass = (list) => {
  selectClass(list)
}
const onDel = (e) => {
  console.log('删除获取信息', e)
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
}/** 获取弹窗子组件 */
function closeDialog(e) {
  dialogVisible.value = e
}
/** 点击确定，关闭弹窗 */
function confirmDialog(e) {
  dialogVisible.value = e
  getClassInfo()
}
</script>

<script>
export default {
  name: "ClassInfo"
}
</script>

<style scoped>

</style>
