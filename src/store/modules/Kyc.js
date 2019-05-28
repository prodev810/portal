import qs from 'query-string'
import Vue from 'vue';
import i18n from '@/i18n'
import {handleEmptyValues} from "../../utils/hanldeEmptyValues";
import axiosConfig from '../../config/axios.config'
import {
  MUTATE_KYC_GET_ALL_CLIENTS,
  GETTER_KYC_GET_ALL_CLIENTS,
  KYC_GET_ALL_CLIENTS,
  KYC_GET_SUMMARY_REPORT,
  KYC_GET_STATISTICS,
  GETTER_All_CLIENTS,
  GETTER_All_CLIENTS_LIST,
  GETTER_CLIENT_TYPES,
  GETTER_OUTSTANDING_APPS,
  MUTATE_All_CLIENTS,
  MUTATE_CLIENT_TYPES,
  MUTATE_OUTSTANDING_APPS,
  GETTER_CLIENT_TYPES_LIST,
  GETTER_OUTSTANDING_APPS_LIST
} from '../types';

const state = {
  kycClients: [],
  loadingSate: 'ideal',
  allClients: [],
  clientTypes: [],
  outstandingApps: []
}

const mutations = {
  [MUTATE_KYC_GET_ALL_CLIENTS]: (state, {data}) => {
    state.kycClients = data
  },
  /*
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
  */
  [MUTATE_All_CLIENTS]: (state, {data}) => {
    state.allClients = data;
  },
  [MUTATE_CLIENT_TYPES]: (state, {data}) => {
    state.clientTypes = data;
  },
  [MUTATE_OUTSTANDING_APPS]: (state, {data}) => {
    state.outstandingApps = data;
  }
}

const actions = {
  [KYC_GET_ALL_CLIENTS]: async (
    {commit, dispatch}    
  ) => {
    try {
      // simplified version

      /*const { data } = await Vue.prototype.$http.post('https://auth.dev.transact24.com/auth/realms/ceevo-realm/protocol/openid-connect/token', qs.stringify({
        grant_type: 'client_credentials',
        client_id: 'kyc-svc',
        client_secret: '299a61f7-dd99-4533-8db7-a43ad062a6dd'
      })) 

      console.log(data)      

      Vue.prototype.$httpKyc.setToken(data.access_token)*/

      //let clientsAll = await Vue.prototype.$httpKyc.get('/clients/all')

      //console.log('get all clients')
      //console.log(clientsAll)

      //commit(MUTATE_LOADINGSTATE_RESELLER, 'getting')

      //const {data} = await Vue.prototype.$http.get('/kyc/clients/all');

      //commit(MUTATE_GET_RESELLER_SUBSCRTION_BY_ID, {data});
      //commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')

    } catch (e) {
      console.log(e)
      //commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      //dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_reseller_entity'), status: 'danger'})

    }
  },


  /*
  [ADD_RESELLER_SUBSCRIPTION]: async ({commit, dispatch}, {body}) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'sending')
      const response = await Vue.prototype.$http.post(
        '/reseller-subscriptions',
        {
          ...handleEmptyValues({...body})
        }
      );

      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      dispatch(UPDATE_RESPONSE_STATE, {key: ADD_RESELLER_SUBSCRIPTION, status: {state: true, error: null}})
      return true
    } catch (e) {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      console.log(e.response);
      dispatch(SHOW_TOAST_MESSAGE, {message: e.response.data.detail || i18n.t('store.reseller.error_create_reseller'), status: 'danger'})
      dispatch(UPDATE_RESPONSE_STATE, {key: ADD_RESELLER_SUBSCRIPTION, status: {state: false, error: null}})
      return false
    }
  },
  [GET_ALL_RESELLER_SUBSCRIPTIONS]: async ({commit, dispatch}) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'getting')

      const {data} = await Vue.prototype.$http.get(
        `/reseller-subscriptions/all`
      );

      commit(MUTATE_GET_ALL_RESELLER_SUBSCRIPTIONS, {data});
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')

    } catch (e) {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_resellers'), status: 'danger'})

    }
  },
  [GET_ALL_RESELLER_SUBSCRIPTIONS_LIST]: async ({commit, dispatch}, {
    page,
    perPage,
    resellerCode = null
  } = {page: 0, perPage: 20}) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'getting')
      let requestStr = `/reseller-subscriptions/list?page=${page}&per_page=${perPage}`
      if (resellerCode) {
        requestStr += `&reseller_code=${resellerCode}`
      }
      requestStr.replace(/ /g, '')
      
      let {data} = await Vue.prototype.$http.get(requestStr);

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
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')

    } catch (e) {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_resellers'), status: 'danger'})

    }
  },
  [GET_RESELLER_SUBSCRTION_BY_ID]: async (
    {commit, dispatch},
    resellerSubscriptionId
  ) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'getting')

      const {data} = await Vue.prototype.$http.get(
        `/reseller-subscriptions/${resellerSubscriptionId}`
      );
      commit(MUTATE_GET_RESELLER_SUBSCRTION_BY_ID, {data});
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')

    } catch (e) {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_reseller_entity'), status: 'danger'})

    }
  },
  [EDIT_RESELLER_SUBSCRTION_BY_ID]: async (
    {commit, dispatch},
    {body, id: resellerSubscriptionId},
  ) => {
    try {
      console.log(body, resellerSubscriptionId);
      commit(MUTATE_LOADINGSTATE_RESELLER, 'sending')
      const {data} = await Vue.prototype.$http.put(`/reseller-subscriptions/${resellerSubscriptionId}`, {
        ...handleEmptyValues(body)
      });
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      dispatch(UPDATE_RESPONSE_STATE, {key: ADD_RESELLER_SUBSCRIPTION, status: {state: true, error: null}})

    } catch (e) {
      console.log(e);
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      dispatch(UPDATE_RESPONSE_STATE, {key: ADD_RESELLER_SUBSCRIPTION, status: {state: false, error: null}})
      const message = e.response.data.detail
      dispatch(SHOW_TOAST_MESSAGE, {message: message && message.length > 0 ? message : i18n.t('store.reseller.error_edit_reseller_entity'), status: 'danger'})

    }
  },
  [GET_INVOICES_BY_SELLERID]: async ({commit, dispatch}, {cardProgramCode,page,perPage,currencyCode, resellerCode, fromDate, toDate}) => {
    try {
      commit(MUTATE_LOADINGSTATE_RESELLER, 'getting_invoices')
      const {data} = await Vue.prototype.$http.get(`/invoices?
      card_program_code=${cardProgramCode}
      &currency_code=${currencyCode}
      &from_date=${fromDate}
      &page=${page}
      &per_page=${perPage}
      &reseller_code=${resellerCode}
      &to_date=${toDate}`.replace(/ /g, ''));
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      commit(MUTATE_INVOICES_BY_SELLERID, {data})
    } catch (e) {
      dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_invoices'), status: 'danger'})
      commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
    }
  }
  */
  [GETTER_All_CLIENTS_LIST]: async ({commit, dispatch}) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/clients/all`);
      commit(MUTATE_All_CLIENTS, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [GETTER_CLIENT_TYPES_LIST]: async ({commit, dispatch}) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/client-types`);
      commit(MUTATE_CLIENT_TYPES, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [GETTER_OUTSTANDING_APPS_LIST]: async ({commit, dispatch}, {
    clientReference,
    clientType,
    dateFrom,
    dateTo,
    oldestFirst,
    pageNum,
    pageSize
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/outstanding-apps`, {
        clientReference: clientReference,
        clientType: clientType,
        dateFrom: dateFrom,
        dateTo: dateTo,
        oldestFirst: oldestFirst,
        pageNum: pageNum,
        pageSize: pageSize
      });
      commit(MUTATE_OUTSTANDING_APPS, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
}

const getters = {
  [GETTER_KYC_GET_ALL_CLIENTS]: state => state.kycClients,
  [GETTER_CLIENT_TYPES]: state => state.clientTypes,
  [GETTER_All_CLIENTS]: state => state.allClients,
  [GETTER_OUTSTANDING_APPS]: state => state.outstandingApps
}

const kyc = {
  state,
  actions,
  getters,
  mutations
}
export default kyc
