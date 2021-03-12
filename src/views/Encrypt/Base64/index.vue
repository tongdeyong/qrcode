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
      <el-button type="primary" @click="encodeBase64">BASE64编码<i class="el-icon-arrow-right" /></el-button>
      <el-button type="primary" style="margin: 20px 0 0 0" @click="decodeBase64"><i class="el-icon-arrow-left" />BASE64解码</el-button>
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Base64：</span>
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
export default {
  name: 'Base64',
  data() {
    return {
      textInput: '',
      textOuput: ''
    }
  },
  methods: {
    decodeBase64() {
      this.textInput = window.atob(this.textOuput)
    },
    encodeBase64() {
      this.textOuput = window.btoa(this.textInput)
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
