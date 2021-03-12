<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>明文：</span>
        </div>
      </template>
      <div class="textItem">
        <MyImage :width="180" :height="180" :img-src="imgSrc" @getImageSrc="getImageSrc" />
      </div>
    </el-card>
    <div class="div-space">
      <el-button type="primary" style="width: 100px" @click="pic2base64">转 码<i class="el-icon-arrow-right" /></el-button>
      <el-button type="primary" style="margin: 20px 0 0 0;width: 100px" @click="base642pic"><i class="el-icon-arrow-left" />转图片</el-button>
      <el-button type="primary" style="margin: 20px 0 0 0;width: 100px" @click="cleanAll">清空</el-button>
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
          placeholder="请输入图片的base64"
        /></div>
    </el-card>
  </div>
</template>

<script>
import MyImage from '@/components/MyImage'
export default {
  name: 'Pic2Bs64',
  components: { MyImage },
  data() {
    return {
      textInput: '',
      textOuput: '',
      src: '',
      imgSrc: ''
    }
  },
  methods: {
    cleanAll() {
      this.textOuput = ''
      this.src = ''
      this.imgSrc = ''
    },
    base642pic() {
      this.imgSrc = this.textOuput
    },
    pic2base64() {
      const image = new Image()
      image.src = this.src
      image.onload = () => {
        this.textOuput = this.getBase64Image(image)
      }
    },
    getImageSrc(src) {
      this.src = src
    },
    getBase64Image(img) {
      const canvas = this.img2canvas(img)
      return canvas.toDataURL('image/png')
    },
    img2canvas(img) {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      return canvas
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
  margin: 70px 20px;
  vertical-align: top;
  height: 160px;
  width: 137px;
}
.textItem{
  height: 180px;
}
</style>
