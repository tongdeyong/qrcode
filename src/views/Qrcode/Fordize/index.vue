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
          <el-table-column label="二维码" align="center">
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.url"
                fit="fit"
                :preview-src-list="srcList"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-link :href="scope.row.url" type="primary" target="_blank" :download="scope.row.world + '.png'">下载</el-link>
            </template>
          </el-table-column>
        </el-table>
        <p style="text-align: left; margin: 20px 10px">
          批量生成得二维码得大小默认为：200 x 200px;<br>
          二维码中间不显示文字时，不填写文字栏
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { export_json_to_excel } from '@/vendor/Export2Excel'
import createImageByWorld from '@/utils/createPicture'
import XLSX from 'xlsx'
import QRCode from 'qrcode'
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
      loading: false,
      srcList: []
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
          this.createQrcodeFormData(this.tableData)
          this.uploadLoading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    createQrcodeFormData(data) {
      data.map(item => {
        const canves = document.createElement('canvas')
        canves.width = 200
        canves.height = 200
        QRCode.toCanvas(canves, item.text, {
          errorCorrectionLevel: 'M',
          type: 'image/png',
          quality: 0.3,
          margin: 1,
          width: 200,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        }, (error) => {
          if (error) {
            console.log(error)
            return
          }
          if (item.world) {
            const image = createImageByWorld(item.world, 200)
            image.onload = () => {
              const ctx = canves.getContext('2d')
              ctx.drawImage(image, 80, 80, 40, 40)
              item.url = canves.toDataURL('image/png')
              this.srcList.push(item.url)
            }
          }
        })
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
      const list = []
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
