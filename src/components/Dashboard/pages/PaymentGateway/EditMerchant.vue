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

        <el-col :cols="24" class="mt-0 mb-2">
          <p-button type="primary" round wide size="sm" @click="on3DSecureSetting()" class="mr-2">{{ $i18n.t('payment_gateway.merchant.edit_merchant.btn_3d_secure_settings') }}</p-button>
          <p-button type="primary" round wide size="sm" @click="onFraudSetting()" class="mr-2">{{ $i18n.t('payment_gateway.merchant.edit_merchant.btn_fraud_settings') }}</p-button>          
        </el-col>

        <el-col :xs="24" :lg="14" :xl="16">
          <collapse class="pg-merchant-collapse">
            <!-- new -->
            <collapse-item-float-account :merchantId="$route.params.id" :currencies="currencies" :collapseItem="1"></collapse-item-float-account>
            <collapse-item-processing-profile :merchantId="$route.params.id" :currencies="currencies" :collapseItem="2"></collapse-item-processing-profile>
            <collapse-item-reserve :merchantId="$route.params.id" :currencies="currencies" :collapseItem="3"></collapse-item-reserve>
            <collapse-item-settlement-profile :merchantId="$route.params.id" :currencies="currencies" :collapseItem="4"></collapse-item-settlement-profile>
            <collapse-item-settlement-bank-account :merchantId="$route.params.id" :currencies="currencies" :collapseItem="5"></collapse-item-settlement-bank-account>

            <!-- old -->
            <!--
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
            -->

            <!--
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
            -->

            <!--
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
            -->

            <!--
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
            -->

            <!--
            <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_settlement_bank_account')" name="5">
              <div>
                No data
              </div>
            </collapse-item>
            -->
          </collapse>

          <!-- ADD FLOAT ACCOUNT -->
          <!--
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
          -->

          <!-- PROCESSING PROFILE -->
          <!--
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
          -->

          <!-- PROCESSING PROFILE ADD FEE -->
          <!--
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
          -->

          <!-- PROCESSING PROFILE FEE HISTORY -->
          <!--
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
          -->

          <!-- RESERVE -->
          <!--
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
          -->

          <!-- SETTLEMENT PROFILE -->
          <!--
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
          -->
        </el-col>
      </el-row>
    </div>

    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">{{ $i18n.t(viewMode ? 'edit_payment_method.btn_edit' : 'edit_payment_method.btn_save') }}</p-button>
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('edit_payment_method.btn_cancel') }}</p-button>
    </div>

    <!--
		<DetailsModal v-model="modal3DSecureSettingVisible"
									header="payment_gateway.merchant.edit_merchant.modal_3d_secure.header"
									:data="modal3DSecureSettingData"
									:description="modal3DSecureSettingDescription"
									i18base="payment_gateway.merchant.modal_details.edit_merchant.modal_3d_secure."/>-->

  	<modal :show="modal3DSecureSettingVisible"
           footerClasses="justify-content-center"
           type="notice"
           modalClasses="details-modal">
      <h5 slot="header" class="modal-title">{{ $t('payment_gateway.merchant.edit_merchant.modal_3d_secure.header') }}</h5>

      <div class="d-flex flex-column edit-modal-column">
        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.modal_3d_secure.tds_merchant_id" :viewMode="false" required>
          <template slot="edit">
            <input class="form-control"
                       v-model="modal3DSecureSettingData.tds_merchant_id"
                       v-validate.initial="'required'"
                       name="tds_merchant_id"
                       data-vv-as="client id"
                       data-vv-scope="3dssettings"/>
            <div class="validation-error">{{ errors.first('tds_merchant_id', '3dssettings') }}</div>
          </template>
        </PGRow>

        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.modal_3d_secure.tds_merchant_password" :viewMode="false" required>
          <template slot="edit">
            <input class="form-control"
                   v-model="modal3DSecureSettingData.tds_merchant_password"
                   v-validate.initial="'required'"
                   name="tds_merchant_password"
                   data-vv-as="client password"
                   data-vv-scope="3dssettings"/>
            <div class="validation-error">{{ errors.first('tds_merchant_password', '3dssettings') }}</div>
          </template>
        </PGRow>

        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.modal_3d_secure.encryption_key" :viewMode="false" required>
          <template slot="edit">
            <input class="form-control"
                   v-model="modal3DSecureSettingData.encryption_key"
                   v-validate.initial="'required'"
                   name="encryption_key"
                   data-vv-as="encryption key"
                   data-vv-scope="3dssettings"/>
            <div class="validation-error">{{ errors.first('encryption_key', '3dssettings') }}</div>
          </template>
        </PGRow>

        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.modal_3d_secure.hash_key" :viewMode="false" required>
          <template slot="edit">
            <input class="form-control"
                   v-model="modal3DSecureSettingData.hash_key"
                   v-validate.initial="'required'"
                   name="hash_key"
                   data-vv-as="hash key"
                   data-vv-scope="3dssettings"/>
            <div class="validation-error">{{ errors.first('hash_key', '3dssettings') }}</div>
          </template>
        </PGRow>
      </div>

      <div slot="footer" class="w-100 d-flex justify-content-center">
        <p-button type="default" 
                  @click="onSave3DSecureSettingVisible()"
                  :disabled="errors.any('3dssettings')"
                  class="btn btn-round mr-2">
          {{ $t(this.modal3DSecureSettingCreate ? 'payment_gateway.button_create' : 'payment_gateway.button_save') }}
        </p-button>

        <p-button type="default" 
                  @click="modal3DSecureSettingVisible = false" 
                  class="btn btn-round btn-default">
          {{ $t('payment_gateway.button_close') }}
        </p-button>
      </div>
	  </modal>

		<DetailsModal v-model="modalFraudSettingVisible"
									header="payment_gateway.merchant.edit_merchant.modal_fraud.header"
									:data="modalFraudSettingData"
									:description="modalFraudSettingDescription"
									i18base="payment_gateway.merchant.modal_details.edit_merchant.modal_fraud."/>
  </div>
</template>

<script>
import getHttpInstance from '@/store/modules/PGInstance.js' 

import {mapActions, mapState} from 'vuex';
import {
    SHOW_TOAST_MESSAGE,
    ACTION_PG_GET_MERCHANTS,
    ACTION_PG_GET_CURRENCIES,
    ACTION_PG_GET_SINGLE_MERCHANT,
    MUTATE_PG_ENV,
    // ACTION_PG_GET_MERCHANT_PROCESSING_PROFILE
} from '@/store/types'
import Collapse from '@/components/UIComponents/Collapse/Collapse'
import Spinner from '@/components/UIComponents/Spinner'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'
// import CollapseItem from '@/components/UIComponents/Collapse/CollapseItem'
// import Modal from '@/components/UIComponents/Modal'
// import CheckBox from "@/components/UIComponents/Inputs/Checkbox"
// import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
// import PGAccordionTab from '@/components/Dashboard/pages/PaymentGateway/PGAccordionTab'
// import moment from 'moment'
// import CeevoSelect from "@/components/UIComponents/CeevoSelect"

// new
import CollapseItemFloatAccount from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemFloatAccount'
import CollapseItemProcessingProfile from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemProcessingProfile'
import CollapseItemReserve from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemReserve'
import CollapseItemSettlementProfile from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemSettlementProfile'
import CollapseItemSettlementBankAccount from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemSettlementBankAccount'

import Modal from "@/components/UIComponents/Modal"
import DetailsModal from '@/components/Dashboard/pages/PaymentGateway/DetailsModal'
import ProcessURLMixin from '@/components/Dashboard/pages/PaymentGateway/ProcessURLMixin.js'

export default {
  name: 'EditMerchant',
  mixins: [
    ProcessURLMixin
  ],
  components: {
    Collapse,
    Spinner,
    PButton,
    PGRow,
    Modal,
    DetailsModal,    
    // CollapseItem,
    // Modal,
    // CheckBox,
    // PGAccordionTab,
    // RegularTable,
    // CeevoSelect,

    // add
    [CollapseItemFloatAccount.name]: CollapseItemFloatAccount,
    [CollapseItemProcessingProfile.name]: CollapseItemProcessingProfile,
    [CollapseItemReserve.name]: CollapseItemReserve,
    [CollapseItemSettlementProfile.name]: CollapseItemSettlementProfile,
    [CollapseItemSettlementBankAccount.name]: CollapseItemSettlementBankAccount
  },
  data () {
    return {
      loading: true,
      viewMode: true,
      // merchantData: {},
      // Float account
      // headerFloatAccount: [
      //   { name: 'name', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.name' },
      //   { name: 'balance', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.balance' }
      // ],
      // dataFloatAccount: [ //TODO fake Float Account data
      //   { name: 'masterpayment-EUR', balance: 'EUR 9998.92', last_update: '2019-03-01 12:14:06.0' },
      //   { name: 'masterpayment', balance: 'EUR 9999.00', last_update: '2019-03-01 11:51:43.0' }
      // ],
      // modalAddFloatAccount: false,
      // newFloatAccountData: {
          // name:'',
          // currency:'',
          // opening_balance:0,
          // date:'',
          // default_float:false
      // },
      // Processing profile
      // headerProcessingProfile: [
      //   { name: 'business_type', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.business_type' },
      //   { name: 'description', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.description' },
      //   { name: 'float_account', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.float_account' }
      // ],
      // dataProcessingProfile: [ //TODO fake Processing Profile history
      //   { business_type: 'Credit card/Refund', description: 'miki_FeeAmount @ USD 0.02', float_account: 'masterpayment' },
      //   { business_type: 'Credit card/Refund', description: 'beryl_FreeAmount @ USD 0.02', float_account: 'masterpayment-EUR' }
      // ],
      // modalAddProcessingProfile: false,
      // newProcessingProfileData: {},
      // modalAddProcessingProfileFee: false,
      // newProcessingProfileFee: {},
      // modalProcessingProfileFeeHistory: false,
      // headerProcessingProfileFeeHistory: [
      //   { name: 'business_type', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.business_type' },
      //   { name: 'description', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.description' },
      //   { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.effective_date' }
      // ],
      // // Reserve
      // headerReserve: [
      //   { name: 'percentage', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.percentage' },
      //   { name: 'retention_period', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.retention_period' },
      //   { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.effective_date' }
      // ],
      // dataReserve: [ //TODO fake Reserve data
      //   { percentage: '10%', retention_period: '180 Days', effective_date: '2018-08-31' }
      // ],
      // modalAddReserve: false,
      // newReserve: {},
      // Settlement profile
      // headerSettlementProfile: [
      //   { name: 'interval', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.interval' },
      //   { name: 'currency', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.currency' },
      //   { name: 'fee', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.fee' },
      //   { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.effective_date' }
      // ],
      // dataSettlementProfile: [ //TODO fake Settlement Profile data
      //   { interval: '7 Day', currency: 'EUR(€)', fee: '250.00', effective_date: '2018-08-31' }
      // ],
      // modalAddSettlementProfile: false,
      // newSettlementProfile: {},
      // dummy data
      // currencies: [
      //   { value: 'EUR', label: 'Euro' },
      //   { value: 'USD', label: 'US Dolllar' }
      // ],
      // headerSettlementBankAcoount: [],
      merchantData:{
        merchant_id:null,
        short_code: null,//state.paymentGateway.merchants.data.ext_merchant_id,
        merchant_name: null,
      },

      modal3DSecureSettingVisible: false,
      modal3DSecureSettingData: {
        tds_merchant_id: '',
        tds_merchant_password: '',
        encryption_key: '',
        hash_key: ''
      },      
      modal3DSecureSettingDescription: [],
      modal3DSecureSettingCreate: false,

      modalFraudSettingVisible: false,
      modalFraudSettingData: {},
      modalFraudSettingDescription: []
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.env) {
      this.$store.commit(MUTATE_PG_ENV, this.$route.query.env)
    }
  },
  computed: {
    ...mapState({
			env: state => state.paymentGateway.env,      
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
      // getMerchantProcessing: ACTION_PG_GET_MERCHANT_PROCESSING_PROFILE,
      getCurrencyList:ACTION_PG_GET_CURRENCIES
    }),
    // formatDate (date) {
    //   return moment(date).format('YYYY-MM-DD hh:mm:ss')
    // },
    getData () {
      if( !this.$route.params.id ) return false;

      this.getMerchant(this.$route.params.id).then(data=>{
        this.merchantData.merchant_id = data.merchant_id;
        this.merchantData.short_code  = data.ext_merchant_id;
        this.merchantData.merchant_name = data.merchant_name;
      }).catch(e => {
        this.merchantData.merchant_id = '';
        this.merchantData.short_code  = '';
        this.merchantData.merchant_name = '';
      });

      // this.getMerchantProcessing(this.$route.params.id).then( data =>{
      //     console.log( 'PROCESS', data );
      // });
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
    async on3DSecureSetting () {
			this.loading = true

			try {
        this.modal3DSecureSettingCreate = false

        try {
          let response = await getHttpInstance(this.env).get(`/data/merchant3DSProfiles/search/findTopByMerchantId?merchantId=${this.merchantData.merchant_id}`)

          console.log(response.data)

          // assign data and make modal visible
          this.modal3DSecureSettingData = response.data
          this.modal3DSecureSettingVisible = true

        } catch (error) {
          if (error.response.status === 404) {
            // Create new
            this.modal3DSecureSettingData = {
              encryption_key: '',
              hash_key: '',
              merchant_id: this.merchantData.merchant_id,
              tds_merchant_id: '',
              tds_merchant_password: ''
            }

            this.modal3DSecureSettingCreate = true
            this.modal3DSecureSettingVisible = true

          } else {
            throw error
          }
        }
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
    },
    async onSave3DSecureSettingVisible () {
      try {
        this.modal3DSecureSettingVisible = false

        if (this.modal3DSecureSettingCreate) {
          let response = await getHttpInstance(this.env).post('/data/merchant3DSProfiles', this.modal3DSecureSettingData)
          console.log(response)

        } else {
          console.log(this.processModalURL(this.modal3DSecureSettingData._links.self.href))

          let response = await getHttpInstance(this.env).patch(this.processModalURL(this.modal3DSecureSettingData._links.self.href), this.modal3DSecureSettingData)
          console.log(response)

          
        }
      } catch (error) {
        this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
      }
    },
    async onFraudSetting () {
			this.loading = true

			try {
        let response = await getHttpInstance(this.env).get(`/data/merchantFDSProfiles/search/findTopByMerchantId?merchantId=${this.merchantData.merchant_id}`)
        
        console.log(response.data)
				// assign data and make modal visible
				this.modalFraudSettingData = response.data
				this.modalFraudSettingVisible = true
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
    }
      // floatAccountEdit(){
      //     this.modalAddFloatAccount = false;
      //     console.log( 'newFloatAccountData',this.newFloatAccountData );
      // },
      // editProcessingProfileData(){
      //     this.modalAddProcessingProfile = false;
      //     console.log( 'newProcessingProfileData',this.newProcessingProfileData );
      // },
      // editnewProcessingProfileFee(){
      //     this.modalAddProcessingProfileFee = false;
      //     console.log( 'newProcessingProfileFee',this.newProcessingProfileFee );
      // },
      // editProcessingProfileFeeHistory(){
      //     this.modalProcessingProfileFeeHistory = false;
      //     console.log( 'headerProcessingProfileFeeHistory',this.headerProcessingProfileFeeHistory );
      // },
      // editReserve(){
      //     this.modalAddReserve = false;
      //     console.log( 'newReserve',this.newReserve );
      // },
      // editSettlementProfile(){
      //     this.modalAddSettlementProfile = false;
      //     console.log( 'newSettlementProfile',this.newSettlementProfile );
      // },
    // onProcessingProfileFeeHistory (index) {
    //   this.modalProcessingProfileFeeHistory = true
    // },
    // onProcessingProfileAddFee () {
    //   this.modalAddProcessingProfileFee = true
    // }
  }
}
</script>

<style lang="scss">
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
.edit-modal-column {
  .pg-row-container {
    align-items: flex-start;

    .pg-row-header-col {
      margin-top: 4px;
    }
  }
}
</style>