<template>
  <el-row class="approve-emoney-account">
    <el-row>
      <el-col :md="24" class="mb-4">
        <strong class="h3 page-block-title">Filter</strong>
      </el-col>
      <el-row>
        <el-col :md="12">
          <el-row>
            <label class="row-label"><strong>Reseller</strong></label>
            <div class="d-inline-flex form-input-block">
              <el-select class="w-100" v-model="filterModel.reseller">
                <el-option v-for="item in resellerCodeList"
                           :key="item.name"
                           :label="item.name"
                           :value="item.value">{{item.name}}
                </el-option>
              </el-select>
            </div>
          </el-row>

          <el-row class="mb-3 d-inline-flex justify-items-center">
            <label class="row-label"><strong>Date</strong></label>
            <div class="d-inline-flex form-input-block">
              <el-row :gutter="40">
                <el-col :md="12">
                  <el-date-picker v-model="filterModel.dateFrom" type="date" placeholder="From"></el-date-picker>
                </el-col>
                <el-col :md="12">
                  <el-date-picker v-model="filterModel.dateTo" type="date" placeholder="To"></el-date-picker>
                </el-col>
              </el-row>
            </div>
          </el-row>

          <el-row class="mb-3">
            <label class="row-label"><strong>Status</strong></label>
            <div class="d-inline-flex form-input-block">
              <el-select class="w-100" v-model="filterModel.status">
                <el-option v-for="item in issuingAppStatuses"
                           :key="item.name"
                           :label="item.description"
                           :value="item.name">{{item.description}}
                </el-option>
              </el-select>
            </div>
          </el-row>

          <el-row class="mb-3">
            <label class="row-label"><strong>Oldest first</strong></label>
            <div class="d-inline-flex form-input-block">
              <custom-switch v-model="filterModel.oldestFirst"
                             :onText="'No'" :offText="'Yes'"></custom-switch>
            </div>
          </el-row>
        </el-col>
        <el-col :md="12">
          <el-row>
            <label class="row-label"><strong>Surname</strong></label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="filterModel.surname"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label"><strong>App Ref</strong></label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="filterModel.appRef"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label"><strong>Client App Ref</strong></label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="filterModel.clientAppRef"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label"><strong>Account Ref</strong></label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="filterModel.accountRef"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="btn-block">
            <div class="form-input-block text-right">
              <p-button round type="primary" class="btn-search"
                        @click="handleSearch()">Search
              </p-button>
            </div>

          </el-row>

        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <strong>Submit all checked</strong>
          <p-button round class="btn-submit"
                    @click="handleSubmit()">Submit
          </p-button>
        </el-col>
      </el-row>
    </el-row>

    <el-row class="mb-3">
      <el-col :md="24">
        <strong class="h3 page-block-title">Listing</strong>
      </el-col>
    </el-row>
    <el-row>
      <div class="card">
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col" class="text-center">
              <p-checkbox @input="handleListingTableCheckboxes"
                          class="primary-custom-checkbox"></p-checkbox>
            </th>
            <th scope="col" v-for="item in listingTableHeaderList" :key="item.label">{{item.label}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="tableItem in issuingAppsInfosChecked" :key="tableItem.id">
            <td scope="col" class="text-center">
              <p-checkbox v-model="tableItem.isChecked"
                          class="primary-custom-checkbox"></p-checkbox>
            </td>
            <td>{{tableItem.accountReference}}</td>
            <td>{{tableItem.firstName}}</td>
            <td>{{tableItem.lastName}}</td>
            <td class="text-capitalize text-center" :class="handleAppStatus(tableItem.issuingAppStatus)">
              {{tableItem.issuingAppStatus}}
            </td>
            <td class="text-center" :class="[tableItem.isPlasticRequired ? 'submitted' : 'failed']">
              {{tableItem.isPlasticRequired |
              booleanToYesNoFormat}}
            </td>
            <td class="pl-0 pr-0">
              <p-button outline type="primary"
                        @click="handleReviewAccount(tableItem)"
                        class="w-100">
                <img class="glass-icon" :src="GlassPurpleIcon" alt="glassIcon">
                Review
              </p-button>
            </td>
            <td class="text-center text" :class="[tableItem.isAccountCreated ? 'submitted': 'failed']">
              <img v-if="tableItem.isAccountCreated" :src="TickIcon" alt="tickIcon">
              <img v-else :src="CrossIcon" alt="crossIcon">
            </td>
            <td class="pl-0 pr-0">
              <p-button outline :type="tableItem.isCardCreated ? 'success' : 'danger'"
                        @click="handleCardCreated(tableItem)"
                        class="w-100">
                <template v-if="tableItem.isCardCreated">
                  <img class="glass-icon" :src="GlassGreenIcon" alt="glassIcon">
                  <img :src="TickIcon" alt="tickIcon">
                </template>
                <template v-else>
                  <img class="glass-icon" :src="GlassRedIcon" alt="glassIcon">
                  <img :src="CrossIcon" alt="crossIcon">
                </template>
              </p-button>
            </td>
            <td class="pl-0 pr-0">
              <p-button v-if="isPendingStatus(tableItem.issuingAppStatus)"
                        @click="addSingleSubmit(tableItem.id)"
                        outline type="primary" class="w-100">Submit
              </p-button>
              <p-button v-if="isFailedStatus(tableItem.issuingAppStatus)"
                        outline type="primary" class="w-100">Resubmit
              </p-button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="table-pagination">
          <p-pagination :page-count="pageCount"
                        v-model="currentPage"
                        @input="handleChangePage"
                        :perPage="perPage"></p-pagination>
        </div>
      </div>
    </el-row>
    <PSpinner v-if="isLoading"></PSpinner>
  </el-row>
</template>

<script>
  import CustomSwitch from '../../../../components/UIComponents/CustomSwitch'
  import PCheckbox from '../../../../components/UIComponents/Inputs/Checkbox'
  import PButton from "../../../UIComponents/Button";
  import {DatePicker} from 'element-ui'
  import GlassPurpleIcon from '../../../../../public/static/img/dashboard_icons/icon_glass_purple.svg'
  import GlassGreenIcon from '../../../../../public/static/img/dashboard_icons/icon_glass_green.svg'
  import GlassRedIcon from '../../../../../public/static/img/dashboard_icons/icon_glass_red.svg'
  import CrossIcon from '../../../../../public/static/img/dashboard_icons/icon_cross_red.svg'
  import TickIcon from '../../../../../public/static/img/dashboard_icons/icon_tick_green.svg'
  import PSpinner from '../../../../components/UIComponents/Spinner'
  import PPagination from '../../../UIComponents/Pagination'
  import {
    ISSUING_CARD_REQUEST,
    ISSUING_ACCOUNT_REQUEST,
    ISSUING_GET_APPS_OVERVIEW,
    GETTER_ISSUING_LOADINGSTATE,
    GETTER_ISSUING_APPS_INFO,
    GETTER_ISSUING_APPS_PAGEMETA,
    GETTER_ISSUING_APPS_INFO_CHECKED,
    BUSINESS_RESELLER_CODE_LIST,
    GETTER_BUSINESS_RESELLER_CODE_LIST,
    ISSUING_SINGLE_SUBMIT,
    ISSUING_BATCH_SUBMIT,
    ISSUING_GET_APPS_STATUSES,
    GETTER_ISSUING_APPS_STATUSES,
  } from '@/store/types'
  import {mapActions, mapGetters} from 'vuex'
  import {formatDate} from "../../../../utils/Date"
  import LOADING_STATE from '../../../../utils/loadingState'

  const ISSUING_APP_STATUS_VALUES = {
    PENDING: 'pending',
    FAILED: 'failed',
    SUBMITTED: 'submitted',
  }

  export default {
    name: "KycApprovedEmoneyAccount",
    components: {
      CustomSwitch,
      PButton,
      PCheckbox,
      PSpinner,
      PPagination,
      [DatePicker.name]: DatePicker,
    },
    data() {
      return {
        GlassPurpleIcon,
        GlassGreenIcon,
        GlassRedIcon,
        CrossIcon,
        TickIcon,
        filterModel: {
          reseller: '',
          status: '',
          dateFrom: '',
          dateTo: '',
          oldestFirst: 0,
          surname: '',
          appRef: '',
          clientAppRef: '',
          accountRef: '',
        },
        resellerList: [
          {name: 'All', value: 'all'},
        ],
        statusList: [
          {name: 'All', value: ''},
          {name: 'Submitted', value: 'submitted'},
          {name: 'Pending', value: 'pending'},
          {name: 'Failed', value: 'failed'},
        ],
        listingTableCheckboxes: {
          all: 0,
        },
        listingTableHeaderList: [
          {label: 'Account Reference'},
          {label: 'First Name'},
          {label: 'Last Name'},
          {label: 'Status'},
          {label: 'Plastic'},
          {label: 'Review'},
          {label: 'A/C Created'},
          {label: 'Card Created'},
          {label: 'Submit'},
        ],
        listingTableAllChecked: false,
        totalPages: 0,
        perPage: 20,
        currentPage: 1,
        pageCount: 0,
        issuingAppsInfosCheckedModel: {},
      }
    },
    mounted() {
      this.getResellerCodeList()
      this.getIssuingAppStatuses()
      this.handleSearch()
    },
    computed: {
      ...mapGetters({
        issuingAppsInfos: GETTER_ISSUING_APPS_INFO,
        issuingAppsPageMeta: GETTER_ISSUING_APPS_PAGEMETA,
        loadingState: GETTER_ISSUING_LOADINGSTATE,
        resellerCodeList: GETTER_BUSINESS_RESELLER_CODE_LIST,
        issuingAppStatuses: GETTER_ISSUING_APPS_STATUSES,
      }),
      isLoading() {
        return this.loadingState !== LOADING_STATE.IDEAL
      },
      issuingAppsInfosChecked() {
        if (this.issuingAppsInfosCheckedModel.length) {
          return this.issuingAppsInfosCheckedModel
            .map(info => {
              info.isChecked = false
              return info
            })
        }
      },

    },
    watch: {
      issuingAppsPageMeta(value) {
        this.pageCount = value.totalPages;
        this.perPage = value.perPage;
      },
      issuingAppsInfos(value) {
        const copyInfos = JSON.parse(JSON.stringify(value))
        this.issuingAppsInfosCheckedModel = this.addIsChecked(copyInfos);
      },

    },
    methods: {
      ...mapActions({
        getIssuingAppsOverview: ISSUING_GET_APPS_OVERVIEW,
        getResellerCodeList: BUSINESS_RESELLER_CODE_LIST,
        addSingleSubmit: ISSUING_SINGLE_SUBMIT,
        addBatchSubmit: ISSUING_BATCH_SUBMIT,
        getIssuingAppStatuses: ISSUING_GET_APPS_STATUSES,
      }),
      async handleSearch() {
        const payload = {
          toDate: this.getDateFormat(this.filterModel.dateTo),
          fromDate: this.getDateFormat(this.filterModel.dateFrom),
          lastName: this.filterModel.surname,
          issuingAppStatus: this.filterModel.status.toUpperCase(),
          oldestFirst: !!this.filterModel.oldestFirst,
          accountReference: this.filterModel.accountRef,
          clientAppRef: this.filterModel.clientAppRef,
          resellerCode: this.filterModel.reseller,
          issuingAppRefId: this.filterModel.appRef,
          pageNum: this.isPagination ? this.currentPage - 1 : 0,
          pageSize: this.perPage
        }
        Object.keys(payload).forEach((key) => (payload[key] == null || payload[key] === '') && delete payload[key])
        await this.getIssuingAppsOverview(payload)
        if (!this.isPagination) this.currentPage = 1;
      },
      async handleSubmit() {
        const body = this.issuingAppsInfosCheckedModel
          .filter(info => info.isChecked)
          .map(item => {
            return item.id
          })

        await this.addBatchSubmit(body)
          .then(response => {
            if(response.status !== 200) return
            setTimeout(()=>{
              this.handleSearch()
            },1000)
          })
      },
      handleListingTableCheckboxes(value) {
        this.issuingAppsInfosCheckedModel.forEach(item => {
          item.isChecked = value
        })
      },
      addIsChecked(itemList) {
        return itemList.map(info => {
          info.isChecked = false
          return info
        })
      },
      async handleReviewAccount(item) {
        if(item && item.accountRequest) {
          this.$router.push(`/kyc/review-edit-account/${item.accountRequest.id}`)
        }
      },
      async handleCardCreated(item) {
        if (!item.isCardCreated) return
        this.$router.push(`/kyc/review-edit-card/${item.cardRequest.id}`)
      },
      handleChangePage(event) {
        this.currentPage = event;
        this.isPagination = true;
        this.handleSearch()
      },
      getDateFormat(date) {
        return (date) ? formatDate(date) : ''
      },
      isPendingStatus(status) {
        return status.toLowerCase() === ISSUING_APP_STATUS_VALUES.PENDING
      },
      isFailedStatus(status) {
        return status.toLowerCase() === ISSUING_APP_STATUS_VALUES.FAILED
      },
      handleAppStatus(status) {
        return status.toLowerCase()
      },
    },
    filters: {
      booleanToYesNoFormat: (value) => {
        return value ? 'Yes' : 'No'
      },
    },
  }
</script>

<style scoped lang="scss">
  $text-color: #292929;
  $input-border: #8D8D8D;
  $primary-color: #7039DA;
  $pending-bg: rgba(252, 203, 42, 0.25);
  $success-color: rgba(46, 214, 132, 0.25);
  $danger-color: rgba(255, 106, 106, 0.25);
  $table-border-color: #dee2e6;
  $btn-danger-border: #F70003;
  $btn-success-border: #3ED683;
  $placeholder-color: #9A9A9A;

  .approve-emoney-account {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: $text-color;

    .btn-block {
      .form-input-block {
        margin-left: 150px;
      }
    }

    .btn-search {
      text-transform: unset;
      width: 200px;
    }

    .btn-submit {
      width: 126px;
      height: 26px;
      text-transform: unset;
      margin-left: 35px;
      padding-top: unset;
      padding-bottom: unset;
      font-size: 11px;
    }

    .page-block-title {
      font-weight: bold;
    }

    .row-label {
      width: 150px;
    }

    .form-input-block {
      width: 480px;
    }

    label {
      margin-bottom: 0;
    }

    /deep/ {
      .btn {
        text-transform: unset;
      }

      .el-input__inner, .form-control {
        border-color: $input-border;
        color: $text-color;
        border-radius: 7px;
        font-weight: bold;
      }

      .form-control {
        border-radius: 10px !important;
      }

      .el-select .el-input:hover .el-input__icon,
      .el-select .el-input:hover input {
        color: $placeholder-color;
      }

      .btn-outline-primary, .btn-outline-success, .btn-outline-danger {
        border-width: 1px !important;
        border-radius: unset !important;
      }
    }

    table {
      tr {
        &:not(:first-child) {
          td {
            border-top: 0;
          }
        }

        th {
          &:not(:last-child) {
            border-right: 1px solid $table-border-color;
          }
        }

        td {
          &:not(:last-child) {
            border-right: 1px solid $table-border-color;
          }
        }

      }

      tbody {
        tr {
          height: 40px;
          border-bottom-color: transparent;
          border-top-color: transparent;
        }

        td {
          &:not(:first-child) {
            min-width: 145px;
          }

          padding-top: 0;
          padding-bottom: 0;

          &.pending {
            background-color: $pending-bg;
          }

          &.failed {
            background-color: $danger-color;
          }

          &.submitted {
            background-color: $success-color;
          }

          .btn {
            height: 40px;
            padding: unset;
            position: relative;
          }
        }
      }
    }

    .glass-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
    }

    .table-striped tbody tr {
      &:nth-of-type(odd) {
        background-color: transparent;
      }

      &:nth-of-type(even) {
        background-color: rgba(46, 214, 132, 0.05);
      }
    }
  }

  .text {
    &.submitted {
      color: green;
      font-size: 24px;
    }

    &.failed {
      color: red;
      font-size: 24px;
    }
  }


  /deep/ {
    .form-check.primary-custom-checkbox .form-check-sign::before {
      background-color: white;
      border: 1px solid $primary-color;
    }

    .form-check input[type="checkbox"]:checked + .form-check-sign::after {
      background-color: $primary-color;
    }

    .btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active,
    .btn-success:active:focus, .btn-success:active:hover, .btn-success.active:focus,
    .btn-success.active:hover, .show > .btn-success.dropdown-toggle, .show > .btn-success.dropdown-toggle:focus,
    .show > .btn-success.dropdown-toggle:hover {
      background-color: $success-color !important;
      color: green;
    }

    .btn-danger:hover, .btn-danger:focus, .btn-danger:active, .btn-danger.active,
    .btn-danger:active:focus, .btn-danger:active:hover, .btn-danger.active:focus,
    .btn-danger.active:hover, .show > .btn-danger.dropdown-toggle, .show > .btn-danger.dropdown-toggle:focus,
    .show > .btn-danger.dropdown-toggle:hover {
      background-color: $danger-color !important;
    }

    .btn-outline-danger {
      background: $danger-color;
      border: 1px solid $btn-danger-border !important;
    }

    .btn-outline-success {
      background: $success-color;
      border: 1px solid $btn-success-border !important;
    }

    .btn-outline-success, .btn-outline-danger {
      font-size: 24px;
      line-height: 24px;
    }

  }

  .table-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

</style>
