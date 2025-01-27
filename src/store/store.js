import Vue from 'vue'
import Vuex from 'vuex'
import cardProgram from './modules/CardProgram'
import floatBalance from './modules/FloatBalance'
import reseller from './modules/Reseller';
import UiModule from "./modules/UiModule";
import kyc from "./modules/Kyc";
import paymentGateway from "./modules/PaymentGateway"
import issuing from './modules/Issuing'
import business from './modules/Business'
import security from 'plugin-vuejs-keycloak/modules/security'
import userInfo from './modules/UserInfo'
import countries from "./modules/Countries"
import kycClassifier from "./modules/KycClassifier"


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
      security,
      cardProgram,
      floatBalance,
			reseller,
      UiModule,
      kyc,
      paymentGateway,
      issuing,
      business,
      userInfo,
      countries,
      kycClassifier
  }
})
