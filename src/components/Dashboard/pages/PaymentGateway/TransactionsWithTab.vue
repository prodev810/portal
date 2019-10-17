<template>
  <custom-tab @load="load">
    <transactions-view slot="sandbox" ref="sandbox"/>
    <transactions-view slot="live" ref="live"/>
  </custom-tab>
</template>

<script>
import CustomTabs from './BaseView/CustomTabs'
import Transactions from './BaseView/Transactions'

export default {
	name: 'Transactions',
  components: { 
  	'custom-tab': CustomTabs,
		'transactions-view': Transactions  
	},  
  methods: {
    async load(env) {
      await this.$refs[env].loadData(env)
    }
	}
}
</script>