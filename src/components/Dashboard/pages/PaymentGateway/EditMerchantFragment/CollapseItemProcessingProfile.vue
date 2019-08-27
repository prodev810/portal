<template>
  <div>
    <!-- collapse-item -->
    <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_processing_profile')" :name="collapseItem">
      <PGAccordionTab @add="modalAddProcessingProfile = true"
                      @history="modalAddProcessingProfileFee = true"
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

    <!-- modal -->
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
        <p-button type="primary" @click="add()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
      </template>
    </modal>

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
        <p-button type="primary" @click="addFee()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
      </template>
    </modal>

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
        <p-button type="primary" @click="close('modalProcessingProfileFeeHistory')">{{ $i18n.t('payment_gateway.button_close') }}</p-button>
      </template>
    </modal>
  </div>
</template>

<script>
import CollapseItemMixin from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemMixin'

export default {
  name: 'collapse-item-processing-profile',
  mixins: [CollapseItemMixin],
  props: {
    currencies: {
      type: Array,
      required: true,
    },
    merchantId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      modalAddProcessingProfile: false,
      modalAddProcessingProfileFee: false,
      modalProcessingProfileFeeHistory: false,
      newProcessingProfileData: {},
      newProcessingProfileFee: {},
      headerProcessingProfile: [
        { name: 'business_type', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.business_type' },
        { name: 'description', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.description' },
        { name: 'float_account', i18n: 'payment_gateway.merchant.edit_merchant.headerProcessingProfile.float_account' }
      ],
      headerProcessingProfileFeeHistory: [
        { name: 'business_type', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.business_type' },
        { name: 'description', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.description' },
        { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerFeeHistory.effective_date' }
      ],
      dataProcessingProfile: [ //TODO fake Processing Profile history
        { business_type: 'Credit card/Refund', description: 'miki_FeeAmount @ USD 0.02', float_account: 'masterpayment' },
        { business_type: 'Credit card/Refund', description: 'beryl_FreeAmount @ USD 0.02', float_account: 'masterpayment-EUR' }
      ],
    }
  },
  methods: {
    close(modalName){
        this[modalName] = false;
    },
    async add() {
    },
    async addFee() {

    },
    async getData() {
      try {
        this.tableLoading = true;
        // const data = await this.$http.acchttp.get('/float-account/search', { merchantId: this.merchantId })
        // console.log(data)
        // this.listData = data.content;
        // this.tableLoading = false;
      } catch (e) {
        console.error(e)
        this.tableLoading = false;
      }
    },
    onProcessingProfileFeeHistory (index) {
      this.modalProcessingProfileFeeHistory = true
    },
  }
}
</script>

<style scoped>

</style>