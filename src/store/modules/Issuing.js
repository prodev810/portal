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
  ISSUING_ACCOUNT_REQUEST,
  ISSUING_CARD_REQUEST,
  GETTER_ISSUING_LOADINGSTATE,
  GETTER_ISSUING_APPS_INFO,
  GETTER_ISSUING_APPS_PAGEMETA,
  GETTER_ISSUING_ACCOUNT,
  GETTER_ISSUING_CARD,
  ISSUING_SINGLE_SUBMIT,
  ISSUING_BATCH_SUBMIT,
  ISSUING_GET_APPS_STATUSES,
  MUTATE_ISSUING_APPS_STATUSES,
  GETTER_ISSUING_APPS_STATUSES,
} from '../types'
import LOADING_STATE from '../../utils/loadingState'

const state = {
  issuingApps: [],
  issuingAccount: [],
  issuingCard: [],
  issuingAppStatuses: [],
  loadingState: LOADING_STATE.IDEAL,
}

const mutations = {
  [MUTATE_ISSUING_APPS_OVERVIEW]: (state, {data}) => state.issuingApps = data,
  [MUTATE_ISSUING_CARD_REQUEST]: (state, {data}) => state.issuingCard = data,
  [MUTATE_ISSUING_ACCOUNT_REQUEST]: (state, {data}) => state.issuingAccount = data,
  [MUTATE_ISSUING_LOADINGSTATE]: (state, loadingState) => state.loadingState = loadingState,
  [MUTATE_ISSUING_APPS_STATUSES]: (state, {data}) => state.issuingAppStatuses = data,
}

const actions = {
  [ISSUING_GET_APPS_OVERVIEW]: async ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.abahttp.get('v1/aba/issuing-apps-overview', {...payload})
        .then(data => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          commit(MUTATE_ISSUING_APPS_OVERVIEW, {data: data.data})
          resolve(data.data)
        })
        .catch(error => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          reject(error)
        })
    })
  },
  [ISSUING_ACCOUNT_REQUEST]: async ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.abahttp.post(`v1/aba/issuing-apps/${payload}/account-requests`)
        .then(data => {
          resolve(data.data)
        })
        .catch(error => reject(error))
    })
  },
  [ISSUING_CARD_REQUEST]: async ({commit}, payload) => {
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.abahttp.post(`v1/aba/issuing-apps/${payload}/card-requests`)
        .then(data => {
          resolve(data.data)
        })
        .catch(error => reject(error))
    })
  },
  [ISSUING_GET_ACCOUNT_REQUEST]: async ({commit}, payload) => {
    commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.abahttp.get(`v1/aba/issuing-account-request/${payload}`)
        .then(data => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          commit(MUTATE_ISSUING_ACCOUNT_REQUEST, {data: data.data})
          resolve(data.data)
        })
        .catch(error => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          console.log('issuing account request', error)
          reject(error)
        })
    })
  },
  [ISSUING_GET_CARD_REQUEST]: async ({commit}, payload) => {
    try {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      const data = await Vue.prototype.$http.abahttp.get(`v1/aba/issuing-card-request/${payload}`)
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('card', data.data)
      commit(MUTATE_ISSUING_CARD_REQUEST, {data: data.data})
    } catch (e) {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('issuing card request', e)
    }
  },
  [ISSUING_PUT_CARD_REQUEST]: async ({commit}, payload) => {
    commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
    const req = payload.body
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.abahttp.put(`v1/aba/issuing-card-request/${payload.id}`, req)
        .then(data => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          resolve(data.data)
        })
        .catch(error => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          const errObj = JSON.stringify(error)
          reject(JSON.parse(errObj).response.data)
        })
    })
  },
  [ISSUING_PUT_ACCOUNT_REQUEST]: async ({commit}, payload) => {
    commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
    const req = payload.body
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.abahttp.put(`v1/aba/issuing-account-request/${payload.id}`, req)
        .then(data => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          resolve(data.data)
        })
        .catch(error => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          const errObj = JSON.stringify(error)
          reject(JSON.parse(errObj).response.data)
        })
    })
  },
  [ISSUING_SINGLE_SUBMIT]: async ({commit}, payload) => {
    try {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      // const data = await Vue.prototype.$http.abahttp.post(`v1/aba/issuing-apps/${payload}/single-submit`)
      const data = await Vue.prototype.$http.abahttp.post(`v1/aba/issuing-apps/${payload}/single-submit`, {id:payload})
      console.log('singe submit', {data})
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
    } catch (e) {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('issuing single submit', e)
    }
  },
  [ISSUING_BATCH_SUBMIT]: async ({commit}, payload) => {
    commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
    return new Promise((resolve, reject)  => {
      Vue.prototype.$http.abahttp.post(`v1/aba/issuing-apps/batch-submit`,{issuingAppIds:payload})
        .then(data => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          resolve(data)
        })
        .catch(error => {
          commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
          const errObj = JSON.stringify(error)
          reject(JSON.parse(errObj).response.data)
        })
    })
    /*try {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      const data = await Vue.prototype.$http.abahttp.post(`v1/aba/issuing-apps/batch-submit`,{issuingAppIds:payload})
      console.log('batch submit', {data})
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
    } catch (e) {
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('issuing batch submit', e)
    }*/
  },
  [ISSUING_GET_APPS_STATUSES]: async ({commit}) => {
    try{
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.GETTING)
      const data = await Vue.prototype.$http.abahttp.get(`v1/aba/issuing-application-statuses`)
      commit(MUTATE_ISSUING_APPS_STATUSES, {data: data.data})
      console.log('issuing get app statuses', data.data)
    }catch(e){
      commit(MUTATE_ISSUING_LOADINGSTATE, LOADING_STATE.IDEAL)
      console.log('issuing get app statuses', e)
    }
  },
}

const getters = {
  [GETTER_ISSUING_LOADINGSTATE]: state => state.loadingState,
  [GETTER_ISSUING_APPS_INFO]: state => state.issuingApps.infos,
  [GETTER_ISSUING_APPS_PAGEMETA]: state => state.issuingApps.pageMeta,
  [GETTER_ISSUING_ACCOUNT]: state => state.issuingAccount,
  [GETTER_ISSUING_CARD]: state => state.issuingCard,
  [GETTER_ISSUING_APPS_STATUSES]: state => {
    return [
      {name: '', description: 'All'},
      ...state.issuingAppStatuses
    ]
  },
}

const issuing = {
  state,
  actions,
  mutations,
  getters,
}

export default issuing
