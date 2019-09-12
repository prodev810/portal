<template>
  <div class="pg-edit-merchant">
    <div class="card p-4">

      <Spinner v-if="loading"/>

      <el-row :gutter="20">
        <el-col :xs="24">
          <div class="form-contents">
            <PGRow labeli18n="business_type.listing.table_header.business_type" :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ businessTypeData.business_type }}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="businessTypeData.business_type"
                       v-validate.initial="'required'"                       
                       name="business_type"
                       data-vv-as="business type"/>
                <div class="validation-error">{{ errors.first('business_type') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="business_type.listing.table_header.business_description"  :headerColWidth="headerColWidth" required :viewMode="viewMode">
              <span slot="view">{{businessTypeData.business_description}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="businessTypeData.business_description"
                       v-validate.initial="'required'"
                       name="business_description"
                       data-vv-as="business description"/>
                <div class="validation-error">{{ errors.first('business_description') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="business_type.listing.table_header.mcc"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{businessTypeData.mcc}}</span>
              <template slot="edit">
                <input class="form-control"
                       v-model="businessTypeData.mcc"
                       v-validate.initial="'required'"
                       name="mcc"
                       data-vv-as="MCC"/>
                <div class="validation-error">{{ errors.first('mcc') }}</div>                     
              </template>
            </PGRow>

            <PGRow labeli18n="business_type.listing.table_header.business_risk"  :headerColWidth="headerColWidth" :viewMode="viewMode">
              <span slot="view">{{ businessTypeData.business_risk }}</span>
              <template slot="edit">
                <el-select v-model="businessTypeData.business_risk" 
                           name="business_risk"
                           data-vv-as="business risk">
                  <el-option v-for="item in riskValues"
                             :key="item"
                             :label="item"
                             :value="item">{{item}}
                  </el-option>
                </el-select>
                <div class="validation-error">{{ errors.first('business_risk') }}</div>                     
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
                :disabled="errors.all().length > 0">{{ $i18n.t('client.listing.button.edit_client') }}</p-button>
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('client.listing.button.cancel') }}</p-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import moment from 'moment'

import {
	SHOW_TOAST_MESSAGE
} from '@/store/types'

import Spinner from '@/components/UIComponents/Spinner'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'

export default {
  name: 'EditBusinessType',
  components: {    
    Spinner,
    PButton,
    PGRow,
  },
  data () {
    return {
      loading: true,
      viewMode: false,

			businessTypeData: {	
        business_type: '',
        business_description: '',
        mcc: '',
        business_risk: ''
			},
			riskValues: [
				'LOW',
				'MODERATE',
				'HIGH',
				'PROHIBITED'
			],
      headerColWidth: '12rem'
    }
  },
	computed: {
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
					let response = await this.$http.clhttp.get(`/business-type/${this.$route.params.id}`)
					
					this.businessTypeData = response.data

					this.$validator.validateAll()
				} else {
					// Set clean data for create
					this.businessTypeData = {
            business_type: '',
            business_description: '',
            mcc: '',
            business_risk: this.riskValues[0]
					}
				}
			} catch (error) {
				dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('business_type.errors.error_get_business_types') + e.message, status: 'danger' })
			}

			this.loading = false
		},
		async onSave() {
      try {
        let response = this.$route.params.id === 'new'
          ? await this.$http.clhttp.post(`/business-type`, this.businessTypeData)          
          : await this.$http.clhttp.put(`/business-type/${this.$route.params.id}`, this.businessTypeData)

        this.onCancel()
      } catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, 
														 { message: error.response && error.response.status === 409
																 ? this.$t('business_type.errors.error_duplicate_key', { email: this.businessTypeData.email })
																 : this.$t('business_type.errors.error_saving_client') + error.message, 
														 	 status: 'danger' })
      }
		},
		onCancel() {
				this.$router.push('/clients/business-type');
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