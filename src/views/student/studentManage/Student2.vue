<template>
  <div>
    测试学生界面2
    <el-button @click="test">测试</el-button>
  </div>
</template>

<script>
export default {
  name: "Student2",
  methods: {
    test () {
      const data = {}

      const str2 = this.formatCode(data);
      console.log('查看str2', str2)
      const codeStr = this.rmMarks(str2);
      const _adrobj = codeStr.replace(/\"/g, "'");
      console.log('===========', _adrobj) // 打印去掉 key 引号
    },
    formatCode(code) {
      return JSON.stringify(code, null, 4);
    },
    rmMarks(code) {
      let codeArray = code.split("\n");
      codeArray = codeArray.map((i) => {
        if (i.indexOf(":") !== -1) {
          let prefix = i.split(":")[0];
          let suffix = i.split(":")[1];
          prefix = prefix.replace(/"/g, "");
          return prefix + ":" + suffix;
        } else {
          return i;
        }
      });
      return codeArray.join("\n");
    }
  }
}
</script>

<style scoped>

</style>
