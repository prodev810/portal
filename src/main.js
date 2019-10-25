import '@babel/polyfill'
import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate, { Validator } from 'vee-validate'
import customValidate from 'src/customValidate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'

// import keycloakStore from 'plugin-vuejs-keycloak'
import security from 'plugin-vuejs-keycloak/security'



// Plugins
// Element-UI
import {Select, Checkbox, Option, Row, Col, Input, Tooltip, Table, TableColumn, DatePicker} from 'element-ui'

Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)

import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'
import initProgress from './progressbar';
// router setup
import routes from './routes/routes'

// library imports
import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'
//  plugins import
import axiosWrapper from './plugins/axios'
import oAuthWrapper from './plugins/oAuth'
//import oAuthKycWrapper from './plugins/oAuthKyc'
import sidebarLinks from './sidebarLinks'

// configs
import axiosConfig from './config/axios.config'
import oAuthConfig from './config/oAuth.config'

import {store} from './store/store.js'
import i18n from './i18n'
import permission from '@/constants/permission'
import VueAppInsights from 'vue-application-insights'

import "@/utils/filters.js"

// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
customValidate(Validator)

import '@/utils/VeeCustomValidators.js'

// Vue.use(oAuthKycWrapper, oAuthConfig)
Vue.use(oAuthWrapper, oAuthConfig)
Vue.use(axiosWrapper, axiosConfig)

Vue.prototype.$oAuth.startCountDown();

window.addEventListener('click',() => { Vue.prototype.$oAuth.setLockTimeout(oAuthConfig.LOCK_TIMEOUT);});
window.addEventListener("mousemove", ()=> {Vue.prototype.$oAuth.setLockTimeout(oAuthConfig.LOCK_TIMEOUT);});
window.addEventListener("keypress", ()=>{Vue.prototype.$oAuth.setLockTimeout(oAuthConfig.LOCK_TIMEOUT);});


// Vue.use(oAuthKycWrapper, {
//     BASE_URL: 'https://auth.dev.transact24.com/auth',
//     REALM: 'ceevo-realm',
//     CLIENT_ID: 'kyc-svc',
//     CLIENT_SECRET: '299a61f7-dd99-4533-8db7-a43ad062a6dd',
//     TIMEOUT: 30 * 60,
//     TOKEN_EXPIRED_TIME_LESS_THAN: 2 * 60,
//     SHORTCUT: '$oAuthKyc'    
// })
// Vue.use(axiosWrapper, [
//   axiosConfig, 
//   {
//     BASE_URL: 'https://api.dev.ceevo.com/acquring/mgmt',
//     VERSION: '',
//     TYPE: '',
//     TIMEOUT: 35000,
//     SHORTCUT: '$acchttp',
//     OAUTH: '$oAuth' // same oAuth as main
//   } 
// ])

/*Vue.use(axiosAbaWrapper, [
  {
    BASE_URL: 'https://api.dev.ceevo.com/aba-api',
    VERSION: '',
    TYPE: '',
    TIMEOUT: 35000,
    SHORTCUT: '$abahttp',
    OAUTH: '$oAuth' // same oAuth as main
  }
])*/

// config lang
locale.use(lang)


// FIXME Temporary solution for "NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}",
// FIXME cause some router call itself again. eg: getCardList() in src/components/Dashboard/pages/CardProgram/CardPrograms.vue
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

// configure router
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  linkActiveClass: 'active',
})


// router.beforeEach(async (to, from, next) => {
//   const isAuth = await Vue.prototype.$oAuth.isAuthenticated()
//   const nextToByRole = () => {
//     if (Vue.prototype.$oAuth.isNoPermissionForAll()) {
//       return '/system'
//     } else if (Vue.prototype.$oAuth.isReseller()) {
//       return '/reseller'
//     } else {
//       return '/card-program'
//     }
//   }

//   const isAbleAccess = (object) => {
//     let has = Vue.prototype.$oAuth.hasPermission(to.meta.permission)
//     if (!has && isAllowResellerToView(to.meta.isAllowResellerToView)) {
//       has = true
//     }else if (!has && (object.name === 'Resellers Editor' || object.name === 'Edit card program')) {
//       if (!object.query.edit && Vue.prototype.$oAuth.hasPermission(permission.RESELLER_SUBSCRIPTION_VIEW)) {
//         has = true
//       }
//     }
//     return has
//   }

//   const isAllowResellerToView = (isAllow) => {
//     if (!isAllow) {
//       return false
//     }
//     return Vue.prototype.$oAuth.isReseller()
//   }

//   const defaultTo = nextToByRole()
//   if (!isAuth) {
//     if (to.path !== '/login' && to.path !== '/lock') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })

// initProgress(router);

/*router.beforeEach(async (to, from, next) => {
  const isAuth = await Vue.prototype.$oAuth.isAuthenticated()
  const nextToByRole = () => {
    if (Vue.prototype.$oAuth.isNoPermissionForAll()) {
      return '/system'
    } else if (Vue.prototype.$oAuth.isReseller()) {
      return '/reseller'
    } else {
      return '/card-program'
    }
  }

  const isAbleAccess = (object) => {
    let has = Vue.prototype.$oAuth.hasPermission(to.meta.permission)
    if (!has && (object.name === 'Resellers Editor' || object.name === 'Edit card program')) {
      if (!object.query.edit && Vue.prototype.$oAuth.hasPermission(permission.RESELLER_SUBSCRIPTION_VIEW)) {
        has = true
      }
    }
    return has
  }

  const defaultTo = nextToByRole()
  if (!isAuth) {
    if (to.path !== '/login' && to.path !== '/lock') {
      next('/login')
    } else {
      next()
    }
  } else {
    if (to.path === '/login' || to.path === '/lock') {
      next(defaultTo)
    } else {
      if (to.meta.permission && !isAbleAccess(to)) {
        next(defaultTo)
      } else {
        next()
      }
    }
  }
})*/

initProgress(router);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const auth = store.state.security.auth
    if (!auth.authenticated) {
      // security.init(next, to.meta.roles) // TODO: uncomment when roles confirmed
      security.init(next, null) // TODO: comment when roles confirmed
    } else {
      if (to.meta.roles) {
        if (true) { // TODO: comment when roles confirmed
        // if (security.roles(to.meta.roles[0])) { // TODO: uncomment when roles confirmed
          next()
        } else {
          next({name: 'Unauthorized'})
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
if (process.env.VUE_APP_AI_KEY !== '') {
  // console.log('has VUE_APP_AI_KEY')
  Vue.use(VueAppInsights, {
    id: process.env.VUE_APP_AI_KEY,
    router
  })

  Vue.config.errorHandler = function  (error, vm, info) {
    window.appInsights.trackException(error);
    console.error(error)
  }
}

/* eslint-disable no-new */
export const AbaModalEvents = new Vue()

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router,
  i18n
})

