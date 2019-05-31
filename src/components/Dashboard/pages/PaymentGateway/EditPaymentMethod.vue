<template>
  <div>
    <div class="card p-4">
      <h2>{{ $i18n.t('edit_payment_method.header') }}</h2>

      <Spinner v-if="loading"/>

      <CheckBox v-model="methodData.active">{{ $i18n.t('edit_payment_method.cb_active') }}</CheckBox>

      <fg-input v-model="methodData.payment_method" :label="$i18n.t('edit_payment_method.input_name')" required :maxLength="50"/>      
      <fg-input v-model="methodData.code" :label="$i18n.t('edit_payment_method.input_code')" required :maxLength="255"/>
      <fg-input v-model="methodData.required_token" :label="$i18n.t('edit_payment_method.required_token')" required :maxLength="20"/>

      <label>{{ $i18n.t('edit_payment_method.input_description') }}</label>
      <el-input v-model="methodData.description" type="textarea" rows="5" maxlength="1000"/>

      <fg-input v-model="methodData.logo" :label="$i18n.t('edit_payment_method.input_logo')" :maxLength="255"></fg-input>

      <CheckBox v-model="methodData.active">{{ $i18n.t('edit_payment_method.cb_chargeback_risk') }}</CheckBox>
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">{{ $i18n.t('edit_payment_method.btn_save') }}</p-button>      
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('edit_payment_method.btn_cancel') }}</p-button>
    </div>
  </div>
</template>

<script>
import { SHOW_TOAST_MESSAGE, ACTION_PG_GET_PAYMENT_METHODS, ACTION_PG_SET_PAYMENT_METHOD } from '@/store/types'
import PButton from "@/components/UIComponents/Button"
import Spinner from "@/components/UIComponents/Spinner"
import CheckBox from "@/components/UIComponents/Inputs/Checkbox"

export default {
  name: 'EditPaymentMethod',
  components: {
    PButton,
    Spinner,
    CheckBox
  },
  data () {
    return {
      loading: true,
      methodData: {}
    }
  },
  async created () {
    await this.$store.dispatch(ACTION_PG_GET_PAYMENT_METHODS)
    this.getData()
    this.loading = false
  },
  methods: {
    getData () {
      let pm = this.$store.state.paymentGateway.paymentMethod.filter(value => value.code === this.$route.params.code)

      if (pm.length > 0) {
        this.methodData = pm[0]
      } else {
        this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$i18n.t('edit_payment_method.error_unknown_code') + this.$route.params.code, status: 'danger' })
      }      
    },
    async onSave () {
      await this.$store.dispatch(ACTION_PG_SET_PAYMENT_METHOD, this.methodData)
      // go back
      this.onCancel()
    },
    onCancel () {
      this.$router.push('/payment-gateway/settings')
    }
  }
}
</script>

<style>
.buttons {
  display: flex;
  justify-content: center;
}
</style>


