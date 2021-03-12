<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>明文：</span>
        </div>
      </template>
      <div class="text item">
        <el-input
          v-model="textInput"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
        /></div>
    </el-card>
    <div class="div-space">
      <el-button type="primary" @click="encodeMd5">MD5编码<i class="el-icon-arrow-right" /></el-button>
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>MD5：</span>
        </div>
      </template>
      <div class="text item">
        <el-input
          v-model="textOuput"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
        /></div>
    </el-card>
  </div>
</template>

<script>
const md5 = require('md5')
export default {
  name: 'MD5',
  data() {
    return {
      textInput: '',
      textOuput: ''
    }
  },
  methods: {
    encodeMd5() {
      this.textOuput = md5(this.textInput)
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  width: 480px;
  display: inline-block;
}
.div-space {
  display: inline-block;
  margin: 100px 20px;
  vertical-align: top;
  height: 100px;
  width: 137px;
}
</style>
