<template>
  <div class="kyc-poa">
    <el-row class="kyc-poa-row w-100 d-flex align-items-center mb-4">
      <el-col :sm="12">
        <h2 class="col-12 kyc-poa__sub-head m-0">Application Info</h2>
      </el-col>
      <el-col :sm="12" class="justify-content-end d-flex">
        <p-button @click="handleClose" type="default" round class="kyc-poa-close-btn">Close</p-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="8">
        <el-row class="mb-1" v-for="(info, index) in applicationInfo" :key="index">
          <el-col :md="10">
            <strong>{{info.name}}</strong>
          </el-col>
          <el-col :md="14">
            <p>
              {{info.value}}
              <el-popover v-if="info.className" placement="bottom right" width="490" class="status-helper"
                          trigger="hover">
                <h5 class="sub-title">Status</h5>
                <table class="helper-table">
                  <tbody>
                  <tr v-for="(status, index) in statusList" :key="index">
                    <td>{{ status }}</td>
                  </tr>
                  </tbody>
                </table>
                <img slot="reference" class="ml-2 img-icon" :src="eyeIcon"/>
              </el-popover>
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="16">
        <el-row class="mb-1" v-for="(info, index) in applicationInfoII" :key="index">
          <el-col :md="5">
            <strong>{{info.name}}</strong>
          </el-col>
          <el-col :md="19">
            <p>{{info.value}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="mt-5">
      <el-col>
        <strong>POA Verification</strong>
      </el-col>
    </el-row>

    <el-row class="d-flex">
      <el-col :md="8">
        <el-row class="mb-2 d-flex align-items-center">
          <el-col :md="12" class="">
            <strong>Status</strong>
          </el-col>
          <el-col :md="12">
            <p class="kyc-poa-status">{{poaStatus}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-card class="client-info__card" :body-style="{ padding: '0px' }">
            <el-popover v-if="img" placement="right" width="550" class="image-zoom" trigger="hover">
              <!-- todo: add img src-->
              <!-- <img class="w-100" :src="">-->
              <!--<img class="client-info__card__img" slot="reference" v-if="img"
                   :src="">-->
            </el-popover>
            <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
              <p>No document received</p>
            </div>
          </el-card>
        </el-row>
      </el-col>

      <el-col :md="16">
        <el-row class="mb-5 pl-5 d-flex align-items-center w-100">
          <el-col :md="6">
            <strong>Client Submitted information</strong>
          </el-col>
          <el-col :md="18" class="pl-2">

            <p-button v-if="isActionMode"
                      @click="toggleModalVisible"
                      type="primary"
                      class="btn-poa-action"
                      round>Action
            </p-button>

            <modal :show.sync="modals.visible"
                   footer-classes="justify-content-center"
                   type="notice">
              <template>

                  <el-row class="kyc-poa-modal-wrap-title">
                    <el-col>
                      <p class="kyc-poa-modal-title">Action POA
                        <el-popover placement="bottom right" width="490" class="status-helper"
                                    trigger="hover">
                          <h5 class="sub-title">Status</h5>
                          <table class="helper-table">
                            <tbody>
                            <tr v-for="(actionName, index) in actionPOAList" :key="index">
                              <td>{{ actionName }}</td>
                            </tr>
                            </tbody>
                          </table>
                          <img slot="reference" class="kyc-poa-modal__eye" :src="eyeIcon"/>
                        </el-popover>

                        <span class="kyc-poa-modal__title-required">*</span>
                      </p>
                    </el-col>
                  </el-row>
                  <el-row class="kyc-poa-modal-wrap-select">
                    <el-col>
                      <el-select class="kyc-poa-modal__select" v-model="modalActionPoa">
                        <el-option v-for="item in actionsPoa"
                                   placeholder="Action"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>
                  <el-row class="kyc-poa-modal-wrap-subtitle d-flex">
                    <el-col>
                      <p class="kyc-poa-modal-sub-title mb-0">Action Comment
                        <span class="kyc-poa-modal__title-required">*</span>
                      </p>
                    </el-col>
                    <el-col class="d-flex justify-content-end">
                      <p class="kyc-poa-modal-subtitle-required mb-0"><span
                        class="kyc-poa-modal-small__required">*</span>
                        required
                      </p>
                    </el-col>
                  </el-row>
                  <el-row class="mb-4">
                    <el-input
                      type="textarea"
                      :rows="6"
                      placeholder="Please input"
                      v-model="modalTextarea">
                    </el-input>
                  </el-row>
                  <el-row class="kyc-poa-modal-wrap-subtitle d-flex mb-4">
                    <el-col class="d-flex align-items-center">
                      <p class="kyc-poa-modal-sub-title mb-0">Supporting document(Optional)
                      </p>
                    </el-col>
                    <el-col class="d-flex justify-content-end">
                      <p-button
                        type="default"
                        class="kyc-poa-modal-browse-btn"
                        round
                        @click="clickOnBrowseBtn"
                      >
                        Browse
                      </p-button>
                    </el-col>
                  </el-row>
                  <el-row class="mb-4">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <regular-table
                            :headings="modalTableHeadings"
                            :value="modalTableValues"
                          >
                          </regular-table>
                        </div>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="d-flex mb-4">
                    <el-col class="text-center">
                      <p-button
                        type="success"
                        class="kyc-poa-action-btn mr-2"
                        @click="toggleModalVisible"
                        round>
                        Save</p-button>
                      <p-button
                        type="default"
                        class="kyc-poa-action-btn ml-2"
                        @click="toggleModalVisible"
                        round>
                        Cancel</p-button>
                    </el-col>
                  </el-row>

              </template>

            </modal>

          </el-col>
        </el-row>

        <el-col :md="12" class="pl-5">
          <el-row>
            <table class="w-100 table-client-info">
              <tbody>
              <tr>
                <td><strong>Address Line 1</strong></td>
                <td>
                  <fg-input v-if="editAddress1" v-model="clientInformation.address1" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="clientInformation && clientInformation.address1">{{clientInformation.address1}}</span>
                </td>
                <td>
                  <img v-if="!editAddress1 && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editAddress1 = !editAddress1"/>
                  <p-button v-if="editAddress1" round @click="editAddress1 = !editAddress1">Save</p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Address Line 2</strong></td>
                <td>
                  <fg-input v-if="editAddress2" v-model="clientInformation.address2" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="clientInformation && clientInformation.address2">{{clientInformation.address2}}</span>
                </td>
                <td>
                  <img v-if="!editAddress2 && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editAddress2 = !editAddress2"/>
                  <p-button v-if="editAddress2" round @click="editAddress2 = !editAddress2">Save</p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Address Line 3</strong></td>
                <td>
                  <fg-input v-if="editAddress3" v-model="clientInformation.address3" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="clientInformation && clientInformation.address3">{{clientInformation.address3}}</span>
                </td>
                <td>
                  <img v-if="!editAddress3 && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editAddress3 = !editAddress3"/>
                  <p-button v-if="editAddress3" round @click="editAddress3 = !editAddress3">Save</p-button>
                </td>
              </tr>
              <tr>
                <td><strong>City / Town</strong></td>
                <td>
                  <fg-input v-if="editCity" v-model="clientInformation.city" class="p-0 mr-2"></fg-input>
                  <span v-else-if="clientInformation && clientInformation.city">{{clientInformation.city}}</span>
                </td>
                <td>
                  <img v-if="!editCity && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editCity = !editCity"/>
                  <p-button v-if="editCity" round @click="editCity = !editCity">Save</p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Post Code</strong></td>
                <td>
                  <fg-input v-if="editPostCode" v-model="clientInformation.postCode" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="clientInformation && clientInformation.postCode">{{clientInformation.postCode}}</span>
                </td>
                <td>
                  <img v-if="!editPostCode && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editPostCode = !editPostCode"/>
                  <p-button v-if="editPostCode" round @click="editPostCode = !editPostCode">Save</p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Region</strong></td>
                <td>
                  <fg-input v-if="editRegion" v-model="clientInformation.region" class="p-0 mr-2"></fg-input>
                  <span v-else-if="clientInformation && clientInformation.region">{{clientInformation.region}}</span>
                </td>
                <td>
                  <img v-if="!editRegion && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editRegion = !editRegion"/>
                  <p-button v-if="editRegion" round @click="editRegion = !editRegion">Save</p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>
                  <fg-input v-if="editCountry" v-model="clientInformation.country" class="p-0 mr-2"></fg-input>
                  <span v-else-if="clientInformation && clientInformation.country">{{clientInformation.country}}</span>
                </td>
                <td>
                  <img v-if="!editCountry && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editCountry = !editCountry"/>
                  <p-button v-if="editCountry" round @click="editCountry = !editCountry">Save</p-button>
                </td>
              </tr>
              </tbody>
            </table>
          </el-row>
          <el-row>
            <p-button class="poa-btn-download" round>Download</p-button>
          </el-row>
        </el-col>
        <el-col :md="12" class="poa-verification-column">
          <el-row>
            <strong>Verification Checklist</strong>
            <ul class="w-100 list-unstyled mt-2">
              <li v-for="(item, index ) in verificationList" :key="index">- {{item}}</li>
            </ul>
          </el-row>
        </el-col>
      </el-col>
    </el-row>

    <el-row class="mt-5">
      <el-col :md="24">
        <el-card>
          <regular-table striped
                         :headings="tableHeadings"
                         :value="applicationInfoData">
            <template slot-scope="index">
              <td>
                <p-button type="primary" outline>Download</p-button>
              </td>
            </template>
          </regular-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {Popover, Card} from 'element-ui'
  import eyeIcon from '../../../../../public/static/img/dashboard_icons/outline-visibility-24px-1.svg'
  import editIcon from '../../../../../public/static/img/dashboard_icons/ic_edit.svg'
  import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
  import PButton from "@/components/UIComponents/Button"
  import Modal from 'src/components/UIComponents/Modal'
  import {mapState, mapActions} from 'vuex'
  import {
    KYC_GET_POA_CHECK_ENQUIRY,
    KYC_GET_POA_CHECK_DOC,
    KYC_GET_POA_SUPPORT_DOC,
    KYC_GET_DOWNLOAD_SUPPORT_DOC,
  } from "../../../../store/types"

  export default {
    name: "KycPOAAction",
    props: ['mode'],
    components: {
      [Popover.name]: Popover,
      [Card.name]: Card,
      RegularTable,
      PButton,
      Modal,
    },
    data() {
      return {
        eyeIcon,
        editIcon,
        modals: {
          visible: false
        },
        editAddress1: false,
        editAddress2: false,
        editAddress3: false,
        editCity: false,
        editPostCode: false,
        editRegion: false,
        editCountry: false,
        visible: false,
        img: false,
        poaStatus: 'Unverified',
        applicationInfo: [
          {name: 'Application Ref', value: 'ABCDEFG'},
          {name: 'Client App Ref', value: 'BCDEFGH'},
          {name: 'Status', value: 'KYC Validation'},
          {name: 'ID Documentation', value: 'Drivers License'},
          {name: 'Status', value: 'Unverified', className: 'icon'},
        ],
        applicationInfoII: [
          {name: 'Verification attempts', value: '1'},
          {name: 'Date Received', value: 'YYYY-MM-DD-HH-MM'},
          {name: 'App SMS Sent', value: 'YYYY-MM-DD-HH-MM'},
        ],
        statusList: [
          'Unverified',
          'Approved',
          'Declined',
          'Declined - fraud',
          'New POA requested',
          'Address update - New POA requested'
        ],
        clientInformation: {
          address1: 'Wilhelm-Epstein Strasse 14',
          address2: '',
          address3: '',
          city: 'Frankfurt',
          postCode: '60431',
          region: 'Frankfurt',
          country: 'Germany',
        },
        actionPOAList: [
          'Approve POA',
          'Decline POA - Close Application',
          'Decline POA - Fraud and Close',
          'Request new POA - Not supported',
          'Request new POA - Expired ID',
          'Request new POA - Not Legible',
          'Request new POA - Address Update',
        ],
        verificationList: [
          'POA is an approved bill type',
          'POA is an approved bill type',
          'Full POA visible',
          'No obvious marks of manipulation',
          'Address match supplied address by client'
        ],
        tableHeadings: [
          {name: 'caseHistory', label: 'Case history'},
          {name: 'name', label: 'Name'},
          {name: 'date', label: 'Date'},
          {name: 'status', label: 'Status'},
          {name: 'reason', label: 'Reason'},
          {name: 'operator', label: 'Operator'},
        ],
        applicationInfoData: [
          {
            caseHistory: 'Replaced Doc',
            name: 'ID201332',
            date: 'YYYY-MM-DD-HH-SS',
            status: 'Rejected',
            reason: 'Expired ID',
            operator: 'J.LIM',
          },
          {
            caseHistory: 'Replaced Doc',
            name: 'ID201333',
            date: 'YYYY-MM-DD-HH-SS',
            status: 'Rejected',
            reason: 'Expired ID',
            operator: 'J.LIM',
          },
          {
            caseHistory: 'Replaced Doc',
            name: 'ID201334',
            date: 'YYYY-MM-DD-HH-SS',
            status: 'Rejected',
            reason: 'Expired ID',
            operator: 'J.LIM',
          },
        ],
        actionsPoa: [
          {value: 30, label: '30 Days'},
          {value: 60, label: '60 Days'},
          {value: 90, label: '90 Days'}
        ],
        modalTableHeadings: [
          {name: 'documentLog', label: 'Document Log'},
          {name: 'documentName', label: 'Document Name'},
          {name: 'date', label: 'Date'},
          {name: 'status', label: 'Status'},
          {name: 'reason', label: 'Reason'},
          {name: 'operator', label: 'Operator'}
        ],
        modalTableValues: [
          {
            documentLog: 'Supporting Log',
            documentName: 'ID201332',
            date: 'YYYY-MM-DD-HH-MM',
            status: 'Rejected',
            reason: 'Expired Id',
            operator: 'J.Lim'
          }
        ],

        modalTextarea: '',
        modalActionPoa: [],
        appReferenceId: 'test',
      }
    },
    mounted(){
      this.getPoaData('KYC190612-MOEO')
      this.getPoaDocs({checkId: '00000', id: '12312'})
      this.getPoaDownloadSupportDoc({checkId: '00000', id: '12312'})
    },
    computed: {
      ...mapState({
        poaData : state => state.kyc.poaInfo,
        poaCheckDoc: state => state.kyc.poaCheckDoc,
        poaSupportDoc: state => state.kyc.poaSupportDoc,
        poaDownloadSupportDoc: state => state.kyc.poaDownloadSupportDoc,
      }),
      isActionMode() {
        return this.mode === 'action'
      },
    },
    methods: {
      ...mapActions({
        getPoaData: KYC_GET_POA_CHECK_ENQUIRY,
        getPoaDocs: KYC_GET_POA_CHECK_DOC,
        getPoaSupportDoc: KYC_GET_POA_SUPPORT_DOC,
        getPoaDownloadSupportDoc: KYC_GET_DOWNLOAD_SUPPORT_DOC,
      }),
      handleClose() {
        this.$router.push({name: 'KYC Main Page'})
      },
      clickOnBrowseBtn() {

      },
      toggleModalVisible() {
        this.modals.visible = !this.modals.visible
      },
    }
  }
</script>

<style scoped lang="scss">
  $table-border-gray: #dee2e6;
  $unverified-status-color: #FDD9DA;

  .kyc-poa {
    font-size: 16px;

    p {
      margin-bottom: 0;
    }

    .img-icon {
      cursor: pointer;
    }

    &-status {
      height: 40px;
      text-align: center;
      line-height: 40px;
      padding: auto;
      background-color: $unverified-status-color;
    }

    .btn {
      margin: 0;
      text-transform: none;
    }

    .btn-poa-action {
      width: 190px;
    }

    .table-client-info {
      td {
        padding-top: 5px;
      }

      .btn {
        height: 25px;
        line-height: 25px;
        padding-top: initial;
        width: 75px;
      }
    }

    .poa-verification-column {
      padding-left: 70px;
    }

    .poa-btn-download {
      margin-top: 25px;
      font-size: 11px;
      height: 27px;
      width: 125px;
      line-height: 27px;
      padding-top: inherit;
    }

    .btn-outline-primary {
      border-width: 1px !important;
      border-radius: 0;

      &:hover {
        background-color: white !important;
        color: #9E79E7 !important;
      }

      &:last-child {
        border-right-width: 1px !important;
      }
    }

    /deep/ {
      .el-card__body {
        padding: 0;
      }

      .table__wrapper {
        &.ceevo__table--auto-height {
          &.ceevo__table--responsive {
            &.ceevo__table--condensed {
              &.ceevo__table--striped {
                padding: 0;
              }
            }
          }
        }
      }

      .table {
        margin-bottom: 0;
      }

      .ceevo__table {
        overflow: auto !important;

        .cell {
          text-align: left;
          min-width: unset;
        }

        &.table {
          margin-bottom: 0;
          width: 100% !important;

          thead {
            th {
              overflow: auto !important;
            }
          }

          tbody {
            outline: none !important;

            tr {
              td {
                border-left: 1px solid $table-border-gray !important;
                min-width: unset;

                &:first-child {
                  border: none !important;
                }

                &:last-child {
                  text-align: right;
                }
              }
            }

            td {
              &:first-child {
                .cell {
                  border: none;
                }
              }

              &:last-child {
                border-left: none !important;
              }
            }

            tr {
              &:last-child {
                .btn-outline-primary {
                  border-bottom-width: 1px !important;
                }
              }
            }
          }
        }

        .ceevo__heading-label {
          justify-content: start;
        }
      }

      .form-group {
        margin-bottom: 0;
      }

      .modal-dialog {
        min-width: 1300px;

        .modal-header {
          border-bottom-color: transparent !important;
          padding: 0;
        }

        .modal-footer {
          border-top-color: transparent !important;
        }

        .btn {
          width: 178px;
        }
        .ceevo__table.table{
          tbody{
            td{
              &:last-child{
                border-left: 1px solid #dee2e6 !important;
              }
            }
          }
        }
      }
    }


    table.helper-table {
      width: 100%;

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
  }

  .client-info {
    max-width: 480px;

    &__card {
      border-radius: 20px;
      border: 1px solid #707070;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      &__img {
        height: 300px;
        width: 100%;
        object-fit: cover;
        cursor: zoom-in;
      }

      &__info {
        height: 300px;
      }
    }
  }

  .kyc-poa__sub-head {
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #292929;
    padding-left: 0;
  }

  .kyc-poa-close-btn {
    width: 180px;
  }

  .kyc-poa-row__text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .kyc-poa-row__title {
    font-weight: 600;
  }

  .kyc-poa-row__name {
    font-weight: 100;
  }

  .kyc-poa-modal-wrap-title {
    margin-bottom: 20px;
  }

  .kyc-poa-modal-title {
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 18px;
    position: relative;
    display: inline-block;
    margin-bottom: 0;
    color: #252422;
  }

  .kyc-poa-modal__title-required {
    color: #7039DA;
    position: absolute;
    top: 56%;
    transform: translateX(-50%);
    right: -21px;
    line-height: 0;
    font-size: 21px;
  }

  .kyc-poa-modal__eye {
    width: 20px;
    margin-top: -3px;
  }

  .el-select {
    &.kyc-poa-modal__select {
      /deep/ {
        .el-input__inner {
          border-radius: 10px;
        }

        .el-input {
          .el-icon-arrow-up {
            &:before {
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

          .el-select__caret {
            &.is-reverse {
              transform: rotateZ(180deg);
            }
          }
        }
      }
    }
  }

  .kyc-poa-modal-wrap-subtitle {
    margin-bottom: 10px;
  }

  .kyc-poa-modal-sub-title {
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    color: #252422;
    display: inline-block;
    position: relative;
    font-size: 16px;
  }

  .kyc-poa-modal-wrap-select {
    margin-bottom: 40px;
  }

  .kyc-poa-modal-subtitle-required {
    font-family: 'Poppins', sans-serif;
    position: relative;
    font-weight: bold;
    font-size: 10px;
    color: #252422;
    padding-top: 5px;
  }

  .kyc-poa-modal-small__required {
    position: absolute;
    color: #7039DA;
    font-size: 15px;
    left: -10px;
    top: 3px;
  }

  .kyc-poa-modal-browse-btn {
    width: 126px;
    margin: 0;
    height: 26px;
    line-height: 6px;
    font-size: 11px;
  }

  .kyc-poa-action-btn {
    width: 198px;
    text-transform: none;
  }

  .kyc-modal-wrap-table {
    /deep/ {
      .ceevo__table--striped .ceevo__table tbody > tr:nth-of-type(2n+1) {
        background-color: transparent !important;
      }
      .table__wrapper.ceevo__table--striped {
        padding: 0 !important;
      }
      .cell {
        border: 1px solid #ededed;
      }
      .card {
        box-shadow: 0 10px 40px rgba(41, 41, 41, 0.3);
      }
      table.ceevo__table.table {
        margin-bottom: 0 !important;
        tbody tr:last-child {
          td:last-child {
            border-bottom-right-radius: 30px !important;
          }
          td:first-child {
            border-bottom-left-radius: 30px !important;
          }
        }
      }
    }
  }
</style>
