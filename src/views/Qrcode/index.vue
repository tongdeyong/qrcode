<template>
  <div style="text-align: center">
    <el-container>
      <el-main>
        <el-tabs v-model="activeName">
          <el-tab-pane label="生成二维码" name="first">
            <QrcodeCreate />
          </el-tab-pane>
          <el-tab-pane label="批量生成二维码" name="third">
            <QrcodeFordize />
          </el-tab-pane>
          <el-tab-pane label="识别二维码" name="second">
            <QrcodeAnalysis />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import QrcodeCreate from './Create'
import QrcodeAnalysis from './Analysis'
import QrcodeFordize from './Fordize'
export default {
  name: 'Qrcode',
  components: {
    QrcodeCreate,
    QrcodeAnalysis,
    QrcodeFordize
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style scoped>

</style>
