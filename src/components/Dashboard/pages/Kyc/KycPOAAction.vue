<template>
  <div class="kyc-poa">
    <el-row class="kyc-poa-row w-100 d-flex align-items-center mb-4">
      <el-col :sm="12">
        <h2 class="col-12 kyc-poa__sub-head m-0">Application Info</h2>
      </el-col>
      <el-col :sm="12" class="justify-content-end d-flex">
        <p-button @click="handleClose"
                  v-if="hasPermission(permission.KYC_POA_VIEW)"
                  type="default" round class="kyc-poa-close-btn">Close</p-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="8">
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>Application Ref</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.appReferenceId }}</p>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>Client App Ref</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.clientReference }}</p>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>Status</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.checkStatusDesc }}</p>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>ID Documentation</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.checkId }}</p>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>Status</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.checkStatusName }}
              <el-popover placement="bottom right" width="490" class="status-helper"
                          trigger="hover">
                <h5 class="sub-title">Status</h5>
                <table class="helper-table">
                  <tbody>
                  <tr v-for="(status, index) in poaStatuses" :key="index">
                    <td>{{ status.name }}</td>
                  </tr>
                  </tbody>
                </table>
                <img slot="reference" class="ml-2 img-icon" :src="eyeIcon"/>
              </el-popover>
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="8">
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>Verification attempts</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.verifyAttempts }}</p>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>Date Received</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.appReceivedDate | kycDateFormat }}</p>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :md="10">
            <strong>App SMS Sent</strong>
          </el-col>
          <el-col :md="14">
            <p>{{ poaData.lastSmsSentDate | kycDateFormat }}</p>
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
            <p class="kyc-poa-status" :class="[isUnverifiedStatus ?'bg-unverified': 'bg-verified']">
              {{poaData.checkStatusName}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-card class="client-info__card" :body-style="{ padding: '0px' }">
            <el-popover v-if="poaCheckDoc" placement="right" width="550" class="image-zoom" trigger="hover">
              <img class="w-100" :src="`data:${poaCheckDoc.mimeType};base64, ${poaCheckDoc.content}`">
              <img class="client-info__card__img" slot="reference" v-if="poaCheckDoc"
                   :src="`data:${poaCheckDoc.mimeType};base64, ${poaCheckDoc.content}`">
            </el-popover>
            <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
              <p>No document received</p>
            </div>
          </el-card>
        </el-row>
      </el-col>

      <el-col :md="16">
        <el-row class="mb-5 pl-5 d-flex align-items-center w-100">
          <el-col :md="7">
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
                        <h5 class="sub-title">Action POA Overview</h5>
                        <table class="helper-table">
                          <tbody>
                          <tr v-for="(item, index) in poaActionTypes" :key="index">
                            <td>{{ item.description }}</td>
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
                      <el-option v-for="item in poaActionTypes"
                                 placeholder="Action"
                                 :key="item.code"
                                 :label="item.description"
                                 :value="item.code">{{item.description}}
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
                    <p class="kyc-poa-modal-sub-title mb-0">Supporting document (Optional)
                    </p>
                  </el-col>
                  <el-col class="d-flex justify-content-end">
                    <div class="d-flex justify-content-end align-items-center">
                      <!--<p-button round type="default" class="kyc-poa-modal-browse-btn"
                                @click="clickOnBrowseBtn">Browse</p-button>-->
                      <div class="file-upload btn btn--browse" v-if="!file">
                        Browse
                        <input @change="getFile" class="" type="file">
                      </div>
                      <p-button :disabled="sending" @click.stop.prevent="doUploadSupportDocument"
                                class="btn btn--upload"
                                round v-if="file">
                        <Loader class="mr-2 align-middle" v-if="sending"></Loader>
                        Upload
                      </p-button>
                      <span class="file-name ml-2" v-if="file">{{ file.name }}</span>
                      <span @click.stop="file = null" class="ml-2 file-cancel" v-if="file">x</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="mb-4">
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <regular-table
                          :headings="modalTableHeadings"
                          :value="modalTableData"
                        >
                        </regular-table>
                      </div>
                    </div>
                  </div>
                </el-row>
                <el-row class="d-flex mb-4">
                  <el-col class="text-center">
                    <p-button
                      :disabled="!isValidModal"
                      type="success"
                      class="kyc-poa-action-btn mr-2"
                      @click="sendDataFromModal()"
                      round>
                      Save
                    </p-button>
                    <p-button
                      type="default"
                      class="kyc-poa-action-btn ml-2"
                      @click="toggleModalVisible"
                      round>
                      Cancel
                    </p-button>
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
                  <fg-input v-if="editAddress1" v-model="poaData.submittedAddress.address1" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="poaData && poaData.submittedAddress && poaData.submittedAddress.address1">{{poaData.submittedAddress.address1}}</span>
                </td>
                <td>
                  <img v-if="!editAddress1 && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editAddress1 = !editAddress1"/>
                  <p-button v-if="editAddress1" round
                            @click="handleUpdatePoaCheckAddress('editAddress1')">Save
                  </p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Address Line 2</strong></td>
                <td>
                  <fg-input v-if="editAddress2" v-model="poaData.submittedAddress.address2" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="poaData && poaData.submittedAddress && poaData.submittedAddress.address2">{{poaData.submittedAddress.address2}}</span>
                </td>
                <td>
                  <img v-if="!editAddress2 && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editAddress2 = !editAddress2"/>
                  <p-button v-if="editAddress2" round
                            @click="handleUpdatePoaCheckAddress('editAddress2')">Save
                  </p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Address Line 3</strong></td>
                <td>
                  <fg-input v-if="editAddress3" v-model="poaData.submittedAddress.address3" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="poaData && poaData.submittedAddress && poaData.submittedAddress.address3">{{poaData.submittedAddress.address3}}</span>
                </td>
                <td>
                  <img v-if="!editAddress3 && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editAddress3 = !editAddress3"/>
                  <p-button v-if="editAddress3" round
                            @click="handleUpdatePoaCheckAddress('editAddress3')">Save
                  </p-button>
                </td>
              </tr>
              <tr>
                <td><strong>City / Town</strong></td>
                <td>
                  <fg-input v-if="editCity" v-model="poaData.submittedAddress.city" class="p-0 mr-2"></fg-input>
                  <span v-else-if="poaData && poaData.submittedAddress && poaData.submittedAddress.city">{{poaData.submittedAddress.city}}</span>
                </td>
                <td>
                  <img v-if="!editCity && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editCity = !editCity"/>
                  <p-button v-if="editCity" round
                            @click="handleUpdatePoaCheckAddress('editCity')">Save
                  </p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Post Code</strong></td>
                <td>
                  <fg-input v-if="editPostCode" v-model="poaData.submittedAddress.postCode" class="p-0 mr-2"></fg-input>
                  <span
                    v-else-if="poaData && poaData.submittedAddress && poaData.submittedAddress.postCode">{{poaData.submittedAddress.postCode}}</span>
                </td>
                <td>
                  <img v-if="!editPostCode && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editPostCode = !editPostCode"/>
                  <p-button v-if="editPostCode" round
                            @click="handleUpdatePoaCheckAddress('editPostCode')">Save
                  </p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Region</strong></td>
                <td>
                  <fg-input v-if="editRegion" v-model="poaData.submittedAddress.countyOrState"
                            class="p-0 mr-2"></fg-input>
                  <span v-else-if="poaData && poaData.submittedAddress && poaData.submittedAddress.countyOrState">{{poaData.submittedAddress.countyOrState}}</span>
                </td>
                <td>
                  <img v-if="!editRegion && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editRegion = !editRegion"/>
                  <p-button v-if="editRegion" round
                            @click="handleUpdatePoaCheckAddress('editRegion')">Save
                  </p-button>
                </td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>
                  <fg-input v-if="editCountry" v-model="poaData.submittedAddress.country" class="p-0 mr-2"></fg-input>
                  <span v-else-if="poaData && poaData.submittedAddress && poaData.submittedAddress.countryName">{{poaData.submittedAddress.countryName}}</span>
                </td>
                <td>
                  <img v-if="!editCountry && isActionMode" :src="editIcon" width="20" class="ml-3 img-icon"
                       @click="editCountry = !editCountry"/>
                  <p-button v-if="editCountry" round
                            @click="handleUpdatePoaCheckAddress('editCountry')">Save
                  </p-button>
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
          <el-row v-if="isActionMode">
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
                         :value="customCheckHistory">
            <template slot-scope="index">
              <td>
                <p-button type="primary" outline @click="onClickTableBtn(index)">Download</p-button>
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
    KYC_GET_POA_CHECK_STATUSES,
    KYC_POST_POA_CHECK_ADDRESS,
    KYC_GET_POA_ACTION_TYPES,
    KYC_POST_UPLOAD_DOCUMENT_SUPPORTS,
    KYC_POST_ACTION_FROM_MODAL
  } from "../../../../store/types"
  import {kycModuleDateFormat} from '../../../../utils/kycModuleDateFormat'
  import Loader from "../../../UIComponents/Loader"
  import {toBase64} from "../../../../utils/fileToBase64.js"
  import {permissionMixin} from '@/mixins/permission'
  import PERMISSION from '../../../../constants/permission'
  import { formatDate } from "../../../../utils/Date";

  export default {
    name: "KycPOAAction",
    props: ['mode'],
    mixins: [permissionMixin],
    components: {
      [Popover.name]: Popover,
      [Card.name]: Card,
      RegularTable,
      PButton,
      Modal,
      Loader,
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
        sending: false,
        file: '',
        poaStatus: 'Unverified',
        verificationList: [
          'POA is an approved bill type',
          'POA is an approved bill type',
          'Full POA visible',
          'No obvious marks of manipulation',
          'Address match supplied address by client'
        ],
        tableHeadings: [
          {name: 'checkActionComment', label: 'Case history'},
          {name: 'checkActionName', label: 'Name'},
          {name: 'checkActionCreatedDate', label: 'Date'},
          {name: 'checkStatusName', label: 'Status'},
          {name: 'checkActionReason', label: 'Reason'},
          {name: 'operatorName', label: 'Operator'},
        ],
        actionsPoa: [
          {value: 30, label: '30 Days'},
          {value: 60, label: '60 Days'},
          {value: 90, label: '90 Days'}
        ],
        modalTableHeadings: [
          {name: 'fileName', label: 'Document Name'},
          {name: 'uploadDate', label: 'Date'},
          {name: 'operatorName', label: 'Operator'}
        ],

        modalTextarea: '',
        modalActionPoa: '',
        appReferenceId: '',
        operatorName: 'Mock Operator'
      }
    },
    async created() {
      if (this.$route.params && this.$route.params.appReferenceId) {
        this.appReferenceId = this.$route.params.appReferenceId
      }
      const data = await this.getPoaData(this.appReferenceId).catch(err => console.log(err));
      if (data) {
        const checkId = data.checkId
        const id = (data.poaCheckDoc && data.poaCheckDoc.id) || null
        if (!id || !checkId) return
        const body = {checkId, id}
        this.getPoaDocs(body)
        //this.getPoaDownloadSupportDoc(body)
        this.getListUploadedDocument({id: checkId})
      }
      this.getPoaActionTypes()
      this.getPoaCheckStatuses()

    },
    computed: {
      ...mapState({
        poaData: state => state.kyc.poaInfo,
        poaCheckDoc: state => state.kyc.poaCheckDoc,
        poaSupportDoc: state => state.kyc.poaSupportDoc,
        poaDownloadSupportDoc: state => state.kyc.poaDownloadSupportDoc,
        poaStatuses: state => state.kyc.poaStatuses,
        poaActionTypes: state => state.kyc.poaActionTypes,

      }),
      isUnverifiedStatus() {
        return this.poaData.checkStatusName === 'Unverified'
      },
      isActionMode() {
        return this.hasPermission(PERMISSION.KYC_POA_ACTION)
      },
      customCheckHistory() {
        if (this.poaData.checkHistories) {
          return this.poaData.checkHistories.map(item => {
            return {
              id: item.checkActionId,
              checkActionComment: item.checkActionComment,
              checkActionName: item.checkActionName,
              checkActionCreatedDate: this.handleDateFormat(item.checkActionCreatedDate),
              checkStatusName: item.checkStatusName,
              checkActionReason: item.checkActionReason,
              operatorName: item.operatorName
            }
          })
        }
      },
      modalTableData() {
        if (this.poaSupportDoc && this.poaSupportDoc.supportDocs) {
          return this.poaSupportDoc.supportDocs.map(doc => {
            return {
              fileName: doc.fileName,
              uploadDate: this.handleDateFormat(doc.uploadDate),
              operatorName: doc.operatorName,
            }
          })
        }

        return []
      },
      isValidModal() {
        return this.modalTextarea !== ''
      },
    },
    methods: {
      ...mapActions({
        getPoaData: KYC_GET_POA_CHECK_ENQUIRY,
        getPoaDocs: KYC_GET_POA_CHECK_DOC,
        getListUploadedDocument: KYC_GET_POA_SUPPORT_DOC,
        getPoaDownloadSupportDoc: KYC_GET_DOWNLOAD_SUPPORT_DOC,
        getPoaCheckStatuses: KYC_GET_POA_CHECK_STATUSES,
        sendPoaCheckAddress: KYC_POST_POA_CHECK_ADDRESS,
        getPoaActionTypes: KYC_GET_POA_ACTION_TYPES,
        sendDocumentSupports: KYC_POST_UPLOAD_DOCUMENT_SUPPORTS,
        saveDataFromModal: KYC_POST_ACTION_FROM_MODAL
      }),
      handleClose() {
        this.$router.push({name: 'KYC Main Page', query: {appRef: this.appReferenceId}})
      },
      toggleModalVisible() {
        this.modals.visible = !this.modals.visible
      },
      onClickTableBtn(idx) {
      },
      async sendDataFromModal() {
        const id = this.poaData.checkId
        const body = {
          actionTypeCode: this.modalActionPoa,
          comment: this.modalTextarea,
          operatorName: this.operatorName
        }
        await this.saveDataFromModal({id, body})
          .then(() => {
            this.getPoaData(this.appReferenceId)
          })
        this.toggleModalVisible()
      },
      handleUpdatePoaCheckAddress(name) {
        this[name] = !this[name]
        const body = this.poaData.submittedAddress
        const id = this.poaData.checkId
        this.sendPoaCheckAddress({id, body})
      },
      handleDateFormat(value) {
        if (!value) return ''
        return kycModuleDateFormat(value).substring(0, 16)
      },
      async doUploadSupportDocument() {
        const id = this.poaData.checkId || null
        if (!this.file || !id) {
          return
        }
        const {size, name, type} = this.file;
        const operatorName = this.operatorName || ''
        const mimeType = type
        try {
          this.sending = true
          const content = await toBase64(this.file)
          await this.sendDocumentSupports({content, mimeType, operatorName, id})
            .then(() => {
              this.getListUploadedDocument({id})
            })
          // await this.uploadSupportDocument({content, mimeType, operatorName, id})
          // await this.getListSupportDocs({id: this.id})
          this.file = null
          this.sending = false
        } catch (e) {
          this.sending = false
          console.log(e)
        }
      },
      getFile(event) {
        this.file = event.target.files[0];
      },
    },
    filters: {
      kycDateFormat(value) {
        if (!value) return ''
        return formatDate(value, true)
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/sass/paper/variables";
  @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

  $table-border-gray: #dee2e6;
  $unverified-status-color: #FDD9DA;

  strong {
      font-weight: 600;
  }

  .kyc-poa {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;

    p {
      margin-bottom: 0;
    }

    .img-icon {
      cursor: pointer;
    }

    .bg-unverified {
      background-color: $unverified-status-color;
    }

    .bg-verified {
      background-color: $success-input-bg;
    }

    &-status {
      height: 40px;
      text-align: center;
      line-height: 40px;
      padding: auto;
    }

    .btn {
      margin: 0;
      text-transform: none;
    }

    .btn-poa-action {
      width: 145px;
    }

    .table-client-info {
      td {
        padding-top: 5px;

        &:last-child {
          text-align: right;
        }
      }

      .btn {
        height: 25px;
        line-height: 25px;
        padding-top: initial;
        width: 75px;
      }

      /deep/ {
        .form-control {
          max-width: 190px;
        }
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

      .el-popover {
        padding: 20px 0 40px;
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

        .ceevo__table.table {
          tbody {
            td {
              &:last-child {
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
          padding: 15px 15px 15px 15px;
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

  .kyc-poa-action-btn {
    width: 198px;
    text-transform: none;
  }

  .status-helper {
    .sub-title {
      font-size: 16px;
      font-weight: bold;
      margin-left: 15px;
      margin-bottom: 0;
    }
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

  .file-upload {
    position: relative;
    border-radius: 30px;
    cursor: pointer;

    & input {
      cursor: pointer;

      &::-webkit-file-upload-button {
        cursor: pointer;
      }

      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      left: 0;
      top: 0;
    }
  }

  .file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    display: inline-block;
    @media(min-width: 1400px) {
      max-width: 250px;
    }
  }

  .file-cancel {
    background: grey;
    border-radius: 50% 50%;
    width: 20px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
  }

  .btn {
    text-transform: none;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;

    &--shadow {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    &--browse, &--upload {
      min-width: 140px;
    }

    &--upload {
      background-color: #7039DA;
    }

    &--view {
      min-width: 150px;
    }

    &--browse, &--view, &--upload {
      padding: 8px 22px;
    }

  }

</style>
