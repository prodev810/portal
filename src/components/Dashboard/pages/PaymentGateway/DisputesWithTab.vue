<template>
  <CustomTabs @load="load">
    <Disputes slot="sandbox" ref="sandbox"/>
    <Disputes slot="live" ref="live"/>
  </CustomTabs>
</template>

<script>
import CustomTabs from './BaseView/CustomTabs'
import Disputes from './BaseView/Disputes'

export default {
	name: 'DisputesWithTabs',
  components: { 
  	CustomTabs,
		Disputes
	},  
  methods: {
    async load(env) {
      await this.$refs[env].loadData(env)
    }
	}
}
</script>