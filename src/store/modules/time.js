const state = {
  timeList: []
}
const mutations = {
  ADDTIMELIST: (state, item) => {
    state.timeList.unshift(item)
  }
}
const actions = {
  addItem({ commit }, item) {
    commit('ADDTIMELIST', item)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
