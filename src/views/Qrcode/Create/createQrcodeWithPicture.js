import QRCode from 'qrcode'
/**
 * 创建带文字的二维码
 * @param text
 * @param opts
 * @param width
 * @param height
 * @param world
 * @param color
 */
export function createQrcodeWithWorld(text, opts, width, height, world, color) {
  const x = width * 0.4
  const y = height * 0.4
  const lw = width * 0.2
  const lh = height * 0.2
  const canves = document.createElement('canvas')
  canves.width = width
  canves.height = height
  QRCode.toCanvas(canves, text, opts, (error) => {
    if (error) {
      console.log(error)
      return
    }
    const image = createImageByWorld(world, width, height, color)
    new Promise((resolve, reject) => {
      image.onload = () => {
        console.log(1)
        resolve()
      }
    }).then(() => {
      console.log(2)
      const ctx = canves.getContext('2d')
      ctx.drawImage(image, x, y, lw, lh)
      const url = canves.toDataURL('image/png')
      console.log(url)
      return url
    })
  })
}

/**
 * 创建文字图片
 * @param world
 * @param width
 * @param height
 * @param color
 * @returns {HTMLImageElement}
 */
export function createImageByWorld(world, width, height, color) {
  const canves = document.createElement('canvas')
  canves.width = width * 0.3
  canves.height = height * 0.3
  const ctx = canves.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canves.width, canves.height)
  ctx.font = 'bold 40px/45px 幼圆'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.fillText(world, canves.width / 2, canves.height / 2)
  const image = new Image()
  image.src = canves.toDataURL('image/png')
  return image
}
