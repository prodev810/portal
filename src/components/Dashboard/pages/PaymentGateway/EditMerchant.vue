<template>
  <div class="pg-edit-merchant">
    <div class="card p-4">
      <h2>{{ $i18n.t('payment_gateway.merchant.edit_merchant.' + (viewMode ? 'view_header' : 'edit_header')) }}</h2>

      <Spinner v-if="loading"/>

      <el-row :gutter="20">
        <el-col :xs="24" :lg="10" :xl="8">
          <div class="form-contents">
            <PGRow labeli18n="payment_gateway.merchant.merchantHeader.merchant_name" required :viewMode="viewMode">
              <span slot="view">{{ merchantData.merchant_name }}</span>  
              <fg-input slot="edit" v-model="merchantData.merchant_name" required :maxLength="50"/>      
            </PGRow>  

            <PGRow labeli18n="payment_gateway.merchant.merchantHeader.short_code" required :viewMode="viewMode">
              <span slot="view">{{ merchantData.short_code }}</span>  
              <fg-input slot="edit" v-model="merchantData.short_code" required :maxLength="255"/>       
            </PGRow>  

            <PGRow labeli18n="payment_gateway.merchant.merchantHeader.merchant_id" required :viewMode="viewMode">
              <span slot="view">{{ merchantData.merchant_id }}</span>  
              <fg-input slot="edit" v-model="merchantData.merchant_id" required :maxLength="255"/>       
            </PGRow>  
          </div>
        </el-col>

        <el-col :xs="24" :lg="14" :xl="16">
          <collapse class="pg-merchant-collapse" style="margin-top: -20px">
            <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_float_account')" name="1">
              <PGAccordionTab @add="modalAddFloatAccount = true" :btnHistory="false">
                <el-table slot="table" stripe
                          :data="dataFloatAccount"
                          style="width: 100%">
                  <el-table-column v-for="(col, index) in headerFloatAccount"
                                  :key="index"
                                  :prop="col.name"
                                  :label="$i18n.t(col.i18n)">
                  </el-table-column>
                </el-table>                  
              </PGAccordionTab>
            </collapse-item>

            <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_processing_profile')" name="2">
              <PGAccordionTab @add="modalAddProcessingProfile = true" 
                              @history="onProcessingProfileAddFee" 
                              btnHistoryCaption="payment_gateway.button_add_fee">
                <el-table slot="table" stripe
                          :data="dataProcessingProfile"
                          style="width: 100%">
                  <el-table-column v-for="(col, index) in headerProcessingProfile"
                                  :key="index"
                                  :prop="col.name"
                                  :label="$i18n.t(col.i18n)">
                  </el-table-column>

                  <el-table-column fixed="right">
                    <template slot-scope="scope">
                      <p-button @click="onProcessingProfileFeeHistory(scope.$index)" type="primary" size="sm" outline>Fee History</p-button>
                    </template>
                  </el-table-column>
                </el-table>                  
              </PGAccordionTab>            
            </collapse-item>

            <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_reserve')" name="3">
              <PGAccordionTab @add="modalAddReserve = true">
                <el-table slot="table" stripe
                          :data="dataReserve"
                          style="width: 100%">
                  <el-table-column v-for="(col, index) in headerReserve"
                                  :key="index"
                                  :prop="col.name"
                                  :label="$i18n.t(col.i18n)">
                  </el-table-column>
                </el-table>                  
              </PGAccordionTab>                        
            </collapse-item>

            <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_settlement_profile')" name="4">
              <PGAccordionTab @add="modalAddSettlementProfile = true">
                <el-table slot="table" stripe
                          :data="dataSettlementProfile"
                          style="width: 100%">
                  <el-table-column v-for="(col, index) in headerSettlementProfile"
                                  :key="index"
                                  :prop="col.name"
                                  :label="$i18n.t(col.i18n)">
                  </el-table-column>
                </el-table>                  
              </PGAccordionTab>                        
            </collapse-item>

            <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_settlement_bank_account')" name="5">
              <div>
                No data
              </div>
            </collapse-item>
          </collapse>

          <!-- ADD FLOAT ACCOUNT -->
          <modal :show.sync="modalAddFloatAccount"
                 headerClasses="justify-content-center pg-merchant-modal-header" 
                 bodyClasses="pg-merchant-modal-body"
                 footerClasses="pg-merchant-modal-footer">
            <h4 slot="header" class="title">{{ $i18n.t('payment_gateway.merchant.edit_merchant.add_float_account') }}</h4>

            <div class="form-contents">
              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.headerFloatAccount.name" :viewMode="false" required>
                <fg-input slot="edit" v-model="newFloatAccountData.name" required :maxLength="255"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.choose_currency" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Currency"
                           v-model="newFloatAccountData.currency">
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.opening_balance" :viewMode="false">
                <fg-input slot="edit" v-model="newFloatAccountData.opening_balance" required :maxLength="255"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.date" :viewMode="false">
                <el-date-picker v-model="newFloatAccountData.date" 
                                type="date"
                                slot="edit" 
                                placeholder="Pick date"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.default_float" :viewMode="false">
                <CheckBox slot="edit" v-model="newFloatAccountData.default_float" :disabled="false"/>
              </PGRow>         
            </div>                        

            <template slot="footer">
              <p-button type="info" @click.native="modalAddFloatAccount = false">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
            </template> 
          </modal>
  
          <!-- PROCESSING PROFILE -->
          <modal :show.sync="modalAddProcessingProfile"
                 headerClasses="justify-content-center pg-merchant-modal-header" 
                 bodyClasses="pg-merchant-modal-body"
                 footerClasses="pg-merchant-modal-footer">
            <h4 slot="header" class="title">{{ $i18n.t('payment_gateway.merchant.edit_merchant.add_processing_profile') }}</h4>

            <div class="form-contents">
              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.float_account" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Float account"
                           v-model="newProcessingProfileData.float_account">                           
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.processing_type" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Processing type"
                           v-model="newProcessingProfileData.float_account">                           
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.transaction_type" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Transaction type"
                           v-model="newProcessingProfileData.float_account">                           
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         
            </div>                        

            <template slot="footer">
              <p-button type="info" @click.native="modalAddProcessingProfile = false">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
            </template> 
          </modal>

          <!-- PROCESSING PROFILE ADD FEE -->
          <modal :show.sync="modalAddProcessingProfileFee"
                 headerClasses="justify-content-center pg-merchant-modal-header" 
                 bodyClasses="pg-merchant-modal-body"
                 footerClasses="pg-merchant-modal-footer">
            <h4 slot="header" class="title">{{ $i18n.t('payment_gateway.merchant.edit_merchant.add_fee') }}</h4>

            <div class="form-contents">
              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.processing_profile" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Processing profile"
                           v-model="newProcessingProfileFee.processing_profile">                           
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.apply_all" :viewMode="false">
                <CheckBox slot="edit" v-model="newProcessingProfileFee.apply_all" :disabled="false"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.fee_name" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Fee name"
                           v-model="newProcessingProfileFee.fee_name">                           
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.fee" :viewMode="false" required>
                <fg-input slot="edit" v-model="newProcessingProfileFee.fee" required :maxLength="255"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.effective_date" :viewMode="false" required>
                <el-date-picker v-model="newProcessingProfileFee.effective_date" 
                                type="date"
                                slot="edit" 
                                placeholder="Pick effective date"/>
              </PGRow>         
            </div>                        

            <template slot="footer">
              <p-button type="info" @click.native="modalAddProcessingProfileFee = false">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
            </template> 
          </modal>

          <!-- PROCESSING PROFILE FEE HISTORY -->
          <modal :show.sync="modalProcessingProfileFeeHistory"
                 headerClasses="justify-content-center pg-merchant-modal-header" 
                 bodyClasses="pg-merchant-modal-body"
                 footerClasses="pg-merchant-modal-footer">

            <h4 slot="header" class="title">{{ $i18n.t('payment_gateway.merchant.edit_merchant.fee_history') }}</h4>

            <el-table stripe
                      :data="dataProcessingProfile"
                      style="width: 100%">
              <el-table-column v-for="(col, index) in headerProcessingProfileFeeHistory"
                              :key="index"
                              :prop="col.name"
                              :label="$i18n.t(col.i18n)">
              </el-table-column>
            </el-table>                  

            <template slot="footer">
              <p-button type="info" @click.native="modalProcessingProfileFeeHistory = false">{{ $i18n.t('payment_gateway.button_close') }}</p-button>
            </template> 
          </modal>

          <!-- RESERVE -->
          <modal :show.sync="modalAddReserve"
                 headerClasses="justify-content-center pg-merchant-modal-header" 
                 bodyClasses="pg-merchant-modal-body"
                 footerClasses="pg-merchant-modal-footer">
            <h4 slot="header" class="title">{{ $i18n.t('payment_gateway.merchant.edit_merchant.add_reserve') }}</h4>

            <div class="form-contents">
              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.headerReserve.percentage" :viewMode="false" required>
                <fg-input slot="edit" v-model="newReserve.percentage" required :maxLength="255"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.headerReserve.retention_period" :viewMode="false" required>
                <fg-input slot="edit" v-model="newReserve.retention_period" required :maxLength="255"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.date" :viewMode="false" required>
                <el-date-picker v-model="newReserve.date" 
                                type="date"
                                slot="edit" 
                                placeholder="Pick date"/>
              </PGRow>         
            </div>                        

            <template slot="footer">
              <p-button type="info" @click.native="modalAddReserve = false">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
            </template> 
          </modal>          

          <!-- SETTLEMENT PROFILE -->
          <modal :show.sync="modalAddSettlementProfile"
                 headerClasses="justify-content-center pg-merchant-modal-header" 
                 bodyClasses="pg-merchant-modal-body"
                 footerClasses="pg-merchant-modal-footer">
            <h4 slot="header" class="title">{{ $i18n.t('payment_gateway.merchant.edit_merchant.add_settlement_profile') }}</h4>

            <div class="form-contents">
              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.choose_currency" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Currency"
                           v-model="newSettlementProfile.currency">
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.headerSettlementProfile.interval" :viewMode="false" required>
                <el-select slot="edit" class="select-default"
                           placeholder="Interval"
                           v-model="newSettlementProfile.interval">
                  <el-option v-for="option in currencies"
                            class="select-default"
                            :value="option.value"
                            :label="option.label"
                            :key="option.label">
                  </el-option>
                </el-select>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.fee" :viewMode="false" required>
                <fg-input slot="edit" v-model="newSettlementProfile.fee" required :maxLength="255"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.effective_date" :viewMode="false" required>
                <el-date-picker v-model="newSettlementProfile.effective_date" 
                                type="date"
                                slot="edit" 
                                placeholder="Pick effective date"/>
              </PGRow>         
            </div>                        

            <template slot="footer">
              <p-button type="info" @click.native="modalAddSettlementProfile = false">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
            </template> 
          </modal>        

        </el-col>
      </el-row>
    </div>

    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">{{ $i18n.t(viewMode ? 'edit_payment_method.btn_edit' : 'edit_payment_method.btn_save') }}</p-button>      
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('edit_payment_method.btn_cancel') }}</p-button>
    </div>
  </div>
</template>

<script>
import {
  SHOW_TOAST_MESSAGE,
  ACTION_PG_GET_MERCHANTS
} from '@/store/types'
import Collapse from '@/components/UIComponents/Collapse/Collapse'
import CollapseItem from '@/components/UIComponents/Collapse/CollapseItem'
import Modal from '@/components/UIComponents/Modal'
import Spinner from '@/components/UIComponents/Spinner'
import CheckBox from "@/components/UIComponents/Inputs/Checkbox"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'
import PGAccordionTab from '@/components/Dashboard/pages/PaymentGateway/PGAccordionTab'

export default {
  name: 'EditMerchant',
  components: {    
    Collapse, 
    CollapseItem,
    Modal,
    CheckBox,
    Spinner,
    PButton,
    PGRow,
    PGAccordionTab,
    RegularTable
  },
  data () {
    return {
      loading: true,
      viewMode: true,
      merchantData: {},      
      // Float account
      headerFloatAccount: [
        { name: 'name', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.name' },
        { name: 'balance', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.balance' },
        { name: 'last_update', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.last_update' }
      ],
      dataFloatAccount: [
        { name: 'masterpayment-EUR', balance: 'EUR 9998.92', last_update: '2019-03-01 12:14:06.0' },
        { name: 'masterpayment', balance: 'EUR 9999.00', last_update: '2019-03-01 11:51:43.0' }
      ],
      modalAddFloatAccount: false,
      newFloatAccountData: {},
      // Processing profile
      headerProcessingProfile: [
        { name: 'business_type', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.business_type' },
        { name: 'description', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.description' },
        { name: 'float_account', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.float_account' }
      ],
      dataProcessingProfile: [
        { business_type: 'Credit card/Refund', description: 'miki_FeeAmount @ USD 0.02', float_account: 'masterpayment' },
        { business_type: 'Credit card/Refund', description: 'beryl_FreeAmount @ USD 0.02', float_account: 'masterpayment-EUR' }
      ],
      modalAddProcessingProfile: false,
      newProcessingProfileData: {},
      modalAddProcessingProfileFee: false,
      newProcessingProfileFee: {},
      modalProcessingProfileFeeHistory: false,
      headerProcessingProfileFeeHistory: [
        { name: 'business_type', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.business_type' },
        { name: 'description', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.description' },
        { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.effective_date' }
      ],
      // Reserve
      headerReserve: [
        { name: 'percentage', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.percentage' },
        { name: 'retention_period', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.retention_period' },
        { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.effective_date' }
      ],
      dataReserve: [
        { percentage: '10%', retention_period: '180 Days', effective_date: '2018-08-31' }
      ],
      modalAddReserve: false,
      newReserve: {},
      // Settlement profile
      headerSettlementProfile: [
        { name: 'interval', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.interval' },
        { name: 'currency', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.currency' },
        { name: 'fee', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.fee' },
        { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.effective_date' }
      ],
      dataSettlementProfile: [
        { interval: '7 Day', currency: 'EUR(€)', fee: '250.00', effective_date: '2018-08-31' }
      ],
      modalAddSettlementProfile: false,
      newSettlementProfile: {},
      // dummy data
      currencies: [
        { value: 'EUR', label: 'Euro' },
        { value: 'USD', label: 'US Dolllar' }
      ],
      headerSettlementBankAcoount: [

      ]
    }
  },
  async created () {
    await this.$store.dispatch(ACTION_PG_GET_MERCHANTS)
    this.getData()
    this.loading = false
  },
  methods: {
    getData () {
      let pm = this.$store.state.paymentGateway.merchants.filter(value => value.merchant_id === this.$route.params.id)

      if (pm.length > 0) {
        this.merchantData = pm[0]
      } else {
        this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$i18n.t('payment_gateway.merchant.edit_merchant.error_unknown_id') + this.$route.params.id, status: 'danger' })
      }      
    },
    onSave () {
      if (this.viewMode) {
        this.viewMode = false
      } else {
        //await this.$store.dispatch(ACTION_PG_SET_PAYMENT_METHOD, this.methodData)
        // go back
        this.onCancel()
      }
    },
    onCancel () {
      if (this.viewMode) {
        this.$router.push('/payment-gateway/merchant')
      } else {
        this.viewMode = true
      }      
    },
    onProcessingProfileFeeHistory (index) {
      this.modalProcessingProfileFeeHistory = true
    },
    onProcessingProfileAddFee () {
      this.modalAddProcessingProfileFee = true
    }
  }
}
</script>

<style>
.pg-merchant-modal-header {
  padding: 0.5rem !important;  
}
.pg-merchant-modal-body {
  padding: 1rem !important;
}
.pg-merchant-modal-footer {
  padding: 0 1rem 0 0 !important;
}
.pg-merchant-collapse div.card-header {
  font-weight: bold;
}
.pg-merchant-collapse div.card-body {
  padding: 0 !important;
}
div.pg-edit-merchant th {
  text-transform: capitalize;
}
div.pg-edit-merchant h4 {
  text-transform: capitalize;
}
</style>