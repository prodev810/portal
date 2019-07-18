import {store} from "../store";
import {
  USER_INFO,
  MUTATE_USER_INFO,
  GETTER_USER_INFO,
  USER_ROLES,
  MUTATE_USER_ROLES,
  GETTER_USER_ROLES,
} from '../types'

const state = {
  userInfoData: [],
  userRoles: [],
}

const mutations = {
  [MUTATE_USER_INFO]: (state, data) => state.userInfoData = data,
}

const actions = {
  [USER_INFO]: async ({commit}) => {
    await store.getters.SECURITY_AUTH.loadUserInfo()
      .success((res) => {
        commit(MUTATE_USER_INFO, res)
      }).error(er => {
        console.log('E', er);
      });
  },
  [USER_ROLES]: async ({commit}) => {
    commit(MUTATE_USER_ROLES, store.getters.SECURITY_AUTH.realmAccess.roles)
  },
}

const getters = {
  [GETTER_USER_INFO]: state => state.userInfoData,
  [GETTER_USER_ROLES]: state => state.userRoles,
}

const userInfo = {
  state,
  actions,
  mutations,
  getters,
}

export default userInfo
