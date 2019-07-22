import permission from '@/constants/permission'
const permissionMixin = {
  data () {
    return {
      permission: permission
    }
  },
  methods: {
    hasPermission (permission) {
      const has = this.$oAuth.hasPermission(permission)
      return has
    },
    isAllowResellerToView (isAllow) {
      if (!isAllow) {
        return false
      }
      return this.$oAuth.isReseller()
    }
  }
}

export { permissionMixin }
