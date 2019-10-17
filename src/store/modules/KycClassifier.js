import Vue from 'vue'
import {
  SHOW_TOAST_MESSAGE,
  MUTATE_KYC_CLASSIFIER,
  ACTION_GET_KYC_CLASSIFIER,
  GETTER_GET_KYC_CLASSIFIER
} from '@/store/types.js'


const state = {
  kycClassifier: []
}
const actions = {
  [ACTION_GET_KYC_CLASSIFIER]: async function ({commit}, id) {
    try {
      const { data } = await Vue.prototype.$http.aba1.get(`/program-mgnt/cardprograms/${id}/kycs`)
      commit(MUTATE_KYC_CLASSIFIER, data)
    } catch (e) {
      commit(MUTATE_KYC_CLASSIFIER, [])
      dispatch(SHOW_TOAST_MESSAGE, {
        message: error && error.data && error.data.detail ? error.data.detail : i18n.t('store.countries.error_load_kyc_classifier'),
        status: 'danger'
      })
    }
  }
}
const mutations = {
  [MUTATE_KYC_CLASSIFIER]: function (state, data) {
    state.kycClassifier = data
  }

}
const getters = {
  [GETTER_GET_KYC_CLASSIFIER]: function (state) {
    return state.kycClassifier.map(value => {
      return {
        key: value,
        value
      }
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}