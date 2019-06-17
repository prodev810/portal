<template>
  <div class="container-fluid d-xl-flex">
    <div class="kyc-client col-md-6">
      <el-row class="w-100 mb-4 kyc__client__head">
        <div class="d-flex justify-content-between">
          <span class="h2 kyc-client__sub-head">{{ handlePageTitle }} KYC Client</span>
          <p-button
            v-if="isCreateMode"
            round
            type="default"
            @click="searchHandle"
          >
            View Client
          </p-button>
        </div>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client Name</p>
        </el-col>
        <el-col :sm="14">
          <!--<p class="kyc-client-row__text kyc-client-row__name">{{client.clientName}}</p>-->
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="mode!='create' && mode!='edit'">{{client.clientName}}</p>
          <el-input
            v-model="client.clientName"
            v-else-if="client"></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client App Ref</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="mode!=='create' && mode!=='edit'">{{client.clientReference}}</p>
          <el-input
            v-model="client.clientReference"
            v-else-if="client"></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account Contact</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="mode!=='create' && mode!=='edit'">{{client.contactName}}</p>
          <el-input
            v-model="client.contactName"
            v-else-if="client"></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account E-mail</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="mode!=='create' && mode!=='edit'">
            <a :href="'mailto:' + client.contactEmail" class="kyc-client-row__link">{{client.contactEmail}}</a>
          </p>
          <el-input v-model="client.contactEmail" v-else-if="client"></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Issuing Client</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
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
          <p class="kyc-client-row__text kyc-client-row__title">ID</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="client.idCheckRequired">
            <el-option v-for="item in selectYesNoValue"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">{{item.name}}
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text"> {{ client.idCheckRequired }}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Screening</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="client.sanctionCheckRequired">
            <el-option v-for="item in selectYesNoValue"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">{{item.name}}
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text">{{ client.sanctionCheckRequired }}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Proof Of Address</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="client.poaCheckRequired">
            <el-option v-for="item in selectYesNoValue"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">{{item.name}}
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text">{{ client.poaCheckRequired }}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Status</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="client.clientStatus">
            <el-option v-for="item in clientStatuses"
                       :key="item.name"
                       :label="ucFirst(item.name)"
                       :value="item.name"
            >
            </el-option>
          </el-select>
          <span v-else class="kyc-client-row__text">{{ client.clientStatus }}</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Resereening Interval</p>
        </el-col>
        <el-col :sm="14">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.rescreenIntervalSchedule"
                       class="select-primary kyc__custom__primary__select"
                       v-model="client.rescreenIntervalSchedule.clientScheduleIntervalType">
              <el-option v-for="item in rescreeningList"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </template>
          <span v-else
                class="kyc-client-row__text">{{ client.rescreenIntervalSchedule.clientScheduleIntervalType }}</span>
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
          <p-button
            round
            type="default"
            @click="searchHandle"
          >
            {{handlePageCancelBtn}}
          </p-button>
        </div>
        <modal :show.sync="modals.visible"
               footer-classes="justify-content-center"
               type="notice">
          <h5 slot="header" class="modal-title">{{handleModalTitle}}</h5>
          <template>
            <p>{{handleModalText}}?</p>
          </template>
          <div slot="footer" class="w-50 d-flex justify-content-between">
            <router-link :to="productConfigClientRoute">
              <p-button round type="success" round
                        @click.native="searchHandle">Yes</p-button>
            </router-link>
            <p-button round type="default" round @click.native="modals.visible = false">Cancel</p-button>
          </div>
        </modal>
      </el-row>

    </div>
    <div class="kyc-client col-md-6">
      <el-row class="mb-4">
        <span class="h2 kyc-client__sub-head">Fees</span>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Currency</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="client.feeCurrency">
            <el-option v-for="item in currencyList"
                       :key="item.currencyCode"
                       :label="item.currencyCode"
                       :value="item.currencyCode">
            </el-option>
          </el-select>
          <strong v-else>{{ client.feeCurrency }}</strong>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Full Application</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.applicationFee && mode!='create' && mode!='edit'">{{ client.applicationFee }}</p>
          <el-input v-model="client.applicationFee"
                    v-else></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">ID Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.idCheckFee && mode!='create' && mode!='edit'">{{ client.idCheckFee }}</p>
          <el-input v-model="client.idCheckFee"
                    v-else></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">POA Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.poaCheckFee  && mode!='create' && mode!='edit'">{{ client.poaCheckFee }}</p>
          <el-input v-model="client.poaCheckFee"
                    v-else></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Sanotion Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.sanctionCheckFee && mode!='create' && mode!='edit'">
            {{ client.sanctionCheckFee}}</p>
          <el-input v-model="client.sanctionCheckFee"
                    v-else></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">SMS Fee</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"
             v-if="client && client.smsFee && mode!='create' && mode!='edit'">{{ client.smsFee }}</p>
          <el-input v-model="client.smsFee"
                    v-else></el-input>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Reminder</p>
        </el-col>
        <el-col :sm="14">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.kycReminderSchedule"
                       class="select-primary kyc__custom__primary__select"
                       v-model="client.kycReminderSchedule.intervalVal">
              <el-option v-for="item in dateIntervalList"
                         :key="item"
                         :label="addDateRangeLabel(item)"
                         :value="item">
              </el-option>
            </el-select>
          </template>
          <strong  v-else>{{ client.kycReminderSchedule.intervalVal }} days</strong>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Auto Close</p>
        </el-col>
        <el-col :sm="14">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.autoCloseSchedule"
                       class="select-primary kyc__custom__primary__select"
                       v-model="client.autoCloseSchedule.intervalVal">
              <el-option v-for="item in dateIntervalList"
                         :key="item"
                         :label="addDateRangeLabel(item)"
                         :value="item">
              </el-option>
            </el-select>
          </template>
          <strong v-else>{{ client.autoCloseSchedule.intervalVal }} days</strong>
        </el-col>
      </el-row>


      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Auto Followup Close</p>
        </el-col>
        <el-col :sm="14">
          <template v-if="!isViewMode">
            <el-select v-if="client && client.kycAutoFollowupCloseSchedule"
                       class="select-primary kyc__custom__primary__select"
                       v-model="client.kycAutoFollowupCloseSchedule.intervalVal">
              <el-option v-for="item in dateIntervalList"
                         :key="item"
                         :label="addDateRangeLabel(item)"
                         :value="item">
              </el-option>
            </el-select>
          </template>
          <strong v-else>{{ client.kycAutoFollowupCloseSchedule.intervalVal }} days</strong>
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
        modals: {
          visible: false
        },
        clientId: null,
        client: {
          kycReminderSchedule:{
            clientScheduleIntervalType: "DAY",
          },
          autoCloseSchedule:{
            clientScheduleIntervalType: "DAY",
          },
          rescreenIntervalSchedule:{
            intervalVal: 1
          },
          kycAutoFollowupCloseSchedule:{
            clientScheduleIntervalType: "DAY",
          },
        },
        valueSelect: '',
        userData: {
          name: 'Acquiring',
          ref: 'KYCACQ',
          contact: 'Peter Gibbons',
          email: 'gibbons@email.com'
        },
        dataForSelects: [
          {value: true, label: 'yes'},
          {value: false, label: 'no'},

        ],
        selectYesNoValue: [
          {value: true, name: 'Yes'},
          {value: false, name: 'No'},
        ],
        rescreeningList: [
          'Never',
          'Monthly',
          'QUARTER',
          '6 Month',
          'Yearly',
        ],
        dateIntervalList: [],
        validationList:[
          'issuing',
          'id',
          'screening',
          'rescreeningInterval',
          'currency',
          'kycReminder',
          'autoClose',
          'autoFollowupClose',
        ],
      }
    },
    async created() {

      this.getClientStatuses()

      this.clientId = this.$route.params.id

      this.getCurrencyList()

      if(this.clientId){
        const responseClient = await this.getProductConfigClientById({id: this.clientId})
          .catch(err => console.log('error get client by id', err))
        if (responseClient) {
          responseClient.issuing = responseClient.clientType === 'ISSUING' ? 'Yes' : 'No'
          this.client = responseClient
        }
      }

      this.getDateRange(1, 30, this.dateIntervalList)
    },
    computed: {
      ...mapState({
        clientStatuses: state => state.kyc.clientStatusesList,
        currencyList: state => state.kyc.currencyList,
      }),
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
      isCreateMode() {
        return this.mode === 'create'
      },
      isViewMode() {
        return this.mode === 'view'
      },
      productConfigClientRoute(){
        if(this.mode === 'create'){
          return `/kyc/product-config/view-client/${this.clientId}`
        }
        return `/kyc/product-config/edit-client/${this.clientId}`
      },
      validateClientForm(){
        let isValid = true
         if(this.mode === 'create'){
           this.validationList.forEach( item =>{
             if(!this.client[`${item}`]){
               isValid = false
             }
           })
         }
        return isValid
      }
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
        string = string.toLowerCase()
        console.log(string)
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
      async searchHandle() {
        this.modals.visible = false
        if(this.mode === 'edit'){
          delete this.client.issuing
          delete this.client.id
          const response = await this.updateProductConfigClient({id: this.clientId, body: this.client})
            .catch(err => console.log('error put client by id', err));
          this.$router.push({path: `/kyc/product-config/view-client/${this.clientId}`});
        }
        if(this.mode === 'create'){
          delete this.client.issuing
          this.client.clientType = 'STANDARD'
          this.client.frmRequired = true
          this.client.applicationFee = Number(this.client.applicationFee)
          this.client.idCheckFee = Number(this.client.idCheckFee)
          this.client.poaCheckFee = Number(this.client.poaCheckFee)
          this.client.sanctionCheckFee = Number(this.client.sanctionCheckFee)
          this.client.sanctionCheckFee = Number(this.client.sanctionCheckFee)
          this.client.smsFee = Number(this.client.smsFee)
          const response = await this.createProductConfigClient({body: this.client})
            .catch(err => console.log('error create client by id', err));
          console.log('res', response)
        }

      },
      getYesNoFromBoolean(value) {
        return value ? 'Yes' : 'No'
      },
    }
  }
</script>

<style lang="scss" scoped>
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

  /deep/ {
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

    .select-primary.el-select {
      .el-input {
        input {
          border-width: 1px;
          border-radius: 5px;
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
</style>
