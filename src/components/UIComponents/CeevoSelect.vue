<template>
  <div>
    <div :class="[{'div-error-style': error !== ''}]">
      <el-select @change="change"
                class="ceevo-select"
                :placeholder="placeholder"
                v-model="selectedValue">
        <el-option v-for="option in options"
                  class="ceevo-select"
                  :value="option.value"
                  :label="option.label"
                  :key="option.label">
        </el-option>
      </el-select>
    </div>
    <div v-if="error !== ''" class="text-danger invalid-feedback aba__form--error" style="display: block;">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'CeevoSelect',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: [Number, String],
    options: Array,
    error: {
      type: String,
      default: ''
    }
  },
  computed: {
    selectedValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    change (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">
$hoverColor: #999999;

.ceevo-select {
  .el-input:hover {
    input, input::placeholder, .el-input__icon {
      color: $hoverColor !important;
    }
  }
}
.el-select-dropdown__item.ceevo-select.selected {
  background-color: #2ED684;
  color: white;
}
.div-error-style {
  border: 1px solid #ef8157;
}
</style>

