import Vue from 'vue'
//import axiosConfig from '../../config/axios.config'
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
  GETTER_ISSUING_ACCOUNT_INFO,
  GETTER_ISSUING_CARD_INFO,
} from '../types'

const state = {
  issuingApps: [],
  issuingAccount: [],
  issuingCard: [],
  loadingState: 'ideal',
}

const mutations = {
  [MUTATE_ISSUING_APPS_OVERVIEW] :(state, {data}) => state.issuingApps = data,
  [MUTATE_ISSUING_CARD_REQUEST] :(state, {data}) => state.issuingCard = data,
  [MUTATE_ISSUING_ACCOUNT_REQUEST] :(state, {data}) => state.issuingAccount = data,
  [MUTATE_ISSUING_LOADINGSTATE] :(state, loadingState) => state.loadingState = loadingState ,
}

const actions = {
  [ISSUING_GET_APPS_OVERVIEW] :async ({commit}, payload) =>{
    try{
      commit(MUTATE_ISSUING_LOADINGSTATE, 'getting')
      const {data} = await Vue.prototype.$abahttp.get('v1/aba/issuing-apps-overview', {...payload})
      commit(MUTATE_ISSUING_LOADINGSTATE, 'ideal')
      commit(MUTATE_ISSUING_APPS_OVERVIEW, {data})
    }catch(e){
      commit(MUTATE_ISSUING_LOADINGSTATE, 'ideal')
      console.log('issuing apps overview', e)
    }
  },
  [ISSUING_GET_ACCOUNT_REQUEST] :async ({commit}, payload) =>{
    try{
      //console.log('payload', payload)
      const {data} = await Vue.prototype.$abahttp.get(`v1/aba/issuing-apps/${payload}/account-requests`)
      //console.log('issuing account request', data)
      commit(MUTATE_ISSUING_ACCOUNT_REQUEST, {data: data.requests})
    }catch(e){
      console.log('issuing account request', e)
    }
  },
  [ISSUING_GET_CARD_REQUEST] :async ({commit}, payload) =>{
    try{
      const {data} = await Vue.prototype.$http.get(`v1/aba/issuing-card-request/${payload}`)
      //console.log('issuing card request', {data})
      commit(MUTATE_ISSUING_CARD_REQUEST, {data: data.requests})
    }catch(e){
      console.log('issuing card request', e)
    }
  },
  [ISSUING_PUT_CARD_REQUEST] : async ({commit}, payload) => {
    try{
      const req = payload.body
      const {data} = await Vue.prototype.$http.put(`v1/aba/issuing-card-request/${payload.id}`, req)
      //console.log('issuing put card request', {data})
    }catch(e){
      console.log('issuing put card request', e)
    }
  },
  [ISSUING_PUT_ACCOUNT_REQUEST] : async ({commit}, payload) => {
    //console.log('issuing put account request', payload)
    try{
      const req = payload.body
      const {data} = await Vue.prototype.$http.put(`v1/aba/issuing-account-request/${payload.id}`, req)
      //console.log('issuing put account request', {data})
    }catch(e){
      console.log('issuing put account request', e)
    }
  },
}

const getters = {
  [GETTER_ISSUING_LOADINGSTATE]: state => state.loadingState,
  [GETTER_ISSUING_APPS_INFO]: state => state.issuingApps.infos,
  [GETTER_ISSUING_APPS_PAGEMETA]: state => state.issuingApps.pageMeta,
  [GETTER_ISSUING_ACCOUNT_INFO]: state => {
    const request =  {
        accessCode: '',
        accountReference: '',
        birthDate: '',
        cardHolderName: '',
        cardProgramCode: '',
        cardProgramId: 0,
        currencyCode: '',
        customerId: '',
        customerIdType: 0,
        email: '',
        feeProfileId: 0,
        firstName: '',
        fourthLine: '',
        gender: '',
        homePhone: '',
        issuerInstCode: '',
        kycAppRefNumber: '',
        kycLevel: 0,
        lastName: '',
        maidenName: '',
        memorableWord: '',
        merchantUSN: 0,
        mobilePhone: '',
        overrideAddress: {
          address1: '',
          address2: '',
          address3: '',
          city: '',
          countryCode: '',
          postCode: '',
          region: ''
        },
        primaryAddress: {
          address1: '',
          address2: '',
          address3: '',
          city: '',
          countryCode: '',
          postCode: '',
          region: ''
        },
        programManagerCode: '',
        programOwnerCode: '',
        proofOfAddressUrl: '',
        proofOfPassportUrl: '',
        resellerCode: '',
        secondName: '',
        title: '',
        workPhone: ''
      }

    return state.issuingAccount.length ? state.issuingAccount.issuingAccountRequestInfoData : request
  },
  [GETTER_ISSUING_CARD_INFO]: state => {
    const request = {
      accountId: 0,
      cardHolderName: '',
      cardOrderType: 0,
      customerCode: '',
      dlvAddress1: '',
      dlvAddress2: '',
      dlvAddress3: '',
      dlvCityTown: '',
      dlvCountryCode: '',
      dlvFirstName: '',
      dlvLastName: '',
      dlvMobilePhone: '',
      dlvPostCode: '',
      dlvRegion: '',
      dlvTitle: '',
      fourthLine: '',
      matrixPID: ''
    }
    return state.issuingCard.length ? state.issuingCard.issuingCardRequestInfoData : request
  },
}

const issuing = {
  state,
  actions,
  mutations,
  getters,
}

export default issuing
