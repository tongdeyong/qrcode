import moment from 'moment'

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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
