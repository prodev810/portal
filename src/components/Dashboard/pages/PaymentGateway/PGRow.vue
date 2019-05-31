<template>
  <el-row :gutter="20" align="middle" type="flex" class="pg-row pb-2">
    <el-col :xs="12" :sm="8" :md="7" :lg="4">
      <label>{{ labelText }}</label>
    </el-col>
    <el-col :xs="12" :sm="16" :md="17" :lg="20">
      <slot name="view" v-if="viewMode"/>
      <slot name="edit" v-else/>
    </el-col>
  </el-row>  
</template>

<script>
export default {
  name: 'PGRow',
  props: {
    viewMode: Boolean,
    required: {
      type: Boolean,
      default: false
    },
    labeli18n: String
  },
  computed: {
    labelText () {
      return this.$i18n.t(this.labeli18n) + (this.required ? ' *' : '')
    }
  }
}
</script>

<style>
.pg-row .form-check label.form-check-label {
  position: static !important;
}
</style>

