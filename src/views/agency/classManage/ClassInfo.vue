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
    <class-edit-dialog></class-edit-dialog>
  </div>
</template>

<script setup>
import {post} from "@/http/http";
import {api} from "@/http/api";
import {onMounted, reactive, ref} from "vue";
import ClassEditDialog from "@/components/agency/class/ClassEditDialog";

// 表头样式
const tableHeader = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px'
}
let tableData = ref([])
const options = reactive([
  {prop: 'id', label: '序号', width: 100},
  {prop: 'classId', label: '班号', width: 200},
  {prop: 'className', label: '班级名称', width: 230},
  {prop: 'collegeName', label: '学院', width: 230},
  {prop: 'specialtyName', label: '专业', width: 230},
  {prop: 'teacher', label: '班主任', width: 200},
  {prop: 'handel', label: '操作', width: 180}
])
const valueIp = ref('')

onMounted(() => {
  getClassInfo()
})

const getClassInfo = (id) => {
  post(api.agency.getClass, {id: id}).then(res => {
    const data = res.data
    if (res.code === 200) {
      if (data && data.length) {
        tableData.value = data
      }
    }
  })
}
/**
 * 多选学生
 * @param list
 */
const selectClass = (list) => {
  const arr = []
  if (list) {
    list.forEach(item => {
      arr.push(item.id)
    })
  }
  // selectClassIdList.value = arr
}
/**
 * 全选学生
 * @param list
 */
const selectAllClass = (list) => {
  selectClass(list)
}
const onDel = (e) => {
  console.log('删除获取信息', e)
}
/**
 * 编辑单个学生
 * @param e
 */
const onEdit = (e) => {
  console.log('点击编辑', e)
  // dialogType.value = 'edit'
  // dialogVisible.value = true
  // editStuInfo.value = e
}
</script>
<script>
export default {
  name: "ClassInfo"
}
</script>

<style scoped>

</style>
