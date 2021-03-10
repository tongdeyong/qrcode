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
            <div style="margin-top:30px">
              <el-button type="primary" :loading="loading" size="mini" @click="createQrcodeImg">生成二维码</el-button>
            </div>
          </el-main>
          <el-aside width="400px" style="text-align: left">
            <el-form ref="setting" :model="setting" :rules="rules">
              <el-form-item label="尺寸：" label-width="80px" prop="size">
                <el-input v-model.number="setting.size" clearable />
              </el-form-item>
              <el-form-item label="颜色：" label-width="80px">
                <el-color-picker v-model="setting.color" />
              </el-form-item>
              <el-form-item label="图标：" label-width="80px">
                <el-radio-group v-model="setting.radio">
                  <el-radio :label="3">不要</el-radio>
                  <el-radio :label="6">文字</el-radio>
                  <el-radio :label="9">上传图片</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="setting.radio===6" label="文字：" label-width="80px">
                <el-input v-model.number="setting.world" clearable placeholder="二维码中间的文字" />
              </el-form-item>
              <el-form-item v-if="setting.radio===6" label="文字颜色：" label-width="90px">
                <el-color-picker v-model="setting.worldColor" />
              </el-form-item>
              <el-form-item v-if="setting.radio===9" label="图片：" label-width="80px">
                <el-input v-model.number="setting.picture" type="file" />
              </el-form-item>
            </el-form>
          </el-aside>
        </el-container>
        <div style="text-align: left">
          <h4>历史记录如下：</h4>
          <div
            v-for="(imgItem,index) in qrcodeList"
            :key="index"
            class="qrcodeImg"
          >
            <el-image
              style="width: 100%;height: 100%"
              :src="imgItem.url"
              :preview-src-list="srcList"
              fit="scale-down"
            />
            <div style="padding: 14px;">
              <span>{{ imgItem.name }}</span>
              <div class="bottom">
                <span class="time">{{ imgItem.time }}</span>
                <el-link type="primary" class="button" :href="imgItem.url" :download="imgItem.name" :underline="false">下载</el-link>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <canvas style="display: none" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      activeName: 'second',
      form: {},
      loading: false,
      opts: {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        quality: 0.3,
        margin: 1,
        width: 200,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      },
      setting: {
        size: 200,
        color: '#000000',
        radio: 3,
        worldColor: '#000000',
        world: '',
        picture: ''
      },
      rules: {
        size: [
          { required: true, message: '务必填写尺寸', trigger: 'blur' },
          { type: 'number', message: '务必尺寸大于100', min: 100, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['qrcodeList', 'srcList'])
  },
  methods: {
    createQrcodeImg() {
      this.loading = true
      const data = this.form.url || this.form.text || '请先输入文本或网址'
      this.$refs['setting'].validate((valid) => {
        if (valid) {
          this.opts.width = this.setting.size
          this.opts.color.dark = this.setting.color
          /* QRCode.toDataURL(data, this.opts).then(url => {
            this.$store.dispatch('qrcode/addImg', url)
            this.loading = false
          })*/
          if (this.setting.radio === 6) {
            this.$store.dispatch('qrcode/createQrcodeWithWorld', {
              text: data,
              opts: this.opts,
              width: 200,
              height: 200,
              world: this.setting.world,
              color: this.setting.color })
            this.loading = false
          }
        }
      })
    },
    handLeave() {
      this.form = {}
    },
    convertImageToCanvas(image) {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      canvas.getContext('2d').drawImage(image, 0, 0)
      return canvas
    },
    convertCanvasToImage(canvas) {
      const image = new Image()
      image.src = canvas.toDataURL('image/png')
      return image
    }
  }
}
</script>

<style scoped>
.qrcodeImg {
  width: 200px;
  display: inline-block;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgba(0 0 0 0.1);
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button {
  padding: 0;
  min-height: auto;
}
.time {
  font-size: 13px;
  color: #999;
}
.el-form {
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0 0 0 0.1);
  padding: 10px;
}
</style>
