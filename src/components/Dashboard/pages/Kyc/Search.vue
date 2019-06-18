<template>
  <div class="search-content">
    <div class="row filter">
      <h2 class="col-12 sub-head">Filter</h2>
      <div class="col-md-6 col-sm-12 left-col">
        <div class="item">
          <div class="col-4 item-title">Client</div>
          <div class="col-8 select">
            <el-select
              size="large"
              placeholder=""
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
          <div class="col-4 item-title">Date</div>
          <div class="col-4 date">
            <el-date-picker
              v-model="fromDate" type="date"
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
          <div class="col-4 item-title">Type</div>
          <div class="col-8 select">
            <el-select size="large"
              placeholder=""
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
          <div class="col-4 item-title">Oldest first</div>
          <div class="col-8 oldestFirstWrapper">
            <span>No&nbsp;</span>
            <label class="switch">
              <input type="checkbox" v-model="oldestFirst" :checked="oldestFirst">
              <span class="slider round"></span>
            </label>
            <span>&nbsp;Yes</span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 right-col">
        <div class="item">
          <div class="col-4 item-title">Surname</div>
          <div class="col-8">
            <fg-input v-model="surName"></fg-input>
          </div>
        </div>
        <div class="item">
          <div class="col-4 item-title">App Ref</div>
          <div class="col-8">
            <fg-input v-model="appRef"></fg-input>
          </div>
        </div>
        <div class="item">
          <div class="col-4 item-title">Client Ref</div>
          <div class="col-8">
            <fg-input v-model="clientRef"></fg-input>
          </div>
        </div>
        <div class="item app-status-item">
          <div class="col-4 item-title">Status</div>
          <div class="col-8 select">
            <el-select size="large"
              placeholder=""
              v-model="selectedStatus"
            >
              <el-option v-for="statusType in applicationStatuses"
                class="select-success"
                :value="statusType.name"
                :label="statusType.statusName"
                :key="statusType.name"
              >
              </el-option>
            </el-select>
            <!-- <img :src="eyeIcon" /> -->
            <el-popover
              placement="bottom"
              width="490"
              class="statusHelper"
              trigger="hover">
              <h5 class="helpTitle">App Status</h5>
              <table class="helperTable">
                <tbody>
                  <tr
                    v-for="(statusType, index) in applicationStatusesHelper"
                    :key="index"
                  >
                    <td>{{ statusType.statusName }}</td>
                    <td>{{ statusType.description }}</td>
                  </tr>
                </tbody>
              </table>
              <img slot="reference" :src="eyeIcon" />
              <!-- <el-button slot="reference">Hover to activate</el-button> -->
            </el-popover>
          </div>
        </div>
        <div class="item btn-item">
            <p-button
              type="primary"
              class="search-button"
              @click="searchHandle"
            >
              Search
            </p-button>
        </div>
      </div>
    </div>
    <div class="row listing">
      <div class="table">
        <h2 class="col-12 sub-head">Listing</h2>
        <div class="tableWrapper">
          <regular-table
            striped
            :headings="tableHeadings"
            :value="applicationData"
            @input="listenToInput"
            :editAll="editAll"
            :editId="editId"
            :uneditableFields="uneditableFields"
            :oldestFirst="oldestFirst"
          >
          </regular-table>
          <div class="table-pagination">
            <p-pagination
              :page-count="pageCount"
              v-model="currentPage"
              @input="handleInput"
              :perPage="perPage"
            ></p-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import {
    DatePicker,
    Option,
    Select,
    TimeSelect,
    Switch,
    Popover
  } from "element-ui";

  import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable';
  import {formatDate} from "../../../../utils/Date";
  import {paginateArray, pageCount} from "../../../../utils/pagination";
  import PPagination from "../../../UIComponents/Pagination";
  import {
    GETTER_All_CLIENTS_LIST,
    GETTER_All_CLIENTS,
    GETTER_CLIENT_TYPES,
    GETTER_CLIENT_TYPES_LIST,
    GETTER_APPLICATION_STATUS_LIST,
    GETTER_APPLICATION_STATUS,
    GETTER_APPLICATIONS,
    GETTER_APPLICATION_LIST
  } from "../../../../store/types";
  import eyeIcon from "../../../../../public/static/img/dashboard_icons/outline-visibility-24px.svg";
  export default {
    name: "Search",
    components: {
      RegularTable,
      PPagination,
      [Popover.name]: Popover,
      [Option.name]: Option,
      [Select.name]: Select,
      [Switch.name]: Switch,
      [DatePicker.name]: DatePicker,
      [TimeSelect.name]: TimeSelect,
    },
    data() {
      return {
        isPagination: false,
        eyeIcon,
        surName: '',
        appRef: '',
        clientRef: '',
        selectedStatus: 'ALL',
        statusTypes: [],
        applicationData: null,
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
          {label: '', name: 'view', button: true},
          {label: '', name: 'action', button: true}
        ],
        editAll: false,
        editId: '',
        editedData: null,
        allClients: [],
        uneditableFields: [],
        totalPages: 0,
        perPage: 20,
        currentPage:1,
        pageCount: 0,
        toDate: '',
        fromDate: '',
        clientName: 'ALL',
        selectedClientType: 'ALL',
        resellerCode: 'ALL',
        oldestFirst: true
      }
    },
    computed: {
      ...mapGetters({
        getApplications: GETTER_APPLICATIONS,
      }),

      // Clients from Store
      clients () {
        const clients = [];
        const clientsAPI = (this.$store.state.kyc.allClients || [])
          .reduce((acc, i) => [...acc, i], []);
        clients.push(
          { name: 'ALL' },
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
          { name: 'ALL' },
          ...typesAPI
        );
        return types;
      },
      applicationStatuses () {
        const status = [];
        const statusAPI = (this.$store.state.kyc.applicationStatuses || [])
          .reduce((acc, i) => [...acc, i], []);
        status.push(
          {
            description: 'ALL',
            name: 'ALL',
            statusName: 'ALL'
          },
          ...statusAPI
        );
        return status;
      },
      applicationStatusesHelper () {
        return (this.$store.state.kyc.applicationStatuses || [])
          .reduce((acc, i) => [...acc, i], []);
      }
    },
    methods: {
      ...mapActions({
        getAllClients: GETTER_All_CLIENTS_LIST,
        getClientTypes: GETTER_CLIENT_TYPES_LIST,
        getApplicationStatus: GETTER_APPLICATION_STATUS_LIST,
        getApplicationAction: GETTER_APPLICATION_LIST
      }),
      getAllClientsList() {
        this.getAllClients();
      },
      getClientTypesList() {
        this.getClientTypes();
      },
      listenToInput({ value }) {
        this.applicationData = value;
      },
      search () {
        const payload = {
          appReferenceId: this.appRef,
          applicationStatus: this.selectedStatus === 'ALL' ? '' : this.selectedStatus,
          clientAppRef: this.clientRef,
          clientReference: this.clientName === 'ALL' ? '' : this.clientName,
          clientType: this.selectedClientType === 'ALL' ? '' : this.selectedClientType,
          dateFrom: formatDate(this.fromDate),
          dateTo: formatDate(this.toDate),
          lastName: this.surName,
          oldestFirst: this.oldestFirst,
          pageNum: this.isPagination ? this.currentPage - 1 : 0,
          pageSize: this.perPage
        };
        this.getApplicationAction(payload);
        if (!this.isPagination) this.currentPage = 1;
      },
      searchHandle () {
        this.isPagination=false;
        this.search();
        this.currentPage = 1;
      },
      handleInput(ev) {
        this.currentPage = ev;
        this.isPagination = true;
        this.search();
      }
    },
    mounted() {
      this.getAllClientsList();
      this.getClientTypesList();
      this.getApplicationStatus();
    },
    watch: {
      getApplications (value) {
        // this.applicationData = value;
        const temp = value.applications;
        temp.map((item, index) => {
          for (let key in item) {
            if (key == 'appReceivedDate') {
              temp[index].appReceivedDate = formatDate(item[key], true);
            } else if (key == 'kycReceivedDate') {
              temp[index].kycReceivedDate = formatDate(item[key], true);
            }
          }
        });
        // Get Outstanding App Data for Data Table
        this.applicationData = temp;

        this.pageCount = value.pageMeta.totalPages;
        this.perPage = value.pageMeta.perPage;

        this.pagedData = this.applicationData;
      }
    }
  }
</script>
<style lang="scss" scoped>

.search-content {
   .sub-head {
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #292929;
  }
  .filter {
    .left-col {
      padding-right: 8vw;
    }
    .right-col {
      padding-right: 8vw;
    }
    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-weight: 800;
      min-height: 50px;
      .item-title {
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
      }
      .oldestFirstWrapper {
        display: flex;
        align-items: center;
        label {
          margin-bottom: 0
        }
      }
      .select {
        width: 300px;
        display: flex;
        align-items: center;
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
      &.btn-item {
        justify-content: flex-end;
        .search-button {
          text-transform: none;
          width: 198px;
          border-radius: 30px;
        }
      }

      &.app-status-item {
        .select {
          display: inline;
          img {
            position: absolute;
            top: 8px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .listing {
    .table {
      margin-top : 50px;
      th {
        padding: 0;
      }
    }
  }

}

.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 20px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + .slider {
      background-color: #5bd684;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #5bd684;
    }

    &:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
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
    &::before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 1px;
      bottom: 1px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
    &.round {
      border-radius: 34px;
    }
  }
}

h5.helpTitle {
  padding: 15px 5px 0 5px;
  font-weight: bold;
  font-size: 18px;
}
table.helperTable {
  tr {
    &:nth-child(even) {
      background-color: #F3FCF8;
    }
    td {
      padding: 15px 15px 15px 5px;
      text-align: left;
      &:first-child {
        font-weight: bold;
      }
    }
  }
}
.table {
  .tableWrapper {
    box-shadow: 0px 10px 40px rgba(41, 41, 41, 0.15);
    padding: 0;
  }
  .table-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
