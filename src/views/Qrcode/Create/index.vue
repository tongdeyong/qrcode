<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-container>
          <el-main>
            <el-tabs v-model="activeName" type="border-card" :before-leave="handLeave">
              <el-tab-pane label="文本" name="first">
                <el-input v-model="form.text" type="textarea" placeholder="输入文字内容" />
              </el-tab-pane>
              <el-tab-pane label="网址" name="second">
                <el-input v-model="form.url" type="textarea" placeholder="输入网址" />
              </el-tab-pane>
            </el-tabs>
            <div style="margin-top: 50px">
              <el-button type="primary" :loading="loading" @click="createQrcodeImg">生成二维码</el-button>
            </div>
          </el-main>
          <el-aside width="200px">
            <div class="qrcodeImg">
              <img :src="qrcodeUrl" alt="二维码">
            </div>
            <div class="qrcodeButton">
              <a class="btn btn-default" :href="qrcodeUrl" :download="download">下载</a>
            </div>
          </el-aside>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'Index',
  data() {
    return {
      activeName: 'second',
      form: {},
      qrcodeUrl: '',
      loading: false,
      download: 'qrcode.png',
      opts: {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }
    }
  },
  created() {
    this.createQrcodeImg()
  },
  methods: {
    createQrcodeImg() {
      this.loading = true
      const data = this.form.url || this.form.text || '请先输入文本或网址'
      QRCode.toDataURL(data, this.opts).then(url => {
        this.qrcodeUrl = url
        console.log(this.qrcodeUrl)
        this.loading = false
      })
    },
    handLeave() {
      this.form = {}
    }
  }
}
</script>

<style scoped>
.qrcodeImg {
  width: 200px;
  height: 200px;
  background-color: #eaecef;
}
img {
  width: 200px;
  border: #eaecef 1px solid;
}
.qrcodeButton {
  margin-top: 10px;
}
</style>
