import Vue from 'vue';
import i18n from '@/i18n'
import {handleEmptyValues} from "../../utils/hanldeEmptyValues";
import {
  ADD_CARD_PROGRAM,
  ADD_RESELLER_SUBSCRIPTION,
  EDIT_RESELLER_SUBSCRTION_BY_ID,
  GET_ALL_RESELLER_SUBSCRIPTIONS,
  GET_ALL_RESELLER_SUBSCRIPTIONS_LIST,
  GET_INVOICES_BY_SELLERID,
  GET_RESELLER_SUBSCRTION_BY_ID,
  GETTER_INVOICES_BY_SELLERID,
  GETTER_LOADINGSTATE_RESELLER,
  GETTER_RESELLER_SUBSCRIPTION,
  GETTER_RESELLER_SUBSCRIPTIONS,
  GETTER_RESELLER_SUBSCRIPTIONS_LIST,
  MUTATE_ADD_RESELLER_SUBSCRIPTION,
  MUTATE_EDIT_RESELLER_SUBSCRTION_BY_ID,
  MUTATE_GET_ALL_RESELLER_SUBSCRIPTIONS,
  MUTATE_GET_ALL_RESELLER_SUBSCRIPTIONS_LIST,
  MUTATE_GET_RESELLER_SUBSCRTION_BY_ID,
  MUTATE_INVOICES_BY_SELLERID,
  MUTATE_LOADINGSTATE_RESELLER,
  SHOW_TOAST_MESSAGE,
  UPDATE_RESPONSE_STATE
} from '../types'
import LOADING_STATE from '../../utils/loadingState'

/*
const convertRequestData = (data) => {
  let converted = data
  // load fee config
  converted.loadFee = data.loadFee === '' ? null : data.loadFee
  converted.loadFeeCap = data.loadFeeCap === '' ? null : data.loadFeeCap
  converted.loadFeePct = data.loadFeePct === '' ? null : data.loadFeePct
  converted.loadFeebillMethod = data.loadFeebillMethod === '' ? null : data.loadFeebillMethod

  // api fee config
  converted.apiFee = data.apiFee === '' ? null : data.apiFee
  converted.apiFeeBillMethod = data.apiFeeBillMethod === '' ? null : data.apiFeeBillMethod

  // app fee config
  converted.appFee = data.appFee === '' ? null : data.appFee
  converted.appFeeBillMethod = data.appFeeBillMethod === '' ? null : data.appFeeBillMethod

  // monthly fee config
  converted.monthlyFee = data.monthlyFee === '' ? null : data.monthlyFee
  converted.monthlyFeeBillMethod = data.monthlyFeeBillMethod === '' ? null : data.monthlyFeeBillMethod

  return converted
}
*/

const state = {
  resellerSubscriptions: [],
  resellerSubscriptionsList: {
    resellerSubscriptionList: [],
    pageMeta: {
      links: [],
      numberOfPageElements: 0,
      perPage: 0,
      totalPages: 0
    }
  },
  resellerSubscription: null,
  invoices: [],
  loadingSate: LOADING_STATE.IDEAL
};
const mutations = {
  [MUTATE_ADD_RESELLER_SUBSCRIPTION]: (state, {data}) => {
    state.resellerSubscriptions = [...state.resellerSubscriptions, data];
  },
  [MUTATE_GET_ALL_RESELLER_SUBSCRIPTIONS]: (state, {data}) => {
    state.resellerSubscriptions = data;
  }, [MUTATE_GET_ALL_RESELLER_SUBSCRIPTIONS_LIST]: (state, {data}) => {
    state.resellerSubscriptionsList = data;
  },
  [MUTATE_GET_RESELLER_SUBSCRTION_BY_ID]: (state, {data}) => {
    state.resellerSubscription = data;
  },
  [MUTATE_EDIT_RESELLER_SUBSCRTION_BY_ID]: (state, {data, id}) => {
    state.resellerSubscriptions = state.resellerSubscriptions.map(
      resellerSubscription =>
        resellerSubscription.id === id ? data : resellerSubscription
    );
  },
  [MUTATE_LOADINGSTATE_RESELLER]: (state, loadingState) => state.loadingSate = loadingState,
  [MUTATE_INVOICES_BY_SELLERID]: (state, {data}) => state.invoices = data
};
const actions = {
  [ADD_RESELLER_SUBSCRIPTION]: async ({commit, dispatch}, payload) => {
    const requestData = handleEmptyValues(payload)
    commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.GETTING)
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.aba1.post('/reseller-subscriptions', requestData)
        .then(data => {
          commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
          dispatch(SHOW_TOAST_MESSAGE, {
            message: i18n.t('store.reseller.success_create_reseller'),
            status: 'success'
          })
          resolve(data)
        })
        .catch(e => {
          const {response} = JSON.parse(JSON.stringify(e))
          commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
          dispatch(SHOW_TOAST_MESSAGE, {
            message: response && response.data && response.data.detail ? response.data.detail : i18n.t('store.reseller.error_create_reseller'),
            status: 'danger'
          })
          reject(response)
        })
    })
  },
  [GET_ALL_RESELLER_SUBSCRIPTIONS]: async ({commit, dispatch}) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.GETTING)

      const {data} = await Vue.prototype.$http.aba1.get(
        `/program-mgnt/reseller-codes`
      );

      commit(MUTATE_GET_ALL_RESELLER_SUBSCRIPTIONS, {data});
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)

    } catch (e) {
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_resellers'), status: 'danger'})

    }
  },
  [GET_ALL_RESELLER_SUBSCRIPTIONS_LIST]: async ({commit, dispatch}, {
    page,
    perPage,
    resellerCode = null
  } = {page: 0, perPage: 20}) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.GETTING)
      let requestStr = `/reseller-subscriptions?page=${page}&per_page=${perPage}`
      if (resellerCode) {
        requestStr += `&reseller_code=${resellerCode}`
      }
      requestStr.replace(/ /g, '')

      let {data} = await Vue.prototype.$http.aba1.get(requestStr);

      data = {
        ...data,
        resellerSubscriptionList: data.resellerSubscriptionList || [],
        pageMeta: data.pageMeta || {
          links: [],
          numberOfPageElements: 0,
          perPage: 0,
          totalPages: 0
        }
      }
      commit(MUTATE_GET_ALL_RESELLER_SUBSCRIPTIONS_LIST, {data});
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)

    } catch (e) {
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_resellers'), status: 'danger'})

    }
  },
  [GET_RESELLER_SUBSCRTION_BY_ID]: async (
    {commit, dispatch},
    resellerSubscriptionId
  ) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.GETTING)

      const {data} = await Vue.prototype.$http.aba1.get(
        `/reseller-subscriptions/${resellerSubscriptionId}`
      );
      commit(MUTATE_GET_RESELLER_SUBSCRTION_BY_ID, {data});
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)

    } catch (e) {
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_reseller_entity'), status: 'danger'})

    }
  },
  [EDIT_RESELLER_SUBSCRTION_BY_ID]: async ({commit, dispatch}, payload) => {
    commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.GETTING)
    return new Promise((resolve, reject) => {      
      /*
      const requestData = {
        alertContact: payload.body.alertContact,
        apiFee: payload.body.apiFee,
        apiFeeBillMethod: payload.body.apiFeeBillMethod,
        appFee: payload.body.appFee,
        appFeeBillMethod: payload.body.appFeeBillMethod,
        cardProgramID: payload.body.cardProgramID,
        countryCode: payload.body.countryCode,
        loadFee: payload.body.loadFee,
        loadFeeCap: payload.body.loadFeeCap,
        loadFeePct: payload.body.loadFeePct,
        loadFeebillMethod: payload.body.loadFeebillMethod,
        monthlyFee: payload.body.monthlyFee,
        monthlyFeeBillMethod: payload.body.monthlyFeeBillMethod,
        resellerCode: payload.body.resellerCode,
        resellerName: payload.body.resellerName,
        resellerType: payload.body.resellerType,
        status: payload.body.status,
        uniqueFloat: payload.body.uniqueFloat
      }*/
      
      Vue.prototype.$http.aba1.put(`/reseller-subscriptions/${payload.id}`, payload.body)
        .then(data => {
          commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
          dispatch(SHOW_TOAST_MESSAGE, {
            message: i18n.t('store.reseller.success_edit_reseller'),
            status: 'success'
          })
          resolve(data)
        })
        .catch(e => {
          const {response} = JSON.parse(JSON.stringify(e))
          commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
          dispatch(SHOW_TOAST_MESSAGE, {
            message: response && response.data && response.data.detail ? response.data.detail : i18n.t('store.reseller.error_edit_reseller_entity'),
            status: 'danger'
          })
          reject(response)
        })
    })
  },
  [GET_INVOICES_BY_SELLERID]: async ({commit, dispatch}, {cardProgramCode, page, perPage, currencyCode, resellerCode, fromDate, toDate}) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'getting_invoices')
      const {data} = await Vue.prototype.$http.aba1.get(`/invoices?
      card_program_code=${cardProgramCode}
      &currency_code=${currencyCode}
      &from_date=${fromDate}
      &page=${page}
      &per_page=${perPage}
      &reseller_code=${resellerCode}
      &to_date=${toDate}`.replace(/ /g, ''));
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
      commit(MUTATE_INVOICES_BY_SELLERID, {data})
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_invoices'), status: 'danger'})
      commit(MUTATE_LOADINGSTATE_RESELLER, LOADING_STATE.IDEAL)
    }
  }
};
const getters = {
  [GETTER_RESELLER_SUBSCRIPTION]: state => state.resellerSubscription,
  [GETTER_RESELLER_SUBSCRIPTIONS]: state => state.resellerSubscriptions,
  [GETTER_RESELLER_SUBSCRIPTIONS_LIST]: state => state.resellerSubscriptionsList,
  [GETTER_LOADINGSTATE_RESELLER]: state => state.loadingSate,
  [GETTER_INVOICES_BY_SELLERID]: state => state.invoices,
};

const reseller = {
  state,
  actions,
  getters,
  mutations
};
export default reseller;
