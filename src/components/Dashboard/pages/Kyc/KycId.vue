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
                        <div class="col-6"><p class="kyc-value">{{ idCheck.appReferenceId }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Client Ref</p></div>
                        <div class="col-6"><p class="kyc-value">{{ idCheck.clientReference }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Status</p></div>
                        <div class="col-6"><p class="kyc-value">{{ idCheck.applicationStatus }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">ID Documentation</p></div>
                        <div class="col-6"><p class="kyc-value">{{ idCheck.checkStatusDesc }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Status</p></div>
                        <div class="col-6">
                            <p class="kyc-value d-inline-block mr-2">{{ idCheck.checkStatusName }}</p>
                            <el-popover v-if="idCheck.checkStatusName"  placement="bottom right" width="690" class="status-helper" trigger="hover">
                                <h5 class="sub-title">Status Legend</h5>
                                <table class="helper-table">
                                    <tbody>
                                        <tr v-for="(statusType, index) in statusLegend" :key="index">
                                            <td><p class="kyc-label">{{ statusType.name }}</p></td>
                                            <td><p class="kyc-value">{{ statusType.code }} {{ statusType.description }}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <img slot="reference" :src="eyeIcon" />
                            </el-popover>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="kyc-info-box">
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Verification attempts</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ idCheck.verifyAttempts }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Date Received</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ idCheck.appReceivedDate | dateFormat }}</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">App SMS Sent</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ idCheck.lastSmsSentDate | dateFormat }}</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="communication-wrapper mt-4">
        <div class="container-fluid pt-3">

            <div class="row">
                <div class="col-xl-8">
                    <div class="row">
                        <div class="col">
                            <h5 class="kyc__section__header mb-2 pt-1">ID Verification</h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-6 mb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="kyc-label mb-0 mr-5">Status</p>
                                <p class="m-0 mr-4" :class="cardBtnFrontStatus" v-if="idCheck && idCheck.checkStatusName">{{ idCheck.checkStatusName }}</p>
                                
                            </div>
                        </div>
                        <div class="col-xl-6 mb-3">
                            <kyc-id-action v-if="$route.name == 'KYC Id Action'"
                                :id="id"
                                :getListSupportDocs="getListSupportDocs" 
                                :listSupportDocuments="listSupportDocuments"
                                :actionLegend="idCheckActionTypes" 
                                :manualUpdateAction="idManualUpdate" 
                                :uploadSupportDocument="uploadIdSupportDocument"></kyc-id-action>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-xl-6 mb-xl-0 mb-4">
                            <div class="client-info">
                                <p class=" kyc-label">Front</p>
                                <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                                    <el-popover v-if="gettersCheckDocs && gettersCheckDocs.ID_FRONT" placement="right" width="550" class="image-zoom" trigger="hover">
                                        <img class="w-100" :src="`data:${gettersCheckDocs.ID_FRONT.mimeType};base64, ${gettersCheckDocs.ID_FRONT.content}`">
                                        <img class="client-info__card__img" slot="reference" v-if="gettersCheckDocs.ID_FRONT" :src="`data:${gettersCheckDocs.ID_FRONT.mimeType};base64, ${gettersCheckDocs.ID_FRONT.content}`">
                                    </el-popover>
                                    <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                        <p>No document received</p>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                        <div class="col-xl-6 mb-xl-0 mb-4">
                            <div class="client-info">
                                <p class=" kyc-label">Reverse</p>
                                <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                                    <el-popover v-if="gettersCheckDocs && gettersCheckDocs.ID_BACK" placement="right" width="550" class="image-zoom" trigger="hover">
                                        <img class="w-100" :src="`data:${gettersCheckDocs.ID_BACK.mimeType};base64, ${gettersCheckDocs.ID_BACK.content}`">
                                        <img class="client-info__card__img" slot="reference" v-if="gettersCheckDocs.ID_BACK" :src="`data:${gettersCheckDocs.ID_BACK.mimeType};base64, ${gettersCheckDocs.ID_BACK.content}`">
                                    </el-popover>
                                    <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                        <p>No document received</p>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="row">
                        <div class="col">
                            <h5 class="kyc__section__header mb-2 pt-1">Selfie</h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-6 mb-3">
                            <div class="">
                                <p class="kyc-label mr-2 d-inline-block">Match Score</p>
                                <p class="kyc-value d-inline-block">{{ idCheck.faceMatchScore }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3" :class="{ 'mt-37': gettersCheckDocs && gettersCheckDocs.ID_BACK || ($route.query.action && id)}">
                        <div class="col mb-xl-0 mb-4">
                            <div class="client-info">
                                <p class="mb-0 kyc-label invisible d-none d-xl-block">.</p>
                                <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                                    <el-popover v-if="gettersCheckDocs && gettersCheckDocs.SELFIE" placement="right" width="550" class="image-zoom" trigger="hover">
                                        <img class="w-100" :src="`data:${gettersCheckDocs.SELFIE.mimeType};base64, ${gettersCheckDocs.SELFIE.content}`">
                                        <img class="client-info__card__img" slot="reference" v-if="gettersCheckDocs.SELFIE" :src="`data:${gettersCheckDocs.SELFIE.mimeType};base64, ${gettersCheckDocs.SELFIE.content}`">
                                    </el-popover>
                                    <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                        <p>No document received</p>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col-md-8 kyc-action">
                    <p class="kyc-label d-inline">KYC URL:</p>
                    <span class="kyc-action__url"> www.URL.com</span>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-4">
                    <div class="row">
                        <div class="col">
                            <h5 class="kyc__section__header mb-2 pt-1">Signature</h5>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col mb-xl-0 mb-4">
                            <div class="client-info">
                                <p class=" kyc-label invisible d-none d-xl-block">.</p>
                                <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                                    <el-popover v-if="gettersCheckDocs.SIGNATURE" placement="right" width="550" class="image-zoom" trigger="hover">
                                        <img class="w-100" :src="`data:${gettersCheckDocs.SIGNATURE.mimeType};base64, ${gettersCheckDocs.SIGNATURE.content}`">
                                        <img class="client-info__card__img" slot="reference" v-if="gettersCheckDocs.SIGNATURE" :src="`data:${gettersCheckDocs.SIGNATURE.mimeType};base64, ${gettersCheckDocs.SIGNATURE.content}`">
                                    </el-popover>
                                    <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                        <p>No document received</p>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="row">
                        <div class="col">
                            <h5 class="kyc__section__header mb-2 pt-1">Photo</h5>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col mb-xl-0 mb-4">
                            <div class="client-info">
                                <p class=" kyc-label invisible d-none d-xl-block">.</p>
                                <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                                    <el-popover v-if="gettersCheckDocs.PROFILE" placement="right" width="550" class="image-zoom" trigger="hover">
                                        <img class="w-100" :src="`data:${gettersCheckDocs.PROFILE.mimeType};base64, ${gettersCheckDocs.PROFILE.content}`">
                                        <img class="client-info__card__img" slot="reference" v-if="gettersCheckDocs.PROFILE" :src="`data:${gettersCheckDocs.PROFILE.mimeType};base64, ${gettersCheckDocs.PROFILE.content}`">
                                    </el-popover>
                                    <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                        <p>No document received</p>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col">
                <h3 class="kyc__section__header">ID Data Return Fields
                    <el-popover v-if="validationData"  placement="bottom right" width="100%" class="status-helper" trigger="hover">
                        <h5 class="sub-title">Status Legend</h5>
                        <table class="helper-table">
                            <tbody>
                                <tr v-for="(item, i) in validationData.halfLength" :key="i">
                                    <td v-if="validationData.leftSide[i]"><div class="kyc-label">{{ validationData.leftSide[i].name }}</div></td>
                                    <td v-if="validationData.leftSide[i]"><div class="kyc-value">{{ validationData.leftSide[i].remark }}</div></td>

                                    <td v-if="validationData.rightSide[i]"><div class="kyc-label">{{ validationData.rightSide[i].name }}</div></td>
                                    <td v-if="validationData.rightSide[i]"><div class="kyc-value">{{ validationData.rightSide[i].remark }}</div></td>
                                </tr>
                            </tbody>
                        </table>
                        <img class="ml-2" slot="reference" :src="eyeIcon" />
                    </el-popover>
                </h3>
            </div>
        </div>
        <div class="row d-none d-xl-block">
            <div class="col" v-if="dataReturnArrays">
                <div class="row" v-for="(item, k) in dataReturnArrays.point" :key="k" :class="{ 'bg-grey': k % 2, 'bg-white': !(k % 2) }">
                    <div class="col-xl-4">
                        <div class="kyc-info-box">
                            <div class="row">
                                <div class="col-6 kyc-label mb-0" v-if="dataReturnArrays.column1[k]">{{ dataReturnArrays.column1[k].name }}</div>
                                <div class="col-6 kyc-value mb-0" v-if="dataReturnArrays.column1[k]">{{ dataReturnArrays.column1[k].value }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                         <div class="kyc-info-box">
                            <div class="row">
                                <div class="col-6 kyc-label mb-0" v-if="dataReturnArrays.column2[k]">{{ dataReturnArrays.column2[k].name }}</div>
                                <div class="col-6 kyc-value mb-0" v-if="dataReturnArrays.column2[k]">{{ dataReturnArrays.column2[k].value }}</div>
                            </div>
                         </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="kyc-info-box">
                            <div class="row">
                                <div class="col-6 kyc-label mb-0" v-if="dataReturnArrays.column3[k]">{{ dataReturnArrays.column3[k].name }}</div>
                                <div class="col-6 kyc-value mb-0" v-if="dataReturnArrays.column3[k]">{{ dataReturnArrays.column3[k].value }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row d-block d-xl-none">
            <div class="col">
                <div class="kyc-info-box" v-if="idCheck && idCheck.idDataReturnFields">
                    <div class="row" v-for="(item, k) in idCheck.idDataReturnFields" :key="k">
                        <div class="col-6"><p class="kyc-label">{{ item.name }}</p></div>
                        <div class="col-6"><p class="kyc-value w-mn">{{ item.value }}</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col">
                <h3 class="sub-title">ID Document History</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="check-id-table-card">
                    <regular-table
                        striped
                        :headings="docHistoryHeading"
                        :value="docHistoryValue"
                        @input="docHistoryInput"
                        :productConfig="true"
                    >
                    </regular-table>
                </div>
            </div>
        </div>
    </div>

    <el-dialog
        title="Download"
        :visible.sync="dialogVisible"
        width="800px">
        

            <div class="container-fluid" v-if="docSupportListFromHistoryTable && docSupportListFromHistoryTable.supportDocs">
                <div class="row mb-2">
                    <div class="col-3"><p class="kyc-label">File name</p></div>
                    <div class="col-3"><p class="kyc-label">Upload Date</p></div>
                    <div class="col-3"><p class="kyc-label">Operator Name</p></div>
                    <div class="col-3"></div>
                </div>
                <div class="row" v-for="(item, k) in docSupportListFromHistoryTable.supportDocs" :key="k" :class="{ 'bg-grey': !(k % 2), 'bg-white': k % 2 }">
                    <div class="col-3">{{item.fileName}}</div>
                    <div class="col-3">{{item.uploadDate | dateFormat}}</div>
                    <div class="col-3">{{item.operatorName}}</div>
                    <div class="col-3">
                        <button class="action-button" type="button"  @click.stop.prevent="doDownloadSupportDoc(item)" :disabled="downloading">Download</button>
                        <!-- <p-button :disabled="downloading" round class="btn btn--file-download btn--shadow" @click.stop.prevent="doDownloadSupportDoc(item)">Download</p-button> -->
                    </div>
                </div>
            </div>
    </el-dialog>

</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations,
} from 'vuex';
import {
    Input,
    Card,
    Button,
    Popover,
    Dialog,
} from "element-ui";

import PButton from "@/components/UIComponents/Button"
import KycIdAction from "@/components/Dashboard/pages/Kyc/KycIdAction"
import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable';
import { formatDate } from "../../../../utils/Date";
import { paginateArray, pageCount } from "../../../../utils/pagination";
import PPagination from "../../../UIComponents/Pagination";
import {
    KYC_GET_ID_CHECK_ENQUIRY,
    KYC_DOWNLOAD_CHECK_DOC,
    GETTER_CHECK_DOCS,
    KYC_GET_ID_CHECK_STATUSES,
    KYC_GET_ID_VALIDATION_DATAS,
    GETTER_VALIDATION_DATAS,
    KYC_GET_ID_CHECK_ACTION_TYPES,
    KYC_ID_MANUAL_UPDATE,
    KYC_UPLOAD_ID_SUPPORT_DOCUMENT,
    KYC_GET_LIST_SUPPORT_DOCUMENTS_ID,
    CLEAR_CHECK_DOCS,
    KYC_DOWNLOAD_SUPPORT_DOC,
} from "@/store/types";

import eyeIcon from '../../../../../public/static/img/dashboard_icons/outline-visibility-24px-1.svg';
import editIcon from '../../../../../public/static/img/dashboard_icons/ic_edit.svg';
import passportImg from '../../../../../public/static/img/faces/passport.jpeg';

export default {
    name: "KYC-ID",
    data() {
        return {
            docHistoryHeading: [
                {label: 'Case History', name: 'checkActionComment'},
                {label: 'Name', name: 'checkActionName'},
                {label: 'Date', name: 'checkActionCreatedDate'},
                {label: 'Status', name: 'checkStatusName'},
                {label: 'Reason', name: 'checkActionReason'},
                {label: 'Operator', name: 'operatorName'},
                {label: '', name: 'download', button: true},
            ],
            docHistoryValue: null,
            showTerminatePopover: false,
            eyeIcon,
            editIcon,
            dialogVisible: false,
            downloading: false,
            idReturnFields: [
                {
                    name: 'Full Name',
                    value: ''
                },
                {
                    name: 'Given Name',
                    value: ''
                },
                {
                    name: 'Address',
                    value: ''
                },
                {
                    name: 'Address line 1',
                    value: ''
                },
                {
                    name: 'Address line 2',
                    value: ''
                },
                {
                    name: 'Address City',
                    value: ''
                },
                {
                    name: 'Address State',
                    value: ''
                },
                {
                    name: 'Address Postal Code',
                    value: ''
                },
                {
                    name: 'Application Date',
                    value: ''
                },
                {
                    name: 'Application Number',
                    value: ''
                },
                {
                    name: 'Birth Date',
                    value: ''
                },
                {
                    name: 'Birth Place',
                    value: ''
                },
                {
                    name: 'Control Number',
                    value: ''
                },
                {
                    name: 'Country Code',
                    value: ''
                },
                {
                    name: 'Country Name',
                    value: ''
                },
                {
                    name: 'Document Number',
                    value: ''
                },
                {
                    name: 'Expiration Date',
                    value: ''
                },
                {
                    name: 'Hair Colour',
                    value: ''
                },
                {
                    name: 'Height',
                    value: ''
                },
                {
                    name: 'Issue Date',
                    value: ''
                },
                {
                    name: 'Issuing Authority',
                    value: ''
                },
                {
                    name: 'Issuing State Code',
                    value: ''
                },
                {
                    name: 'Issuing State Name',
                    value: ''
                },
                {
                    name: 'MRZ',
                    value: ''
                },
                {
                    name: 'Name Suffix',
                    value: ''
                },
                {
                    name: 'Nationality Code',
                    value: ''
                },
                {
                    name: 'Nationality Name',
                    value: ''
                },
                {
                    name: 'Personal Number',
                    value: ''
                },
                {
                    name: 'Sex',
                    value: ''
                },
                {
                    name: 'Start Date',
                    value: ''
                },
                {
                    name: 'Surname',
                    value: ''
                },
                {
                    name: 'Weight',
                    value: ''
                },
                {
                    name: 'Eye Colour',
                    value: ''
                },
            ]
        };
    },
    components: {
        [Popover.name]: Popover,
        [Button.name]: Button,
        [Card.name]: Card,
        [Input.name]: Input,
        [Dialog.name]: Dialog,
        RegularTable,
        PPagination,
        PButton,
        KycIdAction
    },
    computed: {
        ...mapGetters({
            gettersCheckDocs: GETTER_CHECK_DOCS,
            validationData: GETTER_VALIDATION_DATAS,
        }),
        id() {
            if(this.idCheck) return this.idCheck.checkId;
        },
        appReferenceId() {
            if(this.$route.query) return this.$route.query.appRef
            // return 'KYC190620-OEN7'
        },
        docSupportListFromHistoryTable () {
            return this.$store.state.kyc.listSupportDocumentsHis;
        },
        statusLegend() {
            return this.$store.state.kyc.idCheckStatuses;
        },
        idCheckActionTypes() {
            return this.$store.state.kyc.idCheckActionTypes;
        },
        idCheck() {
            return this.$store.state.kyc.idCheckEnquiry;
        },
        cardBtnFrontStatus() {
            if(!this.idCheck || !this.idCheck.checkStatusName) return {}
            return {
                'status status--passed': this.idCheck.checkStatusName === 'Passed',
                'status status--failed': this.idCheck.checkStatusName !== 'Passed',
            }
        },
        listSupportDocuments() {
            if(!this.$store.state.kyc.listSupportDocumentsId) return []
            return this.$store.state.kyc.listSupportDocumentsId.supportDocs;
        },
        dataReturnArrays() {
            if(this.idCheck && this.idCheck.idDataReturnFields && this.idCheck.idDataReturnFields.length) {
                const d = this.idCheck.idDataReturnFields;
                this.idReturnFields.forEach(item => {
                    let v = d.find(i => i.name == item.name)
                    item.value = v ? v.value : '';
                })

                let point = Math.ceil(this.idReturnFields.length / 3);
                
                let column1 = this.idReturnFields.filter((item, k)=> k <= point);
                let column2 = this.idReturnFields.filter((item, k)=> k > point && k <= (point*2));
                let column3 = this.idReturnFields.filter((item, k)=> k > (point*2) && k <= (point*3));

                return { column1, column2, column3, point}
            }
            return null;
        }
    },
    mounted() {
        this.clearCheckDocs();
        this.getIdCheckEnquiry({ appReferenceId: this.appReferenceId  })
        this.getIdCheckStatuses();
        this.getIdValidationDatas();
        this.getIdCheckActionTypes();
    },
    methods: {
        ...mapActions({
            getIdCheckEnquiry: KYC_GET_ID_CHECK_ENQUIRY,
            downloadImageThumbnail: KYC_DOWNLOAD_CHECK_DOC,
            getIdCheckStatuses :KYC_GET_ID_CHECK_STATUSES,
            getIdValidationDatas :KYC_GET_ID_VALIDATION_DATAS,
            getIdCheckActionTypes: KYC_GET_ID_CHECK_ACTION_TYPES,
            idManualUpdate: KYC_ID_MANUAL_UPDATE,
            uploadIdSupportDocument: KYC_UPLOAD_ID_SUPPORT_DOCUMENT,
            getListSupportDocs: KYC_GET_LIST_SUPPORT_DOCUMENTS_ID,
            downloadSupportDoc: KYC_DOWNLOAD_SUPPORT_DOC,
        }),
        ...mapMutations({
            clearCheckDocs: CLEAR_CHECK_DOCS
        }),
        close() {
            if(this.appReferenceId) this.$router.push({ name: 'KYC Main Page', query: {appRef: this.appReferenceId }})
        },
        docHistoryInput({ value }) {
            this.docHistoryValue = value;
        },
        async doDownloadSupportDoc(item) {
            try {
                this.downloading = true;
                this.downloadSupportDoc({ checkId: this.idCheck.checkId, id: item.id, fileName: item.fileName})
                this.downloading = false;
            } catch(e) {
                this.downloading = false;
                console.log(e);
            }
        }
    },
    watch: {
        docSupportListFromHistoryTable(value) {
            if(!value.supportDocs) return;
            this.dialogVisible = true;
        },
        idCheck (value) {
            if(!value) return;
            if(value.idCheckDocs && value.idCheckDocs.length) {
                var checkId = value.checkId;
                value.idCheckDocs.forEach(item => {
                    if(item.docType == 'ID_FRONT' || item.docType == 'ID_BACK' || item.docType == 'SELFIE' || item.docType == 'PROFILE' || item.docType == 'SIGNATURE') {
                        this.downloadImageThumbnail({ checkId, id: item.id })
                    }
                })
            }
            if(value.checkHistories) {
                this.docHistoryValue = JSON.parse(JSON.stringify(value.checkHistories));
                var self = this;
                this.docHistoryValue.forEach(item => {
                    if(item.checkActionCreatedDate) item.checkActionCreatedDate = formatDate(item.checkActionCreatedDate, true)
                });
            }
            if(value.checkId) {
                this.getListSupportDocs({id: value.checkId});
            }
        },
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
.kyc-label {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    margin-bottom: 8px;
    &--no-w {
        min-width: 0;
    }
}
.kyc-value {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    margin-bottom: 8px;
}
.kyc-info-section {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;

    // @media (max-width: 1400px) {
    //     flex-flow: row wrap;
    // }
}

.status {
    height: 40px;
    text-align: center;
    line-height: 40px;
    padding-left: 35px;
    padding-right: 35px;
    &--passed {
        background-color: rgba(#2ED684, 0.25);

    }
    &--failed {
        background-color: rgba(#FF6A6A, 0.25);
    }
}

.action-button {
    background: none;
    border: 1px solid #7039DA;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    height: 40px;
    width: 100%;
    color: #7039DA;
    font-weight: bold;
    cursor: pointer;
}

.bg-grey {
    background-color: #F8F5FD;
    padding-top: 5px;
    padding-bottom: 5px;
}

.bg-white {
    background-color: #fff;
    padding-top: 5px;
    padding-bottom: 5px;
}

.w-mn {
    min-width: 250px;
}
.image-zoom {
    padding: 0;
}
.btn {
    text-transform: none;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;

    &--file-download {
        min-width: 100px;
        padding: 8px 22px;
        font-size: 11px;
    }

    &--shadow {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
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

.client-info {
    max-width: 480px;
    &__card {
        border-radius: 20px;
        border: 1px solid #707070;
        min-height: 300px;
        display: 'flex';
        align-items: 'center';
        justify-content: 'center';
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

.kyc-top-buttons {
    width: auto;
    @media (max-width: 1760px) {
        width: 100%;
    }
}

.communication-wrapper {
    background-color: rgba(#2ED684, 0.04);
    margin: 30px -30px;
    padding: 30px;
}

.sub-title {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: bold;
    line-height: 20px;
}

.check-id-table-card {
    border-radius: 6px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
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

.min-width-200 {
    min-width: 200px;
}

.mt-37 {
    margin-top: 28px;
    @media (max-width: 1199px) {
        margin-top: 0;
    }
}


.color-primary {
    color: #2ED684;
}

.pointer {
    cursor: pointer;
}

</style>

<style lang="scss">
.check-id-table-card {
    .productConfig {
        max-height: 450px;
    }
}

.kyc-t-card {
    & th {
        &:nth-child(2) {
            width: 150px !important;
        }
    }
    & .productConfig {
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        max-width: 372px;
        margin-bottom: 0 !important;
    }
    & .productConfigYes {
    }
    & .productConfigNo {
    }
    & .cell {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        text-align: left;
        padding-left: 25px;
    }
    & .ceevo__heading-label {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        justify-content: flex-start;
        padding-left: 25px;
    }
}

</style>
