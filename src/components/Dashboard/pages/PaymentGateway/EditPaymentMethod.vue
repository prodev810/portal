<template>
  <div>
    <div class="card p-4">
      <h2>{{ $i18n.t(viewMode ? 'edit_payment_method.view_header' : 'edit_payment_method.edit_header') }}</h2>

      <Spinner v-if="loading"/>

      <div class="form-contents">
        <PGRow labeli18n="edit_payment_method.cb_active" :viewMode="viewMode">
          <CheckBox slot="view" v-model="methodData.active" :disabled="true"/>
          <CheckBox slot="edit" v-model="methodData.active" :disabled="false"/>
        </PGRow>         

        <PGRow labeli18n="edit_payment_method.input_name" required :viewMode="viewMode">
          <span slot="view">{{ methodData.payment_method }}</span>  
          <fg-input slot="edit" v-model="methodData.payment_method" required :maxLength="50"/>      
        </PGRow>  

        <PGRow labeli18n="edit_payment_method.input_code" required :viewMode="viewMode">
          <span slot="view">{{ methodData.code }}</span>  
          <fg-input slot="edit" v-model="methodData.code" required :maxLength="255"/>       
        </PGRow>  
        
        <PGRow labeli18n="edit_payment_method.required_token" required :viewMode="viewMode">
          <span slot="view">{{ methodData.required_token }}</span>  
          <fg-input slot="edit" v-model="methodData.required_token" required :maxLength="20"/>         
        </PGRow>    

        <PGRow labeli18n="edit_payment_method.input_description" :viewMode="viewMode">
          <span slot="view">{{ methodData.description }}</span>  
          <el-input slot="edit" v-model="methodData.description" type="textarea" rows="5" maxlength="1000"/>        
        </PGRow>                          

        <PGRow labeli18n="edit_payment_method.input_logo" :viewMode="viewMode">
          <span slot="view">{{ methodData.logo }}</span>  
          <fg-input slot="edit" v-model="methodData.logo" :maxLength="255"/>
        </PGRow>  

        <PGRow labeli18n="edit_payment_method.cb_chargeback_risk" :viewMode="viewMode">
          <CheckBox slot="view" v-model="methodData.chargeback_risk" :disabled="true"/>
          <CheckBox slot="edit" v-model="methodData.chargeback_risk" :disabled="false"/>
        </PGRow> 
      </div>
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">{{ $i18n.t(viewMode ? 'edit_payment_method.btn_edit' : 'edit_payment_method.btn_save') }}</p-button>      
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('edit_payment_method.btn_cancel') }}</p-button>
    </div>
  </div>
</template>

<script>
import { SHOW_TOAST_MESSAGE, ACTION_PG_GET_PAYMENT_METHODS, ACTION_PG_SET_PAYMENT_METHOD } from '@/store/types'
import PButton from "@/components/UIComponents/Button"
import Spinner from "@/components/UIComponents/Spinner"
import CheckBox from "@/components/UIComponents/Inputs/Checkbox"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'

export default {
  name: 'EditPaymentMethod',
  components: {
    PButton,
    Spinner,
    CheckBox,
    PGRow
  },
  data () {
    return {
      loading: true,
      viewMode: true, // by default View mode
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
      if (this.viewMode) {
        this.viewMode = false
      } else {
        await this.$store.dispatch(ACTION_PG_SET_PAYMENT_METHOD, this.methodData)
        // go back
        this.onCancel()
      }
    },
    onCancel () {
      if (this.viewMode) {
        this.$router.push('/payment-gateway/settings')
      } else {
        this.viewMode = true
      }      
    }
  }
}
</script>

<style>
.buttons {
  display: flex;
  justify-content: center;
}
.form-contents label {
  font-weight: bold;
  color: #000000 !important;
}
div.form-group {
  margin-bottom: 0 !important;
}
</style>


