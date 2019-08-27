import {store} from '../store/store.js'
import {router} from '@/main'
import {inArray} from "@/utils/common"
import permission from '@/constants/permission'
import {GETTER_USER_ROLE} from '../store/types'
import ROLES from '../constants/roles'
import ROLES_PERMISSIONS from '../constants/rolesPermissions'

const oAuthWrapper = {}
oAuthWrapper.install = (Vue, configOptions = undefined) => {
  if (typeof configOptions === 'undefined') {
    throw new Error('please set oAuth config.')
  }

  /**
   * public - Logout with OAuth
   */
  const logout = async () => {
    // store.state.security.auth.authenticated = false
    // localStorage.clear();
    // sessionStorage.clear();

      sessionStorage.removeItem('lock_time');
      console.log('logout')
      store.getters.SECURITY_AUTH.logout()

      // console.log(store.state.security)
    /*const logoutURL = await store.getters.SECURITY_AUTH.createLogoutUrl()
    console.log({logoutURL})
    store.getters.SECURITY_AUTH.logout({redirectUri:logoutURL})
    return true*/
  }

  /**
   * public - Get authorization header value
   */
  const getAuthorizationHeader = async () => {
    const isExpired = await store.getters.SECURITY_AUTH.isTokenExpired()
    let token
    if (isExpired) {
      await store.getters.SECURITY_AUTH.updateToken()
        .success(refresh => {
          token = refresh
        })

      return `Bearer ${token}`
    }
    token = store.getters.SECURITY_AUTH.token
    return `Bearer ${token}`
  }

  /**
   * public - check the user has permission or not
   * @param {String} name
   */
  const hasPermission = (name, action = null) => {
    let userRole = store.getters.GETTER_USER_ROLE
    if(!userRole) userRole = store.getters.SECURITY_AUTH.realmAccess.roles
    //console.log(store.getters.SECURITY_AUTH)
    //console.log(name)
    // console.log('action', action)
    // console.log( ROLES_PERMISSIONS)
    // console.log( {userRole})
    //console.log( ROLES_PERMISSIONS[userRole])
    // console.log( typeof ROLES_PERMISSIONS[userRole])
    if(!userRole || typeof ROLES_PERMISSIONS[userRole] === 'undefined' || !ROLES_PERMISSIONS[userRole].length) return false
    // console.log( userRole)
    // console.log( ROLES_PERMISSIONS[userRole].includes(name))
    return ROLES_PERMISSIONS[userRole].includes(name)
  }

  const isReseller = () => {
    const role = getRoleFromSessionStorage()
    return role === 'ROLE_ABA_RESELLER'
  }

    const setLockTimeout = (value )=>{
          sessionStorage.setItem('lock_time', value);
    };

    const startCountDown = () => {
        setLockTimeout();

        let interval = setInterval(async () => {
            let count = sessionStorage.getItem('lock_time');

            // console.log( 'count',count );
            if (count <= 0 ) {
              clearInterval(interval);
              logout();
              return false;
            }
            count--;
            setLockTimeout( count );

        }, 1000)
    };




    Vue.prototype.$oAuth = {
    logout,
    startCountDown,
    setLockTimeout,
    getAuthorizationHeader,
    hasPermission,
    isReseller,
  }
}


export default oAuthWrapper
