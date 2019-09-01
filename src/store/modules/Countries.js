import Vue from 'vue'
import i18n from '@/i18n'
import {
  SHOW_TOAST_MESSAGE,
  MUTATE_SET_COUNTRIES,
  ACTION_GET_COUNTRIES,
  GETTER_GET_COUNTRY_BY_CODE
} from '@/store/types.js'

const state = {
  countries: []
}

const mutations = {
  [MUTATE_SET_COUNTRIES]: (state, data) => {
    state.countries = data
  }
}

const actions = {
  [ACTION_GET_COUNTRIES]: async ({state, commit, dispatch}, payload) => {
    try {
      // Load countries only once
      if (state.countries.length === 0) {
        let response = await Vue.prototype.$http.aba1.get(`/program-mgnt/country-codes`)
        commit(MUTATE_SET_COUNTRIES, response.data)  
      }
    } catch (error) {
      dispatch(SHOW_TOAST_MESSAGE, {
        message: error && error.data && error.data.detail ? error.data.detail : i18n.t('store.countries.error_load_countries'),
        status: 'danger'
      })
    }
  }
}

const getters = {
  [GETTER_GET_COUNTRY_BY_CODE]: state => (code) => {
    let res = state.countries.find(x => x.alpha2Code === code)
    return res
      ? res.name
      : (i18n.t('store.countries.unknown_country') + code)
  }
}

const countries = {
  state,
  actions,
  mutations,
  getters
}

export default countries
