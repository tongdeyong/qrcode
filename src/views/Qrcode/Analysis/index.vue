<template>
  <div>
    <div class="img-div">
      <div class="img">
        <img v-if="!!imgSrc" id="showPic" :src="imgSrc" alt="待解析图片">
      </div>
      <el-button type="primary" size="mini" @click="choosePictrue">选择二维码图片</el-button>
      <input id="upload-input" type="file" accept="image/jpg, image/png" @change="hasChoosePictrue">
      <canvas style="display: none" />
      <p style="color: #aaa;margin-top: 10px">二维码图片格式只能为：jpg或png</p>
    </div>
    <div class="img-div result">{{ fileOutput }}</div>
  </div>
</template>

<script>
import jsQR from 'jsqr'

export default {
  name: 'Index',
  data() {
    return {
      imgSrc: '',
      fileInput: '',
      fileOutput: ''
    }
  },
  methods: {
    choosePictrue() {
      document.getElementById('upload-input').click()
    },
    hasChoosePictrue() {
      const fileInput = document.getElementById('upload-input')
      this.imgSrc = URL.createObjectURL(fileInput.files[0])
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      const image = new Image()
      image.src = this.imgSrc
      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        const imageData = ctx.getImageData(0, 0, image.width, image.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)
        this.fileOutput = code ? code.data : '无法识别'
      }
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
