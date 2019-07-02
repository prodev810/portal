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
                <el-option v-for="item in resellerList"
                           :key="item.value"
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
                <el-option v-for="item in statusList"
                           :key="item.value"
                           :label="item.name"
                           :value="item.value">{{item.name}}
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
          <tr v-for="tableItem in listingTableData" :key="tableItem.accountReference">
            <td scope="col" class="text-center">
              <p-checkbox v-model="tableItem.is_checked"
                          class="primary-custom-checkbox"></p-checkbox>
            </td>
            <td>{{tableItem.accountReference}}</td>
            <td>{{tableItem.firstName}}</td>
            <td>{{tableItem.lastName}}</td>
            <td class="text-capitalize text-center" :class="tableItem.status">{{tableItem.status}}</td>
            <td class="text-center" :class="[tableItem.plastic ? 'submitted' : 'failed']">{{tableItem.plastic |
              booleanToYesNoFormat}}
            </td>
            <td class="pl-0 pr-0">
              <p-button outline type="primary"
                        @click="handleReviewAccount(tableItem.accountReference)"
                        class="w-100">
                <img class="glass-icon" :src="GlassPurpleIcon" alt="glassIcon">
                Review
              </p-button>
            </td>
            <td class="text-center text" :class="[tableItem.ac_created ? 'submitted': 'failed']">
              <img v-if="tableItem.ac_created"  :src="TickIcon" alt="tickIcon">
              <img v-else :src="CrossIcon" alt="crossIcon">
            </td>
            <td class="pl-0 pr-0">
              <p-button outline :type="tableItem.ac_created ? 'success' : 'danger'"
                        @click="handleCardCreated()"
                        class="w-100">
                <template v-if="tableItem.ac_created ">
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
              <p-button v-if="tableItem.status === 'pending'"
                        outline type="primary" class="w-100">Submit
              </p-button>
              <p-button v-if="tableItem.status === 'failed'"
                        outline type="primary" class="w-100">Resubmit
              </p-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </el-row>
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

  export default {
    name: "KycApprovedEmoneyAccount",
    components: {
      CustomSwitch,
      PButton,
      PCheckbox,
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
          reseller: 'all',
          status: 'submitted',
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
          {name: 'Submitted', value: 'submitted'},
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
        listingTableData: [
          {
            is_checked: false,
            accountReference: 'TSNDEVCF19650305-0001-GBP',
            firstName: 'Peter',
            lastName: 'Gibbons',
            status: 'pending',
            plastic: false,
            ac_created: true,
            card_created: false,
          },
          {
            is_checked: false,
            accountReference: 'TSNDEVCF19650305-0002-EUR',
            firstName: 'Peter',
            lastName: 'Gibbons',
            status: 'failed',
            plastic: true,
            ac_created: false,
            card_created: false,
          },
          {
            is_checked: false,
            accountReference: 'TSNDEVCF19650305-0003-USD',
            firstName: 'Peter',
            lastName: 'Gibbons',
            status: 'submitted',
            plastic: false,
            ac_created: false,
            card_created: true,
          },
        ],
      }
    },
    methods: {
      handleSearch() {
        console.log('search')
      },
      handleSubmit() {
        console.log('submit')
      },
      handleListingTableCheckboxes(value) {
        this.listingTableData.forEach(item => {
          console.log('table item', item)
          item.is_checked = value
        })
      },
      handleReviewAccount(accountReferenceId) {
        this.$router.push(`/kyc/review-edit-account/${accountReferenceId}`)
      },
      handleCardCreated() {
        this.$router.push(`/kyc/review-edit-card`)
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

    .btn-outline-success, .btn-outline-danger{
      font-size: 24px;
      line-height: 24px;
    }

  }

</style>
