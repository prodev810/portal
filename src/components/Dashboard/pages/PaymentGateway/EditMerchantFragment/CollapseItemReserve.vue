<template>
  <div>
    <!-- collapse-item -->
    <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_reserve')" :name="collapseItem">
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

    <!-- modal -->
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
  </div>
</template>

<script>
import CollapseItemMixin from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemMixin'

export default {
  name: 'collapse-item-reserve',
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
      modalAddReserve: false,
      headerReserve: [
        { name: 'percentage', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.percentage' },
        { name: 'retention_period', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.retention_period' },
        { name: 'effective_date', i18n: 'payment_gateway.merchant.edit_merchant.headerReserve.effective_date' }
      ],
      dataReserve: [ //TODO fake Reserve data
        { percentage: '10%', retention_period: '180 Days', effective_date: '2018-08-31' }
      ],
      newReserve: {},
    }
  },
  methods: {
    editReserve(){
      this.modalAddReserve = false;
      console.log( 'newReserve',this.newReserve );
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