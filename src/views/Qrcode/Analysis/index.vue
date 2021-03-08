<template>
  <div>
    <div class="img-div">
      <div class="img">
        <img v-if="!!imgSrc" :src="imgSrc" alt="待解析图片">
      </div>
      <el-button type="primary" @click="choosePictrue">选择上传图片</el-button>
      <input id="upload-input" type="file" accept="image/gif, image/jpg, image/png" @change="choosePictrue">
    </div>
    <div class="img-div result">
      输出
    </div>
  </div>
</template>

<script>
// import jsQR from 'jsqr'
export default {
  name: 'Index',
  data() {
    return {
      imgSrc: '',
      fileInput: ''
    }
  },
  methods: {
    choosePictrue() {
      const fileInput = document.getElementById('upload-input')
      console.log(fileInput.files[0])
      fileInput.click()
      this.imgSrc = window.URL.createObjectURL(fileInput.files[0])
    }
  }
}
</script>

<style scoped>
.img-div{
  width: 48%;
  margin: 10px 5px;
  border: #ddd 4px dashed;
  height: 460px;
  display: inline-block;
  vertical-align: middle;
}
img {
  max-width: 300px;
  max-height: 300px;
  margin: auto;
}
.img {
  width: 320px;
  height: 320px;
  margin: auto;
  padding: 10px;
}
.result {
  height: 460px;
  padding: 4px;
  margin: 0;
  resize: none;
  outline: 0;
  background: #fcfcfc;
  border: 1px solid #ddd;
}
.el-button{
  margin-top: 20px;
}
  #upload-input{
    display: none;
  }
</style>
