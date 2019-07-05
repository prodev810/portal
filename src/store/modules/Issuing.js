import Vue from 'vue'
import {
  ISSUING_GET_ACCOUNT_REQUEST,
  MUTATE_ISSUING_ACCOUNT_REQUEST,
  ISSUING_GET_APPS_OVERVIEW,
  MUTATE_ISSUING_APPS_OVERVIEW,
  ISSUING_GET_CARD_REQUEST,
  MUTATE_ISSUING_CARD_REQUEST,
  MUTATE_ISSUING_LOADINGSTATE,
  ISSUING_PUT_CARD_REQUEST,
  ISSUING_PUT_ACCOUNT_REQUEST,
  GETTER_ISSUING_LOADINGSTATE,
  GETTER_ISSUING_APPS_INFO,
  GETTER_ISSUING_APPS_PAGEMETA,
  GETTER_ISSUING_ACCOUNT,
  GETTER_ISSUING_ACCOUNT_INFO,
  GETTER_ISSUING_CARD,
  GETTER_ISSUING_CARD_INFO,
} from '../types'
import LOADING_STATE from '../../utils/loadingState'

const state = {
  issuingApps: [],
  issuingAccount: [],
  issuingCard: [],
  loadingState: LOADING_STATE.IDEAL,
}

const mutations = {
  [MUTATE_ISSUING_APPS_OVERVIEW]: (state, {data}) => state.issuingApps = data,
  [MUTATE_ISSUING_CARD_REQUEST]: (state, {data}) => state.issuingCard = data,
  [MUTATE_ISSUING_ACCOUNT_REQUEST]: (state, {data}) => state.issuingAccount = data,
  [MUTATE_ISSUING_LOADINGSTATE]: (state, loadingState) => state.loadingState = loadingState,
}

const actions = {
  [ISSUING_GET_APPS_OVERVIEW]: async ({commit}, payload) => {
    try {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      const {data} = await Vue.prototype.$http.abahttp.get('v1/aba/issuing-apps-overview', {...payload})
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      commit(MUTATE_ISSUING_APPS_OVERVIEW, {data})
    } catch (e) {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('issuing apps overview', e)
    }
  },
  [ISSUING_GET_ACCOUNT_REQUEST]: async ({commit}, payload) => {
    try {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      // const {data} = await Vue.prototype.$http.abahttp.get(`v1/aba/issuing-apps/${payload}/account-requests`)
      const {data} = await Vue.prototype.$http.abahttp.get(`v1/aba/issuing-apps/account-requests/${payload}`)
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('acc req', data)
      const response = data.accountRequests[0]
      commit(MUTATE_ISSUING_ACCOUNT_REQUEST, {data: response})
    } catch (e) {
      console.log('issuing account request', e)
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
    }
  },
  [ISSUING_GET_CARD_REQUEST]: async ({commit}, payload) => {
    try {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      // const {data} = await Vue.prototype.$http.abahttp.get(`v1/aba/issuing-apps/${payload}/card-requests`)
      const {data} = await Vue.prototype.$http.abahttp.get(`v1/aba/issuing-card-request/${payload}`)
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('issuing card request', data)
      commit(MUTATE_ISSUING_CARD_REQUEST, {data: data.cardRequests})
    } catch (e) {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('issuing card request', e)
    }
  },
  [ISSUING_PUT_CARD_REQUEST]: async ({commit}, payload) => {
    try {
      const req = payload.body
      const {data} = await Vue.prototype.$http.abahttp.put(`v1/aba/issuing-card-request/${payload.id}`, req)
      //console.log('issuing put card request', {data})
    } catch (e) {
      console.log('issuing put card request', e)
    }
  },
  [ISSUING_PUT_ACCOUNT_REQUEST]: async ({commit}, payload) => {
    //console.log('issuing put account request', payload)
    try {
      const req = payload.body
      const {data} = await Vue.prototype.$http.abahttp.put(`v1/aba/issuing-account-request/${payload.id}`, req)
      //console.log('issuing put account request', {data})
    } catch (e) {
      console.log('issuing put account request', e)
    }
  },
}

const getters = {
  [GETTER_ISSUING_LOADINGSTATE]: state => state.loadingState,
  [GETTER_ISSUING_APPS_INFO]: state => state.issuingApps.infos,
  [GETTER_ISSUING_APPS_PAGEMETA]: state => state.issuingApps.pageMeta,
  [GETTER_ISSUING_ACCOUNT]: state => state.issuingAccount,
  [GETTER_ISSUING_CARD]: state => state.issuingCard,
}

const issuing = {
  state,
  actions,
  mutations,
  getters,
}

export default issuing
