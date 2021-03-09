<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: left;margin-bottom: 20px">
          <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
          <el-button type="primary" :loading="uploadLoading" size="mini" @click="uploadExcel">导入数据Excel</el-button>
          <el-button type="primary" :loading="downloadLoading" size="mini" @click="downloadDefaultExcel">下载模板Excel</el-button>
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
import { export_json_to_excel } from '@/vendor/Export2Excel'
import XLSX from 'xlsx'
export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      tableHeader: [],
      excelTitles: {
        index: 'No',
        text: 'text',
        world: 'world',
        qrcode: 'qrcode'
      },
      uploadLoading: false,
      downloadLoading: false,
      excelData: {
        header: null,
        results: null
      },
      loading: false
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.uploadLoading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          this.tableData = XLSX.utils.sheet_to_json(worksheet)
          this.uploadLoading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    uploadExcel() {
      this.$refs['excel-upload-input'].click()
    },
    downloadDefaultExcel() {
      this.toExcel()
    },
    toExcel() {
      this.downloadLoading = true
      const tHeader = Object.values(this.excelTitles)
      const filterVal = Object.keys(this.excelTitles)
      const list = this.tableData
      const data = this.formatJson(filterVal, list)
      export_json_to_excel({
        header: tHeader,
        data,
        filename: 'export_default_template',
        title: ''
      })
      this.downloadLoading = false
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
  .excel-upload-input{
    display: none;
    z-index: -9999;
  }
</style>
