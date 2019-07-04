import Vue from 'vue'
import Vuex from 'vuex'
import cardProgram from './modules/CardProgram'
import floatBalance from './modules/FloatBalance'
import reseller from './modules/Reseller';
import UiModule from "./modules/UiModule";
import kyc from "./modules/Kyc";
import paymentGateway from "./modules/PaymentGateway"
import issuing from './modules/Issuing'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { 
    cardProgram, 
    floatBalance, 
    reseller, 
    UiModule, 
    kyc,
    paymentGateway,
    issuing,
  }
})
