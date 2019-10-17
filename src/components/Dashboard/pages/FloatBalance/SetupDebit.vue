<template>
  <div class="setup-debit">
    <div>
      <div>
        <div class="card-header bg-white border-0 pt-0">
          <h4 class="card-title mt-0">
            {{ $t('setup_debit.create.title') }}
          </h4>
          <div>
            <p>
              {{ $t('setup_debit.create.tips.line1') }}
            </p>
            <ul>
              <li v-html="$t('setup_debit.create.tips.li1')"/>
              <li>{{ $t('setup_debit.create.tips.li2') }}</li>
              <li>{{ $t('setup_debit.create.tips.li3') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

		<sof-uploader	v-model="showSoftUploader"
									:soft-docs="softDocs"
									:select-only="true"
									@dataChanged="void 0"
									floatId="new_record"
									@sofDocsSelected="handleSofDocsSelection"/>

    <!-- New style mock start-->
    <div class="row">
      <div class="col-12">
        <div class="card ceevo__card-group">
          <div class="row card-content p-4">
            <!-- left content-->
            <div class="w-50 w-sm-100 pl-4 pr-4 pr-md-3 pr-lg-4 pr-xl-5">

              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.card_prog_code') }}</div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.card_program_code" disabled="disabled" type="text" :placeholder="$t('setup_debit.create.labels.card_prog_code')" class="form-control">
								</div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.reseller_code') }}</div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.reseller_code" disabled="disabled" type="text" :placeholder="$t('setup_debit.create.labels.reseller_code')" class="form-control  form-control-danger">
								</div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.reseller_name') }}</div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.reseller_name" disabled="disabled" type="text" :placeholder="$t('setup_debit.create.labels.reseller_name')" class="form-control  form-control-danger"></div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.user') }}</div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.user" disabled="disabled" type="text" :placeholder="$t('setup_debit.create.labels.user')" class="form-control  form-control-danger"></div>
              </div>
            </div>

            <!-- right content-->
            <div class="w-50 w-sm-100 pr-4 pl-4 pl-md-3 pl-lg-4 pl-xl-5">
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.entry_type') }} <span class="required-field-sympol">＊</span></div>
                <div class="col-12 col-lg-6">
                  <el-select v-model="setupDebitData.entryType" 
														 v-validate.initial="'required'"
														 name="entryType"
														 data-vv-as="charge type"
														 :placeholder="$t('setup_debit.create.labels.entry_type')"
                             class="w-100" popper-class="setup-debit-select">
                    <el-option v-for="(item, index) in entryTypeValues"
                                :key="index"
                                :label="item.name"
                                :value="item.value">{{ item.name }}
                    </el-option>
                  </el-select>	
									<!--<div class="validation-error">{{ errors.first('entryType') }}</div>-->
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.currency') }}</div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.currency" disabled="disabled" type="text" :placeholder="$t('setup_debit.create.labels.currency')" class="form-control  form-control-danger"></div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.entry_desc') }} <span class="required-field-sympol">＊</span></div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.entryDesc"
 												 v-validate.initial="'required'"
												 name="entryDesc"
												 data-vv-as="description"
												 type="text" 
												 :placeholder="$t('setup_debit.create.labels.entry_desc')" 
												 class="form-control form-control-danger">
									<!--<div class="validation-error">{{ errors.first('entryDesc') }}</div>-->
								</div>									
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.amount') }} <span class="required-field-sympol">＊</span></div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.amount" 
 												 v-validate.initial="'required|decimal:2'"
												 name="amount"
												 data-vv-as="amount"
												 type="text" 
												 :placeholder="$t('setup_debit.create.labels.amount')" 
												 class="form-control form-control-danger">
									<!--<div class="validation-error">{{ errors.first('amount') }}</div>-->
								</div>
              </div>
            </div>

            <div class="ml-auto w-50 w-sm-100 pr-4 pl-4 pl-md-5 pr-md-4">
              <div class="row justify-content-end">
								<p-button round
									class="mr-3"
									@click="showSoftDocs()">
									{{ $t('setup_debit.create.button.sof') }}
								</p-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- New style mock End-->

    <div class="col-12 mt-4 text-center ceevo__btn-group">
      <p-button round type="primary" 
								@click="handleSettingDebit"
                :disabled="loading || errors.all().length > 0">
        <div class="d-flex align-items-center">
          <loader v-if="loadingState ==='sending'"></loader>
          {{ $t('setup_debit.create.button.save') }}
        </div>
      </p-button>
      <p-button round @click="handleSecondaryAction">
        {{ $t('setup_debit.create.button.cancel') }}
      </p-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {AbaModalEvents} from "../../../../main";
  import {mapActions, mapGetters} from 'vuex'
  import {
    ADD_FLOAT_ENTRY,
    GET_ALL_CARD_PROGRAM,
    GET_ALL_FLOATS,
    GET_ALL_RESELLER_SUBSCRIPTIONS,
    GETTER_ALL_CARDS,
    GETTER_FLOATS,
    GETTER_LOADINGSTATE_FLOAT_BALANCE, GETTER_RESELLER_SUBSCRIPTIONS, SET_MODAL_TYPE, SHOW_TOAST_MESSAGE,
    GETTER_USER_INFO
  } from '../../../../store/types';
  import {decimals} from "../../../../utils/inputMasks";
  import Uploader from "../../../UIComponents/ABAComponents/abaUploader/Uploader";
  import SofUploader from "../../../UIComponents/ABAComponents/SofUploader/SofUploader";
  import PButton from "../../../UIComponents/Button";
  import Loader from "../../../UIComponents/Loader";
  import Spinner from "../../../UIComponents/Spinner";

  export default {
    name: 'SetupDebit',
    components: {
			PButton, 
			SofUploader, 
			Uploader, 
			Loader, 
			Spinner
		},
    data() {
      return {
        tableData: [],
        editId: '',
        cardProgramCode: '',
        resellerCode: '',
        resellerName: '',
        currency: '',
        valid: false,
        dirty: false,
        showSoftUploader: false,
        files: {},
        selectedFloatId: '',
        softDocs: [],
        dataToSend: {
          resellerId: ''
        },
        // 
        entryTypeValues: [
          { name: 'Credit', value: 'CREDIT' },
          { name: 'Debit', value: 'DEBIT' }
				],
				setupDebitData: {
					card_program_code: '',
					reseller_code: '',
					reseller_name: '',
					user: '',
					entryType: '',
					currency: '',
					entryDesc: '',
					amount: '',
					// ???
					card_program_id: '',
					reseller_id: ''	
				},
				loading: false,
      }
    },
    computed: {
      ...mapGetters({
        userInfo: GETTER_USER_INFO,
        loadingState: GETTER_LOADINGSTATE_FLOAT_BALANCE,
      }),
      creationResponseState() { return this.$store.state.UiModule.responseState[ADD_FLOAT_ENTRY]}
		},
		watch: {
			creationResponseState(newVal, oldVal) {
        if (!oldVal) return this.alert(newVal)
        if (newVal.timeStamp === oldVal.timeStamp) return;
        this.alert(newVal)
      }
    },
    methods: {
      ...mapActions({
        getFloats: GET_ALL_FLOATS,
        getAllCards: GET_ALL_CARD_PROGRAM,
        getAllResellerSubscription: GET_ALL_RESELLER_SUBSCRIPTIONS,
        setUpDebit: ADD_FLOAT_ENTRY,
        showModal: SET_MODAL_TYPE
			}), 
			showSoftDocs () {
        this.selectedFloatId = 'setup_debit_new_row'
        this.showSoftUploader = true
			}, 
			handleSofDocsSelection(ev) {
        this.softDocs = ev.map(({data: content, type: mimeType}) => ({
          content, mimeType
        }))
			}, 
			alert(newVal) {
        if (newVal.state === true) {
          const key = 'handleresponsestate' + 'createreseller';

          this.showModal({
            type: 'normal',
            message: 'The changes are saved ',
            copy: 'any changes will be discarded',
            mainButton: 'Ok',
            key
          })

          AbaModalEvents.$on(key, response => {
            if (response.ok) {
              this.$router.push('/float-account/view-float-account')

            } else {
              this.dirty = false;
            }
            AbaModalEvents.$off(key)
          })
        }
			},
			handleSecondaryAction() {
        if (!this.dirty) return this.$router.push('/float-account/view-float-account')
        const key = 'handle_secodary_aciton_set_up_debit';
        this.showModal({
          type: 'normal',
          message: 'Discard Changes',
          copy: 'any changes will be discarded',
          mainButton: 'Ok',
          secondaryButton: 'no',
          key
        })
        AbaModalEvents.$on(key, response => {
          if (response.ok) {
            this.$router.push('/float-account/view-float-account')
          }
          AbaModalEvents.$off(key)
        })
      },
      handleSettingDebit() {
        // TODO fix it here
				const key = 'handle_main_aciton_set_up_debit'
				
        this.showModal({
          type: 'normal',
          message: `Set up a new ${this.dataToSend.entryType} ?`,
          copy: 'any changes will be discarded',
          mainButton: 'Ok',
          secondaryButton: 'No',
          key
				})
				
        AbaModalEvents.$on(key, response => {
          if (response.ok) {
						let body = {	
							resellerId: this.setupDebitData.resellerId,
							entryType: this.setupDebitData.entryType,
							currency: this.setupDebitData.currency,
							entryDesc: this.setupDebitData.entryDesc,
							amount: this.setupDebitData.amount
						}
						
            this.setUpDebit({ id: this.setupDebitData.cardProgId, body, sofDocs: this.softDocs })
					}
					
          AbaModalEvents.$off(key)
        })
			}, 
			handleChoseFile(file, id) {
        this.files = {
          ...this.files,
          [id]: file
        }
      }
    },
    mounted () {
			// New data load
			this.setupDebitData = {
				entryType: '',
				entryDesc: '',
				amount: ''
			}

			this.setupDebitData.card_program_code = this.$route.query.card_program_code
			this.setupDebitData.reseller_code = this.$route.query.reseller_code
			this.setupDebitData.reseller_name = this.$route.query.reseller_name
			this.setupDebitData.resellerId = this.$route.query.reseller_id // not used in form but send to server
			this.setupDebitData.cardProgId = this.$route.query.card_program_id // not used in form but send to server
			this.setupDebitData.user = this.userInfo.preferred_username  || ''
			this.setupDebitData.currency = this.$route.query.currency
    }
  }
</script>

<style lang="scss" scoped>
.setup-debit {
	& .control-label {
		font-weight: bold;
		text-transform: uppercase;
	}

	& .bg-denger {
		background-color: #05980e;
		display: block;
		color: #fff;
	}
}

.setup-debit-select {
	& .el-select-dropdown__item {
		font-weight: bold;
	}
}
</style>
