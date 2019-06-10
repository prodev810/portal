<template>
  <el-row :gutter="20">
    <el-col :sm="24" :md="11">
      <el-row class="kyc__duration">
        <b>Duration</b>
          <el-select class="ml-2 select-default kyc__top__bottom__arrows"
                     v-model="leftPanelDuration"
                     @change="handleDurationSummaryReport">
            <el-option class="select-default"
                       v-for="item in durationValues"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
      </el-row>

      <el-row>
        <div class="card">
          <regular-table
            striped responsive condensed
            :headings="tableHeadings"
            :value="kycStat"/>
        </div>
      </el-row>

      <el-row>
        <div class="kyc__buttons">
          <router-link to="/kyc/workflow">
            <p-button round class="kyc-button--queue">
              <span class="kyc-button__title">
                <kyc-button-icons name="svg-queue"/>
                Work Queue
              </span>
            </p-button>
          </router-link>
          <router-link to="/kyc/search">
            <p-button round class="kyc-button--glass">
              <span class="kyc-button__title">
              <kyc-button-icons name="svg-glass"/>
              Application Search
              </span>
            </p-button>
          </router-link>
        </div>
      </el-row>

      <el-row>
        <div class="kyc__buttons kyc__buttons__bottom">
          <div>
            <p-button round class="kyc-button--invoice">
            <span class="kyc-button__title">
              <kyc-button-icons name="svg-invoice"/>
              Invoices
            </span>
            </p-button>
          </div>

          <div class="kyc__issuing">
            <span>ISSUING ONLY</span><br/>
            <p-button round class="kyc-button--mobile">
              <div class="kyc-button__title">
                <kyc-button-icons name="svg-mobile"/>
                E-money Accounts
              </div>
            </p-button>
          </div>
        </div>
      </el-row>
    </el-col>

    <el-col :sm="24" :md="13">
      <el-row class="kyc__name__duration">
        <div class="kyc__duration"><b>Client</b>
            <el-select class="ml-2 select-default kyc__top__bottom__arrows" v-model="rightPanelClient" @change="handleDurationStatistics">
              <el-option class="select-default"
                         :label="rightPanelClientDefault.label"
                         :value="rightPanelClientDefault.value"></el-option>
              <el-option v-for="item in allClients"
                         :key="item.name"
                         :label="item.name"
                         :value="item.name"></el-option>
            </el-select>
        </div>

        <div class="kyc__duration ml-4"><b>Duration</b>
            <el-select class="ml-2 select-default kyc__top__bottom__arrows" v-model="rightPanelDuration" @change="handleDurationStatistics">
              <el-option class="select-default"
                         v-for="item in durationValues"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
        </div>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <chart-card v-if="loaded"
                      :chart-options="lineChartsOptions"
                      :chart-data="approvedChartData">
            <span slot="title">Approved {{statistics.approvedApplicationStat.total}}</span>
            <span class="chart__title__duration" slot="title-label">{{rightPanelDuration}} days</span>
          </chart-card>
        </el-col>
        <el-col :md="24" :lg="12">
          <chart-card v-if="loaded"
                      :chartType="'Pie'"
                      :chart-data="declinePercentChartData">
            <span slot="title">Decline percentage {{statistics.declineRate}} %</span>
            <span class="chart__title__duration" slot="title-label">{{rightPanelDuration}} days</span>
          </chart-card>
        </el-col>

      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <chart-card v-if="loaded"
                      :chart-data="declinedChartData">
            <span slot="title">Declined {{statistics.declinedApplicationStat.total}}</span>
            <span class="chart__title__duration" slot="title-label">{{rightPanelDuration}} days</span>
          </chart-card>
        </el-col>
        <el-col :md="24" :lg="12">
          <chart-card v-if="loaded"
                      :chart-data="closedChartData">
            <span slot="title">Closed {{statistics.closedApplicationStat.total}}</span>
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
        rightPanelClient: 'all',
        rightPanelDuration: durationValues[0].value,
        rightPanelClientDefault: {label: 'All', value: 'all'},

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
      lineChartsOptions (){
        return {
          spanGaps: false,
          scales: {
            yAxes:[{
              gridLines: {
                display: false,
                drawBorder: false,
              },
            }],
            xAxes: [{
              type: 'time',
              gridLines: {
                display: false,
                drawBorder: false,
              },
              time:{
                unit: 'day',
                unitStepSize: this.rightPanelDuration,
                displayFormats: {
                  day: "YYYY-MM-DD"
                },
                min: this.handleStartCharts(this.rightPanelDuration),
                max: this.handleEndCharts()
              }
            }]
          }
        }
      }
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
          clientReference: (this.rightPanelClient === 'all') ? null : this.rightPanelClient
        })
      },
      handleDataLineCharts(values) {
        const series = [];

        Object.entries(values).forEach(item => {
          series.push({ x: item[0], y: item[1]})
        });
        return {
          labels: [],
          datasets: [{
            data: series,
            backgroundColor: 'transparent',
            borderColor: '#7039DA',
            pointBorderColor: 'transparent'
          }]
        }
      },
      handleStartCharts(duration){
        const dateNow = new Date()
        return  new Date(new Date().setDate(dateNow.getDate() - duration)).toISOString().split('T')[0]
      },
      handleEndCharts(){
        const dateNow = new Date()
        return  dateNow.toISOString().split('T')[0]
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
  $table-border-gray: #dee2e6;

  .el-input__suffix {
    display: none !important;
  }

  .kyc__buttons {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;

    button {
      width: 200px;
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

  .el-select.select-default {
    &.kyc__top__bottom__arrows{
      /deep/{
        .el-input {
          .el-icon-arrow-up{
            &:before{
              font-family: FontAwesome;
              content: "\f0dc" !important;
              transform: translateY(-50%);
              position: absolute;
              font-size: 18px;
              color: #292929;
              width: 30px;
              right: 0;
              top: 50%;
            }
          }
          .el-select__caret{
            &.is-reverse{
              transform: rotateZ(180deg);
            }
          }
        }
      }
    }
  }

  /deep/ {
    .card .numbers {
      font-size: 9px;
      color: #7039DA;
      font-weight: 900;
    }

    .card-footer{
      display: none;
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
        .cell{
          border-left: 1px solid $table-border-gray;
        }

        td {
          &:first-child {
            .cell {
              border: none;
            }
          }
        }
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
    text-transform: capitalize;
  }
</style>
