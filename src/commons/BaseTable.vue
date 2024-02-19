<!--
@name: 基础table组件
@description: table组件，用于信息展示与信息编辑
@author: newhome
@time: 2023-03-28 14:56:26
-->
<template>
  <div style="margin-bottom: 12px">
    <el-table
        height="488"
        v-loading="loading"
        :data="props.tableData"
        style="width: 100%"
        :header-cell-style="tableHeader"
        @select="onSelect"
        @select-all="onSelectAll">
      <el-table-column type="selection" width="55" style="padding-left: -10px"></el-table-column>
      <!--使用prop作为键值，是避免列表间距重复点击时变大-->
      <template v-for="item in options" :key="item.prop">
        <el-table-column :fixed="item.prop==='handel'?'right':null" :min-width="item.width">
          <template #header>
            <div :style="{'text-align':item.prop==='handel'?'center':''}">{{ item.label }}</div>
          </template>
          <template #default="scope">
            <div v-if="item.prop !== 'handel'">
              <span v-if="scope.row[item.prop] !== ''&&scope.row[item.prop] !== null">
                <el-switch v-if="item.switch" v-model="scope.row.status" @change="onChange(scope.row)"/>
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
  </div>
</template>

<script setup>
import {defineProps, ref, watch} from "vue";

/**
 * props
 */
const props = defineProps({
  tableData: {
    type: Array
  },
  options: {
    type: Array
  }
})
// 声明emits
const $emit = defineEmits(['closeDialog', 'confirmDialog', 'onSelect', 'onSelectAll', 'onDel', 'onEdit'])

/**
 * data
 */
// 表头样式
const tableHeader = {
  height: '50px',
  lineHeight: '50px',
  fontSize: '16px'
}
let loading = ref(true)

watch(() => props.tableData, (newVal) => {
  if (newVal) {
    loading.value = false
  }
})

// methods
/** 单选或多选 */
const onSelect = (list) => {
  $emit('onSelect', list)
}
/** 全选 */
const onSelectAll = (list) => {
  $emit('onSelectAll', list)
}
/** 删除 */
const onDel = (row) => {
  ElMessageBox.confirm('此为删除操作, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    $emit('onDel', row)
  }).catch(() => {
  })
}
/** 编辑 */
const onEdit = (row) => {
  $emit('onEdit', row)
}
const onChange = (e) => {
  $emit('onChange', e)
}
</script>

<script>
export default {
  name: "BaseTable"
}
</script>

<style scoped>

</style>
