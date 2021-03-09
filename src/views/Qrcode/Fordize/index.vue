<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: left;margin-bottom: 20px">
          <el-button type="primary" :loading="downloadLoading" @click="uploadExcel">导入数据Excel</el-button>
          <el-button type="primary" :loading="downloadLoading" @click="downloadDefaultExcel">下载模板Excel</el-button>
          <span style="margin-left: 20px;color: #aaa">请务必按照模板中的格式填写资料</span>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          border
          stripe
          fit
        >
          <el-table-column label="No." type="index" align="center" />
          <el-table-column label="内容" prop="text" align="center" />
          <el-table-column label="文字" prop="world" align="center" />
          <el-table-column label="二维码" prop="qrcode" align="center" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      excelTitles: {
        index: '序号',
        text: '内容',
        world: '文字',
        qrcode: '二维码'
      },
      downloadLoading: false
    }
  },
  created() {
  },
  methods: {
    uploadExcel() {

    },
    downloadDefaultExcel() {
      this.toExcel()
    },
    toExcel() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = Object.values(this.excelTitles)
        const filterVal = Object.keys(this.excelTitles)
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '二维码导入模板',
          title: '二维码导入模板'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === 'index') {
            return (i + 1)
          } else {
            return v[j]
          }
        })
      )
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
