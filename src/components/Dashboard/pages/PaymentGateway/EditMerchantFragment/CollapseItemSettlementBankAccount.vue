<template>
  <div>
    <!-- collapse-item -->
    <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_settlement_bank_account')" :name="collapseItem">
      <div>
        No data
      </div>
    </collapse-item>
  </div>
</template>

<script>
import CollapseItemMixin from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemMixin'

export default {
  name: 'collapse-item-settlement-bank-account',
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
      modalOpen: false,
      headerFloatAccount: [
        { name: 'description', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.name' },
        { name: 'balance', i18n: 'payment_gateway.merchant.edit_merchant.headerFloatAccount.balance' }
      ],
      listData: [ //TODO fake Float Account data
        // { name: 'masterpayment-EUR', balance: 'EUR 9998.92', last_update: '2019-03-01 12:14:06.0' },
        // { name: 'masterpayment', balance: 'EUR 9999.00', last_update: '2019-03-01 11:51:43.0' }
      ],
      modalData: {
        name:'',
        currency:'',
        opening_balance:0,
        date:'',
        default_float:false
      },
    }
  },
  methods: {
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