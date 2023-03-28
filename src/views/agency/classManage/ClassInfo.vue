<template>
  <div>
    <base-table
        :tableData="tableData"
        :options="options"
    />
  </div>
</template>

<script setup>
import {post} from "@/http/http";
import {api} from "@/http/api";
import {onMounted, reactive, ref} from "vue";
import baseTable from "@/commons/BaseTable";

const tableData = ref([])
// 表头样式
const tableHeader = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px'
}
const options = reactive([
  {prop: 'id', label: '序号', width: 100},
  {prop: 'classId', label: '班号', width: 200},
  {prop: 'className', label: '班级名称', width: 230},
  {prop: 'collegeName', label: '学院', width: 230},
  {prop: 'specialtyName', label: '专业', width: 230},
  {prop: 'teacher', label: '班主任', width: 200},
  {prop: 'handel', label: '操作', width: 180}
])

onMounted(() => {
  getClassInfo()
})

const getClassInfo = (id, init) => {
  post(api.agency.getClass, {id: id}).then(res => {
    const data = res.data
    console.log('获取班级', data)
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
const delClass = () => {
  
}
/**
 * 编辑单个学生
 * @param e
 */
const editClass = (e) => {
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
