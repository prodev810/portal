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
  GETTER_CLIENT_TYPES,
  GETTER_OUTSTANDING_APPS,
  GETTER_APPLICATION_STATUS,
  MUTATE_All_CLIENTS,
  MUTATE_CLIENT_TYPES,
  MUTATE_OUTSTANDING_APPS,
  MUTATE_APPLICATION_STATUS,
  GETTER_CLIENT_TYPES_LIST,
  GETTER_All_CLIENTS_LIST,
  GETTER_OUTSTANDING_APPS_LIST,
  GETTER_APPLICATION_STATUS_LIST,
  GETTER_APPLICATIONS,
  GETTER_APPLICATION_LIST,
  MUTATE_APPLICATIONS, MUTATE_SUMMARY_REPORT, MUTATE_STATISTICS,
  MUTATE_ACCOUNT_LOG,
  KYC_GET_ACCOUNT_LOG,
  GETTER_ACCOUNT_LOG,
  KYC_TERMINATE_APPLICATION,
  KYC_GET_CLIENT,
  GETTER_CLIENT_INFO,
  MUTATE_CLIENT_INFO,
  KYC_DOWNLOAD_CHECK_DOC,
  MUTATE_CHECK_DOCS,
  GETTER_CHECK_DOCS,
  KYC_DOWNLOAD_POA_IMAGE,
  MUTATE_POA_IMG,
  GETTER_POA_IMG,
  RESEND_SMS,
  KYC_UPDATE_CONTACT,

  KYC_GET_CURRENCY_LIST,
  KYC_GET_CLIENT_STATUSES,
  MUTATE_CURRENCY_LIST,
  MUTATE_CLIENT_STATUSES,
  KYC_GET_PRODUCT_CONFIG_CLIENT,
  MUTATE_PRODUCT_CONFIG_CLIENT,
  KYC_GET_PRODUCT_CONFIG_ALL_CLIENTS,
  MUTATE_PRODUCT_CONFIG_ALL_CLIENTS,
  KYC_PUT_PRODUCT_CONFIG_CLIENT,
  KYC_CREATE_PRODUCT_CONFIG_CLIENT,
  KYC_GET_PRODUCT_CONFIG_VIEW_INVOICE,
  MUTATE_PRODUCT_CONFIG_VIEW_INVOICE,
  KYC_GET_CHECK_ENQUIRY,
  MUTATE_SANC_CHECK_ENQUIRY,
  KYC_RESCREEN_ACTION,
  MUTATE_SANCTION_CHECK_STATUSES,
  KYC_GET_SANCTION_CHECK_STATUSES,
  MUTATE_SANCTION_CHECK_ACTION_TYPES,
  KYC_GET_SANCTION_CHECK_ACTION_TYPES,
  KYC_MANUAL_UPDATE,
  KYC_UPLOAD_SUPPORT_DOCUMENT,
  KYC_GET_LIST_SUPPORT_DOCUMENTS,
  MUTATE_LIST_SUPPORT_DOCUMENTS,
} from '../types';

const state = {
  kycClients: [],
  loadingSate: 'ideal',
  allClients: [],
  clientTypes: [],
  outstandingApps: [],
  applicationStatuses: [],
  applications: [],
  summaryReports:[],
  statistics: [],
  accountLog: [],
  clientInfo: null,
  checkDocs: {},
  poaImg: null,

  currencyList: [],
  clientStatusesList: [],
  productConfigClients: [],
  productConfigViewInvoice: [],
  sanCheckEnquiry: null,
  sanctionCheckStatuses: null,
  sanctionCheckActionTypes: null,
  listSupportDocuments: {},
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
  },
  [MUTATE_APPLICATION_STATUS]: (state, {data}) => {
    state.applicationStatuses = data;
  },
  [MUTATE_APPLICATIONS]: (state, {data}) => {
    state.applications = data;
  },
  [MUTATE_SUMMARY_REPORT]: (state, {data}) => {
    state.summaryReports = data;
  },
  [MUTATE_STATISTICS]: (state, {data}) => {
    state.statistics = data;
  },
  [MUTATE_ACCOUNT_LOG]: (state, {data}) => {
    state.accountLog = data;
  },
  [MUTATE_CLIENT_INFO]: (state, {data}) => {
    state.clientInfo = data;
  },
  [MUTATE_CHECK_DOCS]: (state, {data}) => {
    Vue.set(state.checkDocs, data.docType, data)
  },
  [MUTATE_POA_IMG]: (state, {data}) => {
    state.poaImg = data;
  },

  [MUTATE_CLIENT_STATUSES]: (state, {data}) => {
    state.clientStatusesList = data;
  },
  [MUTATE_CURRENCY_LIST]: (state, {data}) => {
    state.currencyList = data;
  },
  [MUTATE_PRODUCT_CONFIG_ALL_CLIENTS]: (state, {data} ) => {
    state.productConfigClients = data;
  },
  [MUTATE_PRODUCT_CONFIG_VIEW_INVOICE]: (state, {data} ) => {
    console.log('invoice mut', data)
    state.productConfigViewInvoice = data;
  },
  [MUTATE_SANC_CHECK_ENQUIRY]: (state, {data}) => {
      state.sanCheckEnquiry = data;
  },
  [MUTATE_SANCTION_CHECK_STATUSES]: (state, {data}) => {
      state.sanctionCheckStatuses = data;
  },
  [MUTATE_SANCTION_CHECK_ACTION_TYPES]: (state, {data}) => {
      state.sanctionCheckActionTypes = data;
  },
  [MUTATE_LIST_SUPPORT_DOCUMENTS]: (state, {data}) => {
      state.listSupportDocuments = data;
  }
}

const actions = {
  [GETTER_APPLICATION_STATUS_LIST]: async ({commit, dispatch}) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/kyc-application-statuses`);
      console.log('application status data', data);
      commit(MUTATE_APPLICATION_STATUS, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
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

      const {data} = await Vue.prototype.$http.get('v1/kyc/clients/all');

      commit(MUTATE_All_CLIENTS, {data})

      //commit(MUTATE_GET_RESELLER_SUBSCRTION_BY_ID, {data});
      //commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')

    } catch (e) {
      console.log(e)
      //commit(MUTATE_LOADINGSTATE_RESELLER, 'ideal')
      //dispatch(SHOW_TOAST_MESSAGE, {message: i18n.t('store.reseller.error_load_reseller_entity'), status: 'danger'})

    }
  },

  [KYC_GET_STATISTICS]: async ({commit}, payload)=> {
    try{
      const {data} = await Vue.prototype.$http.get('v1/kyc/dashboard/statistics', {duration: payload.duration, clientReference: payload.clientReference || null})
      commit(MUTATE_STATISTICS, {data})
      console.log('statistic' ,data)
    }catch(e){
      console.log('error :', e);
    }
  },

  [KYC_GET_SUMMARY_REPORT]: async ({commit}, payload)=> {
    try{
      const {data} = await Vue.prototype.$http.get('v1/kyc/dashboard/summary-report', {duration: payload.duration})
      commit(MUTATE_SUMMARY_REPORT, {data: data.infos})
      console.log('summary report' ,data)
    }catch(e){
      console.log('error :', e);
    }
  },
  [KYC_GET_CLIENT_STATUSES]: async ({commit})=> {
    try{
      const {data} = await Vue.prototype.$http.get('v1/kyc/client-statuses')
      commit(MUTATE_CLIENT_STATUSES, {data})
      console.log('statuses' ,{data})
    }catch(e){
      console.log('error :', e);
    }
  },

  [KYC_GET_CURRENCY_LIST]: async ({commit})=> {
    try{
      const {data} = await Vue.prototype.$http.get('v1/kyc/currencies')
      commit(MUTATE_CURRENCY_LIST, {data})
      console.log('currency' ,{data})
    }catch(e){
      console.log('error :', e);
    }
  },
  [KYC_GET_PRODUCT_CONFIG_ALL_CLIENTS]: async ({commit}, payload) => {
    const pageNum = (payload && payload.pageNum) ? payload.pageNum : 0
    const pageSize = (payload && payload.pageSize) ? payload.pageSize : 3
    try{
      const {data} = await Vue.prototype.$http.get('v1/kyc/clients', {pageNum, pageSize})
      commit(MUTATE_PRODUCT_CONFIG_ALL_CLIENTS, {data})
    }catch(e){
      console.log('error :', e);
    }
  },
  [KYC_GET_PRODUCT_CONFIG_CLIENT]: async ({},payload) => {
    // console.log('product config', payload);
    const id = payload.id
    return new Promise ( (resolve, reject) => {
      Vue.prototype.$http.get(`v1/kyc/clients/${id}`).then( data => {
        resolve(data.data);
      }).catch( error => reject(error));
    })
  },
  [KYC_PUT_PRODUCT_CONFIG_CLIENT]: async ({}, payload) => {
    const id = payload.id
    const body = payload.body
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.put(`v1/kyc/clients/${id}`, body)
        .then(data => {
          resolve(data.data)
        })
        .catch( error => reject(error))
    })
  },
  [KYC_CREATE_PRODUCT_CONFIG_CLIENT]: async ({}, payload) => {
    const body = payload.body
    /*const body = {
      applicationFee: 1,
      autoCloseSchedule: {
        clientScheduleIntervalType: "DAY",
        intervalVal: 1
      },
      clientName: "ABC Name",
      clientReference: "LYCACH",
      clientStatus: "ACTIVE",
      clientType: "STANDARD",
      contactEmail: "gibbons@email.com",
      contactName: "Peter Gibbons",
      feeCurrency: "EUR",
      frmRequired: true,
      idCheckFee: 1,
      idCheckRequired: true,
      kycAutoFollowupCloseSchedule: {
        clientScheduleIntervalType: "DAY",
        intervalVal: 1
      },
      kycReminderSchedule: {
        clientScheduleIntervalType: "DAY",
        intervalVal: 1
      },
      poaCheckFee: 1,
      poaCheckRequired: true,
      rescreenIntervalSchedule: {
        clientScheduleIntervalType: "DAY",
        intervalVal: 1
      },
      sanctionCheckFee: 1,
      sanctionCheckRequired: true,
      smsFee: 1
    }*/
    console.log('create', body)
    return new Promise((resolve, reject) => {
      Vue.prototype.$http.post(`v1/kyc/clients`, body)
        .then(data => {
          resolve(data.data)
        })
        .catch( error => reject(error))
    })
  },
  [KYC_GET_PRODUCT_CONFIG_VIEW_INVOICE]: async ({commit}, payload) => {
    const pageNum = 0
    const pageSize = 5
    // todo: there is no pagination in design !!!
    const params = {pageNum, pageSize, ...payload}
    console.log('invoice payload ', params)
    try {
      const {data} = await Vue.prototype.$http.get('v1/kyc/invoices', params)
      console.log('invoices', data)
      commit(MUTATE_PRODUCT_CONFIG_VIEW_INVOICE, {data})
    } catch (e) {
      console.log('error :', e);
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
  [GETTER_APPLICATION_STATUS_LIST]: async ({commit, dispatch}) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/kyc-application-statuses`);
      console.log('application status data', data);
      commit(MUTATE_APPLICATION_STATUS, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
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
  [GETTER_APPLICATION_LIST]: async ({commit, dispatch}, {
    appReferenceId,
    applicationStatus,
    clientAppRef,
    clientReference,
    clientType,
    dateFrom,
    dateTo,
    lastName,
    oldestFirst,
    pageNum,
    pageSize
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/applications`, {
        appReferenceId: appReferenceId,
        applicationStatus: applicationStatus,
        clientAppRef: clientAppRef,
        clientReference: clientReference,
        clientType: clientType,
        dateFrom: dateFrom,
        dateTo: dateTo,
        lastName: lastName,
        oldestFirst: oldestFirst,
        pageNum: pageNum,
        pageSize: pageSize
      });
      console.log('data from API', data)
      commit(MUTATE_APPLICATIONS, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_GET_ACCOUNT_LOG]: async ({commit, dispatch}, {
    appReferenceId,
    pageNum,
    pageSize
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/applications/${appReferenceId}/events`, {
        pageNum: pageNum,
        pageSize: pageSize
      });
      console.log('data from API', data)
      commit(MUTATE_ACCOUNT_LOG, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_TERMINATE_APPLICATION]: async ({commit, dispatch}, {
    appReferenceId,
    reason,
    status,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.post(`${axiosConfig.BASE_URL}v1/kyc/applications/${appReferenceId}/update-status`, {
          reason: reason,
          status: status
      });
      console.log('data from API', data)
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_GET_CLIENT]: async ({commit, dispatch}, {
    appReferenceId,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/applications/${appReferenceId}`);
      console.log('data from API', data)
      commit(MUTATE_CLIENT_INFO, {data})
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_DOWNLOAD_CHECK_DOC]: async ({commit, dispatch}, {
    checkId,
    id,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/idcheck/${checkId}/docs/${id}`);
      console.log('data from API', data)
      commit(MUTATE_CHECK_DOCS, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_DOWNLOAD_POA_IMAGE]: async ({commit, dispatch}, {
    checkId,
    id,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/poacheck/${checkId}/docs/${id}`);
      console.log('data from API POA', data)
      commit(MUTATE_POA_IMG, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [RESEND_SMS]: async ({commit, dispatch}, {
    appReferenceId,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.post(`${axiosConfig.BASE_URL}v1/kyc/applications/${appReferenceId}/resent-sms`);
      console.log('data from API POA', data)
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_UPDATE_CONTACT]: async ({commit, dispatch}, {
    appReferenceId,
    email,
    mobile
  }) => {
    try {
      const {data} = await Vue.prototype.$http.post(`${axiosConfig.BASE_URL}v1/kyc/applications/${appReferenceId}/update-contact`, {
          email: email,
          mobile: mobile
      });
      console.log('data from API POA', data)
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_GET_CHECK_ENQUIRY]: async ({commit, dispatch}, {
    appReferenceId,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/applications/${appReferenceId}/sancheck-enquiry`);
      console.log('KYC_GET_CHECK_ENQUIRY ', data)
      commit(MUTATE_SANC_CHECK_ENQUIRY, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_RESCREEN_ACTION]: async ({commit, dispatch}, {
    appReferenceId,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.post(`${axiosConfig.BASE_URL}v1/kyc/applications/${appReferenceId}/sanction-rescreen`);
      console.log('KYC_RESCREEN_ACTION ', data)
      Promise.resolve()
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_GET_SANCTION_CHECK_STATUSES]: async ({commit, dispatch}) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/sancheck-statuses`);
      console.log('KYC_GET_SANCTION_CHECK_STATUSES ', data)
      commit(MUTATE_SANCTION_CHECK_STATUSES, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_GET_SANCTION_CHECK_ACTION_TYPES]: async ({commit, dispatch}) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/sancheck-action-types`);
      console.log('KYC_GET_SANCTION_CHECK_ACTION_TYPES ', data)
      commit(MUTATE_SANCTION_CHECK_ACTION_TYPES, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_MANUAL_UPDATE]: async ({commit, dispatch}, {
    actionTypeCode,
    comment,
    operatorName,
    id,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.post(`${axiosConfig.BASE_URL}v1/kyc/sancheck/${id}/action`, {
        actionTypeCode,
        comment,
        operatorName,
      });
      console.log('KYC_MANUAL_UPDATE ', data)
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_UPLOAD_SUPPORT_DOCUMENT]: async ({commit, dispatch}, {
    content,
    mimeType,
    operatorName,
    id,
  }) => {
    try {
      const {data} = await Vue.prototype.$http.post(`${axiosConfig.BASE_URL}v1/kyc/sancheck/${id}/document-supports`, {
        content,
        mimeType,
        operatorName,
      });
      Promise.resolve()
      console.log('KYC_UPLOAD_SUPPORT_DOCUMENT ', data)
    } catch (e) {
      console.log('error :', e);
    }
  },
  [KYC_GET_LIST_SUPPORT_DOCUMENTS]: async ({commit, dispatch}, {
      id
  }) => {
    try {
      const {data} = await Vue.prototype.$http.get(`${axiosConfig.BASE_URL}v1/kyc/sancheck/${id}/document-supports`);
      console.log('KYC_GET_LIST_SUPPORT_DOCUMENTS ', data)
      commit(MUTATE_LIST_SUPPORT_DOCUMENTS, {data});
    } catch (e) {
      console.log('error :', e);
    }
  },
}

const getters = {
  [GETTER_KYC_GET_ALL_CLIENTS]: state => state.kycClients,
  [GETTER_CLIENT_TYPES]: state => state.clientTypes,
  [GETTER_All_CLIENTS]: state => state.allClients,
  [GETTER_OUTSTANDING_APPS]: state => state.outstandingApps,
  [GETTER_APPLICATION_STATUS]: state => state.applicationStatuses,
  [GETTER_APPLICATIONS]: state => state.applications,
  [GETTER_ACCOUNT_LOG]: state => state.accountLog,
  [GETTER_CLIENT_INFO]: state => state.clientInfo,
  [GETTER_CHECK_DOCS]: state => state.checkDocs,
  [GETTER_POA_IMG]: state => state.poaImg,
}

const kyc = {
  state,
  actions,
  getters,
  mutations
}
export default kyc
