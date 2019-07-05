import Vue from 'vue';
import i18n from '@/i18n'
import {
  SHOW_TOAST_MESSAGE,
  MUTATE_PG_CURRENCIES,
  MUTATE_PG_COUNTRIES,
  MUTATE_PG_PAYMENT_METHODS,
  MUTATE_PG_MERCHANTS,
  GETTER_PG_CURRENCIES,
  GETTER_PG_COUNTRIES,
  GETTER_PG_PAYMENT_METHODS,
  ACTION_PG_GET_CURRENCIES,
  ACTION_PG_GET_COUNTRIES,
  ACTION_PG_GET_PAYMENT_METHODS,
  ACTION_PG_SET_PAYMENT_METHOD,
  ACTION_PG_GET_MERCHANTS
} from '../types';

const state = {
  currencies: [],
  countries: [],
  paymentMethod: [],
  merchants: []
}

const mutations = { 
  [MUTATE_PG_CURRENCIES]: (state, {data}) => {
    state.currencies = data
  },
  [MUTATE_PG_COUNTRIES]: (state, {data}) => {
    state.countries = data
  },
  [MUTATE_PG_PAYMENT_METHODS]: (state, {data}) => {
    state.paymentMethod = data
  },
  [MUTATE_PG_MERCHANTS]: (state, data) => {
    state.merchants = data
  }
}

const actions = {
  [ACTION_PG_GET_CURRENCIES]: async ({commit, dispatch}) => {
    try {
      const { data } = await Vue.prototype.$http.acchttp.get('/currencies')
      commit(MUTATE_PG_CURRENCIES, { data });
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_currencies') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_COUNTRIES]: async ({commit, dispatch}) => {
    try {
      const { data } = await Vue.prototype.$http.acchttp.get('/countries')
      commit(MUTATE_PG_COUNTRIES, { data });
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_countries') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_PAYMENT_METHODS]: async ({commit, dispatch}) => {
    try {
      const { data } = await Vue.prototype.$http.acchttp.get('/methods')
      commit(MUTATE_PG_PAYMENT_METHODS, { data });
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_payment_methods') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_SET_PAYMENT_METHOD]: async ({commit, dispatch}, data) => {
    try {
      await Vue.prototype.$http.acchttp.put(`/method/${data.code}`, data)
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_set_payment_method') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_MERCHANTS]: async ({commit, dispatch}) => {
    try {
      //await Vue.prototype.$http.acchttp.put(`/method/${data.code}`, data)
      commit(MUTATE_PG_MERCHANTS, [
        { merchant_name: 'ABC Merchant', short_code: 'ABC', merchant_id: 'xxxx-xxxx-xxxx' },
        { merchant_name: 'EUROPE Merchant', short_code: 'EUM', merchant_id: 'yyyy-yyyy-yyyy-yyyy' }
      ])
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_get_merchants') + e.message, status: 'danger' })
    }
  }
}

const getters = {
  [GETTER_PG_CURRENCIES]: state => state.currencies,
  [GETTER_PG_COUNTRIES]: state => state.countries,
  [GETTER_PG_PAYMENT_METHODS]: state => state.paymentMethod
}

const paymentGateway = {
  state,
  actions,
  getters,
  mutations
}

export default paymentGateway
