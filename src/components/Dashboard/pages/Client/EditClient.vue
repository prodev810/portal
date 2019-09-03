<template>
  <div class="pg-edit-merchant">
    <div class="card p-4">

      <Spinner v-if="loading"/>

      <el-row :gutter="20">
        <el-col :xs="24" :lg="10" :xl="8">
          <div class="form-contents">
            <PGRow labeli18n="client.listing.account_name" :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{clientData.account_name}}</span>
              <fg-input slot="edit" v-model="clientData.account_name" required :maxLength="50"/>
            </PGRow>
            <PGRow labeli18n="client.listing.email"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{clientData.email}}</span>
              <fg-input slot="edit" v-model="clientData.email" required :maxLength="50"/>
            </PGRow>
            <PGRow labeli18n="client.listing.legal_business_name"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{clientData.legal_business_name}}</span>
              <fg-input slot="edit" v-model="clientData.legal_business_name" required :maxLength="50"/>
            </PGRow>
            <PGRow labeli18n="client.listing.company_name"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.company_name }}</span>
              <fg-input slot="edit" v-model="clientData.company_name" required :maxLength="255"/>
            </PGRow>  

            <PGRow labeli18n="client.listing.country"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.country }}</span>
							<el-select slot="edit" v-model="clientData.country" class="mb-2">
								<el-option v-for="item in countries"
														:key="item.alpha2Code"
														:label="item.name"
														:value="item.alpha2Code">{{item.name}}
								</el-option>
							</el-select>
            </PGRow>

            <PGRow v-if="editMode" 
									 labeli18n="client.listing.created_date" 
									 :headerColWidth="'13rem'" 
									 required 
									 :viewMode="viewMode">
              <span slot="view">{{ clientData.created_date }}</span>
              <fg-input slot="edit" v-model="clientData.created_date" required :maxLength="255"/>
            </PGRow>

            <PGRow labeli18n="client.listing.display_currency"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.display_currency }}</span>
							<el-select slot="edit" v-model="clientData.display_currency" class="mb-2">
								<el-option v-for="item in currencies"
														:key="item.currency_code"
														:label="item.currency_name"
														:value="item.currency_code">{{item.currency_name}}
								</el-option>
							</el-select>
            </PGRow>

            <PGRow labeli18n="client.listing.phone"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.phone }}</span>
              <fg-input slot="edit" v-model="clientData.phone" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.statement_descriptor"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.statement_descriptor }}</span>
              <fg-input slot="edit" v-model="clientData.statement_descriptor" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.support_contact"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.support_contact }}</span>
              <fg-input slot="edit" v-model="clientData.support_contact" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.support_url"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.support_url }}</span>
              <fg-input slot="edit" v-model="clientData.support_url" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.url"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.url }}</span>
              <fg-input slot="edit" v-model="clientData.url" required :maxLength="255"/>
            </PGRow>
          </div>
        </el-col>

        <el-col :xs="24" :lg="14" :xl="16">
          <PGRow labeli18n="client.listing.merchant_account_stage.id"  :headerColWidth="'13rem'" required :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.id }}</span>
            <fg-input slot="edit" v-model="clientData.merchant_account_stage.id" required :maxLength="255"/>
          </PGRow>
          <PGRow labeli18n="client.listing.merchant_account_stage.name"  :headerColWidth="'13rem'" required :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.name }}</span>

						<el-select slot="edit" v-model="clientData.merchant_account_stage.name" class="mb-2">
							<el-option v-for="item in stageValues"
													:key="item"
													:label="item"
													:value="item">{{item}}
							</el-option>
						</el-select>
          </PGRow>
					
          <PGRow labeli18n="client.listing.merchant_account_stage.description"  :headerColWidth="'13rem'" required :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.description }}</span>
            <fg-input slot="edit" v-model="clientData.merchant_account_stage.description" required :maxLength="255"/>
          </PGRow>
        </el-col>
      </el-row>
    </div>

    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">{{ $i18n.t('client.listing.button.edit_client') }}</p-button>
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('client.listing.button.cancel') }}</p-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import moment from 'moment'

import {
	SHOW_TOAST_MESSAGE,
	ACTION_GET_CLIENT,
	ACTION_GET_COUNTRIES,
	GETTER_GET_COUNTRY_BY_CODE,
	ACTION_PG_GET_CURRENCIES
} from '@/store/types'


import Spinner from '@/components/UIComponents/Spinner'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'

export default {
  name: 'EditClient',
  components: {    

    Spinner,
    PButton,
    PGRow,
  },
  data () {
    return {
      loading: true,
      viewMode: false,
			clientData: {},
			stageValues: [
				'TRIAL',
				'ACTIVATED',
				'VERIFIED',
				'TERMINATED'
			]
    }
  },
	computed: {
    ...mapState({
			countries: state => state.countries.countries,
			currencies: state => state.paymentGateway.currencies
    }),
		editMode () {
			return this.$route.params.id !== 'new'
		}
	},
	watch: {
		'$route': function (newVal, oldVal) {
			this.getData()
		}
	},
  methods: {
		...mapActions({
			getCountries: ACTION_GET_COUNTRIES,
			getCurrencyList:ACTION_PG_GET_CURRENCIES
		}),			
		async getData() {
			this.loading = true

			try {
				if (this.editMode) {
					let response = await this.$http.clhttp.get(`/client/${this.$route.params.id}`)
					console.log(response)
					this.clientData = response.data
				} else {
					// Set clean data for create
					this.clientData = {
						account_name: '',
						email: '',
						legal_business_name: '',
						company_name: '',
						country: '', // !!!
						display_currency: '',
						phone: '',
						statement_descriptor: '',
						support_contact: '',
						support_url: '',
						url: '',

						merchant_account_stage: {
							id: '',									
							name: '',
							description:''
						},
					}
				}
			} catch (error) {
				console.log(error)
				dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_get_merchants') + e.message, status: 'danger' })
			}

			this.loading = false
		},
		onSave() {
				this.onCancel();
		},
		onCancel() {
				this.$router.push('/clients');
		}
	},
	created () {
    // Request countries if they not loaded yet
		this.getCountries()
		this.getCurrencyList()
		this.getData()
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