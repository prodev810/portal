<template>
  <div class="pg-edit-merchant">
    <div class="card p-4">

      <Spinner v-if="loading"/>

      <el-row :gutter="20">
        <el-col :xs="24" :lg="10" :xl="8">
          <div class="form-contents">
            <PGRow labeli18n="client.listing.account_name" :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{clientData.account_name}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.account_name"
                       name="account_name"
                       data-vv-as="account name"/>
                <div class="validation-error">{{ errors.first('account_name') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="client.listing.email"  :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{clientData.email}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.email"
                       v-validate.initial="'required|email'"
                       name="email" maxlength="50"
                       data-vv-as="email"/>
                <div class="validation-error">{{ errors.first('email') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="client.listing.legal_business_name"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{clientData.legal_business_name}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.legal_business_name"
                       name="legal_business_name" maxlength="50"
                       data-vv-as="legal business name"/>
                <div class="validation-error">{{ errors.first('legal_business_name') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="client.listing.company_name"  :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{ clientData.company_name }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.company_name"
                       v-validate.initial="'required'"
                       name="company_name" maxlength="255"
                       data-vv-as="company name"/>
                <div class="validation-error">{{ errors.first('company_name') }}</div>                     
              </template>
            </PGRow>  

            <PGRow labeli18n="client.listing.country"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ clientData.country }}</span>
              <template slot="edit">
                <el-select v-model="clientData.country" 
                           name="country"
                           data-vv-as="country">
                  <el-option v-for="item in countries"
                              :key="item.alpha2Code"
                              :label="item.name"
                              :value="item.alpha2Code">{{item.name}}
                  </el-option>
                </el-select>
                <div class="validation-error">{{ errors.first('country') }}</div>                     
              </template>
            </PGRow>

            <!-- Set a date format -->
            <PGRow v-if="editMode" 
									 labeli18n="client.listing.created_date" 
									 :headerColWidth="headerColWidth" 
									 :viewMode="viewMode">
              <span slot="view">{{ clientData.created_date }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="createdDate"
                       name="created_date"
                       data-vv-as="created date"/>
                <div class="validation-error">{{ errors.first('created_date') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="client.listing.display_currency"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ clientData.display_currency }}</span>
              <template slot="edit">
                <el-select v-model="clientData.display_currency" 
                           name="display_currency"
                           data-vv-as="display currency">
                  <el-option v-for="item in currencies"
                              :key="item.currency_code"
                              :label="item.currency_name"
                              :value="item.currency_code">{{item.currency_name}}
                  </el-option>
                </el-select>
                <div class="validation-error">{{ errors.first('display_currency') }}</div>
              </template>                
            </PGRow>

            <PGRow labeli18n="client.listing.phone"  :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{ clientData.phone }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.phone"
                       v-validate.initial="'required'"
                       name="phone"
                       data-vv-as="phone"/>
                <div class="validation-error">{{ errors.first('phone') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="client.listing.statement_descriptor"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ clientData.statement_descriptor }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.statement_descriptor"
                       name="statement_descriptor"
                       data-vv-as="statement descriptor"/>
                <div class="validation-error">{{ errors.first('statement_descriptor') }}</div>                     
              </template>              
            </PGRow>

            <PGRow labeli18n="client.listing.support_contact"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ clientData.support_contact }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.support_contact"
                       name="support_contact" maxlength="255"
                       data-vv-as="support contact"/>
                <div class="validation-error">{{ errors.first('support_contact') }}</div>                     
              </template>              
            </PGRow>

            <PGRow labeli18n="client.listing.support_url"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ clientData.support_url }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.support_url"
                       name="support_url" maxlength="255"
                       data-vv-as="support url"/>
                <div class="validation-error">{{ errors.first('support_url') }}</div>                     
              </template>              
            </PGRow>

            <PGRow labeli18n="client.listing.url"  :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{ clientData.url }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="clientData.url"
                       v-validate.initial="'required'"
                       name="url" maxlength="255"
                       data-vv-as="url"/>
                <div class="validation-error">{{ errors.first('url') }}</div>                     
              </template>              
            </PGRow>
          </div>
        </el-col>

        <el-col :xs="24" :lg="14" :xl="16">
          <PGRow labeli18n="client.listing.merchant_account_stage.id"  :headerColWidth="headerColWidth" :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.id }}</span>
            <template slot="edit">
              <input class="form-control"
                      v-model="clientData.merchant_account_stage.id"
                      name="merchant_account_stage.id" maxlength="255"
                      data-vv-as="merchant account ID"/>
              <div class="validation-error">{{ errors.first('merchant_account_stage.id') }}</div>                     
            </template>
          </PGRow>

          <PGRow labeli18n="client.listing.merchant_account_stage.name"  :headerColWidth="headerColWidth" required :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.name }}</span>
            <template slot="edit">
              <el-select v-model="clientData.merchant_account_stage.name"
                         v-validate.initial="'required'"
                         name="merchant_account_stage.name"
                         data-vv-as="stage">
                <el-option v-for="item in stageValues"
                            :key="item"
                            :label="item"
                            :value="item">{{item}}
                </el-option>
              </el-select>
              <div class="validation-error">{{ errors.first('merchant_account_stage.name') }}</div>                     
            </template>
          </PGRow>
					
          <PGRow labeli18n="client.listing.merchant_account_stage.description"  :headerColWidth="headerColWidth" :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.description }}</span>
            <template slot="edit">
              <input class="form-control"
                      name="merchant_account_stage.description" maxlength="255"
                      data-vv-as="merchant account description"/>
              <div class="validation-error">{{ errors.first('merchant_account_stage.description') }}</div>                     
            </template>
          </PGRow>
        </el-col>
      </el-row>
    </div>

    <div class="buttons">
      <p-button type="primary" size="sm" class="mr-2"
                round wide 
                @click="onSave"
                :disabled="errors.all().length > 0">{{ $i18n.t('client.listing.button.edit_client') }}</p-button>
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
	ACTION_PG_GET_CURRENCIES,
	ACTION_SAVE_CLIENT
} from '@/store/types'


import Spinner from '@/components/UIComponents/Spinner'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'

const dateFormat = 'YYYY-MM-DD hh:mm:ss'

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
			clientData: {						
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
				}
			},
			stageValues: [
				'TRIAL',
				'ACTIVATED',
				'VERIFIED',
				'TERMINATED'
			],
      headerColWidth: '12rem'
    }
  },
	computed: {
    ...mapState({
			countries: state => state.countries.countries,
			currencies: state => state.paymentGateway.currencies
    }),
		editMode () {
			return this.$route.params.id !== 'new'
    },
    createdDate: {
      get () {
        return moment(this.clientData.created_date).format(dateFormat)
      },
      set (value) {
        this.clientData.created_date = moment(value, dateFormat).toJSON()
      }
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
			getCurrencyList:ACTION_PG_GET_CURRENCIES,
			saveClient: ACTION_SAVE_CLIENT
		}),			
		async getData() {
			this.loading = true

			try {
				if (this.editMode) {
					let response = await this.$http.clhttp.get(`/client/${this.$route.params.id}`)
					
					this.clientData = response.data

					this.$validator.validateAll()
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
				dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_get_merchants') + e.message, status: 'danger' })
			}

			this.loading = false
		},
		async onSave() {
      try {
        let response = this.$route.params.id === 'new'
          ? await this.$http.clhttp.post(`/client`, this.clientData)          
          : await this.$http.clhttp.put(`/client/${this.$route.params.id}`, this.clientData)

        this.onCancel()
      } catch (error) {
        this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('store.paymentGateway.error_get_merchants') + error.message, status: 'danger' });
      }
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

<style lang="scss">
$labelMargin: 16px;

.pg-edit-merchant {
	& .pg-row-container {
		margin-bottom: 0;		

		@media screen and (min-width: 540px) {
			& .pg-row-header-col {
				margin-top: -$labelMargin;
			}
		}

    & .form-control {
      padding: 10px !important;
			width: 100%;
    }

		& .form-group {
			margin-bottom: 4px;
		}
	}
}

.validation-error {
  font-size: 10px;
  color: red;
  height: $labelMargin;
}

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