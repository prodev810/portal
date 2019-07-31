<template>
  <el-select class="ceevo-select"
             :placeholder="placeholder"
             v-model="selectedValue">
    <el-option v-for="option in options"
              class="ceevo-select"
              :value="option.value"
              :label="option.label"
              :key="option.label">
    </el-option>
  </el-select>
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
    options: Array
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
</style>

