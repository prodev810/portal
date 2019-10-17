<template>
  <custom-tab @load="load">
    <merchant-view slot="sandbox" ref="sandbox"></merchant-view>
    <merchant-view slot="live" ref="live"></merchant-view>
  </custom-tab>
</template>

<script>
import CustomTabs from './BaseView/CustomTabs'
import Merchant from './BaseView/Merchant'
export default {
  name: 'pg-merchant-with-tab',
  components: {
    'custom-tab': CustomTabs,
    'merchant-view': Merchant
  },
  data() {
    return {}
  },
  methods: {
    async load(env) {
      await this.$refs[env].loadData(env)
    }
  }
}
</script>
