<template>
  <custom-tab @load="load">
    <Aquirer slot="sandbox" ref="sandbox"/>
    <Aquirer slot="live" ref="live"/>
  </custom-tab>
</template>

<script>
import CustomTabs from './BaseView/CustomTabs'
import Aquirer from './BaseView/Aquirer'
export default {
  name: 'pg-setting-with-tab',
  components: {
    'custom-tab': CustomTabs,
    Aquirer
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