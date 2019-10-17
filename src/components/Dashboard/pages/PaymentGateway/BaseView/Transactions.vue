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

		<modal :show="modalDetailsVisible"
           footerClasses="justify-content-center"
           type="notice">
			<h5 slot="header" class="modal-title">Payment details</h5>

			XXX

      <div slot="footer" class="w-100 d-flex justify-content-center">
        <p-button type="default" 
									@click.native="modalDetailsVisible = false" 
									class="btn btn-round btn-default">
					{{ $t('payment_gateway.button_close') }}
				</p-button>
      </div>
		</modal>

		<DetailsModal v-model="modalCustomerVisible"
									header="Customer details"
									:data="modalCustomerData"
									:description="modalCustomerDescription"/>
  </div>
</template>

<script>
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
				{ key: '', label: '' }
			],
			modalOperationsDescription: [

			],
			modalCustomerDescription: [
				{ key: 'active', label: 'Active', filter: 'boolean' },
				{ key: 'create_date', label: 'Create date', filter: 'dateTime' },
				{ key: 'email', label: 'Email' },
				{ key: 'first_name', label: 'First name' },
				{ key: 'last_name', label: 'Last name' },
				{ key: 'merchant_id', label: 'Merchant ID' },
				{ key: 'mobile', label: 'Mobile' },
				{ key: 'phone', label: 'Phone' },
				{ key: 'sex', label: 'Sex' },
				{ key: 'update_date', label: 'Update date', filter: 'dateTime' },
			],
			modalShippingAddressDescription: [
				{ key: '', label: '' }
			]
		}
	},
	computed: {
		...mapState({
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
				let response = await this.$http.acchttp.get(row._links.payment.href)
				// assign data and make modal visible
				this.modalDetailsData = response.data
				this.modalDetailsVisible = true
				console.log('this.modalDetailsData', this.modalDetailsData)
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		},
		async onOperations (row) {
			this.loading = true

			try {
				let response = await this.$http.acchttp.get(row._links.operations.href)
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
				let response = await this.$http.acchttp.get(row._links.customer.href)
				// assign data and make modal visible
				this.modalCustomerData = response.data
				this.modalCustomerVisible = true
				console.log('this.modalCustomerData', this.modalCustomerData)
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		},
		async onShippingAddress (row) {
			this.loading = true

			try {
				let response = await this.$http.acchttp.get(row._links.shippingAddress.href)
				// assign data and make modal visible
				this.modalShippingAddressData = response.data
				this.modalShippingAddressVisible = true
				console.log('this.modalShippingAddressData', this.modalShippingAddressData)
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		}
	},
	mounted () {
		this.loadData()
	}
}
</script>