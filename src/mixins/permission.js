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
    },
    showButtons(permissions, tableHeadings){
      permissions.forEach(permission => {
        if(!this.hasPermission(permission.role)){
          tableHeadings
            .forEach((item, index) => {
              if(item.name === permission.button){
                tableHeadings.splice(index, 1)
              }
            })
        }
      })
      return tableHeadings
    }
  }
}

export { permissionMixin }
