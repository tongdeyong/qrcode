import moment from 'moment'
import QRCode from 'qrcode'
import createImageByWorld from '@/utils/createPicture'

const state = {
  qrcodeList: [],
  srcList: []
}
const mutations = {
  ADDIMG: (state, url) => {
    state.qrcodeList.unshift({
      url: url,
      name: (state.qrcodeList.length + 1) + '.png',
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    state.srcList.unshift(url)
  }
}
const actions = {
  addImg({ commit }, url) {
    commit('ADDIMG', url)
  },
  createQrcodeWithWorld({ commit }, { text, opts, size, world, color, picture }) {
    const x = size * 0.4
    const y = size * 0.4
    const lw = size * 0.2
    const lh = size * 0.2
    const canves = document.createElement('canvas')
    canves.width = size
    canves.height = size
    QRCode.toCanvas(canves, text, opts, (error) => {
      if (error) {
        console.log(error)
        return
      }
      if (world || picture) {
        let image
        if (world) {
          image = createImageByWorld(world, size, color)
        } else {
          image = new Image()
          image.src = picture
        }
        image.onload = () => {
          const ctx = canves.getContext('2d')
          ctx.drawImage(image, x, y, lw, lh)
          commit('ADDIMG', canves.toDataURL('image/png'))
        }
      } else {
        commit('ADDIMG', canves.toDataURL('image/png'))
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
