import Vue from 'vue';
import i18n from '@/i18n'
import {
  SHOW_TOAST_MESSAGE,
  MUTATE_PG_CURRENCIES,
  MUTATE_PG_COUNTRIES,
  MUTATE_PG_PAYMENT_METHODS,
  GETTER_PG_CURRENCIES,
  GETTER_PG_COUNTRIES,
  GETTER_PG_PAYMENT_METHODS,
  ACTION_PG_GET_CURRENCIES,
  ACTION_PG_GET_COUNTRIES,
  ACTION_PG_GET_PAYMENT_METHODS,
  ACTION_PG_SET_PAYMENT_METHOD
} from '../types';

const state = {
  currencies: [],
  countries: [],
  paymentMethod: []
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
  }
}

const actions = {
  [ACTION_PG_GET_CURRENCIES]: async ({commit, dispatch}) => {
    try {
      const { data } = await Vue.prototype.$acchttp.get('/currencies')
      commit(MUTATE_PG_CURRENCIES, { data });
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_currencies') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_COUNTRIES]: async ({commit, dispatch}) => {
    try {
      const { data } = await Vue.prototype.$acchttp.get('/countries')
      commit(MUTATE_PG_COUNTRIES, { data });
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_countries') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_PAYMENT_METHODS]: async ({commit, dispatch}) => {
    try {
      const { data } = await Vue.prototype.$acchttp.get('/methods')
      commit(MUTATE_PG_PAYMENT_METHODS, { data });
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_payment_methods') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_SET_PAYMENT_METHOD]: async ({commit, dispatch}, data) => {
    try {
      await Vue.prototype.$acchttp.put(`/method/${data.code}`, data)
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_set_payment_method') + e.message, status: 'danger' })
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
