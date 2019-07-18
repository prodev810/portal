import {store} from '../store/store.js'
import {router} from '@/main'
import {inArray} from "@/utils/common"
import permission from '@/constants/permission'

const oAuthWrapper = {}
oAuthWrapper.install = (Vue, configOptions = undefined) => {
  if (typeof configOptions === 'undefined') {
    throw new Error('please set oAuth config.')
  }

  /**
   * public - Logout with OAuth
   */
  const logout = async () => {
    await await store.getters.SECURITY_AUTH.logout()
      .success(res => console.log(res))
      .error( err => console.log(err))
    return true
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
   * private - load permission after login
   */
  const loadPermissions = async () => {
    return [permission.ALL_PERMISSION]
  }

  /**
   * public - check the user has permission or not
   * @param {String} name
   */
  const hasPermission = (name) => {
    return true
    // const permissions = getPermissionFromSessionStorage()
    // return inArray(permission.ALL_PERMISSION, permissions) || inArray(name, permissions)
  }

  Vue.prototype.$oAuth = {
    logout,
    getAuthorizationHeader,
    hasPermission,
  }
}


export default oAuthWrapper
