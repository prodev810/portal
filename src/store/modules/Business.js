import Vue from 'vue'
import {
  MUTATE_ISSUING_LOADINGSTATE,
  BUSINESS_RESELLER_CODE_LIST,
  MUTATE_BUSINESS_RESELLER_CODE_LIST,
  GETTER_BUSINESS_RESELLER_CODE_LIST,

} from '../types'
import LOADING_STATE from '../../utils/loadingState'

const state = {
  resellerCodeList: [],
  loadingState: LOADING_STATE.IDEAL,
}

const mutations = {
  [MUTATE_BUSINESS_RESELLER_CODE_LIST]: (state, {data}) => state.resellerCodeList = data,
  [MUTATE_ISSUING_LOADINGSTATE]: (state, loadingState) => state.loadingState = loadingState,
}

const actions = {
  [BUSINESS_RESELLER_CODE_LIST]: async ({commit}) => {
    try {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      const {data} = await Vue.prototype.$http.aba1.get('/program-mgnt/reseller-codes/')
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      commit(MUTATE_BUSINESS_RESELLER_CODE_LIST, {data})
    } catch (e) {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
    }
  },
}

const getters = {
  [GETTER_BUSINESS_RESELLER_CODE_LIST]: state => {
    const codeList = state.resellerCodeList.map(({resellerCode}) => {
      return {name: resellerCode, value: resellerCode}
    })
    return [{name: "All", value: ''}, ...codeList]
  },
}

const business = {
  state,
  actions,
  mutations,
  getters,
}

export default business
