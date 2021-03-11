
const createImageByWorld = (world, size, color) => {
  const canves = document.createElement('canvas')
  canves.width = size * 0.3
  canves.height = size * 0.3
  const ctx = canves.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canves.width, canves.height)
  ctx.font = 'bold ' + size * 0.2 + 'px 幼圆'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color || '#000000'
  ctx.fillText(world, canves.width / 2, canves.height / 2)
  const image = new Image()
  image.src = canves.toDataURL('image/png')
  return image
}

export default createImageByWorld
