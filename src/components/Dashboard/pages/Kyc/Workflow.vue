<template>
  <div class="workflow-content">
    <div class="filter row">
      <h2 class="col-12 sub-head">Filter</h2>
      <div class="col-md-6 col-sm-12">
        <div class="item">
          <div class="col-4 field-title">Client</div>
          <div class="col-8 select">
            <el-select
              class=""
              size="small"
              placeholder="Selected a Client Name"
              v-model="clientName"
            >
              <el-option
                v-for="client in clients "
                class="select-success"
                :value="client.name"
                :label="client.name"
                :key="client.id"
              />
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="col-4 field-title">Date</div>
          <div class="col-4 date">
            <el-date-picker
              v-model="fromDate"
              type="date"
              placeholder="From"
            />
          </div>
          <div class="col-4 date">
            <el-date-picker
              v-model="toDate"
              type="date"
              placeholder="To"
            />
          </div>
        </div>
        <div class="item">
          <div class="col-4 field-title">Type</div>
          <div class="col-8 select">
            <el-select class=""
                       size="small"
                       placeholder="selected a card program"
                       v-model="selectedClientType"
            >
              <el-option v-for="clientType in clientTypes "
                         class="select-success"
                         :value="clientType.name"
                         :label="clientType.name"
                         :key="clientType.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="col-4 field-title">Oldest first</div>
          <div class="col-8">
            <span>No </span>
            <label class="switch">
              <input type="checkbox" v-model="oldestFirst" :checked="oldestFirst">
              <span class="slider round"></span>
            </label>
            <span> Yes</span>
          </div>
        </div>
        <div class="item">
          <div class="col-4 field-title">Number of jobs</div>
          <div class="col-8">
            256
          </div>
        </div>
        <div class="item">
          <div class="col-4 field-title">Start Workflow</div>
          <div class="col-8 start">
            <p-button
              type="primary"
              class="start-button"
              @click="searchHandle"
            >
              Go
            </p-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="table">
        <h2 class="col-12 sub-head">Listing</h2>
        <div class="p-1 tableWrapper">
          <regular-table
            striped
            :headings="tableHeadings"
            :value="pagedData"
            @input="listenToInput"
            :editAll="editAll"
            :editId="editId"
            :uneditableFields="uneditableFields"
            :oldestFirst="oldestFirst"
          >
          </regular-table>
          <div class="table-pagination">
            <p-pagination :page-count="pageCount" v-model="currentPage" @input="handleInput" :perPage="perPage"></p-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import {DatePicker, Option, Select, TimeSelect, Switch} from "element-ui";
  import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable';
  import PPagination from "../../../UIComponents/Pagination";
  import {formatDate} from "../../../../utils/Date";
  import {paginateArray, pageCount} from "../../../../utils/pagination";
  import {GETTER_All_CLIENTS_LIST,GETTER_All_CLIENTS, GETTER_CLIENT_TYPES, GETTER_CLIENT_TYPES_LIST, GETTER_OUTSTANDING_APPS_LIST, GETTER_OUTSTANDING_APPS} from "../../../../store/types";

  export default {
    name: "Workflow",
    components: {
      RegularTable,
      PPagination,
      [Option.name]: Option,
      [Select.name]: Select,
      [Switch.name]: Switch,
      [DatePicker.name]: DatePicker,
      [TimeSelect.name]: TimeSelect,
    },
    data() {
      return {
        isPagination: false,
        tableHeadings: [
          {label: 'Client Name', name: 'clientName'},
          {label: 'App Received', name: 'appReceivedDate'},
          {label: 'KYC Received', name: 'kycReceivedDate'},
          {label: 'Days', name: 'outstandingDays', sortable: true},
          {label: 'Name', name: 'fullName'},
          {label: 'App Ref', name: 'appReferenceId'},
          {label: 'Client Ref', name: 'clientReference'},
          {label: 'App Status', name: 'applicationStatus'},
          {label: 'ID', name: 'idCheckStatus', info: true},
          {label: 'POA', name: 'poaCheckStatus', danger: true},
          {label: 'Screen', name: 'sanctionCheckStatus', info: true},
          {label: '', name: 'action', button: true}
        ],
        editAll: false,
        editId: '',
        editedData: null,
        allClients: [],
        outStandingAppsData: [
          {
            appReceivedDate:"",
            appReferenceId:"",
            applicationStatus:"",
            clientAppRef:"",
            clientName:"",
            clientReference:"",
            firstName:"",
            fullName:"",
            idCheckStatus:"",
            kycReceivedDate:"",
            lastName:"",
            outstandingDays: "",
            poaCheckStatus:"",
            sanctionCheckStatus:""
          }
        ],
        pagedData: null,
        uneditableFields: [],

        // Pagination
        perPage: 20,
        currentPage: 1,
        pageCount: 0,
        // Variables for oustanding apps api
        toDate: '',
        fromDate: '',
        clientName: '',
        selectedClientType: '',
        resellerCode: 'ALL',
        oldestFirst: true,

        pickerOptions1: {
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
            {
              text: 'Yesterday',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date)
              }
            },
            {
              text: 'A week ago',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date)
              }
            },
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        getOutstandingAppsData: GETTER_OUTSTANDING_APPS,
      }),
      // Clients from Store
      clients () {
        const clients = [];
        const clientsAPI = (this.$store.state.kyc.allClients || [])
          .reduce((acc, i) => [...acc, i], []);
        clients.push(
          { name: 'All' },
          ...clientsAPI
        );
        return clients;
      },
      // Client Types from Store
      clientTypes () {
        const types = [];
        const typesAPI = (this.$store.state.kyc.clientTypes || [])
          .reduce((acc, i) => [...acc, i], []);
        types.push(
          { name: 'All' },
          ...typesAPI
        );
        return types;
      }
    },
    methods: {
      ...mapActions({
        getAllClients: GETTER_All_CLIENTS_LIST,
        getClientTypes: GETTER_CLIENT_TYPES_LIST,
        getOutstandingApps: GETTER_OUTSTANDING_APPS_LIST
      }),
      getAllClientsList() {
        this.getAllClients()
      },
      getClientTypesList() {
        this.getClientTypes()
      },
      listenToInput({value}) {
        this.outStandingApps = value;
      },
      goForOutstandingApps() {
        this.getOutstandingApps({
          clientName: this.clientName === 'All' ? '' : this.clientName,
          clientType: this.selectedClientType === 'All' ? '' : this.selectedClientType,
          dateFrom: formatDate(this.fromDate),
          dateTo: formatDate(this.toDate),
          oldestFirst: this.oldestFirst,
          pageNum: this.isPagination ? this.currentPage - 1 : 0,
          pageSize: this.perPage
        });
        if (!this.isPagination) this.currentPage = 1;
      },

      searchHandle() {
        this.isPagination = false;
        this.goForOutstandingApps('page');
      },
      handleInput(ev) {
        this.currentPage = ev;
        this.isPagination = true;
        this.goForOutstandingApps('page');
      }
    },
    mounted() {
      this.getAllClientsList();
      this.getClientTypesList();
    },
    watch: {
      getOutstandingAppsData (value) {
        // Change the format of date vlaues - 'appReceivedDate', 'kycReceivedDate' ...
        const temp = value.applications;
        temp.map((item, index) => {
          for (var key in item) {
            if (key == 'appReceivedDate') {
              temp[index].appReceivedDate = formatDate(item[key], true);
            } else if (key == 'kycReceivedDate') {
              temp[index].kycReceivedDate = formatDate(item[key], true);
            }
          }
        });
        // Get Outstanding App Data for Data Table
        this.outStandingAppsData = temp;

        this.pageCount = value.pageMeta.totalPages;
        this.perPage = value.pageMeta.perPage;

        this.pagedData = this.outStandingAppsData;
      }
    }
  }
</script>
<style scoped lang="scss">

  .workflow-content {
    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-weight: 800;

      .field-title {
        font-size: 16px;
      }

      .select {
        width: 300px;

        .el-select {
          width: 100%;
        }
        .el-input {
          .el-input__inner {
            border-radius: 0 !important;
            border-width: 1px;
          }
        }
      }
      .date{
        div {
          width: 100% !important;
          &:first-child {
            margin-right: 17px !important;
          }
        }

      }
      .start-button {
        padding: 5px 60px;
        margin: -5px 0px !important;
        border-radius: 30px;
        height: 30px !important;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        text-transform: none;
      }
    }
    .table {
      margin-top : 50px;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 20px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 1px;
      bottom: 1px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: #5bd684;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #5bd684;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }

    .sub-head {
      font-family: 'Poppins', sans-serif;
      font-size: 28px;
      font-weight: bold;
    }

    .table {
      .table-pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
  }
  .tableWrapper {
    box-shadow: 0px 10px 40px rgba(41, 41, 41, 0.15);
    padding: 0;
  }

</style>
