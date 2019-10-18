<template>
  <div class="card pg-merchant p-2">
    <Spinner v-if="loading"/>

    <regular-table striped responsive condensed bordered
                   :headings="headers"
                   :value="transactions.items">
      <template slot-scope="row">   
        <td>
          <p-button type="primary" @click="onPaymentDetails(row.index.row)" size="sm" outline class="mr-2">{{ $i18n.t('payment_gateway.transactions.button_details') }}</p-button>
					<p-button type="primary" @click="onOperations(row.index.row)" size="sm" outline class="mr-2">{{ $i18n.t('payment_gateway.transactions.button_operations') }}</p-button>
					<p-button type="primary" @click="onCustomer(row.index.row)" size="sm" outline class="mr-2">{{ $i18n.t('payment_gateway.transactions.button_customer') }}</p-button>
					<p-button type="primary" @click="onShippingAddress(row.index.row)" size="sm" outline class="mr-2">{{ $i18n.t('payment_gateway.transactions.button_shipping_address') }}</p-button>
        </td>
      </template>
    </regular-table>

    <div class="table-pagination mt-2" v-if="transactions.total > perPage">
      <p-pagination
              v-model="currentPage"
              :perPage="perPage"              
              :total="transactions.total"
      ></p-pagination>
    </div>

		<DetailsModal v-model="modalDetailsVisible"
									header="payment_gateway.transactions.modal_details.header"
									:data="modalDetailsData"
									:description="modalDetailsDescription"
									i18base="payment_gateway.transactions.modal_details."/>

		<DetailsModal v-model="modalCustomerVisible"
									header="payment_gateway.transactions.modal_customer.header"
									:data="modalCustomerData"
									:description="modalCustomerDescription"
									i18base="payment_gateway.transactions.modal_customer."/>

		<DetailsModal v-model="modalShippingAddressVisible"
									header="payment_gateway.transactions.modal_shipping_address.header"
									:data="modalShippingAddressData"
									:description="modalShippingAddressDescription"
									i18base="payment_gateway.transactions.modal_shipping_address."/>
  </div>
</template>

<script>
import getHttpInstance from '@/store/modules/PGInstance.js' 

import { mapActions, mapState } from 'vuex'
import {
	SHOW_TOAST_MESSAGE,
	ACTION_PG_GET_TRANSACTIONS
} from '@/store/types'
import Modal from "@/components/UIComponents/Modal"
import DetailsModal from "@/components/Dashboard/pages/PaymentGateway/DetailsModal"
import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
import PPagination from "@/components/UIComponents/Pagination"

export default {
	name: 'Transactions',
  components: { 
    Spinner, 
    RegularTable,
		PPagination,
		Modal,
		DetailsModal
  },  
	data () {
		return {
			loading: false,
      headers: [
        { name: 'merchant_id', i18n: 'payment_gateway.transactions.header.merchant_id' },
        { name: 'method_code', i18n: 'payment_gateway.transactions.header.method_code' },
        { name: 'payer_id', i18n: 'payment_gateway.transactions.header.payer_id' },
        { name: 'status', i18n: 'payment_gateway.transactions.header.status' },
				{ name: 'sub_type', i18n: 'payment_gateway.transactions.header.sub_type' },
				{ name: 'transaction_date', i18n: 'payment_gateway.transactions.header.transaction_date', dateTime: true }
      ],
      currentPage: 1,
			perPage: 10,
			modalDetailsVisible: false,
			modalOperationsVisible: false,
			modalCustomerVisible: false,
			modalShippingAddressVisible: false,
			modalDetailsData: {},
			modalOperationsData: {},
			modalCustomerData: {},
			modalShippingAddressData: {},
			modalDetailsDescription: [
				{ key: 'account_token' },
				{ key: 'amount' },
				{ key: 'currency' },
				{ key: 'is3_d', filter: 'boolean' },
				{ key: 'merch_reference' },
				{ key: 'merchant_id' },
				{ key: 'method_code' },
				{ key: 'modified_date', filter: 'dateTime' },
				{ key: 'payer_id' },
				{ key: 'session_id' },
				{ key: 'sett_amount' },
				{ key: 'sett_currency' },
				{ key: 'status' },
				{ key: 'sub_type' },
				{ key: 'transaction_date', filter: 'dateTime' },
				{ key: 'value_date', filter: 'dateTime' }
			],
			modalOperationsDescription: [
			],
			modalCustomerDescription: [
				{ key: 'active', filter: 'boolean' },
				{ key: 'create_date', filter: 'dateTime' },
				{ key: 'email' },
				{ key: 'first_name' },
				{ key: 'last_name' },
				{ key: 'merchant_id' },
				{ key: 'mobile' },
				{ key: 'phone' },
				{ key: 'sex' },
				{ key: 'update_date', filter: 'dateTime' },
			],
			modalShippingAddressDescription: [
				{ key: 'city' },
				{ key: 'country' },
				{ key: 'state' },
				{ key: 'street' },
				{ key: 'zip' }
			]
		}
	},
	computed: {
		...mapState({
			env: state => state.paymentGateway.env,
			transactions: state => state.paymentGateway.transactions
		})
	},
	watch: {
		currentPage () {
			this.loadData()
		}
	},
	methods: {
    ...mapActions({
        getTransactions: ACTION_PG_GET_TRANSACTIONS
    }),
		async loadData () {
			this.loading = true
			await this.getTransactions({
				page: this.currentPage-1,
				size: this.perPage
			})
			this.loading = false
		},
		async onPaymentDetails (row) {
			this.loading = true

			try {
				let response = await getHttpInstance(this.env).get(this.processModalURL(row._links.payment.href))
				// assign data and make modal visible
				this.modalDetailsData = response.data
				this.modalDetailsVisible = true
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		},
		async onOperations (row) {
			this.loading = true

			try {
				let response = await getHttpInstance(this.env).get(this.processModalURL(row._links.operations.href))
				// assign data and make modal visible
				this.modalOperationsData = response.data
				this.modalOperationsVisible = true
				console.log('this.modalOperationsData', this.modalOperationsData)
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		},
		async onCustomer (row) {
			this.loading = true

			try {
				let response = await getHttpInstance(this.env).get(this.processModalURL(row._links.customer.href))
				// assign data and make modal visible
				this.modalCustomerData = response.data
				this.modalCustomerVisible = true
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		},
		async onShippingAddress (row) {
			this.loading = true

			try {
				let response = await getHttpInstance(this.env).get(this.processModalURL(row._links.shippingAddress.href))
				// assign data and make modal visible
				this.modalShippingAddressData = response.data
				this.modalShippingAddressVisible = true
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		},
		processModalURL(value) {
			let url = value.split('/')
			let idx = url.findIndex(s => s === 'payment-mgmt')

			return idx >= 0 
				? '/' + url.slice(idx + 1).join('/') 
				: value			
		}
	},
	mounted () {
		this.loadData()
	}
}
</script>