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
                  <el-table-column :label="$i18n.t('payment_gateway.merchant.edit_merchant.headerFloatAccount.last_update')">
                    <template slot-scope="scope">
                      {{ formatDate(scope.row.last_update) }}
                    </template>
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
               <CeevoSelect slot="edit"
                             v-model="newFloatAccountData.currency"
                             placeholder="Currency"
                             :options="currencies"/>
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
              <p-button type="primary" @click="floatAccountEdit()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
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
                <CeevoSelect slot="edit" 
                             v-model="newProcessingProfileData.float_account"
                             placeholder="Float account"
                             :options="currencies"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.processing_type" :viewMode="false" required>
                <CeevoSelect slot="edit" 
                             v-model="newProcessingProfileData.processing_type"
                             placeholder="Processing type"
                             :options="currencies"/>                
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.transaction_type" :viewMode="false" required>
                <CeevoSelect slot="edit" 
                             v-model="newProcessingProfileData.transaction_type"
                             placeholder="Transaction type"
                             :options="currencies"/>                
              </PGRow>         
            </div>                        

            <template slot="footer">
              <p-button type="primary" @click="editProcessingProfileData()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
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
                <CeevoSelect slot="edit" 
                             v-model="newProcessingProfileFee.processing_profile"
                             placeholder="Processing profile"
                             :options="currencies"/>                
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.apply_all" :viewMode="false">
                <CheckBox slot="edit" v-model="newProcessingProfileFee.apply_all" :disabled="false"/>
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.fee_name" :viewMode="false" required>
                <CeevoSelect slot="edit" 
                             v-model="newProcessingProfileFee.fee_name"
                             placeholder="Fee name"
                             :options="currencies"/>                
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
              <p-button type="primary" @click="editnewProcessingProfileFee()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
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
              <p-button type="primary" @click="editProcessingProfileFeeHistory()">{{ $i18n.t('payment_gateway.button_close') }}</p-button>
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
              <p-button type="primary" @click="editReserve()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
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
                <CeevoSelect slot="edit" 
                             v-model="newSettlementProfile.currency"
                             placeholder="Currency"
                             :options="currencies"/>                
              </PGRow>         

              <PGRow labeli18n="payment_gateway.merchant.edit_merchant.headerSettlementProfile.interval" :viewMode="false" required>
                <CeevoSelect slot="edit" 
                             v-model="newSettlementProfile.interval"
                             placeholder="Interval"
                             :options="currencies"/>                
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
              <p-button type="primary" @click="editSettlementProfile()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
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
    import {mapActions, mapState} from 'vuex';
import {
    SHOW_TOAST_MESSAGE,
    ACTION_PG_GET_MERCHANTS,
    ACTION_PG_GET_CURRENCIES,
    ACTION_PG_GET_SINGLE_MERCHANT,
    ACTION_PG_GET_PROCESSING_PROFILE,
    ACTION_PG_GET_FLOAT_ACCOUNT
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
import moment from 'moment'
import CeevoSelect from "@/components/UIComponents/CeevoSelect"

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
    RegularTable,
    CeevoSelect
  },
  data () {
    return {
      loading: true,
      viewMode: true,
      // merchantData: {},
      // Float account
      headerFloatAccount: [
        { name: 'name', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.name' },
        { name: 'balance', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.balance' }
      ],
      dataFloatAccount: [
        { name: 'masterpayment-EUR', balance: 'EUR 9998.92', last_update: '2019-03-01 12:14:06.0' },
        { name: 'masterpayment', balance: 'EUR 9999.00', last_update: '2019-03-01 11:51:43.0' }
      ],
      modalAddFloatAccount: false,
      newFloatAccountData: {
          // name:'',
          // currency:'',
          // opening_balance:0,
          // date:'',
          // default_float:false
      },
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
      // currencies: [
      //   { value: 'EUR', label: 'Euro' },
      //   { value: 'USD', label: 'US Dolllar' }
      // ],
      headerSettlementBankAcoount: [

      ],
        merchantData:{
            merchant_id:null,
            short_code: null,//state.paymentGateway.merchants.data.ext_merchant_id,
            merchant_name: null,
        }
    }
  },
    computed: {
        ...mapState({
            currencies:(state) => {

                if( state.paymentGateway.currencies ){
                    let curr = JSON.parse( JSON.stringify( state.paymentGateway.currencies ) );
                    let new_c = curr.map(item =>{
                        return {
                            value: item.currency_code,
                            label: item.currency_code
                        }
                    });
                    return new_c;
                }

            }

        }),
    },
  created () {
    this.getData();
    this.getCurrencyList();
    this.loading = false
  },
  methods: {
      ...mapActions({
          getMerchant: ACTION_PG_GET_SINGLE_MERCHANT,
          getCurrencyList:ACTION_PG_GET_CURRENCIES,
          getProcessingProfile:ACTION_PG_GET_PROCESSING_PROFILE,
          getFloatAccount:ACTION_PG_GET_FLOAT_ACCOUNT
      }),
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD hh:mm:ss')
    },
    getData () {
        if( !this.$route.params.id ) return false;

        this.getMerchant(this.$route.params.id).then(data=>{
            this.merchantData.merchant_id = data.merchant_id;
            this.merchantData.short_code  = data.ext_merchant_id;
            this.merchantData.merchant_name = data.merchant_name;
            this.getPProfile();
            this.getFAccount();
        });
    },
      getPProfile(){
          this.getMerchant(this.$route.params.id).then(data=>{
              console.log( 'data Processing Profile',data );
          });
      },
      getFAccount(){
          this.getFloatAccount(this.$route.params.id).then(data=>{
              console.log( 'data FloatAccount',data );
          });
      },
      floatAccountEdit(){
          this.modalAddFloatAccount = false;
          console.log( 'newFloatAccountData',this.newFloatAccountData );
      },
      editProcessingProfileData(){
          this.modalAddProcessingProfile = false;
          console.log( 'newProcessingProfileData',this.newProcessingProfileData );
      },
      editnewProcessingProfileFee(){
          this.modalAddProcessingProfileFee = false;
          console.log( 'newProcessingProfileFee',this.newProcessingProfileFee );
      },
      editProcessingProfileFeeHistory(){
          this.modalProcessingProfileFeeHistory = false;
          console.log( 'headerProcessingProfileFeeHistory',this.headerProcessingProfileFeeHistory );
      },
      editReserve(){
          this.modalAddReserve = false;
          console.log( 'newReserve',this.newReserve );
      },
      editSettlementProfile(){
          this.modalAddSettlementProfile = false;
          console.log( 'newSettlementProfile',this.newSettlementProfile );
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
div.pg-edit-merchant .el-select,
div.pg-edit-merchant .el-date-editor {
  width: 100%;
}
div.pg-edit-merchant div#accordion div.card-header i.nc-icon {
  color: #8d8d8d;
}
</style>