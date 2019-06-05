<template>
  <div>
    <div class="pg-accordion-contents-row pg-accordion-contents-row-header">
      <p-button v-if="btnAdd" type="primary" @click="onAdd()" size="sm" round >{{ $i18n.t('payment_gateway.button_add') }}</p-button>
      <p-button v-if="btnHistory" type="primary" @click="onHistory()" size="sm" round class="ml-2">{{ $i18n.t(btnHistoryCaption) }}</p-button>
    </div>

    <div class="pg-accordion-contents-row">
      <slot name="table"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PGAccordionTab',
  props: {
    btnAdd: {
      type: Boolean,
      default: true
    },
    btnHistory: {
      type: Boolean,
      default: true
    },
    btnHistoryCaption: {
      type: String,
      default: 'payment_gateway.button_history'
    }
  },
  methods: {
    onAdd () {
      this.$emit('add')
    },
    onHistory () {
      this.$emit('history')
    }
  }
}
</script>

<style>
div.pg-accordion-contents-row {
  display: flex;
}
div.pg-accordion-contents-row-header {
  justify-content: flex-end;
}
</style>

