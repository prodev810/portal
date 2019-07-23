import {store} from "../store";
import {
  USER_INFO,
  MUTATE_USER_INFO,
  GETTER_USER_INFO,
  USER_ROLES,
  MUTATE_USER_ROLES,
  GETTER_USER_ROLE,
  USER_PROFILE,
  MUTATE_USER_PROFILE,
  GETTER_USER_PROFILE,
  GET_USER_ROLE,
} from '../types'
import Vue from 'vue'
import userRoles from '../../constants/roles'

const state = {
  userInfoData: [],
  userRole: [],
  userProfile: {
    groupDetails: [],
    roles: [],
  },
}

const mutations = {
  [MUTATE_USER_INFO]: (state, data) => state.userInfoData = data,
  [MUTATE_USER_PROFILE]: (state, data) => state.userProfile = data,
  [MUTATE_USER_ROLES]: (state, data) => state.userRole = data,
}

const actions = {
  [USER_INFO]: async ({commit, dispatch}) => {
    await store.getters.SECURITY_AUTH.loadUserInfo()
      .success((res) => {
        commit(MUTATE_USER_INFO, res)
        //console.log('user info')
        dispatch(USER_PROFILE)
      }).error(er => {
        console.log('E', er);
      });
  },
  [USER_ROLES]: async ({commit}, data) => {
    commit(MUTATE_USER_ROLES, data)
  },
  [USER_PROFILE]: async ({commit, dispatch}) => {
    try {
      const {data} = await Vue.prototype.$http.kyc.get('userprofile')
      commit(MUTATE_USER_PROFILE, {data})
      const roles = Object.values(userRoles)
      roles.forEach(role => {
        if(data.roles.includes(role)){
          dispatch(USER_ROLES, role)
        }
      })
    } catch (e) {
      console.log('error :', JSON.parse(JSON.stringify(e)));
    }
  },
}

const getters = {
  [GETTER_USER_INFO]: state => state.userInfoData,
  [GETTER_USER_ROLE]: state => state.userRole,
  [GETTER_USER_PROFILE]: state => state.userProfile,
}

const userInfo = {
  state,
  actions,
  mutations,
  getters,
}

export default userInfo
