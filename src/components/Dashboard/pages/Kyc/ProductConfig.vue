<template>
<div>

    <div class="container-fluid mb-5">
        <div class="row">
            <div class="col-xl-8">
                <div class="kyc__section kyc__section__buttons d-flex justify-content-between align-items-center flex-wrap">
                    <h3 class="kyc__section__header mb-0 mb-xl-0 mr-4">Product Config</h3>
                    <!-- <p-button class="btn btn--issue mr-5" type="success">Issuing</p-button>
                        <p-button round class="btn btn--close btn--shadow mr-4">Close and Return</p-button> -->
                    <div class="my-3 d-flex justify-content-between kyc-top-buttons">
                        <p-button class="btn btn--issue mr-5" type="success">Issuing</p-button>
                        <p-button round class="btn btn--close btn--shadow mr-1">Close and Return</p-button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-4 mb-5">
                <h3 class="kyc__section__header">{{ $t('kyc.applicationInfo.title') }}</h3>
                <div class="kyc-info-box">
                    <div class="row" v-for="(application, index) in applicationInfo" :key="index">
                        <div class="col-6"><p class="kyc-label">{{ application.label }}</p></div>
                        <div class="col-6">
                            <p class="kyc-value d-inline-block pr-2">{{ application.value }}</p>
                            <el-popover v-if="application.label === 'Status'" placement="bottom right" width="490" class="status-helper" trigger="hover">
                                <h5 class="sub-title">Account Legend</h5>
                                <table class="helper-table">
                                    <tbody>
                                        <tr v-for="(statusType, index) in applicationStatuses" :key="index">
                                            <td>{{ statusType.statusName }}</td>
                                            <td>{{ statusType.description }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <img slot="reference" :src="eyeIcon" />
                            </el-popover>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 mb-5">
                <div class="car mt-xl-5 pt-xl-2" style="">
                    <regular-table class="kyc-t-card" striped responsive condensed :headings="ApplicationInfoTableHeadings" :value="ApplicationInfoTableValues" :productConfig="true" />
                </div>
            </div>

            <div class="col-xl-4 mb-5">
                <h3 class="kyc__section__header">Program Info</h3>
                <div class="kyc-info-box">
                    <div class="row" v-for="(item, k) in programInfo" :key="k">
                        <div class="col-6"><p class="kyc-label">{{ item.name }}</p></div>
                        <div class="col-6"><p class="kyc-value">{{ item.value }}</p></div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <div class="communication-wrapper mt-4">
        <div class="container-fluid pt-3">
            <div class="row">
                <div class="col-xl-8 mb-5">
                    <div class="kyc__section">
                        <h3 class="kyc__section__header mb-2">Communication Channel</h3>
                        <div class="kyc__section__body kyc-info-box--large">
                            <div class="row mb-2 pt-3">
                                <div class="col-6"><p class="kyc-label">E-mail</p></div>
                                <div class="col-6">
                                    <div class="">
                                        <fg-input v-if="editEmail" v-model="communicationEmail" class="p-0 mr-2"></fg-input>
                                        <span v-else-if="getterClientInfo && getterClientInfo.contactInfo" class="color-primary mr-2" >{{ getterClientInfo.contactInfo.email }}</span>
                                        <img v-if="!editEmail" :src="editIcon" width="20" @click="editEmail = !editEmail" />
                                        <p-button v-if="editEmail" class="btn btn--view mb-4 mr-2" round @click.stop="goUpdateContact">Update Contact</p-button>
                                        <p-button v-if="editEmail" class="btn btn--view mb-4" round @click.stop="cancelEmail">Cancel</p-button>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6"><p class="kyc-label pt-2">Mobile Phone Number</p></div>
                                <div class="col-6">
                                    <el-select size="small" :disabled="!editMobile" class="mobile-phone-select mr-3 mb-3" placeholder="Selected A Country Code" v-model="selectedPhoneCode">
                                        <el-option v-for="(phoneCode, index) in phoneCodeList" class="select-success" :value="phoneCode.dial_code" :label="`${phoneCode.name}(${phoneCode.dial_code})`" :key="index" />
                                    </el-select>
                                    <fg-input v-if="editMobile" v-model="phoneNumber" class="p-0 my-2"></fg-input>
                                    <span v-else-if="getterClientInfo && getterClientInfo.contactInfo">{{ getterClientInfo.contactInfo.mobile }}</span>
                                    <img v-if="!editMobile" :src="editIcon" width="20" class="ml-3" @click="editMobile = !editMobile" />
                                    <p-button v-if="editMobile" class="btn btn--view mb-4 mr-2" round @click.stop="goUpdateContact">Update Contact</p-button>
                                    <p-button v-if="editMobile" class="btn btn--view mb-4" round @click.stop="cancelMobile">Cancel</p-button>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-6"><p class="kyc-label pt-2">Resend Application SMS</p></div>
                                <div class="col-6"><p-button class="btn btn--view btn--shadow m-0" round @click.stop="resendSms">send</p-button></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 mb-xl-0 mb-5">
                    <div class="kyc__section">
                        <h3 class="kyc__section__header mb-2">Application Options</h3>
                        <div class="">
                            <div class="row mb-2">
                                <div class="col align-center">
                                    <p-button round class="btn btn--close btn--shadow">Close and Return</p-button>
                                    <p class="mb-0 ml-4">Return to previous menu</p>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col align-center">
                                    <el-popover v-model="showTerminatePopover" placement="left" width="490" class="status-helper"  trigger="click">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col"><h5 class="sub-title text-center mt-4 mb-4">Terminate Application Confirmation</h5></div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <el-input
                                                        type="textarea"
                                                        :rows="4"
                                                        placeholder="Please tell us the reason"
                                                        v-model="terminateBody.reason">
                                                    </el-input>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col text-center mt-3 mb-4">
                                                    <p-button round class="btn btn--ac-close mx-2" @click.stop.prevent="closeAC">Close A/C</p-button>
                                                    <p-button round class="btn btn--ac-cancel mx-2" @click="showTerminatePopover = false">Cancel</p-button>
                                                </div>
                                            </div>
                                        </div>
                                        <p-button slot="reference" round class="btn btn--close" >Terminate Application</p-button>
                                    </el-popover>
                                    <p class="mb-0 ml-4">Permanently close the application</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col pt-5">
                    <h5 class="sub-title mb-3">Preliminary Client Information</h5>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <h5 class="sub-title mb-2 pt-1">ID Verification</h5>
                </div>
            </div>

            <div class="row">
                <div class="col-4 mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="kyc-label mb-0">Status</p>
                        <p-button class="btn btn--status" :class="cardBtnFrontStatus" v-if="getterClientInfo && getterClientInfo.idCheckInfo">{{ getterClientInfo.idCheckInfo.checkStatusName }}</p-button>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-xl-4 mb-xl-0 mb-4">
                    <div class="client-info">
                        <p class=" kyc-label">Front</p>
                        <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                            <el-popover v-if="gettersCheckDocs.ID_FRONT" placement="right" width="550" class="image-zoom" trigger="hover">
                                <img class="w-100" :src="`data:${gettersCheckDocs.ID_FRONT.mimeType};base64, ${gettersCheckDocs.ID_FRONT.content}`">
                                <img class="client-info__card__img" slot="reference" v-if="gettersCheckDocs.ID_FRONT" :src="`data:${gettersCheckDocs.ID_FRONT.mimeType};base64, ${gettersCheckDocs.ID_FRONT.content}`">
                            </el-popover>
                            <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                <p>No document received</p>
                            </div>
                        </el-card>
                    </div>
                </div>
                <div class="col-xl-4 mb-xl-0 mb-4">
                    <div class="client-info">
                        <div class="text-right">
                            <!-- <p-button class="btn btn--status" :class="cardBtnReverseStatus">{{ idVerification.reverse }}</p-button> -->
                        </div>
                        <p class=" kyc-label">Reverse</p>
                        <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                            <el-popover v-if="gettersCheckDocs.ID_BACK" placement="right" width="550" class="image-zoom" trigger="hover">
                                <img class="w-100" :src="`data:${gettersCheckDocs.ID_BACK.mimeType};base64, ${gettersCheckDocs.ID_BACK.content}`">
                                <img class="client-info__card__img" slot="reference" v-if="gettersCheckDocs.ID_BACK" :src="`data:${gettersCheckDocs.ID_BACK.mimeType};base64, ${gettersCheckDocs.ID_BACK.content}`">
                            </el-popover>
                            <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                <p>No document received</p>
                            </div>
                        </el-card>
                    </div>
                </div>
                <div class="col-xl-4 mb-xl-0 mb-4">
                    <div class="client-info">
                        <div class="text-right">
                        </div>
                        <p class="kyc-label">Selfie</p>
                        <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                            <el-popover v-if="gettersCheckDocs.SELFIE" placement="right" width="550" class="image-zoom" trigger="hover">
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

            <div class="row mb-5">
                <div class="col-md-8 kyc-action">
                    <p class="kyc-label d-inline">KYC URL:</p>
                    
                    <span class="kyc-action__url">www.URL.com</span>
                    <div class="kyc_url_action">
                        <p-button round type="primary" class="mr-2 btn btn--view">View</p-button>
                        <p-button round class="btn btn--view">Action</p-button>
                    </div>
                </div>
                <div class="col-md-4">
                    <p class="mb-1 mt-2">
                        Match Score
                        <span class="font-weight-bold" v-if="getterClientInfo && getterClientInfo.idCheckInfo">{{ getterClientInfo.idCheckInfo.faceMatchScore }}</span>
                    </p>
                </div>
            </div>

            <div class="row mb-3 pt-3">
                <div class="col-xl-8 mb-5">
                    <h5 class="sub-title mb-3">POA Verification</h5>
                    <div class="row">
                        <div class="col-xl-6 mb-xl-0 mb-5">
                            <div class="client-info">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <p class="kyc-label kyc-label--no-w mb-0">Status</p>
                                    <p-button class="btn btn--status m-0" :class="cardPoaCheckStatus" v-if="getterClientInfo && getterClientInfo.poaCheckInfo">{{ getterClientInfo.poaCheckInfo.checkStatusName }}</p-button>
                                </div>
                                <p class="mb-3 kyc-label kyc-label--no-w" v-if="getterPoaImg">{{ getterPoaImg.docType }}</p>
                                <el-card class="client-info__card" :body-style="{ padding: '0px' }">
                                    <el-popover v-if="getterPoaImg" placement="right" width="550" class="image-zoom" trigger="hover">
                                        <img class="w-100" :src="`data:${getterPoaImg.mimeType};base64, ${getterPoaImg.content}`">
                                        <img class="client-info__card__img" slot="reference" v-if="getterPoaImg" :src="`data:${getterPoaImg.mimeType};base64, ${getterPoaImg.content}`">
                                    </el-popover>
                                    <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
                                        <p>No document received</p>
                                    </div>
                                </el-card>
                            </div>
                        </div>

                        <div class="col-xl-6 mb-xl-0 mb-5">
                            <div class="kyc-info-box">
                                <p class="mb-2 kyc-label">POA Match</p>
                                <p class="mb-4 kyc-label">POA Supplied Details</p>
                                <el-row class="">
                                    <el-col :sm="10"><p class="kyc-label">Address Line 1</p></el-col>
                                    <el-col :sm="14"><p class="kyc-value">{{ poaSuppliedDetails.address1 }}</p></el-col>
                                </el-row>
                                <el-row class="">
                                    <el-col :sm="10"><p class="kyc-label">Address Line 2</p></el-col>
                                    <el-col :sm="14"><p class="kyc-value">{{ poaSuppliedDetails.address2 }}</p></el-col>
                                </el-row>
                                <el-row class="">
                                    <el-col :sm="10"><p class="kyc-label">Address Line 3</p></el-col>
                                    <el-col :sm="14"><p class="kyc-value">{{ poaSuppliedDetails.address3 }}</p></el-col>
                                </el-row>
                                <el-row class="">
                                    <el-col :sm="10"><p class="kyc-label">City / Town</p></el-col>
                                    <el-col :sm="14"><p class="kyc-value">{{ poaSuppliedDetails.city }}</p></el-col>
                                </el-row>
                                <el-row class="">
                                    <el-col :sm="10"><p class="kyc-label">Post Code</p></el-col>
                                    <el-col :sm="14"><p class="kyc-value">{{ poaSuppliedDetails.postCode }}</p></el-col>
                                </el-row>
                                <el-row class="">
                                    <el-col :sm="10"><p class="kyc-label">Region</p></el-col>
                                    <el-col :sm="14"><p class="kyc-value">{{ poaSuppliedDetails.countyOrState }}</p></el-col>
                                </el-row>
                                <el-row class="">
                                    <el-col :sm="10"><p class="kyc-label">Country</p></el-col>
                                    <el-col :sm="14"><p class="kyc-value">{{ poaSuppliedDetails.countryCode }}</p></el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 mb-5">
                    <h5 class="sub-title mb-3">PEP / Sactions Check</h5>
                    <div class="w-100 d-flex justify-content-between align-items-center">
                        <p class="mb-0 kyc-label kyc-label--no-w">Status</p>
                        <p-button class="btn btn--status btn--passed m-0" v-if="getterClientInfo && getterClientInfo.sanctionCheckInfo">{{ getterClientInfo.sanctionCheckInfo.checkStatusName }}</p-button>
                    </div>
                    <el-row>
                        <el-col :sm="24" class="kyc-action">
                            <p class="mb-3 mt-2 kyc-label kyc-label--no-w">Rescreen date &nbsp;&nbsp;&nbsp;
                                <span class="" v-if="getterClientInfo && getterClientInfo.sanctionCheckInfo">{{ getterClientInfo.sanctionCheckInfo.latestResubmittedDate }}</span>
                            </p>
                            <div class="kyc_url_action">
                                <p-button round type="primary" class="btn btn--view mr-2">View</p-button>
                                <p-button round class="btn btn--view">Action</p-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid mt-5">
        <div class="kyc__section">
            <h3 class="kyc__section__header">Particulars</h3>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-4 mb-5">
                <div class="kyc-info-box particulars">
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Title</p></div>
                        <div class="col-6"><p class="kyc-value">Mr</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">First Name</p></div>
                        <div class="col-6"><p class="kyc-value">Erik</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Second Name</p></div>
                        <div class="col-6"><p class="kyc-value">Sven</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Last Name</p></div>
                        <div class="col-6"><p class="kyc-value">Hakans</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Maiden Name</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Gender</p></div>
                        <div class="col-6"><p class="kyc-value">M</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">YYYY-MM-DD</p></div>
                        <div class="col-6"><p class="kyc-value">1980-01-31</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Email</p></div>
                        <div class="col-6"><p class="kyc-value"><span class="color-primary">abc@e-mail.com</span></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Mobile</p></div>
                        <div class="col-6"><p class="kyc-value">+493242345</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Home</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Work</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 mb-5">
                <div class="kyc-info-box particulars">
                    <div class="row">
                        <div class="col"><p class="kyc-label font-weight-bold mb-4">Address</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Address Line 1</p></div>
                        <div class="col-6"><p class="kyc-value">Wilhelm-Epstein Strasse 14</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Address Line 2</p></div>
                        <div class="col-6"><p class="kyc-value">Erik</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Address Line 3</p></div>
                        <div class="col-6"><p class="kyc-value">Sven</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">City / Town</p></div>
                        <div class="col-6"><p class="kyc-value">Frankfurt</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Post Code</p></div>
                        <div class="col-6"><p class="kyc-value">60431</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Region</p></div>
                        <div class="col-6"><p class="kyc-value">Frankfurt</p></div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <el-select size="small" class=" mr-3 particulars-input" placeholder="Selected A Country" v-model="countryAddr">
                                <el-option v-for="(cntry, index) in countryList" class="select-success" :value="cntry.country_name" :label="`${cntry.country_name}`" :key="index" />
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 mb-5">
                <div class="kyc-info-box particulars">
                    <div class="row">
                        <div class="col"><p class="kyc-label font-weight-bold mb-4">Override Address</p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Address Line 1</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Address Line 2</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Address Line 3</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">City / Town</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Post Code</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col-6"><p class="kyc-label">Region</p></div>
                        <div class="col-6"><p class="kyc-value"></p></div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <el-select size="small" class=" mr-3 particulars-input" placeholder="Selected A Country" v-model="countryAddr">
                                <el-option v-for="(cntry, index) in countryList" class="select-success" :value="cntry.country_name" :label="`${cntry.country_name}`" :key="index" />
                            </el-select>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    <div class="container-fluid">
        <el-row class="mt-5">
            <el-col :sm="24">
                <div class="d-flex align-items-center">
                    <h5 class="sub-title mb-0">Card Information</h5>
                    <p-button class="ml-5 btn btn--issuing-only">Issuing Only</p-button>
                </div>
            </el-col>
        </el-row>

        <el-row class="mt-3">
            <el-col :sm="4">
                <p class="mb-2 kyc-label">Matrx PID</p>
                <span>001</span>
            </el-col>
            <el-col :sm="4">
                <p class="mb-2 kyc-label">PID Description</p>
                <span>Royal Mail</span>
            </el-col>
            <el-col :sm="4">
                <p class="mb-2 kyc-label">Fourth Line</p>
                <span>Bundesbank</span>
            </el-col>
        </el-row>
        

        <div class="mt-5">
            <h5 class="sub-title pointer d-inline pl-0 mb-0" @click.stop="toggleCollapsible">Account Log <span class="lbl-toggle" ref="collapsibleIcon"></span> </h5>
            <div class="collapsible-content" ref="collapsible">
                <el-card class="box-card">
                    <regular-table
                        striped
                        :headings="tableHeadings"
                        :value="applicationData"
                        @input="listenToInput"
                        :editAll="editAll"
                        :editId="editId"
                        :uneditableFields="uneditableFields"
                        :oldestFirst="oldestFirst"
                        :productConfig="true"
                    >
                    </regular-table>
                    <!-- <div class="table-pagination">
                        <p-pagination
                        :page-count="pageCount"
                        v-model="currentPage"
                        @input="handleInput"
                        :perPage="perPage"
                        ></p-pagination>
                    </div> -->
                </el-card>
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
import countryList from '@/utils/countryList.js';

import PButton from "@/components/UIComponents/Button"
import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable';
import { formatDate } from "../../../../utils/Date";
import { paginateArray, pageCount } from "../../../../utils/pagination";
import PPagination from "../../../UIComponents/Pagination";
import {
    // GETTER_All_CLIENTS_LIST,
    // GETTER_All_CLIENTS,
    // GETTER_CLIENT_TYPES,
    // GETTER_CLIENT_TYPES_LIST,
    GETTER_APPLICATION_STATUS_LIST,
    GETTER_APPLICATION_STATUS,
    KYC_GET_ACCOUNT_LOG,
    GETTER_APPLICATIONS,
    GETTER_APPLICATION_LIST,
    GETTER_ACCOUNT_LOG,
    KYC_TERMINATE_APPLICATION,
    KYC_GET_CLIENT,
    GETTER_CLIENT_INFO,
    KYC_DOWNLOAD_CHECK_DOC,
    GETTER_CHECK_DOCS,
    KYC_DOWNLOAD_POA_IMAGE,
    GETTER_POA_IMG,
    RESEND_SMS,
    KYC_UPDATE_CONTACT,
} from "@/store/types";
import eyeIcon from '../../../../../public/static/img/dashboard_icons/outline-visibility-24px-1.svg';
import editIcon from '../../../../../public/static/img/dashboard_icons/ic_edit.svg';
import passportImg from '../../../../../public/static/img/faces/passport.jpeg';

export default {
    name: "KYC-ProductConfig",
    data() {
        return {
            showTerminatePopover: false,
            eyeIcon,
            editIcon,
            passportImg,
            editEmail: false,
            editMobile: false,
            show: false,
            communicationEmail: '',
            phoneNumber: '',
            selectedPhoneCode: '+49',
            returnPageName: 'KYC Search',
            
            ApplicationInfoTableHeadings: [{
                    name: 'productMatrix',
                    label: 'Product Matrix'
                },
                {
                    name: 'required',
                    label: 'Required'
                }
            ],
            tableHeadings: [
                {label: 'Event Type', name: 'eventType'},
                {label: 'Date', name: 'eventDate'},
                {label: 'Document Name', name: 'documentRemark'},
                {label: 'A/C Status', name: 'applicationStatus'},
                {label: 'Reason', name: 'reason'},
                {label: 'Operator', name: 'operatorName'},
            ],
            editAll: false,
            editId: '',
            allClients: [],
            uneditableFields: [],
            appRef: '',
            totalPages: 0,
            perPage: 20,
            currentPage:1,
            pageCount: 0,
            toDate: '',
            fromDate: '',
            clientName: 'ALL',
            selectedClientType: 'ALL',
            resellerCode: 'ALL',
            oldestFirst: true,
            applicationData: null,
            terminateBody: {
                reason: '',
                status: 'APPLICATION_CLOSE'
            },
            programInfo: [
                {
                    name: 'Issuer inst Code',
                    value: 'FRICK'
                },
                {
                    name: 'PM inst Code',
                    value: 'CEEVO'
                },
                {
                    name: 'PO inst Code',
                    value: 'BITST'
                },
                {
                    name: 'Reseller Code',
                    value: 'SDFDS'
                },
                {
                    name: 'Card Program Code',
                    value: 'Black'
                },
                {
                    name: 'Default Free Profile',
                    value: 'EUR'
                },
                {
                    name: 'Free Profile',
                    value: '1'
                },
                {
                    name: 'KYC Level',
                    value: 'FDD'
                },
            ],
            countryOverrideAddr: 'Germany',
            countryAddr: 'Germany',
        };
    },
    components: {
        [Popover.name]: Popover,
        [Button.name]: Button,
        [Card.name]: Card,
        [Input.name]: Input,
        RegularTable,
        PPagination,
        PButton
    },
    computed: {
        ...mapGetters({
            getterApplications: GETTER_APPLICATIONS,
            getterAccountLog: GETTER_ACCOUNT_LOG,
            getterClientInfo: GETTER_CLIENT_INFO,
            gettersCheckDocs: GETTER_CHECK_DOCS,
            getterPoaImg: GETTER_POA_IMG,
        }),
        appReferenceId() {
            if(this.$route.query) return this.$route.query.appRef; 
        },
        applicationInfo() {
            var obj = [{
                    label: this.$t('kyc.applicationInfo.table.applicationRef'),
                    value: ''
                },
                {
                    label: this.$t('kyc.applicationInfo.table.clientRef'),
                    value: ''
                },
                {
                    label: this.$t('kyc.applicationInfo.table.status'),
                    value: ''
                },
                {
                    label: this.$t('kyc.applicationInfo.table.verificationAttempts'),
                    value: ''
                },
                {
                    label: this.$t('kyc.applicationInfo.table.dateReceived'),
                    value: ''
                },
                {
                    label: this.$t('kyc.applicationInfo.table.appSmSSent'),
                    value: ''
                },
                {
                    label: this.$t('kyc.applicationInfo.table.smsCount'),
                    value: ''
                }
            ]
            if(!this.getterClientInfo) return obj;
            obj[0].value = this.getterClientInfo.appReferenceId
            obj[1].value = this.getterClientInfo.clientAppRef
            obj[2].value = this.getterClientInfo.applicationStatus
            obj[3].value = this.getterClientInfo.verifyAttempts
            obj[4].value = formatDate(this.getterClientInfo.lastSmsSentDate, true)
            obj[5].value = formatDate(this.getterClientInfo.appReceivedDate, true)
            obj[6].value = this.getterClientInfo.smsCount
            return obj;
        },
        ApplicationInfoTableValues() {
            var mtx = [{
                    productMatrix: 'ID',
                    required: ''
                },
                {
                    productMatrix: 'Selfie',
                    required: ''
                },
                {
                    productMatrix: 'POA',
                    required: ''
                },
                {
                    productMatrix: 'Sactions/PEP',
                    required: ''
                }
            ]
            if(!this.getterClientInfo || !this.getterClientInfo.productMatrixInfo) return mtx;
            mtx[0].required = this.getterClientInfo.productMatrixInfo.idCheckRequired ? 'Yes' : 'No'
            mtx[1].required = this.getterClientInfo.productMatrixInfo.frmRequired ? 'Yes' : 'No'
            mtx[2].required = this.getterClientInfo.productMatrixInfo.poaCheckRequired ? 'Yes' : 'No'
            mtx[3].required = this.getterClientInfo.productMatrixInfo.sanctionCheckRequired ? 'Yes' : 'No'
            return mtx; 
        },
        poaSuppliedDetails() {
            if(!this.getterClientInfo || !this.getterClientInfo.poaCheckInfo || !this.getterClientInfo.poaCheckInfo.submittedAddress) return {}
            return this.getterClientInfo.poaCheckInfo.submittedAddress;
        },
        accountLogInfo() {
            return this.getterAccountLog ? this.getterAccountLog.eventInfos : null;
        },
        applicationStatuses() {
            return (this.$store.state.kyc.applicationStatuses || [])
                .reduce((acc, i) => [...acc, i], []);
        },
        phoneCodeList() {
            return phoneCodes;
        },
        countryList() {
            return countryList;
        },
        idBodyStyleID() {
            return {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                backgroundSize: 'cover',
                backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmuKUR9ghX6ofMzZLbJkE3qEjzw2gcCzaJqM_3tkX3x7gVHvQG)'
            };
        },
        cardBtnFrontStatus() {
            if(!this.getterClientInfo || !this.getterClientInfo.idCheckInfo) return {}
            return {
                'btn--passed': this.getterClientInfo.idCheckInfo.checkStatusName === 'Passed',
                'btn--not-recieved': this.getterClientInfo.idCheckInfo.checkStatusName === 'Not Received',
                'btn--failed': this.getterClientInfo.idCheckInfo.checkStatusName === 'Failed',
            }
        },
        cardPoaCheckStatus() {
            if(!this.getterClientInfo || !this.getterClientInfo.poaCheckInfo) return {}
            return {
                'btn--passed': this.getterClientInfo.poaCheckInfo.checkStatusName === 'Approved',
                'btn--not-recieved': this.getterClientInfo.poaCheckInfo.checkStatusName === 'Not Received',
                'btn--failed': this.getterClientInfo.poaCheckInfo.checkStatusName === 'Failed',
            }
        },
    },
    mounted() {
        this.getApplicationStatus();
        this.getAccountLog({ appReferenceId: this.appReferenceId, pageNum: this.isPagination ? this.currentPage - 1 : 0, pageSize: this.perPage})
        this.getClient({ appReferenceId: this.appReferenceId })
    },
    methods: {
        ...mapActions({
            getApplicationStatus: GETTER_APPLICATION_STATUS_LIST,
            getAccountLog: KYC_GET_ACCOUNT_LOG,
            getApplicationAction: GETTER_APPLICATION_LIST,
            terminateApplication: KYC_TERMINATE_APPLICATION,
            getClient: KYC_GET_CLIENT,
            downloadCheckDoc: KYC_DOWNLOAD_CHECK_DOC,
            downloadPoaImage: KYC_DOWNLOAD_POA_IMAGE,
            kycResendSms: RESEND_SMS,
            updateContact: KYC_UPDATE_CONTACT,
        }),
        cancelEmail() {
            this.editEmail = false;
            this.communicationEmail = this.getterClientInfo && this.getterClientInfo.contactInfo ? this.getterClientInfo.contactInfo.email : '';
        },
        cancelMobile() {
            this.editMobile = false;
            this.phoneNumber = this.getterClientInfo && this.getterClientInfo.contactInfo ? this.getterClientInfo.contactInfo.mobile : '';
        },
        goUpdateContact() {
            if(!this.phoneNumber || !this.communicationEmail) return;
            this.updateContact({ appReferenceId: this.appReferenceId, email: this.communicationEmail, mobile: this.phoneNumber })
            this.editEmail = false;
            this.editMobile = false;
        },
        resendSms() {
            this.kycResendSms({ appReferenceId: this.appReferenceId});
        },
        listenToInput({ value }) {
            this.applicationData = value;
        },
        handleInput(ev) {
            this.currentPage = ev;
            this.isPagination = true;
            this.loadAccountLog();
        },
        closeAC() {
            if(!this.terminateBody.reason) return;
            const obj = {
                appReferenceId: this.appReferenceId,
                reason: this.terminateBody.reason,
                status: this.terminateBody.status,
            }
            this.terminateApplication(obj);
            this.showTerminatePopover = false;
        },
        toggleCollapsible() {
            var el = this.$refs.collapsible;
            var icon = this.$refs.collapsibleIcon;
            
            if (el.style.maxHeight){
                el.style.maxHeight = null;
            } else {
                el.style.maxHeight = el.scrollHeight + "px";
            }
            icon.classList.toggle('lbl-toggle--active');
        }
    },
    watch: {
      getterAccountLog (value) {
        const temp = value.eventInfos;
        this.applicationData = JSON.parse(JSON.stringify(temp));

        this.applicationData.forEach(item => {
            item.required = '';
            if(item.eventDate) item.eventDate = formatDate(item.eventDate, true)
        });

        this.pageCount = value.pageMeta.totalPages;
        this.perPage = value.pageMeta.perPage;

        this.pagedData = this.applicationData;
      },
      getterClientInfo (value) {
          if(!value) return;
          //check for existance of checkId & idCheckDocs
          if(value.idCheckInfo && value.idCheckInfo.checkId && value.idCheckInfo.idCheckDocs && value.idCheckInfo.idCheckDocs.length) {
                var checkId = value.idCheckInfo.checkId;
                value.idCheckInfo.idCheckDocs.forEach(item => {
                    if(item.docType == 'ID_FRONT' || item.docType == 'ID_BACK' || item.docType == 'SELFIE') {
                        this.downloadCheckDoc({ checkId, id: item.id })
                    }
                })
          }
          

          //check for existance of checkId & poaCheckDoc
          if(value.poaCheckInfo && value.poaCheckInfo.checkId && value.poaCheckInfo.poaCheckDoc && value.poaCheckInfo.poaCheckDoc.id) {
                var checkId = value.poaCheckInfo.checkId;
                var id = value.poaCheckInfo.poaCheckDoc.id;
                this.downloadPoaImage({ checkId, id })
          }
          

          //set mobile number and email
          if(value.contactInfo) {
              this.phoneNumber = value.contactInfo.mobile
              this.communicationEmail = value.contactInfo.email
          }

      },
    },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
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
.image-zoom {
    padding: 0;
}
.btn {
    text-transform: none;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;

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



.color-primary {
    color: #2ED684;
}

.align-center {
    display: flex;
    align-items: center;
}

.lbl-toggle {
    display: inline-block;

    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid currentColor;

    vertical-align: middle;
    margin-left: 15px;
    transform: translateY(-2px);

    transition: transform .2s ease-out;

    &--active {
        transform: rotate(90deg) translateX(-3px);
    }
}

.pointer {
    cursor: pointer;
}

.collapsible-content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s ease-out;
    margin-top: 22px;
}
</style>

<style lang="scss">
.particulars input, .mobile-phone-select input {
    border-radius: 5px !important;
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
// for styling account log table
.collapsible-content .cell {
    text-align: left;
    padding: 3px 7px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
}
.collapsible-content .ceevo__heading-label {
    justify-content: start;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;
}
</style>
