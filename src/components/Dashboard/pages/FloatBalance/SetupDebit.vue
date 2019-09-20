<template>
  <div>
    <div>
      <div>
        <div class="card-header bg-white border-0 pt-0">
          <h4 class="card-title mt-0">
            {{ $t('setup_debit.create.title') }}
          </h4>
          <div class="pl-2">
            <p>
              {{ $t('setup_debit.create.tips.line1') }}
            </p>
            <ul>
              <li>{{ $t('setup_debit.create.tips.li1') }}</li>
              <li>{{ $t('setup_debit.create.tips.li2') }}</li>
              <li>{{ $t('setup_debit.create.tips.li3') }}</li>
            </ul>
          </div>
        </div>
				<!--
        <div class="card">
          <div class="card-content row">
            <div class="col-sm-12">
              <div class="p-3">
                <regular-table
                  striped
                  :headings="tableHeadings"
                  :value="tableData"
                  @input="handleInput"
                  :editId="editId"
                >
                  <template slot-scope="index">
                    <th>
                      <div class="cell" :key="index.index.id +'uploader'"
                      >
                        <p-button
                          @click="showSoftDocs(index)">
                          {{ $t('setup_debit.create.button.sof') }}
                        </p-button>
                      </div>
                    </th>
                  </template>
                </regular-table>
              </div>
            </div>
          </div>
        </div>
				-->
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
              <div class="row mb-0">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label mb-lg-3">{{ $t('setup_debit.create.labels.entry_type') }} <span class="required-field-sympol">＊</span></div>
                <div class="col-12 col-lg-6">
                  <el-select v-model="setupDebitData.entryType" 
														 v-validate.initial="'required'"
														 name="entryType"
														 data-vv-as="charge type"
														 :placeholder="$t('setup_debit.create.labels.entry_type')"
                             class="w-100">
                    <el-option v-for="(item, index) in entryTypeValues"
                                :key="index"
                                :label="item.name"
                                :value="item.value">{{ item.name }}
                    </el-option>
                  </el-select>	
									<div class="validation-error">{{ errors.first('entryType') }}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label">{{ $t('setup_debit.create.labels.currency') }}</div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.currency" disabled="disabled" type="text" :placeholder="$t('setup_debit.create.labels.currency')" class="form-control  form-control-danger"></div>
              </div>
              <div class="row mb-0">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label mb-lg-3">{{ $t('setup_debit.create.labels.entry_desc') }} <span class="required-field-sympol">＊</span></div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.entryDesc"
 												 v-validate.initial="'required'"
												 name="entryDesc"
												 data-vv-as="description"
												 type="text" 
												 :placeholder="$t('setup_debit.create.labels.entry_desc')" 
												 class="form-control form-control-danger">
									<div class="validation-error">{{ errors.first('entryDesc') }}</div>
								</div>									
              </div>
              <div class="row mb-3">
                <div class="col-12 col-lg-6 d-flex align-items-center control-label mb-lg-3">{{ $t('setup_debit.create.labels.amount') }} <span class="required-field-sympol">＊</span></div>
                <div class="col-12 col-lg-6">
									<input v-model="setupDebitData.amount" 
 												 v-validate.initial="'required|decimal:2'"
												 name="amount"
												 data-vv-as="amount"
												 type="text" 
												 :placeholder="$t('setup_debit.create.labels.amount')" 
												 class="form-control form-control-danger">
									<div class="validation-error">{{ errors.first('amount') }}</div>
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
  //import {Table, TableColumn} from 'element-ui'
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
  //import createNewRowFromHeadings from "../../../../utils/createNewRowFromHeadings";
  //import {breakInput, mustBeAValidISOcurrency, shouldBeNumber} from "../../../../utils/formValidations";
  import {decimals} from "../../../../utils/inputMasks";
  import Uploader from "../../../UIComponents/ABAComponents/abaUploader/Uploader";
  import SofUploader from "../../../UIComponents/ABAComponents/SofUploader/SofUploader";
  import PButton from "../../../UIComponents/Button";
  //import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable'
  import Loader from "../../../UIComponents/Loader";
  import Spinner from "../../../UIComponents/Spinner";

  //Vue.use(Table)
  //Vue.use(TableColumn)
  export default {
    name: 'SetupDebit',
    components: {
			PButton, 
			SofUploader, 
			Uploader, 
			Loader, 
			Spinner, 
			//RegularTable
		},
    data() {
      return {
				/*
        tableHeadings: [
          {
            label: 'CPC',
            name: 'cardProgCode',
            i18n: 'setup_debit.create.table_header.card_prog_code',
            read: true,
          },
          {
            label: 'RC',
            name: 'resellerCode',
            i18n: 'setup_debit.create.table_header.reseller_code',
            read: true,
          },
          {
            label: 'reseller name',
            name: 'resellerName',
            i18n: 'setup_debit.create.table_header.reseller_name',
            read: true,
          },
          // unknown fields name
          {
            label: 'user',
            name: 'user',
            i18n: 'setup_debit.create.table_header.user',
            read: true,

          },
          {
            label: 'Charge Type',
            name: 'entryType',
            i18n: 'setup_debit.create.table_header.entry_type',
            input: 'select',
            selectKeys: [
              {name: 'Credit', value: 'CREDIT'},
              {name: 'Debit', value: 'DEBIT'},
            ],
            required: true,
          },
          {
            label: 'currency',
            name: 'currency',
            i18n: 'setup_debit.create.table_header.currency',
            read: true,
            validator: [mustBeAValidISOcurrency],
            brakeAt: breakInput(3),
          },
          {
            label: 'description',
            name: 'entryDesc',
            i18n: 'setup_debit.create.table_header.entry_desc',
            required: true,
            brakeAt:breakInput(40)
          },
          {
            label: 'amount',
            name: 'amount',
            i18n: 'setup_debit.create.table_header.amount',
            validator: shouldBeNumber,
            mask: decimals(2),
            $domAttri: {step: '0.01', type: 'number'},
            brakeAt: breakInput(8),
            required: true,
          },
				],
				*/
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
      creationResponseState() { return this.$store.state.UiModule.responseState[ADD_FLOAT_ENTRY]},
			/*
      cardPrograms() {
        return (this.$store.state.cardProgram.allCardPrograms || [])
          .reduce((acc, i) => !!acc.find(({cardProgCode}) => i.cardProgCode === cardProgCode)
            ? acc
            : [...acc, i]
            , [])
      },
      resellerSubscriptions() {
        console.log(this.$store.state.reseller.resellerSubscriptions)
        return (this.$store.state.reseller.resellerSubscriptions || [])
          .reduce((acc, i) => !!acc.find(({id}) => i.id === id)
            ? acc
            : [...acc, i]
            , [])
			}
			*/
		},
		watch: {
			/*
      resellerSubscriptions(newVal) {
        this.handleResellerMenuItems(newVal)
			}, 
			cardPrograms(newVal) {
        this.tableHeadings = this.tableHeadings.map(i => i.name === 'cardProgId' ? {
          ...i, selectKeys: newVal.map(({id, cardProgCode}) =>
            ({name: cardProgCode, value: id}))
        } : i)
			},
			*/ 
			creationResponseState(newVal, oldVal) {
        if (!oldVal) return this.alert(newVal)
        if (newVal.timeStamp === oldVal.timeStamp) return;
        this.alert(newVal)
      },/*
      'dataToSend.resellerId'(newVal) {
        const {resellerName} = this.resellerSubscriptions.find(({resellerId}) => resellerId == newVal) || {resellerName: ''};
        this.tableData = [{...this.tableData[0], resellerName: resellerName}]
      },*/
      tableData(newVal, oldVal) {
        /* if (!newVal[0]) return;
         if (newVal[0].cardProgId === oldVal[0].cardProgId) return;
         this.handleResellerMenuItems(this.resellerSubscriptions);*/
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
			/*
      handleResellerMenuItems(newVal) {
        console.log(newVal, '');
        this.tableHeadings = this.tableHeadings.map(i => i.name === 'resellerId' ? {
          ...i, selectKeys: newVal.filter(i => {
            if (!this.tableData[0]) return true;
            const cardProgId = this.tableData[0].cardProgId;
            return cardProgId ? cardProgId === i.cardProgramID : true;
          }).map(({id, resellerCode, resellerId}) =>
            ({name: resellerCode, value: resellerId}))
        } : i)

			},
      handleInput({value, valid, dirty}) {
        this.tableData = value;
        this.valid = valid;
        this.dirty = this.dirty || !!dirty;
        const {
          id,
          doc,
          user,
          cardProgCode,
          resellerCode,
          resellerName,
          ...dataToSend
        } = value[0];
        this.dataToSend = dataToSend
			},
			*/ 
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
            //const {cardProgId, ...body} = this.dataToSend;
						//console.log('Sending body', body);
						
						//if (this.loadingState === 'sending') return;						
            //if (!this.valid) return this.$store.dispatch(SHOW_TOAST_MESSAGE, {message: 'Please ensure you complete all fields correctly.', status: 'danger'})
						//console.log('sof docs doc', this.softDocs)
						
            this.setUpDebit({ id: this.setupDebitData.cardProgId, body, sofDocs: this.softDocs })
					}
					
          AbaModalEvents.$off(key)
        })
			}, 
			handleChoseFile(file, id) {
        console.log(file);
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
			
			// Old
			/*
      console.log(this.$route.query);
      this.getAllResellerSubscription();
      this.getAllCards();
			this.editId = 'setup_debit_new_row'
			
      let {
        card_program_code,
        reseller_code,
        currency,
        reseller_name,
        user,
        card_program_id,
        reseller_id,
			} = this.$route.query

      this.tableData = [{
        ...createNewRowFromHeadings(this.tableHeadings, 'setup_debit_new_row'),
        cardProgCode: card_program_code,
        resellerCode: reseller_code,
        currency: currency,
        resellerName: reseller_name,
        resellerId: reseller_id,
        cardProgId: card_program_id,
        user: this.userInfo.preferred_username  || ''
			}]
			*/
    }
  }
</script>

<style lang="scss" scoped>
.control-label {
  font-weight: bold;
  text-transform: uppercase;
}

.bg-denger {
  background-color: #05980e;
  display: block;
  color: #fff;
}

.ceevo__table__cell--nopadding {
  display: none !important;
}

.hiddenInput {
  opacity: 0;
  width: 1px;
}
</style>
