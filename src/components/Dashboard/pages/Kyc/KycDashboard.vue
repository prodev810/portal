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
        <p-button round class="kyc-button--queue">
          <span class="kyc-button__title">
            <kyc-button-icons name="svg-queue" />
            Work Queue
          </span>
          </p-button>
        <p-button round class="kyc-button--glass">
          <span class="kyc-button__title">
          <kyc-button-icons name="svg-glass" />
          Application Search
          </span>
          </p-button>
      </el-row>

      <el-row class="kyc__buttons kyc__buttons__bottom">
        <div>
          <p-button round class="kyc-button--invoice">
            <span class="kyc-button__title">
              <kyc-button-icons name="svg-invoice" />
              Invoices
            </span>
          </p-button>
        </div>

        <div class="kyc__issuing">
          <span>ISSUING ONLY</span><br/>
          <p-button round class="kyc-button--mobile">
            <div class="kyc-button__title">
            <kyc-button-icons name="svg-mobile" />
               E-money Accounts
            </div>
            </p-button>
        </div>
      </el-row>

    </el-col>

    <el-col :sm="24" :md="13">
      <el-row class="kyc__name__duration">
        <div class="kyc__duration"><b>Client</b>
          <div class="kyc-wrap-select">
            <i class="kyc-select-icon">&#8645;</i>
            <el-select class="ml-2 select-default" v-model="rightPanelClient" @change="handleDurationStatistics">
              <el-option class="select-default"
                         v-for="item in allClients"
                         :key="item.name"
                         :label="item.name"
                         :value="item.name"></el-option>
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
          <chart-card v-if="loaded"
                      :chart-data="approvedChartData">
            <span slot="title">Approved</span>
            <span class="chart__title__duration" slot="title-label">{{rightPanelDuration}} days</span>
          </chart-card>
        </el-col>
        <el-col :md="24" :lg="12">
          <chart-card v-if="loaded"
                      :chartType="'Pie'"
                      :chart-data="declinePercentChartData">
            <span slot="title">Decline percentage</span>
            <span class="chart__title__duration" slot="title-label">{{rightPanelDuration}} days</span>
          </chart-card>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <chart-card v-if="loaded"
                      :chart-data="declinedChartData">
            <span slot="title">Declined</span>
            <span class="chart__title__duration" slot="title-label">{{rightPanelDuration}} days</span>
          </chart-card>
        </el-col>
        <el-col :md="24" :lg="12">
          <chart-card v-if="loaded"
                      :chart-data="closedChartData">
            <span slot="title">Closed</span>
            <span class="chart__title__duration" slot="title-label">{{rightPanelDuration}} days</span>
          </chart-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import {mapActions, mapGetters, mapState} from 'vuex'
  import {
    KYC_GET_ALL_CLIENTS,
    KYC_GET_STATISTICS,
    KYC_GET_SUMMARY_REPORT,
  } from '@/store/types'
  import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"
  import PButton from "@/components/UIComponents/Button"
  import LineChart from "@/components/UIComponents/Charts/LineChart"
  import ChartCard from "@/components/UIComponents/Cards/ChartCard"
  import KycButtonIcons from './KycButtonIcons'

  const durationValues = [
    {value: 30, label: '30 Days'},
    {value: 60, label: '60 Days'},
    {value: 90, label: '90 Days'}
  ]

  export default {
    name: "KycDashboard",
    components: {RegularTable, PButton, LineChart, ChartCard, KycButtonIcons},
    data() {
      return {
        durationValues: durationValues,

        leftPanelDuration: durationValues[0].value,
        rightPanelClient: null,
        rightPanelDuration: durationValues[0].value,

        tableHeadings: [
          {name: 'clientName', label: 'Client Name'},
          {name: 'appRequested', label: 'App Requested'},
          {name: 'appReceived', label: 'App Received'},
          {name: 'workQueueItems', label: 'Work Queue Items'},
        ],
        approvedChartData: {},
        declinePercentChartData: {},
        declinedChartData: {},
        closedCharData: {},
        loaded: false,
      }
    },
    mounted() {
      // Get all clients
      this.getAllClients()
      // Get summary report
      this.getSummaryReport({duration: this.leftPanelDuration})
      // Get statistics
      this.getStatistics({duration: this.rightPanelDuration})
    },
    watch: {
      statistics(value) {
        this.approvedChartData = this.handleDataLineCharts(value.approvedApplicationStat.statData)
        this.declinePercentChartData = this.handleDataPieCharts(value.declineRate);
        this.closedChartData = this.handleDataLineCharts(value.closedApplicationStat.statData)
        this.declinedChartData = this.handleDataLineCharts(value.declinedApplicationStat.statData)
        this.loaded = true
      }
    },
    computed: {
      ...mapState({
        allClients: state => state.kyc.allClients,
        statistics: state => state.kyc.statistics,
        summaryReports: state => state.kyc.summaryReports,
      }),
      kycStat() {
        return this.summaryReports.map(report => {
          const reportItem = {};
          this.tableHeadings.forEach(sC => {
            if (report[sC.name]) reportItem[sC.name] = report[sC.name]
          });
          return reportItem;
        })
      },
    },
    methods: {
      ...mapActions({
        getAllClients: KYC_GET_ALL_CLIENTS,
        getStatistics: KYC_GET_STATISTICS,
        getSummaryReport: KYC_GET_SUMMARY_REPORT,

        /*getFloats: GET_ALL_FLOATS,
        getAllCards: GET_ALL_CARD_PROGRAM,
        getAllResellerSubscription: GET_ALL_RESELLER_SUBSCRIPTIONS,
        setUpDebit: ADD_FLOAT_ENTRY,
        showModal: SET_MODAL_TYPE*/
      }),
      handleDurationSummaryReport() {
        this.getSummaryReport({duration: this.leftPanelDuration})
      },
      handleDurationStatistics() {
        this.getStatistics({
          duration: this.rightPanelDuration,
          clientReference: this.rightPanelClient
        })
      },
      handleDataLineCharts(values) {
        const labels = [];
        const series = [];
        Object.entries(values).forEach(item => {
          labels.push(item[0])
          series.push(item[1])
        });
        return {
          labels,
          datasets: [{
            data: series,
            backgroundColor: 'transparent',
            borderColor: '#7039DA',
            pointBorderColor: 'transparent'
          }]
        }
      },
      handleDataPieCharts(values) {
        const approvePercent = 100 - Number(values);
        return {
          datasets: [{
            data: [approvePercent, values],
            backgroundColor: ['#7039DA', '#3ED683'],
          }]
        }
      },
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

  .chart__title__duration {
    font-size: 9px;
    color: black
  }

  /deep/ {
    .card .numbers {
      font-size: 9px;
      color: #7039DA;
      font-weight: 900;
    }

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
        outline: none !important;
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
  button.btn.kyc-button--queue {
    padding-left: 42px;
  }
  button.btn.kyc-button--invoice {
    padding-left: 42px;
  }
  button.btn.kyc-button--glass {
    padding-left: 42px;
  }
  button.btn.kyc-button--mobile {
    padding-left: 42px;
  }
  .kyc-button__title {
    position: relative;
  }
</style>
