<template>
  <custom-tab @load="load">
    <setting-view slot="sandbox" ref="sandbox"></setting-view>
    <setting-view slot="live" ref="live"></setting-view>
  </custom-tab>
</template>

<script>
import CustomTabs from './BaseView/CustomTabs'
import Settings from './BaseView/Settings'
export default {
  name: 'pg-setting-with-tab',
  components: {
    'custom-tab': CustomTabs,
    'setting-view': Settings
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

<style scoped>

</style>