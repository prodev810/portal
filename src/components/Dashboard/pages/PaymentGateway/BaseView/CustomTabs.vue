<template>
  <el-tabs v-model="activeName" tab-position="top" type="card" class="ceevo__tabs">
    <el-tab-pane label="Sandbox" name="sandbox">
      <slot name="sandbox"></slot>
    </el-tab-pane>
    <el-tab-pane label="Live" name="live">
      <slot name="live"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { Tabs, TabPane } from 'element-ui'
import { MUTATE_PG_ENV } from '@/store/types'
export default {
  name: 'tab-frame',
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  data() {
    return {
      activeName: 'sandbox'
    }
  },
  mounted(){
    this.getData(this.activeName)
  },
  watch: {
    activeName: function (newValue, oldValue) {
      console.log('tab name', newValue, oldValue)
      this.getData(newValue)
    }
  },
  methods: {
    async getData(env) {
      this.$store.commit(MUTATE_PG_ENV, env)
      await this.$emit('load', env)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>