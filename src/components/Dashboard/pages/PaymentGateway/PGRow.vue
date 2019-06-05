<template>
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
</style>

