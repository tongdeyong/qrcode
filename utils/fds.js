const fs = require('fs')
const path = require('path')
const http = require('http')
const FormData = require('form-data')
const dir = fs.readdirSync(path.join(__dirname, '../dist'))
const versions = dir.toString()

const config = {
  host: '10.0.17.136',
  upload_path: '/upload.php'
}

let count = 0
let sum = 0
let max = {
  file: '',
  directory: '',
  size: 0
}
const files = getAllFile()

http.get('http://' + config.host + config.upload_path + '?action=delete', (res) => {
  const { statusCode } = res
  const contentType = res.headers['content-type']
  let error
  if (statusCode !== 200) {
    new Error('请求失败\n' + `状态码: ${statusCode}`)
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('无效的 content-type.\n' +
      `期望的是 application/json 但接收到的是 ${contentType}`)
  }
  if (error) {
    console.error(error.message)
    // 消费响应的数据来释放内存。
    res.resume()
    return
  }
  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => { rawData += chunk })
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData)
      console.log(parsedData)
      upload()
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(`出现错误: ${e.message}`)
})

function upload() {
  files.map(item => {
    sum += item.size
    if (item.size > max.size) {
      max = item
    }
    const form = new FormData()
    form.append('file', fs.createReadStream(item.file))
    form.append('directory', item.directory.substring(1))
    form.append('action', 'upload')
    const headers = form.getHeaders()
    const request = http.request({
      method: 'POST',
      host: config.host,
      port: 80,
      path: config.upload_path,
      headers: headers
    }, res => {
      let str = ''
      res.setEncoding('utf-8')
      res.on('data', chunk => {
        // 输出响应内容
        str += chunk
      })
      res.on('end', () => {
        const result = JSON.parse(str)
        console.log(result.data + '   ' + result.msg + '  ' + formatSize(result.size))
        count++
      })
    })
    form.pipe(request)
  })
}

const intravel = setInterval(function() {
  if (count >= files.length) {
    console.log('')
    console.log('version ：    ' + versions)
    console.log('max file：    ' + formatFileName(max))
    console.log('files count： ' + count)
    console.log('size total：  ' + formatSize(sum))
    console.log('')
    console.log('Upload successfully!')
    clearInterval(intravel)
  }
}, 1000)

function getAllFile() {
  const stack = dir
  const pathStack = []
  const result = []
  dir.map(item => pathStack.push([item]))

  while (stack.length > 0) {
    stack.pop()
    const curPath = pathStack.pop()
    let tempDir = ''
    curPath.map(item => {
      tempDir += '/' + item
    })
    const stats = fs.lstatSync(path.join(__dirname, `../dist${tempDir}`).replace(/\\/g, '/'))
    if (stats.isDirectory()) {
      const children = fs.readdirSync(path.join(__dirname, `../dist${tempDir}`).replace(/\\/g, '/'))
      children.map(item => {
        stack.push(item)
        const list = []
        curPath.map(item => list.push(item))
        list.push(item)
        pathStack.push(list)
      })
    } else {
      result.push(curPath)
    }
  }
  const resultFile = []
  result.map(item => {
    let tempDir = ''
    item.map(node => {
      tempDir += '/' + node
    })
    const file_path = path.join(__dirname, `../dist${tempDir}`).replace(/\\/g, '/')
    const file = fs.lstatSync(file_path)
    resultFile.push({
      file: file_path,
      directory: tempDir.substring(0, tempDir.lastIndexOf('/')),
      size: file.size
    })
  })
  return resultFile
}

function formatSize(size) {
  if (size > 1024 * 1024) {
    return Math.round(size * 100 / 1024 / 1024) / 100 + 'MB'
  } else if (size > 1024) {
    return Math.round(size * 100 / 1024) / 100 + 'KB'
  }
  return size + 'Byte'
}

function formatFileName(file) {
  const name = file.file.substring(file.file.lastIndexOf('/') + 1)
  return name + '       ' + formatSize(file.size)
}
