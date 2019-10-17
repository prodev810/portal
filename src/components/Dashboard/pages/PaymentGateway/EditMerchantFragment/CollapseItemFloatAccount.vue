<template>
  <div>
    <!-- collapse-item -->
    <collapse-item :title="$t('payment_gateway.merchant.edit_merchant.section_float_account')" :name="collapseItem">
      <PGAccordionTab @add="openModal()" :btnHistory="false">
        <el-table slot="table" stripe
                  :data="listData"
                  style="width: 100%"
                  v-loading="tableLoading">
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

    <!-- modal -->
    <modal :show.sync="modalOpen"
            headerClasses="justify-content-center pg-merchant-modal-header"
            bodyClasses="pg-merchant-modal-body"
            footerClasses="pg-merchant-modal-footer">
      <h4 slot="header" class="title">{{ $i18n.t('payment_gateway.merchant.edit_merchant.add_float_account') }}</h4>

      <div class="form-contents">
        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.headerFloatAccount.name" :viewMode="false" required>
          <fg-input slot="edit"
                    v-model="modalData.name"
                    required
                    :maxLength="255"
                    :error="modalDataError.name"
                    ref="nameRef"
                    @input="val => onInput('name', 'nameRef', val)"
                    @blur="event => onBlur('isNameValid', event.target.value)" />
        </PGRow>

        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.choose_currency" :viewMode="false" required>
          <CeevoSelect slot="edit"
                        v-model="modalData.currency"
                        placeholder="Currency"
                        :error="modalDataError.currency"
                        :options="currencies"
                        ref="currencyRef"
                        @change="val => onChange('isCurrencyValid', val)"/>
        </PGRow>

        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.opening_balance" :viewMode="false">
          <fg-input slot="edit"
                    v-model="modalData.balance"
                    required
                    :maxLength="19"
                    :error="modalDataError.balance"
                    ref="balanceRef"
                    @input="val => onInput('balance', 'balanceRef', val)"
                    @blur="event => onBlur('isBalanceValid', event.target.value)" />
        </PGRow>

        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.date" :viewMode="false">
          <el-date-picker v-model="modalData.date"
                          type="date"
                          slot="edit"
                          placeholder="Pick date"/>
        </PGRow>

        <PGRow labeli18n="payment_gateway.merchant.edit_merchant.default_float" :viewMode="false">
          <CheckBox slot="edit"
                    v-model="modalData.defaultFloat"
                    :disabled="false" />
        </PGRow>
      </div>

      <template slot="footer">
        <p-button type="primary" @click="save()">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
      </template>
    </modal>
  </div>
</template>

<script>
import CollapseItemMixin from '@/components/Dashboard/pages/PaymentGateway/EditMerchantFragment/CollapseItemMixin'
import {
  ACTION_PG_GET_FLOAT_ACCOUNT_SEARCH_BY_MERCHANT_ID,
  ACTION_PG_CREATE_FLOAT_ACCOUNT,
  GETTER_PG_FLOAT_ACCOUNTS,
} from '@/store/types'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'collapse-item-float-account',
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
  computed: {
    ...mapGetters({
      listData: GETTER_PG_FLOAT_ACCOUNTS
    })
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
      // listData: [],
      modalData: {},
      modalDataError: {}
    }
  },
  methods: {
    ...mapActions({
      loadApiData: ACTION_PG_GET_FLOAT_ACCOUNT_SEARCH_BY_MERCHANT_ID,
      createData: ACTION_PG_CREATE_FLOAT_ACCOUNT
    }),
    resetModalData() {
      this.modalData = {
        balance: 0,
        currency: '',
        name: '',
        defaultFloat: false,
      }
    },
    resetModalError() {
      this.modalDataError = {
        name: '',
        currency: '',
        balance: '',
      }
    },
    isNameValid() {
      if (this.modalData.name.trim() === '') {
        this.$refs.nameRef.dirty = true
        this.modalDataError.name = 'the field is required.'
        return false;
      }
      this.modalDataError.name = ''
      return true;
    },
    isCurrencyValid() {
      if (this.modalData.currency.trim() === '') {
        this.modalDataError.currency = 'the field is required.'
        return false;
      }
      this.modalDataError.currency = ''
      return true;
    },
    isBalanceValid() {
      if (this.modalData.balance.toString().trim() === '' || this.modalData.balance.toString().trim() === '0') {
        return true;
      }

      if (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/.test(this.modalData.balance) === false) {
        this.$refs.balanceRef.dirty = true
        this.modalDataError.balance = 'Invalid number format.'
        return false;
      }
      this.modalDataError.balance = ''
      return true;
    },
    openModal() {
      this.resetModalData();
      this.resetModalError();
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false
    },
    validate() {
      if (!this.isNameValid()) {
        return false;
      }

      if (!this.isCurrencyValid()) {
        return false;
      }

      if (!this.isBalanceValid()) {
        return false;
      }

      return true;
    },
    async save() {
      try {
        this.resetModalError();
        if (this.validate()) {
          await this.createData({
            'balance': this.modalData.balance,
            'currency': {
              'code': this.modalData.currency,
            },
            'description': this.modalData.name,
            'is_active': this.modalData.defaultFloat,
            'merchant_id': this.merchantId
          })
          this.closeModal();
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getData() {
      await this.loadApiData(this.merchantId)
    }
  }
}
</script>

<style scoped>

</style>