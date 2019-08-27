<template>
  <div>
    <!-- collapse-item -->
    <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_settlement_profile')" :name="collapseItem">
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

    <!-- modal -->
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
  </div>
</template>

<script>
import CollapseItemMixin from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemMixin'

export default {
  name: 'collapse-item-settlement-profile',
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
      modalAddSettlementProfile: false,
      headerSettlementProfile: [
        { name: 'interval', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.interval' },
        { name: 'currency', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.currency' },
        { name: 'fee', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.fee' },
        { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerSettlementProfile.effective_date' }
      ],
      dataSettlementProfile: [ //TODO fake Settlement Profile data
        { interval: '7 Day', currency: 'EUR(€)', fee: '250.00', effective_date: '2018-08-31' }
      ],
      newSettlementProfile: {},
    }
  },
  methods: {
    editSettlementProfile(){
      this.modalAddSettlementProfile = false;
      console.log( 'newSettlementProfile',this.newSettlementProfile );
    },
    async save() {
      try {
        console.log(this.modalData);
        await this.$http.acchttp.post('/float-account', {
          'balance': this.modalOpen.opening_balance,
          'currency': {
            'code': this.modalData.currency,
          },
          'description': this.modalData.name,
          'is_active': this.modalData.default_float,
          'merchant_id': this.merchantId
        })
        this.modalOpen = false;
        this.getData();
      } catch (e) {
        console.error(e)
      }
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
    }
  }
}
</script>

<style scoped>

</style>