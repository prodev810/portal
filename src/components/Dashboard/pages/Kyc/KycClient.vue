<template>
  <div class="container-fluid d-xl-flex">

    <div class="kyc-client col-md-6">
      <el-row class="w-100 mb-4 kyc__client__head">
        <div class="d-flex justify-content-between">
          <span class="h2 kyc-client__sub-head">{{ handlePageTitle }} KYC Client</span>
          <router-link to="/kyc/product-config">
            <p-button v-if="isCreateMode"
                      round type="default">View Clients
            </p-button>
          </router-link>
        </div>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client Name <span v-if="!isViewMode"
                                                                                  class="required-input">*</span></p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="isViewMode">{{client.clientName}}</p>
          <el-input v-model="client.clientName"
                    @blur="handleFormInput"
                    :validate-event="true"
                    :class="{'input-outline':isEditMode, 'is-invalid': !isValidClientName}"
                    v-else-if="client"></el-input>
          <p v-if="!isValidClientName" class="invalid-feedback">{{KYC_CLIENT_VALIDATION_MESSAGES.required}}</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client Reference <span v-if="!isViewMode"
                                                                                       class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="isViewMode">{{client.clientReference}}</p>
          <el-input v-model="client.clientReference"
                    :class="{'input-outline':isEditMode, 'is-invalid': !isValidClientReference}"
                    v-else-if="client"></el-input>
          <p v-if="!isValidClientReference" class="invalid-feedback">{{KYC_CLIENT_VALIDATION_MESSAGES.required}}</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account Contact <span v-if="!isViewMode"
                                                                                      class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="isViewMode">{{client.contactName}}</p>
          <el-input v-model="client.contactName"
                    :class="{'is-invalid': !isValidContactName}"
                    v-else-if="client"></el-input>
          <p v-if="!isValidContactName" class="invalid-feedback">{{KYC_CLIENT_VALIDATION_MESSAGES.required}}</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account e-mail <span v-if="!isViewMode"
                                                                                     class="required-input">*</span></p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="isViewMode">
            <a :href="'mailto:' + client.contactEmail" class="kyc-client-row__link">{{client.contactEmail}}</a>
          </p>
          <el-input v-model="client.contactEmail"
                    :class="{'is-invalid': !isValidContactEmail}"
                    type="email" v-else-if="client"></el-input>
          <p v-if="!isValidContactEmail" class="invalid-feedback">{{KYC_CLIENT_VALIDATION_MESSAGES.required}}</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Issuing Client <span v-if="!isViewMode"
                                                                                     class="required-input">*</span></p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select w-100"
                     v-model="client.issuing">
            <el-option v-for="item in selectYesNoValue"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">{{item.name}}
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text">{{ client.issuing }}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">ID <span v-if="!isViewMode"
                                                                         class="required-input">*</span></p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select w-100"
                     v-model="client.idCheckRequired">
            <el-option v-for="item in selectYesNoValue"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">{{item.name}}
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text"> {{ client.idCheckRequired | booleanToYesNoFormat}}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Screening <span v-if="!isViewMode"
                                                                                class="required-input">*</span></p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select w-100"
                     v-model="client.sanctionCheckRequired">
            <el-option v-for="item in selectYesNoValue"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">{{item.name}}
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text">{{ client.sanctionCheckRequired | booleanToYesNoFormat}}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Proof Of Address <span v-if="!isViewMode"
                                                                                       class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select w-100"
                     v-model="client.poaCheckRequired">
            <el-option v-for="item in selectYesNoValue"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">{{item.name}}
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text">{{ client.poaCheckRequired | booleanToYesNoFormat}}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Status <span v-if="!isViewMode"
                                                                             class="required-input">*</span></p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select w-100"
                     v-model="client.clientStatus">
            <el-option v-for="item in clientStatuses"
                       :key="item.name"
                       :label="ucFirst(item.name)"
                       :value="item.name"
            >
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text">{{ ucFirst(client.clientStatus) }}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Rescreening Interval <span v-if="!isViewMode"
                                                                                           class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="14">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.rescreenIntervalSchedule"
                       class="select-primary kyc__custom__primary__select w-100"
                       v-model="rescreenIntervalScheduleSelectValue"
                       @change="handleRescreeningInterval">
              <el-option v-for="item in rescreeningList"
                         :key="item.label"
                         :label="item.label"
                         :value="item.label">{{item.label}}
              </el-option>
            </el-select>
          </template>
          <span v-else
                class="kyc-client-row__text">{{ rescreenIntervalScheduleSelectValue }}</span>
        </el-col>
      </el-row>

      <el-row v-if="!isViewMode" class="kyc-client-row d-flex">
        <el-col>
          <strong><span class="required-input">*</span> required</strong>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-inline-flex justify-content-start w-100">
        <div class="item btn-item mr-4">
          <p-button
            v-if="!isViewMode"
            round
            @click.native="modals.visible = true"
            type="primary"
            class="search-button"
            :class="{'disabled':!validateClientForm}">
            {{ handlePageBtn }}
          </p-button>
          <div v-else>
            <router-link :to="productConfigClientRoute">
              <p-button round type="primary">
                {{handlePageBtn}}
              </p-button>
            </router-link>
          </div>
        </div>
        <div class="item btn-item">
          <router-link to="/kyc/product-config">
            <p-button round type="default">{{handlePageCancelBtn}}</p-button>
          </router-link>
        </div>
        <modal :show.sync="modals.visible"
               footer-classes="justify-content-center"
               type="notice">
          <h5 slot="header" class="modal-title">{{handleModalTitle}}</h5>
          <template>
            <strong>{{handleModalText}}?</strong>
          </template>
          <div slot="footer" class="w-50 d-flex justify-content-between">
            <p-button round type="success"
                      @click.native="handleClientAction">Yes
            </p-button>
            <p-button round type="default"
                      @click.native="modals.visible = false">Cancel
            </p-button>
          </div>
        </modal>
      </el-row>

    </div>

    <div class="kyc-client col-md-7">
      <el-row class="mb-4">
        <span class="h2 kyc-client__sub-head">Fees</span>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Currency <span v-if="!isViewMode"
                                                                               class="required-input">*</span></p>
        </el-col>
        <el-col :sm="11">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select w-100"
                     v-model="client.feeCurrency">
            <el-option v-for="item in currencyList"
                       :key="item.currencyCode"
                       :label="item.currencyCode"
                       :value="item.currencyCode">
            </el-option>
          </el-select>
          <strong class="kyc-client-row__text" v-else>{{ client.feeCurrency }}</strong>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Full Application <span v-if="!isViewMode"
                                                                                       class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="11">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.applicationFee && isViewMode">{{ client.applicationFee |
            numberMoneyFormat }}</p>
          <el-input v-model="client.applicationFee"
                    @blur="handleNumberInput('applicationFee')"
                    :class="{'is_invalid': !isValidApplicationFee}"
                    type="number" min="0"
                    v-else></el-input>
          <p v-if="!isValidApplicationFee" class="invalid-feedback">
            {{KYC_CLIENT_VALIDATION_MESSAGES.required}}
            {{KYC_CLIENT_VALIDATION_MESSAGES.number}}
          </p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">ID Rescreen <span v-if="!isViewMode"
                                                                                  class="required-input">*</span></p>
        </el-col>
        <el-col :sm="11">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.idCheckFee && isViewMode">{{ client.idCheckFee | numberMoneyFormat }}</p>
          <el-input v-model="client.idCheckFee"
                    @blur="handleNumberInput('idCheckFee')"
                    :class="{'is_invalid': !isValidIdCheckFee}"
                    type="number" min="0"
                    v-else></el-input>
          <p v-if="!isValidIdCheckFee" class="invalid-feedback">
            {{KYC_CLIENT_VALIDATION_MESSAGES.required}}
            {{KYC_CLIENT_VALIDATION_MESSAGES.number}}
          </p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">POA Rescreen <span v-if="!isViewMode"
                                                                                   class="required-input">*</span></p>
        </el-col>
        <el-col :sm="11">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.poaCheckFee  && isViewMode">{{ client.poaCheckFee | numberMoneyFormat }}</p>
          <el-input v-model="client.poaCheckFee"
                    @blur="handleNumberInput('poaCheckFee')"
                    type="number" min="0"
                    :class="{'is_invalid': !isValidPoaCheckFee}"
                    v-else></el-input>
          <p v-if="!isValidPoaCheckFee" class="invalid-feedback">
            {{KYC_CLIENT_VALIDATION_MESSAGES.required}}
            {{KYC_CLIENT_VALIDATION_MESSAGES.number}}
          </p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Sanction Rescreen <span v-if="!isViewMode"
                                                                                        class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="11">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.sanctionCheckFee && isViewMode">
            {{ client.sanctionCheckFee | numberMoneyFormat}}</p>
          <el-input v-model="client.sanctionCheckFee"
                    @blur="handleNumberInput('sanctionCheckFee')"
                    :class="{'is_invalid': !isValidSanctionCheckFee}"
                    type="number" min="0"
                    v-else></el-input>
          <p v-if="!isValidSanctionCheckFee" class="invalid-feedback">
            {{KYC_CLIENT_VALIDATION_MESSAGES.required}}
            {{KYC_CLIENT_VALIDATION_MESSAGES.number}}
          </p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">SMS Fee <span v-if="!isViewMode" class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="11">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.smsFee && isViewMode">{{ client.smsFee | numberMoneyFormat}}</p>
          <el-input v-model="client.smsFee"
                    @blur="handleNumberInput('smsFee')"
                    :class="{'is_invalid': !isValidSmsFee}"
                    type="number" min="0"
                    v-else></el-input>
          <p v-if="!isValidSmsFee" class="invalid-feedback">
            {{KYC_CLIENT_VALIDATION_MESSAGES.required}}
            {{KYC_CLIENT_VALIDATION_MESSAGES.number}}
          </p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Reminder <span v-if="!isViewMode"
                                                                                   class="required-input">*</span></p>
        </el-col>
        <el-col :sm="11">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.kycReminderSchedule"
                       class="select-primary kyc__custom__primary__select w-100"
                       v-model="client.kycReminderSchedule.intervalVal">
              <el-option v-for="item in dateIntervalList"
                         :key="item"
                         :label="addDateRangeLabel(item)"
                         :value="item">
              </el-option>
            </el-select>
          </template>
          <strong class="kyc-client-row__text" v-else>
            {{addDateRangeLabel(client.kycReminderSchedule.intervalVal)}}</strong>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Auto Close <span v-if="!isViewMode"
                                                                                 class="required-input">*</span></p>
        </el-col>
        <el-col :sm="11">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.autoCloseSchedule"
                       class="select-primary kyc__custom__primary__select w-100"
                       v-model="client.autoCloseSchedule.intervalVal">
              <el-option v-for="item in dateIntervalList"
                         :key="item"
                         :label="addDateRangeLabel(item)"
                         :value="item">
              </el-option>
            </el-select>
          </template>
          <strong class="kyc-client-row__text" v-else>{{ addDateRangeLabel(client.autoCloseSchedule.intervalVal)
            }}</strong>
        </el-col>
      </el-row>


      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Auto Followup Close <span v-if="!isViewMode"
                                                                                              class="required-input">*</span>
          </p>
        </el-col>
        <el-col :sm="11">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.kycAutoFollowupCloseSchedule"
                       class="select-primary kyc__custom__primary__select w-100"
                       v-model="client.kycAutoFollowupCloseSchedule.intervalVal">
              <el-option v-for="item in dateIntervalList"
                         :key="item"
                         :label="addDateRangeLabel(item)"
                         :value="item">
              </el-option>
            </el-select>
          </template>
          <strong class="kyc-client-row__text"
                  v-else>{{ addDateRangeLabel(client.kycAutoFollowupCloseSchedule.intervalVal) }}</strong>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {Modal} from 'src/components/UIComponents'
  import {
    KYC_GET_CLIENT_STATUSES,
    KYC_GET_CURRENCY_LIST,
    KYC_GET_PRODUCT_CONFIG_CLIENT,
    KYC_PUT_PRODUCT_CONFIG_CLIENT,
    KYC_CREATE_PRODUCT_CONFIG_CLIENT,
  } from "../../../../store/types"
  import clientTypes from '../../../../utils/clientTypes'
  import rescreeningIntervals from '../../../../utils/rescreeningIntervals'
  import {moneyFormat} from '../../../../utils/moneyFormat'

  const KYC_CLIENT_MODE = {
    create: {
      modal: {title: 'Create KYC Client Confirmation', modalText: 'Are you sure you want to create the KYC client?'},
      page: {title: 'Create', btnText: 'Create'},
    },
    edit: {
      modal: {
        title: 'Confirm save new KYC client',
        modalText: 'Are you sure you want to save your changes to the KYC client?'
      },
      page: {title: 'Edit', btnText: 'Save'},
    },
    view: {
      page:
        {title: 'View', btnText: 'Edit'}
    },
  }

  export default {
    components: {
      Modal,
    },
    props: ['mode'],
    data() {
      return {
        KYC_CLIENT_VALIDATION_MESSAGES: {
          required: 'This field is required.',
          number: 'This field must be greater that 0.',
        },
        rescreenIntervalScheduleSelectValue: null,
        modals: {
          visible: false
        },
        clientId: null,
        client: {
          kycReminderSchedule: {
            clientScheduleIntervalType: "DAY",
          },
          autoCloseSchedule: {
            clientScheduleIntervalType: "DAY",
          },
          rescreenIntervalSchedule: {},
          kycAutoFollowupCloseSchedule: {
            clientScheduleIntervalType: "DAY",
          },
        },
        selectYesNoValue: [
          {value: true, name: 'Yes'},
          {value: false, name: 'No'},
        ],
        rescreeningList: [
          {label: 'Never', value: 0, type: rescreeningIntervals.DAY},
          {label: 'Monthly', value: 1, type: rescreeningIntervals.MONTH},
          {label: 'Quarter', value: 1, type: rescreeningIntervals.QUARTER},
          {label: '6 Month', value: 6, type: rescreeningIntervals.MONTH},
          {label: 'Yearly', value: 1, type: rescreeningIntervals.YEAR},
        ],
        dateIntervalList: [],
        validationList: [
          'issuing',
          'idCheckRequired',
          'sanctionCheckRequired',
          'feeCurrency',
          'clientStatus',
          'poaCheckRequired',
          'clientName',
          'applicationFee',
          'clientReference',
          'contactEmail',
          'contactName',
          'idCheckFee',
          'poaCheckFee',
          'smsFee',
        ],
        validationObjectList: [
          'rescreenIntervalSchedule',
          'kycReminderSchedule',
          'autoCloseSchedule',
          'kycAutoFollowupCloseSchedule',
        ],
      }
    },
    filters: {
      booleanToYesNoFormat: (value) => {
        return value ? 'Yes' : 'No'
      },
      numberMoneyFormat: (d) => {
        if (!d) return ''
        if (d < 1) return Number(d).toFixed(2)
        return moneyFormat(d)
      },
    },
    async created() {

      this.getClientStatuses()

      this.clientId = this.$route.params.id

      this.getCurrencyList()

      if (this.clientId) {
        const responseClient = await this.getProductConfigClientById({id: this.clientId})
          .catch(err => console.log('error get client by id', err))
        if (responseClient) {
          responseClient.issuing = responseClient.clientType === 'ISSUING' ? 'Yes' : 'No'
          this.client = responseClient
        }
      }
      if (this.mode !== 'create') {
        this.rescreenIntervalScheduleSelectValue = this.handleRescreenIntervalItemLabel()
      }

      this.getDateRange(1, 30, this.dateIntervalList)
    },
    watch: {
      mode() {
        this.client.issuing = this.getYesNoFromBoolean(this.isClientIssuing)

        if (this.mode !== 'create') {
          this.rescreenIntervalScheduleSelectValue = this.handleRescreenIntervalItemLabel()
        }
      },
    },
    computed: {
      ...mapState({
        clientStatuses: state => state.kyc.clientStatusesList,
        currencyList: state => state.kyc.currencyList,
      }),
      isViewMode() {
        return this.mode === 'view'
      },
      isCreateMode() {
        return this.mode === 'create'
      },
      isEditMode() {
        return this.mode === 'edit'
      },
      isClientIssuing() {
        return this.client.clientType === clientTypes.ISSUING
      },
      handleModalTitle() {
        return (KYC_CLIENT_MODE[this.mode].modal) ? KYC_CLIENT_MODE[this.mode].modal.title : ''
      },
      handleModalText() {
        return (KYC_CLIENT_MODE[this.mode].modal) ? KYC_CLIENT_MODE[this.mode].modal.modalText : ''
      },
      handlePageTitle() {
        return KYC_CLIENT_MODE[this.mode].page.title || ''
      },
      handlePageBtn() {
        return KYC_CLIENT_MODE[this.mode].page.btnText || ''
      },
      handlePageCancelBtn() {
        if (this.mode === 'view') {
          return 'Go Back'
        }
        return 'Cancel'
      },
      productConfigClientRoute() {
        if (this.mode === 'create') {
          return `/kyc/product-config/view-client/${this.clientId}`
        }
        return `/kyc/product-config/edit-client/${this.clientId}`
      },
      validateClientForm() {
        let isValid = true
        if (!this.isViewMode) {
          this.validationList.forEach(item => {
            if (typeof (this.client[`${item}`]) === 'undefined' || this.client[`${item}`] === '') {
              isValid = false
            }
          })
          this.validationObjectList.forEach(item => {
            if (!this.client[`${item}`].hasOwnProperty('intervalVal')) {
              isValid = false
            }
          })
        }
        return isValid
      },
      isValidClientName() {
        return this.client.clientName !== ''
      },
      isValidClientReference() {
        return this.client.clientReference !== ''
      },
      isValidSanctionCheckFee() {
        return (typeof (this.client.sanctionCheckFee) === 'undefined'|| this.client.sanctionCheckFee !== '' && this.client.sanctionCheckFee > 0)
      },
      isValidApplicationFee() {
        return (typeof (this.client.applicationFee) === 'undefined' || this.client.applicationFee !== '' && this.client.applicationFee > 0)
      },
      isValidContactEmail() {
        return this.client.contactEmail !== ''
      },
      isValidContactName() {
        return this.client.contactName !== ''
      },
      isValidPoaCheckFee() {
        return (typeof (this.client.poaCheckFee) === 'undefined' || this.client.poaCheckFee !== '' && this.client.poaCheckFee > 0)
      },
      isValidIdCheckFee() {
        return (typeof (this.client.idCheckFee) === 'undefined' || this.client.idCheckFee !== '' && this.client.idCheckFee > 0)
      },
      isValidSmsFee() {
        return (typeof (this.client.smsFee) === 'undefined' || this.client.smsFee !== '' && this.client.smsFee > 0)
      },
    },
    methods: {
      ...mapActions({
        getClientStatuses: KYC_GET_CLIENT_STATUSES,
        getCurrencyList: KYC_GET_CURRENCY_LIST,
        getProductConfigClientById: KYC_GET_PRODUCT_CONFIG_CLIENT,
        updateProductConfigClient: KYC_PUT_PRODUCT_CONFIG_CLIENT,
        createProductConfigClient: KYC_CREATE_PRODUCT_CONFIG_CLIENT,
      }),
      ucFirst(string) {
        if (!string) return ''
        string = string.toLowerCase()
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      getDateRange(start, end, dateArray) {
        for (let i = start; i <= end; i++) {
          dateArray.push(i)
        }
      },
      addDateRangeLabel(value) {
        let label = 'days'
        if (value === 1) {
          label = 'day'
        }
        return `${value} ${label}`
      },
      async handleClientAction() {
        this.modals.visible = false
        if (this.mode === 'edit') {
          this.client.clientType = this.getClientType(this.client.issuing)
          delete this.client.issuing
          delete this.client.id
          console.log('client', this.client)
          const response = await this.updateProductConfigClient({id: this.clientId, body: this.client})
            .catch(err => console.log('error put client by id', err));
          //this.$router.push({path: `/kyc/product-config/view-client/${this.clientId}`});
        }
        if (this.mode === 'create') {
          this.client.clientType = this.getClientType(this.client.issuing)
          this.client.clientReference = (this.client.clientReference) ? this.client.clientReference.toUpperCase() : ''
          this.client.frmRequired = true
          this.client.applicationFee = Number(this.client.applicationFee)
          this.client.idCheckFee = Number(this.client.idCheckFee)
          this.client.poaCheckFee = Number(this.client.poaCheckFee)
          this.client.sanctionCheckFee = Number(this.client.sanctionCheckFee)
          this.client.sanctionCheckFee = Number(this.client.sanctionCheckFee)
          this.client.smsFee = Number(this.client.smsFee)
          delete this.client.issuing
          const copyClient = Object.assign({}, this.client)
          delete copyClient.issuing
          console.log('client', copyClient)
          const response = await this.createProductConfigClient({body: copyClient})
            .catch(err => console.log('error create client by id', err));
          this.clientId = response.id
          //this.$router.push({path: `/kyc/product-config/view-client/${this.clientId}`})
        }

      },
      getYesNoFromBoolean(value) {
        return value ? 'Yes' : 'No'
      },
      getClientType(value) {
        if (!value) return clientTypes.STANDARD
        return clientTypes.ISSUING
      },
      handleRescreeningInterval(event) {
        const rescreenIntervalItem = this.rescreeningList.filter(item => item.label === event)[0]
        this.client.rescreenIntervalSchedule = {
          clientScheduleIntervalType: rescreenIntervalItem.type,
          intervalVal: rescreenIntervalItem.value,
        }
      },
      handleRescreenIntervalItemLabel() {
        const result = this.rescreeningList.filter(item => {
          if (item.value === this.client.rescreenIntervalSchedule.intervalVal
            && item.type === this.client.rescreenIntervalSchedule.clientScheduleIntervalType) {
            return item
          }
        })
        if (result.length) return result[0].label
      },
      handleFormInput(value) {
        console.log('valid', {event})
      },
      handleNumberInput(name) {
        const value = event.target.value
        if (value) {
          this.client[`${name}`] = Math.abs(value)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/sass/paper/variables";

  $grey-color: #8D8D8D;

  .kyc-client {
    padding-right: 225px;

    .h2 {
      margin-bottom: 0;
    }

    .btn {
      margin: 0;
      text-transform: none;
      width: 180px;
    }
  }

  .kyc__client__head {
    .btn {
      width: 150px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      padding: 0;
    }
  }

  .kyc-client__sub-head {
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #292929;
    padding-left: 0;
  }

  .kyc-client-row {
    margin-bottom: 15px;
  }

  .search-button {
    text-transform: none;
    width: 180px;
  }

  .kyc-client-row__text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .kyc-client-row__title {
    font-weight: 600;
    position: relative;
  }

  .kyc-client-row__link {
    transition: .2s;
    color: #7039DA;
  }

  .kyc-client-row__link:hover {
    transition: .2s;
    color: #5823bd;
  }

  .el-select.kyc__top__bottom__arrows.el-input--suffix.el-input__inner {
    border: 1px solid black;
    border-radius: 1px;
  }

  .kyc__custom__primary__select {
    /deep/ {
      .el-select-dropdown {
        .el-select-dropdown__item {
          background-color: black !important;

          &.selected {
            color: white !important;
          }

          &.hover, &:hover {
            background-color: #31AF6A !important;
          }
        }
      }
    }
  }

  .input-outline {
    /deep/ {
      .el-input__inner {
        border-color: transparent !important;
        padding-left: 0;
      }
    }
  }

  .el-select {
    &.kyc-client-select {
      /deep/ {
        .el-input {
          .el-input__inner {
            border: 1px solid black;
            border-radius: 1px;
          }

        }
      }
    }
  }

  .required-input {
    color: $primary-color;
    font-size: 24px;
    margin-left: 10px;
  }

  .invalid-feedback {
    display: block;
    margin: 0;
    position: absolute;
    font-weight: bold;
  }

  /deep/ {

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .modal-dialog {
      min-width: 760px;
      text-align: center;

      .modal-header {
        border-bottom-color: transparent !important;

        .modal-title {
          font-weight: 900;
          font-family: 'Poppins', sans-serif;
        }
      }

      .modal-footer {
        border-top-color: transparent !important;
      }

      .btn {
        width: 178px;
        margin-bottom: 50px;
      }
    }

    .el-input__inner {
      border-radius: 10px !important;
      color: black;
      font-weight: 600;
    }

    .select-primary.el-select .el-input input,
    .select-primary.el-select .el-input:hover input,
    .select-primary.el-select .el-input:hover .el-input__icon {
      background-color: white;
      color: black;

      &:hover {
        background-color: white;
        color: black;
      }
    }

    .select-primary.el-select .el-input input,
    .select-primary.el-select .el-input .el-input__icon {
      color: black !important;
    }

    .select-primary.el-select {
      .el-input {
        input {
          border-width: 1px;
          border-radius: 10px;
          border-color: #dcdfe6 !important;
          color: $grey-color;

          &:hover {
            &::-webkit-input-placeholder {
              color: $grey-color;
            }

            &::-moz-placeholder {
              color: $grey-color;
            }

            &:-ms-input-placeholder {
              color: $grey-color;
            }

            &:-moz-placeholder {
              color: $grey-color;
            }
          }
        }
      }
    }

  }
</style>
