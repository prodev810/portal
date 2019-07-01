<template>
    <el-popover :offset="500" :visible-arrow="false" class="status-helper" placement="left-end" popper-class="actionPopover" trigger="click" v-model="actionPopup" width="700">
        <div class="container-fluid">
            <div class="row mt-3 mb-2">
                <div class="col">
                    <p class="kyc-label kyc-label--big">Action ID
                        <span class="d-inline-block ml-1 mr-3 clr-purple">*
                        </span>
                        <el-popover class="status-helper" placement="right" trigger="hover" width="390">
                            <div class="col">
                                <h5 class="sub-title mt-3">Action ID Overview</h5>
                                <table class="helper-table w-100 mb-3">
                                    <tbody>
                                        <tr :key="index" v-for="(statusType, index) in actionLegend">
                                            <td>{{ statusType.description }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <img :src="eyeIcon" slot="reference"/>
                        </el-popover>
                    </p>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col">
                    <el-select class=" mr-3 particulars-input" placeholder="Action" size="small" v-model="manualUpdate.actionTypeCode">
                        <el-option :key="index" :label="`${type.description}`" :value="type.code" class="select-success" v-for="(type, index) in actionLegend"/>
                    </el-select>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col">
                    <p class="kyc-value d-flex justify-content-between">
                        <span>Action Comment
                            <span class="clr-purple">*</span>
                        </span>
                        <small>* required</small>
                    </p>
                    <el-input :rows="7" placeholder="Please input" type="textarea" v-model="manualUpdate.comment"></el-input>
                </div>
            </div>

            <div class="row mb-1">
                <div class="col-6">
                    <p class="kyc-value pt-3 mb-0">Supporting document (optional)</p>
                </div>
                <div class="col-6 text-right">
                    <div class="d-flex justify-content-end align-items-center">

                        <div class="file-upload btn btn--browse" v-if="!file">
                            Browse
                            <input @change="getFile" class="" type="file">
                        </div>
                        <p-button :disabled="sending" @click.stop.prevent="doUploadSupportDocument" class="btn btn--upload" round v-if="file">
                            <Loader class="mr-2 align-middle" v-if="sending"></Loader>
                            Upload
                        </p-button>
                        <span class="file-name ml-2" v-if="file">{{ file.name }}</span>
                        <span @click.stop="file = null" class="ml-2 file-cancel" v-if="file">x</span>
                    </div>
                </div>
            </div>

            <div class="row mb-5">
                <div class="col">
                    <div class="sanc-table-card kyc-id-check-action-table">
                        <regular-table :productConfig="true"  :headings="docTableHeadings" :value="docActionTableValue" @input="docListenToInput" striped></regular-table>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col text-center">
                    <p-button @click.stop.prevent="doManualUpdate" class="btn btn--save btn--shadow mr-3" round>Save</p-button>
                    <p-button @click.stop.prevent="closeActionPopup" class="btn btn--cancel btn--shadow" round>Cancel</p-button>
                </div>
            </div>
        </div>

        <p-button class="btn mt-0 btn--kyc-id-action btn--shadow bg-purple" round slot="reference">Action</p-button>
    </el-popover>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {Input, Card, Button, Popover} from "element-ui";
    import phoneCodes from '@/utils/phoneCodeList.js';

    import PButton from "@/components/UIComponents/Button";
    import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable';
    import {formatDate} from "../../../../utils/Date";
    import {paginateArray, pageCount} from "../../../../utils/pagination";
    import PPagination from "../../../UIComponents/Pagination";
    import {
        KYC_GET_CHECK_ENQUIRY,
        KYC_RESCREEN_ACTION,
        KYC_GET_SANCTION_CHECK_STATUSES,
        KYC_GET_SANCTION_CHECK_ACTION_TYPES,
        KYC_MANUAL_UPDATE,
        KYC_UPLOAD_SUPPORT_DOCUMENT,
        KYC_GET_LIST_SUPPORT_DOCUMENTS
    } from "@/store/types";

    import eyeIcon from '../../../../../public/static/img/dashboard_icons/outline-visibility-24px-1.svg';
    import passportImg from '../../../../../public/static/img/faces/passport.jpeg';
    import {toBase64} from "../../../../utils/fileToBase64.js";
    import Loader from "../../../UIComponents/Loader";

    export default {
        name: "KYC-Id-Action",
        props: [
            'actionLegend',
            'manualUpdateAction',
            'uploadSupportDocument',
            'getListSupportDocs',
            'listSupportDocuments',
            'id'
        ],
        data() {
            return {
                eyeIcon,
                editAll: '',
                oldestFirst: '',
                actionPopup: false,
                sending: false,
                manualUpdate: {
                    actionTypeCode: '',
                    comment: '',
                    operatorName: ''
                },
                docTableHeadings: [
                    {
                        label: 'Document Log',
                        name: 'docLog'
                    }, {
                        label: 'Document Name',
                        name: 'fileName'
                    }, {
                        label: 'Date',
                        name: 'uploadDate'
                    }, {
                        label: 'Operator',
                        name: 'operatorName'
                    }
                ],
                docActionTableValue: null,
                hisActionTableValue: null,
                editId: '',
                file: ''
            };
        },
        components: {
            [Popover.name]: Popover,
            [Button.name]: Button,
            [Card.name]: Card,
            [Input.name]: Input,
            RegularTable,
            PButton,
            Loader
        },
        computed: {
            ...mapGetters({})
        },
        mounted() {},
        methods: {
            ...mapActions({}),
            async doUploadSupportDocument() {
                const id = this.id;
                if (!this.file || ! id) {
                    return;
                }
                const {size, name, type} = this.file;
                const operatorName = '';
                const mimeType = type;
                try {
                    this.sending = true;
                    const content = await toBase64(this.file);
                    await this.uploadSupportDocument({content, mimeType, operatorName, id});
                    await this.getListSupportDocs({id: this.id});
                    this.file = null;
                    this.sending = false;
                } catch (e) {
                    this.sending = false;
                    console.log(e);
                }
            },
            docListenToInput({value}) {
                this.docActionTableValue = value;
            },
            doManualUpdate() {
                if (typeof(this.manualUpdate.actionTypeCode) !== 'number' || !this.manualUpdate.comment || !this.id) {
                    return;
                }
                this.manualUpdateAction({
                    ...this.manualUpdate,
                    id: this.id
                });
                this.closeActionPopup();
            },
            closeActionPopup() {
                this.actionPopup = false;
                this.manualUpdate.comment = '';
                this.manualUpdate.actionTypeCode = '';
                this.manualUpdate.operatorName = '';
            },
            getFile(event) {
                this.file = event.target.files[0];
            }

        },
        watch: {
            listSupportDocuments: function (v) {
                if (! v || ! v.length) {
                    return;
                }
                this.docActionTableValue = JSON.parse(JSON.stringify(v));

                this.docActionTableValue.forEach(item => {
                    item.uploadDate = formatDate(item.uploadDate, true);
                    item.docLog = 'Support Doc';

                });
            }
        },
        filters: {
            dateFormat(d) {
                if (!d) {
                    return '';
                }
                return formatDate(d, true);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Poppins:400, 500, 600, 700 &display=swap');
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
        color: #fff;
        text-align: center;
        cursor: pointer;
        font-weight: 700;
    }
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

    .bg-purple {
        background-color: #7039DA;
    }
    .sanc-table-card {
        border-radius: 6px;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    }
    .btn {
        text-transform: none;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 600;

        &--kyc-id-action {
            min-width: 198px;
            background-color: #7039DA;
        }

        &--shadow {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
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

    .sub-title {
        font-family: 'Poppins', sans-serif;
        font-size: 18px;
        font-weight: bold;
        line-height: 20px;
    }

    p {
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        color: #292929;
    }

    .color-primary {
        color: #2ED684;
    }

    .pointer {
        cursor: pointer;
    }
</style>

<style lang="scss">
.kyc-id-check-action-table {
    .productConfig {
        max-height: 150px;
    }
}
    .actionPopover {

        @media(min-width: 992px) {
            left: 280px !important;
        }

        @media(min-width: 1400px) {
            width: 1000px !important;
        }
    }
</style>
