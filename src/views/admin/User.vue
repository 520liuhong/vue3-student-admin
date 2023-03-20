<!--
@name: 用户管理页
@author: newhome
@time: 2023-03-01 10:21:51
-->
<template>
  <div>
    用户管理页
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {post} from "@/http/http";
import {api} from "@/http/api";

onMounted(() => {
  initCollegeList()
})

// methods
/**
 * 获取表格数据
 */
const initCollegeList = () => {
  const param = {
    pageNo: 1,
    pageSize: 10
  }
  post(api.admin.getAdminInfo, param).then(res => {
    console.log('获取管理员列表', res)
    // const data = res.data
    // if (data && data.length) {
    //   tableData.value = data
    //   total.value = res.total
    // }
  })
}
</script>

<script>
export default {
  name: "User"
}
</script>

<style scoped>

</style>
