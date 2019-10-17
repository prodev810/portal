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
    ACTION_PG_GET_MERCHANTS,
    ACTION_PG_GET_SINGLE_MERCHANT,
    ACTION_PG_GET_FLOAT_ACCOUNT_SEARCH_BY_MERCHANT_ID,
    MUTATE_PG_FLOAT_ACCOUNTS,
    GETTER_PG_FLOAT_ACCOUNTS,
    ACTION_PG_CREATE_FLOAT_ACCOUNT,
    MUTATE_PG_ENV,
		GETTER_PG_ENV,
		MUTATE_PG_TRANSACTIONS,
		ACTION_PG_GET_TRANSACTIONS
} from '../types';

const PORTAL_PG_ENV = 'PORTAL_PG_ENV'

const getHttpInstance = (env) => {
  return env === 'sandbox' ? Vue.prototype.$http.acchttp : Vue.prototype.$http.acchttpLive
}

const state = {
  currencies: [],
  countries: [],
  paymentMethod: [],
  merchants: [],
	floatAccounts: [],
	transactions: {
		total: 0,
		items: []
	},
  env: window.sessionStorage.getItem(PORTAL_PG_ENV) || 'sandbox',
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
  },
  [MUTATE_PG_ENV]: (state, env) => {
    state.env = env
    window.sessionStorage.setItem(PORTAL_PG_ENV, env)
  },
  [MUTATE_PG_MERCHANTS]: (state, data) => {
    state.merchants = data
  },
  [MUTATE_PG_FLOAT_ACCOUNTS]: (state, data) => {
    state.floatAccounts = data.content || []
	},
	[MUTATE_PG_TRANSACTIONS]: (state, data) => {
    state.transactions = data || []
  }
}

const actions = {
  [ACTION_PG_GET_CURRENCIES]: async ({commit, dispatch, state}) => {
    try {
      // const { data } = await Vue.prototype.$http.acchttpLive.get('/currencies');
      const { data } = await getHttpInstance(state.env).get('/currencies');

      commit(MUTATE_PG_CURRENCIES, { data });
    } catch (e) {
      commit(MUTATE_PG_CURRENCIES, {data: []});
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_currencies') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_COUNTRIES]: async ({commit, dispatch, state}) => {
    try {
      // const { data } = await Vue.prototype.$http.acchttpLive.get('/countries')
      const { data } = await getHttpInstance(state.env).get('/countries')
      commit(MUTATE_PG_COUNTRIES, { data });
    } catch (e) {
      commit(MUTATE_PG_COUNTRIES, {data: []});
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_countries') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_PAYMENT_METHODS]: async ({commit, dispatch, state}) => {
    try {
      // const { data } = await Vue.prototype.$http.acchttp.get('/methods')
      const { data } = await getHttpInstance(state.env).get('/methods')
      commit(MUTATE_PG_PAYMENT_METHODS, { data });
    } catch (e) {
      commit(MUTATE_PG_PAYMENT_METHODS, {data: []});
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_payment_methods') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_SET_PAYMENT_METHOD]: async ({commit, dispatch, state}, data) => {
    try {
      // await Vue.prototype.$http.acchttp.put(`/method/${data.code}`, data)
      await getHttpInstance(state.env).put(`/method/${data.code}`, data)
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_set_payment_method') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_MERCHANTS]: async ({commit, dispatch}, id) => {
    try {
          const{data} = await getHttpInstance(state.env).get(`/merchant-profile`);
          commit(MUTATE_PG_MERCHANTS, {data})
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_get_merchants') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_GET_SINGLE_MERCHANT]: ({commit, dispatch}, id) => {
      return new Promise ( (resolve, reject) => {
        getHttpInstance(state.env).get(`/merchant-profile/${id}`).then( data => {
              resolve(data.data);
          }).catch( error => {
              dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_get_merchants') + e.message, status: 'danger' });
              reject(error)
          });
      });
  },
  [ACTION_PG_GET_FLOAT_ACCOUNT_SEARCH_BY_MERCHANT_ID]: async ({commit, dispatch}, id) => {
    try {
      const { data } = await getHttpInstance(state.env).get('/float-account/search', { merchantId: id })
      commit(MUTATE_PG_FLOAT_ACCOUNTS, data)
    } catch (e) {
      commit(MUTATE_PG_FLOAT_ACCOUNTS, [])
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_load_float_accounts') + e.message, status: 'danger' })
    }
  },
  [ACTION_PG_CREATE_FLOAT_ACCOUNT]: async ({commit, dispatch}, params) => {
    try {
      await getHttpInstance(state.env).post('/float-account', params)
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.paymentGateway.success_add_float_account'), status: 'success'})
      await dispatch(ACTION_PG_GET_FLOAT_ACCOUNT_SEARCH_BY_MERCHANT_ID, params.merchant_id)
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_set_float_account') + e.message, status: 'danger' })
    }
	},
  [ACTION_PG_GET_TRANSACTIONS]: async ({commit, dispatch}, params) => {
    try {
			const { data } = await getHttpInstance(state.env).get(`/data/payments`)

			commit(MUTATE_PG_TRANSACTIONS, {
				total: data.page.totalElements,
				items: data._embedded.payments
			})
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_set_float_account') + e.message, status: 'danger' })
    }
  }	
}

const getters = {
  [GETTER_PG_CURRENCIES]: state => state.currencies,
  [GETTER_PG_COUNTRIES]: state => state.countries,
  [GETTER_PG_PAYMENT_METHODS]: state => state.paymentMethod,
  [GETTER_PG_FLOAT_ACCOUNTS]: state => state.floatAccounts,
  [GETTER_PG_ENV]: state => state.env
}

const paymentGateway = {
  state,
  actions,
  getters,
  mutations
}

export default paymentGateway
