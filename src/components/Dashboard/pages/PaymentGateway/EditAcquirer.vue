<template>
  <div class="pg-edit-merchant">
    <div class="card p-4">

      <Spinner v-if="loading"/>

      <el-row :gutter="20">
        <el-col :xs="24" :lg="10" :xl="8">
          <div class="form-contents">
            <!--
            <PGRow labeli18n="payment_gateway.acquirer.is_active" :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{acquirerData.account_name}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="acquirerData.account_name"
                       name="account_name"
                       data-vv-as="account name"/>
                <div class="validation-error">{{ errors.first('account_name') }}</div>                     
              </template>
            </PGRow>
            -->

            <PGRow labeli18n="payment_gateway.acquirer.full_name" :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{acquirerData.full_name}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="acquirerData.full_name"
                       v-validate.initial="'required'"
                       name="full_name"
                       data-vv-as="full name"/>
                <div class="validation-error">{{ errors.first('full_name') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="payment_gateway.acquirer.short_name" :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{acquirerData.short_name}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="acquirerData.short_name"
                       v-validate.initial="'required'"                       
                       name="short_name"
                       data-vv-as="short name"/>
                <div class="validation-error">{{ errors.first('short_name') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="payment_gateway.acquirer.institution_id" :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{ acquirerData.institution_id }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="acquirerData.institution_id"
                       v-validate.initial="'required'"                       
                       name="institution_id" maxlength="255"
                       data-vv-as="institution ID"/>
                <div class="validation-error">{{ errors.first('institution_id') }}</div>                     
              </template>
            </PGRow>  

            <PGRow labeli18n="payment_gateway.acquirer.amex_id" :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ acquirerData.amex_id }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="acquirerData.amex_id"                       
                       name="amex_id"
                       data-vv-as="AMEX ID"/>
                <div class="validation-error">{{ errors.first('amex_id') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="payment_gateway.acquirer.visa_id" :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ acquirerData.visa_id }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="acquirerData.visa_id"
                       name="visa_id"
                       data-vv-as="VISA ID"/>
                <div class="validation-error">{{ errors.first('visa_id') }}</div>                     
              </template>              
            </PGRow>

            <PGRow labeli18n="payment_gateway.acquirer.mastercard_id" :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ acquirerData.mastercard_id }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="acquirerData.mastercard_id"
                       name="mastercard_id"
                       data-vv-as="MasterCard ID"/>
                <div class="validation-error">{{ errors.first('mastercard_id') }}</div>                     
              </template>              
            </PGRow>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="buttons">
      <p-button type="primary" size="sm" class="mr-2"
                round wide 
                @click="onSave"
                :disabled="errors.all().length > 0">{{ $i18n.t('payment_gateway.button_save') }}</p-button>
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('payment_gateway.button_cancel') }}</p-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import {
	SHOW_TOAST_MESSAGE
} from '@/store/types'
import Spinner from '@/components/UIComponents/Spinner'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'

const dateFormat = 'YYYY-MM-DD hh:mm:ss'

export default {
  name: 'EditAcquirer',
  components: {    
    Spinner,
    PButton,
    PGRow,
  },
  data () {
    return {
      loading: true,
      viewMode: false,

			acquirerData: {
        is_active: true,        
        full_name: '',        
        short_name: '',        
        institution_id: '',        
        amex_id: '',
        visa_id: '',
        mastercard_id: ''
			},
      headerColWidth: '12rem'
    }
  },
	computed: {
    ...mapState({

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
		async getData() {
			this.loading = true

			try {
				if (this.editMode) {
					let response = await this.$http.acchttp.get(`/acquirer/${this.$route.params.id}`)
					
					this.acquirerData = response.data

					this.$validator.validateAll()
				} else {
					// Set clean data for create
					this.acquirerData = {
            amex_id: '',
            full_name: '',
            institution_id: '',
            is_active: true,
            mastercard_id: '',
            short_name: '',
            visa_id: ''
					}
				}
			} catch (error) {
				dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('payment_gateway.acquirer.error_get_aquirers') + e.message, status: 'danger' })
			}

			this.loading = false
		},
		async onSave() {
      try {
        let response = this.$route.params.id === 'new'
          ? await this.$http.acchttp.post(`/acquirer`, this.acquirerData)          
          : await this.$http.acchttp.put(`/acquirer/${this.$route.params.id}`, this.acquirerData)

        this.onCancel()
      } catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, 
														 { message: error.response && error.response.status === 409
																 ? this.$t('payment_gateway.acquirer.error_duplicate_key', { email: this.acquirerData.email })
																 : this.$t('payment_gateway.acquirer.error_saving_client') + error.message, 
														 	 status: 'danger' })
      }
		},
		onCancel() {
				this.$router.push('/payment-gateway/acquirer');
		}
	},
	created () {
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