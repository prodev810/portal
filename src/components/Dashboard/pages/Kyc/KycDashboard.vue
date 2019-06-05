<template>
  <el-row :gutter="20">
    <el-col :sm="24" :md="11">
      <el-row class="kyc__duration">
        <b>Duration</b>
        <div class="kyc-wrap-select">
          <i class="kyc-select-icon">&#8645;</i>
          <el-select class="ml-2 select-default" v-model="leftPanelDuration">
          <el-option class="select-default"
                     v-for="item in durationValues"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
          </el-select>
        </div>
      </el-row>

      <el-row>
        <div class="card">
          <regular-table
            striped responsive condensed
            :headings="tableHeadings"
            :value="kycStat"/>
        </div>
      </el-row>

      <el-row class="kyc__buttons">
        <p-button round>Work Queue</p-button>
        <p-button round>Application Search</p-button>
      </el-row>
      <el-row class="kyc__buttons kyc__buttons__bottom">
        <div>
          <p-button round>Invoices</p-button>
        </div>

        <div class="kyc__issuing">
          <span>ISSUING ONLY</span><br/>
          <p-button round>E-money Accounts</p-button>
        </div>
      </el-row>

    </el-col>

    <el-col :sm="24" :md="13">
      <el-row class="kyc__name__duration">
        <div class="kyc__duration"><b>Client</b>
          <div class="kyc-wrap-select">
            <i class="kyc-select-icon">&#8645;</i>
            <el-select class="ml-2 select-default" v-model="rightPanelClient">
            
            </el-select>
          </div>
        </div>

        <div class="kyc__duration ml-4"><b>Duration</b>
        <div class="kyc-wrap-select">
          <i class="kyc-select-icon">&#8645;</i>
          <el-select class="ml-2 select-default" v-model="rightPanelDuration">
            <el-option class="select-default"
                       v-for="item in durationValues"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        </div>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <chart-card headerTitle="headerTitle" chartTitle="chartTitle"/>
        </el-col>
        <el-col :md="24" :lg="12">
          <chart-card/>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <chart-card/>
        </el-col>
        <el-col :md="24" :lg="12">
          <chart-card/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import {
    KYC_GET_ALL_CLIENTS
  } from '@/store/types'
  import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"
  import PButton from "@/components/UIComponents/Button"
  import LineChart from "@/components/UIComponents/Charts/LineChart"
  import ChartCard from "@/components/UIComponents/Cards/ChartCard"

  const durationValues = [
    {value: 30, label: '30 Days'},
    {value: 60, label: '60 Days'},
    {value: 90, label: '90 Days'}
  ]

  export default {
    name: "KycDashboard",
    components: {RegularTable, PButton, LineChart, ChartCard},
    data() {
      return {
        durationValues: durationValues,

        leftPanelDuration: durationValues[0].value,
        rightPanelClient: '',
        rightPanelDuration: durationValues[0].value,

        tableHeadings: [
          {name: 'name', label: 'Client name'},
          {name: 'appRequested', label: 'App Requested'},
          {name: 'appReceived', label: 'App Received'},
          {name: 'workQueue', label: 'Work Queue Items'},
        ],

        kycStat: [
          {name: 'Acquiring', appRequested: 4, appReceived: 3, workQueue: 2},
          {name: 'Issuing', appRequested: 4, appReceived: 3, workQueue: 2},
          {name: 'Lokto', appRequested: 4, appReceived: 3, workQueue: 2}
        ]
      }
    },
    mounted() {
      // Get all clients
      this.getAllClients()

      // Get summary report

      // Get statistics
    },
    methods: {
      ...mapActions({
        getAllClients: KYC_GET_ALL_CLIENTS

        /*getFloats: GET_ALL_FLOATS,
        getAllCards: GET_ALL_CARD_PROGRAM,
        getAllResellerSubscription: GET_ALL_RESELLER_SUBSCRIPTIONS,
        setUpDebit: ADD_FLOAT_ENTRY,
        showModal: SET_MODAL_TYPE*/
      })
    }
  }
</script>

<style scoped lang="scss">
  $grey-color: #8D8D8D;
  .el-input__suffix {
    display: none !important;
  }
  .kyc__buttons {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;

    button {
      width: 200px;
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  .kyc__buttons__bottom {
    button {
      margin-top: 0;
    }
  }

  .kyc__name__duration {
    display: flex;
    justify-content: flex-end;
  }

  .kyc__duration {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 16px;

    b {
      font-size: 16px;
    }
  }

  .kyc__issuing {
    text-align: center;

    span {
      color: #ff0000;
      font-size: 10px;
    }
  }


  .chart__placeholder {
    margin: 8px;
    width: 300px;
    height: 300px;
    background-color: #ff0000;
  }

  /deep/ {
    .select-default.el-select .el-input input,
    .select-default.el-select .el-input:hover input,
    .select-default.el-select .el-input:hover .el-input__icon {
      background-color: white;
      color: black;

      &:hover {
        background-color: white;
        color: black;
      }
    }

    .select-default.el-select {
      .el-input {
        input {
          border-color: $grey-color !important;
          border-width: 1px;
          border-radius: 10px;
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

    .ceevo__table.table {
      margin-bottom: 0;
      tbody {
        outline: none!important;
      }
    }
  }
  .kyc-wrap-select {
    position: relative;
  }
  .kyc-select-icon {
    position: absolute;
    top: 4px;
    z-index: 222;
    right: 10px;
    padding: 5px;
    background: white;
    font-style: initial;
    pointer-events: none;
  }
</style>
