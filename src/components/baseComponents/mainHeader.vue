<template>
  <div class="na-header-btn-list">
    <el-button type="primary" @click="add">添 加</el-button>
    <div class="na-header-btn-list-right">
      <el-button
          v-show="selectIdList.length>0"
          class="na-header-del-btn"
          type="danger"
          @click="onDel">
        删除
      </el-button>
      <el-input v-model="searchValue" @keyup.enter="search" clearable></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

/** 声明props */
const props = defineProps({
  selectIdList: {
    type: Array,
    default() {
      return []
    }
  }
})
/** data */
const searchValue = ref('')

/** 声明emits */
const $emit = defineEmits(['closeDialog', 'confirmDialog'])

/** methods */
const add = () => {
  $emit('onAdd')
}
const onDel = () => {
  $emit('onDel')
}
const search = () => {
  $emit('onSearch', searchValue.value)
}
</script>
<script>
export default {
  name: "mainHeader",
  methods: {}
}
</script>

<style lang="scss" scoped>
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
