<template>
<!--
  <el-row :gutter="20" align="middle" type="flex" class="pg-row pb-2">
    <el-col :xs="12" :sm="8" :md="7" :lg="4">
      <div class="pg-row-header">
        <label>{{ $i18n.t(labeli18n) }}</label>
      </div>
      <div v-if="!viewMode && required" class="required pg-row-header">
        *
      </div>
    </el-col>
    <el-col :xs="12" :sm="16" :md="17" :lg="20">
      <slot name="view" v-if="viewMode"/>
      <slot name="edit" v-else/>
    </el-col>
  </el-row>  
-->
  <div class="pg-row-container">
    <div class="pg-row-header-col" :style="headerColStyles">
      <label>{{ $i18n.t(labeli18n) }}</label><span v-if="!viewMode && required" class="required">*</span>
    </div>
    <div class="pg-row-control-col">
      <slot name="view" v-if="viewMode"/>
      <slot name="edit" v-else/>
    </div>
  </div>  
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
    labeli18n: String,
    headerColWidth: {
      type: String,
      default: '10rem'
    }
  },
  computed: {
    labelText () {
      return this.$i18n.t(this.labeli18n) + (this.required ? ' *' : '')
    },
    headerColStyles () {
      return {
        'width': this.headerColWidth
      }
    }
  }
}
</script>

<style>
div.pg-row-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 0.5rem;
}
div.pg-row-control-col {
  flex-grow: 1;
}
.pg-row-header-col {
  font-size: 115% !important;
}
.pg-row-header-col label {
  margin-bottom: 0 !important;
}
div.pg-row-control-col .form-check label.form-check-label {
  position: static !important;
}
span.required {
  font-weight: bold;
  color: rgb(112, 57, 218);
  margin-left: 0.3rem;
  vertical-align: -0.2em;
}

/*
.pg-row .form-check label.form-check-label {
  position: static !important;
}
.pg-row label {
  margin-bottom: 0 !important;
}
div.required {
  font-weight: bold;
  color: rgb(112, 57, 218);
  vertical-align: bottom;
  margin-left: 0.3rem;
}
div.pg-row-header {
  display: inline-block;
  font-size: 120%;
}
*/
</style>

