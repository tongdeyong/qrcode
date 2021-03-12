<template>
  <div style="text-align: center">
    <el-container>
      <el-main>
        <el-tabs v-model="activeName">
          <el-tab-pane label="BASE64" name="first">
            <Base64 />
          </el-tab-pane>
          <el-tab-pane label="图片/BASE64转换" name="third">
            <Pic2Bs64 />
          </el-tab-pane>
          <el-tab-pane label="MD5" name="fourth">
            <MD5 />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Base64 from '@/views/Encrypt/Base64/index'
import MD5 from '@/views/Encrypt/MD5/index'
import Pic2Bs64 from '@/views/Encrypt/Pic2Bs64/index'
export default {
  name: 'Encrypt',
  components: { Pic2Bs64, Base64, MD5 },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style scoped>

</style>
