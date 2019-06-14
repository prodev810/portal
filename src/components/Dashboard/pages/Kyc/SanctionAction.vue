<template>
<div>
    <div class="container-fluid">
        <div class="row mb-4">
            <div class="col-6">
                <h3 class="kyc__section__header mb-0 mt-1 mr-4">Application Info</h3>
            </div>
            <div class="col-6 text-right">
                <p-button round class="btn btn--close btn--shadow mr-1" @click.stop.prevent="close">Close</p-button>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-xl-4">
                <div class="kyc-info-box">
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Application Ref</p></div>
                        <div class="col-6"><p class="kyc-value">{{ sancheck.appReferenceId }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Client Ref</p></div>
                        <div class="col-6"><p class="kyc-value">{{ sancheck.clientReference }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Status</p></div>
                        <div class="col-6"><p class="kyc-value">{{ sancheck.checkStatusName }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Rescreen Date</p></div>
                        <div class="col-6"><p class="kyc-value">{{ sancheck.latestResubmittedDate | dateFormat }}</p></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="kyc-info-box">
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Verification attempts</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ sancheck.verifyAttempts }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Date Received</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ sancheck.appReceivedDate | dateFormat }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">App SMS Sent</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ sancheck.lastSmsSentDate | dateFormat }}</p></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-xl-4">
                <div class="kyc-info-box">
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">PEP/Sanction</p></div>
                        <div class="col-6">
                            <div class="d-flex w-mn">
                                <p class="kyc-value mr-2">{{ sancheck.applicationStatus }}</p>
                                <el-popover v-if="sancheck.applicationStatus"  placement="bottom right" width="490" class="status-helper" trigger="hover">
                                    <h5 class="sub-title">PEP/Sanction Legend</h5>
                                    <table class="helper-table">
                                        <tbody>
                                            <tr v-for="(statusType, index) in legend" :key="index">
                                                <td>{{ statusType.name }}</td>
                                                <td>{{ statusType.description }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <img slot="reference" :src="eyeIcon" />
                                </el-popover>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Screen Date</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ sancheck.firstSubmittedDate | dateFormat }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Rescreen Date</p></div>
                        <div class="col-6">
                            <div v-if="sancheck.latestResubmittedDate" class="d-flex w-mn">
                                <p class="kyc-value w-mn">{{ sancheck.latestResubmittedDate | dateFormat }}</p>
                                <p-button round class="btn btn--browse m-0" @click.stop.prevent="rescreenNow({ appReferenceId })">Rescreen Now</p-button>
                            </div>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-5" v-if="$route.query && $route.query.id">
            <div class="col">
                <div class="kyc-info-box">
                    <div class="row">
                        <div class="col-xl-4"><p class="kyc-label pt-3">Status</p></div>
                        <div class="col-6">
                            <div class="d-flex">
                                <p-button class="btn btn--status mr-4" :class="cardBtnSancStatus" v-if="sancheck && sancheck.checkStatusName">{{ sancheck.checkStatusName }}</p-button>
                                
                                <el-popover v-model="actionPopup"  placement="left-end" popper-class="actionPopover" :offset="500" :visible-arrow="false" width="700" class="status-helper" trigger="click">
                                    <div class="container-fluid">
                                        <div class="row mt-3 mb-2">
                                            <div class="col">
                                                <p class="kyc-label kyc-label--big">Action Sanction <span class="d-inline-block ml-1 mr-3 clr-purple">* </span>
                                                    <el-popover  placement="right" width="390" class="status-helper" trigger="hover">
                                                        <div class="col">
                                                            <h5 class="sub-title mt-3">Action Sanction Overview</h5>
                                                            <table class="helper-table w-100 mb-3">
                                                                <tbody>
                                                                    <tr v-for="(statusType, index) in actionLegend" :key="index">
                                                                        <td>{{ statusType.description }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <img slot="reference" :src="eyeIcon" />
                                                    </el-popover>
                                                </p>
                                            </div>
                                        </div>

                                        <div class="row mb-5">
                                            <div class="col">
                                                <el-select size="small" class=" mr-3 particulars-input" placeholder="Action" v-model="manualUpdate.actionTypeCode">
                                                    <el-option v-for="(type, index) in actionDropDown" class="select-success" :value="type.code" :label="`${type.description}`" :key="index" />
                                                </el-select>
                                            </div>
                                        </div>

                                        <div class="row mb-5">
                                            <div class="col">
                                                <p class="kyc-value d-flex justify-content-between">
                                                    <span>Action Comment <span class="clr-purple">*</span></span>
                                                    <small>* required</small>
                                                </p>
                                                <el-input
                                                    type="textarea"
                                                    :rows="7"
                                                    placeholder="Please input"
                                                    v-model="manualUpdate.comment">
                                                </el-input>
                                            </div>
                                        </div>

                                        <div class="row mb-1">
                                            <div class="col-6">
                                                <p class="kyc-value pt-3 mb-0">Supporting document (optional)</p>
                                            </div>
                                            <div class="col-6 text-right">
                                                <div class="d-flex justify-content-end align-items-center">
                                                    
                                                    <div v-if="!file" class="file-upload btn btn--browse">
                                                        Browse
                                                        <input @change="getFile" type="file" class="">
                                                    </div>
                                                    <p-button :disabled="sending" v-if="file" round class="btn btn--upload" @click.stop.prevent="doUploadSupportDocument">
                                                        <Loader v-if="sending" class="mr-2 align-middle"></Loader>
                                                        Upload
                                                    </p-button>
                                                    <span v-if="file" class="file-name ml-2">{{ file.name }}</span>
                                                    <span v-if="file" class="ml-2 file-cancel"  @click.stop="file = null">x</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-5">
                                            <div class="col">
                                                <div class="sanc-table-card">
                                                    <regular-table
                                                        striped
                                                        :headings="docTableHeadings"
                                                        :value="docActionTableValue"
                                                        @input="docListenToInput"
                                                        :editAll="editAll"
                                                        :editId="editId"
                                                        :oldestFirst="oldestFirst"
                                                        :productConfig="true"
                                                    >
                                                    </regular-table>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mb-4">
                                            <div class="col text-center">
                                                <p-button round class="btn btn--save btn--shadow mr-3" @click.stop.prevent="doManualUpdate">Save</p-button>
                                                <p-button round class="btn btn--cancel btn--shadow" @click.stop.prevent="closeActionPopup">Cancel</p-button>
                                            </div>
                                        </div>
                                    </div>

                                    <p-button slot="reference" round class="btn btn--close btn--shadow bg-sanction">Action</p-button>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-3" v-if="sancheck && sancheck.watchlistHitResult && sancheck.watchlistHitResult.hitDetails">
            <div class="col-xl-4">
                <div class="kyc-info-box">
                    <div class="row" v-for="(item, k) in sancheck.watchlistHitResult.hitDetails" :key="k" >
                        <div class="col-6"><p class="kyc-label">Name 1 Return: </p></div>
                        <div class="col-6"><p class="kyc-value w-mn pointer color-primary hover" @click.stop="screenDetailsIndx = k">{{ item.name }}</p></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-5" v-if="screenDetails">
            <div class="col">
                <div class="screenDetails p-3">
                    <h5 class="sub-title mt-3 mb-4">Screen Details</h5>
                    <div class="row mb-4">
                        <div class="col">
                            <div class="d-flex"><p class="kyc-label d-inline-block mr-2" style="width: 150px">Name</p><p class="kyc-label d-inline rec-value">{{ screenDetails.name }}</p></div>
                        </div>
                    </div>
                    <div class="row mb-3 py-3" v-for="(item, k) in screenDetails.fields" :key="k" :class="{ 'bg-primary-light': k%2 == 0 }">
                        
                        <div class="col">
                            <div class="">
                                <div class="row">
                                    <div class="col">
                                        <p class="kyc-label">Record {{ k+1 }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="d-flex"><p class="kyc-value d-inline-block mr-2" style="width: 150px">Name</p><p class="kyc-value d-inline rec-value">{{ item.name }}</p></div>
                                        <div class="d-flex"><p class="kyc-value d-inline-block mr-2" style="width: 150px">Source</p><p class="kyc-value d-inline rec-value">{{ item.source }}</p></div>
                                        <div class="d-flex"><p class="kyc-value d-inline-block mr-2" style="width: 150px">Details</p><p class="kyc-value d-inline rec-value">{{ item.value }}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="row mb-3 py-3">
                        <div class="col">
                            <h4 class="text-center">NO DATA PRESENT YET !</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-5">
            <div class="col">
                <div class="sanc-table-card">
                    <regular-table
                        striped
                        :headings="historyTableHeadings"
                        :value="hisActionTableValue"
                        @input="hisListenToInput"
                        :editAll="editAll"
                        :editId="editId"
                        :oldestFirst="oldestFirst"
                        :productConfig="true"
                    >
                    </regular-table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import {
    //   DatePicker,
    //   Option,
    //   Select,
    //   TimeSelect,
    //   Switch,
    Input,
    Card,
    Button,
    Popover
} from "element-ui";
import phoneCodes from '@/utils/phoneCodeList.js';

import PButton from "@/components/UIComponents/Button"
import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable';
import { formatDate } from "../../../../utils/Date";
import { paginateArray, pageCount } from "../../../../utils/pagination";
import PPagination from "../../../UIComponents/Pagination";
import {
    KYC_GET_CHECK_ENQUIRY,
    KYC_RESCREEN_ACTION,
    KYC_GET_SANCTION_CHECK_STATUSES ,
    KYC_GET_SANCTION_CHECK_ACTION_TYPES,
    KYC_MANUAL_UPDATE,
    KYC_UPLOAD_SUPPORT_DOCUMENT,
    KYC_GET_LIST_SUPPORT_DOCUMENTS
} from "@/store/types";

import eyeIcon from '../../../../../public/static/img/dashboard_icons/outline-visibility-24px-1.svg';
import editIcon from '../../../../../public/static/img/dashboard_icons/ic_edit.svg';
import passportImg from '../../../../../public/static/img/faces/passport.jpeg';
import {toBase64} from "../../../../utils/fileToBase64.js";
import Loader from "../../../UIComponents/Loader";

export default {
    name: "KYC-ProductConfig",
    data() {
        return {
            eyeIcon,
            editAll: '',
            oldestFirst: '',
            actionPopup: false,
            screenDetailsIndx: 0,
            sending: false,
            manualUpdate: {
                actionTypeCode: '',
                comment: '',
                operatorName: '',
            },
            docTableHeadings: [
                {label: 'Document Log', name: 'docLog'},
                {label: 'Document Name', name: 'fileName'},
                {label: 'Date', name: 'uploadDate'},
                {label: 'Operator', name: 'operatorName'},
            ],
            historyTableHeadings: [
                {label: 'Case history', name: 'checkActionComment'},
                {label: 'Name', name: 'checkActionName'},
                {label: 'Date', name: 'checkActionCreatedDate'},
                {label: 'Status', name: 'checkStatusName'},
                {label: 'Reason', name: 'checkActionReason'},
                {label: 'Operator', name: 'operatorName'},
            ],
            docActionTableValue: null,
            hisActionTableValue: null,
            editId: '',
            file: '',
        }
    },
    components: {
        [Popover.name]: Popover,
        [Button.name]: Button,
        [Card.name]: Card,
        [Input.name]: Input,
        RegularTable,
        PPagination,
        PButton,
        Loader
    },
    computed: {
        ...mapGetters({
        }),
        appReferenceId() {
            if(this.$route.query) return this.$route.query.appRef || null;
            // return 'KYC190612-NIAI'
        },
        actionDropDown() {
            return this.$store.state.kyc.sanctionCheckActionTypes || []
        },
        listSupportDocuments() {
            return this.$store.state.kyc.listSupportDocuments.supportDocs || []
        },
        cardBtnSancStatus() {
            if(!this.sancheck || !this.sancheck.checkStatusName) return {}
            return {
                'btn--passed': this.sancheck.checkStatusName === 'No Match',
                'btn--failed': this.sancheck.checkStatusName !== 'No Match',
            }
        },
        actionLegend() {
            return this.$store.state.kyc.sanctionCheckActionTypes || []
        },
        legend() {
            return this.$store.state.kyc.sanctionCheckStatuses || []
        },
        sancheck() {
            return this.$store.state.kyc.sanCheckEnquiry || {}
        },
        screenDetails() {
            if(!this.sancheck.watchlistHitResult || !this.sancheck.watchlistHitResult.hitDetails || !this.sancheck.watchlistHitResult.hitDetails.length) return null;
            return this.sancheck.watchlistHitResult.hitDetails.filter((val, indx) => {
                return indx == this.screenDetailsIndx;
            })[0]
        }
    },
    mounted() {
        this.getCheckEnquiry({ appReferenceId: this.appReferenceId })
        this.getSanctionCheckStatuses()
        this.getSancActionTypes()
        if(this.$route.query && this.$route.query.id) this.getListSupportDocs({ id: this.$route.query.id})
    },
    methods: {
        ...mapActions({
            getCheckEnquiry: KYC_GET_CHECK_ENQUIRY,
            rescreenNow: KYC_RESCREEN_ACTION,
            getSanctionCheckStatuses: KYC_GET_SANCTION_CHECK_STATUSES,
            getSancActionTypes: KYC_GET_SANCTION_CHECK_ACTION_TYPES,
            manualUpdateAction: KYC_MANUAL_UPDATE,
            uploadSupportDocument: KYC_UPLOAD_SUPPORT_DOCUMENT,
            getListSupportDocs: KYC_GET_LIST_SUPPORT_DOCUMENTS,
        }),
        async doUploadSupportDocument() {
            const id = this.$route.query.id;
            if(!this.file || !id) return;
            const {size, name, type} = this.file;
            const operatorName = '';
            const mimeType = type;
            try {
                this.sending = true;
                const content = await toBase64(this.file);
                await this.uploadSupportDocument({ content, mimeType, operatorName, id })
                this.file = null;
                this.sending = false;
            } catch(e) {
                this.sending = false;
                console.log(e);
            }
        },
        docListenToInput({ value }) {
            this.docActionTableValue = value;
        },
        hisListenToInput({value}) {
            this.hisActionTableValue = value;
        },
        close() {
            if(this.appReferenceId) this.$router.push({ name: 'KYC Main Page', query: {appRef: this.appReferenceId }})
        },
        doManualUpdate() {
            if(!this.manualUpdate.actionTypeCode || !this.manualUpdate.comment || !this.$route.query || !this.$route.query.id) return ;
            this.manualUpdateAction({ ...this.manualUpdate, id: this.$route.query.id });
            this.closeActionPopup()
        },
        closeActionPopup() {
            this.actionPopup = false;
            this.manualUpdate.comment = '';
            this.manualUpdate.actionTypeCode = '';
            this.manualUpdate.operatorName = '';
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        getFile(event) {
            console.log(event.target.files);
            this.file = event.target.files[0];
        }
        
    },
    watch: {
      sancheck: function(v) {
          if(!v || !v.checkHistories) return;
          this.hisActionTableValue = JSON.parse(JSON.stringify(v.checkHistories));

          this.hisActionTableValue.forEach(item => {
            if(item.checkActionCreatedDate) item.checkActionCreatedDate = formatDate(item.checkActionCreatedDate, true)
        });
      },
      listSupportDocuments: function(v) {
          if(!v || !v.length) return;
          this.docActionTableValue = JSON.parse(JSON.stringify(v));

          this.docActionTableValue.forEach(item => {
            item.uploadDate = formatDate(item.uploadDate, true)
            item.docLog = 'Support Doc'

        });
      }
    },
    filters: {
        dateFormat(d) {
            if(!d) return '';
            return formatDate(d, true)
        }
    }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
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
    @media (min-width: 1400px) {
        max-width: 250px;
    }
}
.file-cancel {
    background: grey;
    border-radius: 50% 50%;
    width: 20px;
    height: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    font-weight: 700;
}
.particular {
    &__label {
        min-width: 150px;
        font-weight: 600;
    }
    &__value {
        max-width: 200px;
        min-width: 150px;
        @media (min-width: 1500px) {
            max-width: 250px;
            min-width: 200px;
        }
    }
}
.kyc-label {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    margin-bottom: 8px;
    &--no-w {
        min-width: 0;
    }
    &--big {
        font-size: 18px;
    }
}
.kyc-value {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    margin-bottom: 8px;
}

.w-mn {
    min-width: 250px;
}

table.helper-table {
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

.sanc-table-card {
    border-radius: 6px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.clr-purple {
    color: #7039DA;
}

.bg-primary-light {
    background-color: #F4FDF9;
}

.screenDetails {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    max-height: 500px;
    overflow: auto;
    border-radius: 7px;

 
    &::-webkit-scrollbar {
      width: 18px;
      border: 5px solid white;
    }

    &::-webkit-scrollbar-thumb {
      background-color: white;
      background-clip: padding-box;
      border: 5px solid #292929;
    }

    &::-webkit-scrollbar-track {
      background-color: #292929;
    }
    /* Buttons */
    &::-webkit-scrollbar-button:single-button {
      background-color: white;
      display: block;
      border-style: solid;
      height: 0px;
      width: 0px;
    }
    /* Left */
    &::-webkit-scrollbar-button:horizontal:decrement::before
    {
      content: " ";
      border-width: 7px 14px 7px 0;
      border-color: transparent white transparent transparent;
    }

    /* Right */
    &::-webkit-scrollbar-button:horizontal:increment::before
    {
      border-width: 7px 0 7px 14px;
      border-color: transparent transparent transparent white;
    }

}

.btn {
    text-transform: none;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;

    &--shadow {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }

    &--save {
        background-color: #2ED684;
        min-width: 150px;
    }
    &--cancel {
        min-width: 150px;
    }

    &--browse {
        min-width: 140px;
        padding: 8px 22px;
        font-size: 11px;
    }

    &--upload {
        min-width: 140px;
        padding: 8px 22px;
        font-size: 11px;
        background-color: #7039DA;
    }

    &--view {
        min-width: 150px;
        padding: 8px 22px;
        font-size: 11px;
    }

    &--ac-close {
        background-color: #2ED684;
        min-width: 150px;
    }

    &--ac-cancel {
        background-color: #292929;
        min-width: 150px;
    }

    &--issue {
        background-color: #2ED684;
        min-width: 355px;
    }

    &--issuing-only {
        background-color: #FF6A6A;
        min-width: 200px;
    }

    &--close {
        background-color: #292929;
        min-width: 198px;
    }
    &--status {
        color: #292929;
        min-width: 200px;
        &:hover {
            color: #292929;
        }
    }
    &--not-recieved {
        background-color: rgba(#FF6A6A, 0.25);
        &:hover {
            background-color: rgba(#FF6A6A, 0.15) !important;
        }
    }
    &--passed {
        background-color: rgba(#2ED684, 0.25);

        &:hover {
            background-color: rgba(#2ED684, 0.15) !important;
        }
    }
    &--failed {
        background-color: rgba(#FF6A6A, 0.7);

        &:hover {
            background-color: rgba(#FF6A6A, 0.5) !important;
        }
    }
}

.kyc {
    &__section {
        &__header {
            font-family: 'Poppins', sans-serif;
            font-size: 28px;
            font-weight: bold;
            line-height: 38px;
            color: #292929;
        }
        &__buttons {
            width: 100%;
            max-width: calc(50% + 387px);
        }
    }
}

.kyc-action {
    &__url {
        color: #7039DA;
    }
}


.sub-title {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
}

.kyc-info-box {
    max-width: 500px;
    &--large {
        max-width: 766px;
    }
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: #292929;
}

.hover {
    transition: all .2s ease;
    &:hover {
        opacity: .7;
    }
}

.color-primary {
    color: #2ED684;
}

.align-center {
    display: flex;
    align-items: center;
}

.pointer {
    cursor: pointer;
}

.rec-value {
    width: calc(100% - 250px);
}

.bg-sanction {
    background-color: #7039DA;
}



</style>

<style lang="scss">
.actionPopover {
    

    @media (min-width: 992px) {
        left: 280px !important;
    }

    @media (min-width: 1400px) {
        width: 1000px !important;
    }
}
</style>
