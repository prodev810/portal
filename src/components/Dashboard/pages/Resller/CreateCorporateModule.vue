<template>
  <div>
    <div class="card">
      <div class="card-content">
        <el-row class="reseller-form-column">
          <el-col :md="11">

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong>{{$t('reseller.create.table_header.corporate_program')}}</strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                 <strong>{{corporativeProgram | booleanToYesNoFormat}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <strong class="mr-1">No</strong>
                  <label class="switch">
                    <input v-model="corporativeProgram" type="checkbox">
                    <span class="slider round"></span>
                  </label>
                  <strong class="ml-1">Yes</strong>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.card_program_id')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.cpc}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.cpc">
                    <el-option v-for="item in cpcValues"
                               :key="item.value"
                               :label="item.value"
                               :value="item.value">{{item.name}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative  text-uppercase">{{$t('reseller.create.table_header.reseller_code')}}
                  <span v-if="!isView" class="required-field-symbol text-uppercase">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.reseller_code}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.reseller_code"
                            :placeholder="$t('reseller.create.table_header.reseller_code')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.reseller_name')}}
                  <span v-if="!isView" class="required-field-symbol text-uppercase">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.reseller_name}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.reseller_name"
                            :placeholder="$t('reseller.create.table_header.reseller_name')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.unique_float')}}
                  <span v-if="!isView" class="required-field-symbol text-uppercase">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.unique_float}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.unique_float">
                    <el-option v-for="item in uniqueFloatValues"
                               :key="item.value"
                               :label="item.value"
                               :value="item.value">{{item.name}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.alert_contact')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.alert_contact}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.alert_contact"
                            :placeholder="$t('reseller.create.table_header.alert_contact')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.status')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.status}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.status">
                    <el-option v-for="item in statusValues"
                               :key="item.value"
                               :label="item.value"
                               :value="item.value">{{item.name}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

          </el-col>
          <el-col :md="13">

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.load_fee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.load_fee"
                            :placeholder="$t('reseller.create.table_header.load_fee')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee_pct')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.load_fee_pct}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.load_fee_pct"
                            :placeholder="$t('reseller.create.table_header.load_fee_pct')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee_cap')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.load_fee_cap}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.load_fee_cap"
                            :placeholder="$t('reseller.create.table_header.load_fee_cap')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                 <strong>{{reseller.load_fee_bill_method}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.load_fee_bill_method">
                    <el-option v-for="item in chargedToValues"
                               :key="item.name"
                               :label="item.value"
                               :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.app_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.app_fee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.app_fee"
                            :placeholder="$t('reseller.create.table_header.app_fee')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.app_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.app_fee_bill_method}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.app_fee_bill_method">
                    <el-option v-for="item in chargedToValues"
                               :key="item.name"
                               :label="item.value"
                               :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.monthly_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.monthly_fee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.monthly_fee"
                            :placeholder="$t('reseller.create.table_header.monthly_fee')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.monthly_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.monthly_fee_bill_method}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.monthly_fee_bill_method">
                    <el-option v-for="item in chargedToValues"
                               :key="item.name"
                               :label="item.value"
                               :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.api_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.api_fee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.api_fee"
                            :placeholder="$t('reseller.create.table_header.api_fee')"></fg-input>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.api_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.api_fee_bill_method}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.api_fee_bill_method">
                    <el-option v-for="item in chargedToApiValues"
                               :key="item.name"
                               :label="item.value"
                               :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </div>
    </div>

    <div class="card reseller-dynamic-references" :class="{disabled:!corporativeProgram && !isView}">
      <div class="card-content">
        <div class="card-title">
          <strong>Dynamic References</strong>
        </div>

        <el-row>
          <el-col>
            <strong>Customise reference fields</strong>
            <p>Dynamic References are unique to you as a client. The dynamic reference will show up on the PDF that is
              generated for each specific card as well as in the reporting from the activity on the system.</p>
          </el-col>
        </el-row>

        <el-row>

          <el-col :md="10">
            <div class="form-group row">
              <label for="ref1" class="col-md-2 col-form-label"><strong>Ref 1</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref1}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref1" id="ref1"
                        :placeholder="'Ref 1'"></fg-input>
            </div>

            <div class="form-group row">
              <label for="ref2" class="col-md-2 col-form-label"><strong>Ref 2</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref2}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref2" id="ref2"
                        :placeholder="'Ref2'"></fg-input>
            </div>

            <div class="form-group row">
              <label for="ref3" class="col-md-2 col-form-label"><strong>Ref 3</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref3}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref3" id="ref3"
                        :placeholder="'Ref3'"></fg-input>
            </div>

            <div class="form-group row">
              <label for="ref4" class="col-md-2 col-form-label"><strong>Ref 4</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref4}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref4" id="ref4"
                        :placeholder="'Ref4'"></fg-input>
            </div>
          </el-col>

          <el-col :md="12">
            <div class="form-group row">
              <label for="ref5" class="col-md-2 col-form-label"><strong>Ref 5</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref5}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref51" id="ref5"
                        :placeholder="'Ref 5'"></fg-input>
            </div>

            <div class="form-group row">
              <label for="ref6" class="col-md-2 col-form-label"><strong>Ref 6</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref6}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref6" id="ref6"
                        :placeholder="'Ref6'"></fg-input>
            </div>

            <div class="form-group row">
              <label for="ref7" class="col-md-2 col-form-label"><strong>Ref 7</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref7}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref7" id="ref7"
                        :placeholder="'Ref7'"></fg-input>
            </div>

            <div class="form-group row">
              <label for="ref8" class="col-md-2 col-form-label"><strong>Ref 8</strong></label>
              <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref8}}</strong>
              <fg-input v-else
                        v-model="resellerCorporate.dynamicReferences.ref8" id="ref8"
                        :placeholder="'Ref8'"></fg-input>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>

    <div class="card reseller-account-funding" :class="{disabled:!corporativeProgram && !isView}">
      <div class="card-content">
        <div class="card-title">
          <strong>2 step validation - Account funding</strong>
        </div>

        <el-row>
          <el-col>
            <p>When allocating money to a specific account, you can choose between 1 or 2 step load approval process. If
              you want to have a 2 step process approval over a certain break amount, please specify the amount in the
              “Break Value” field.</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col :md="24" class="mb-4">
            <label class="row-label"><strong>2 step validation</strong></label>
            <strong v-if="isView">{{resellerCorporate.two_step_validation | booleanToYesNoFormat}}</strong>

            <div v-else
                 class="d-inline-flex">
              <strong class="mr-1">No</strong>
              <label class="switch">
                <input v-model="resellerCorporate.two_step_validation" type="checkbox">
                <span class="slider round"></span>
              </label>
              <strong class="ml-1">Yes</strong>
            </div>
          </el-col>

          <el-col :md="24">
            <label for="break-value" class="row-label"><strong>Break value 1</strong></label>
            <strong v-if="isView">{{resellerCorporate.break_value}}</strong>
            <fg-input v-else
                      v-model="resellerCorporate.break_value"
                      :placeholder="'Break value 1'"
                      id="break-value"></fg-input>
          </el-col>
        </el-row>

      </div>
    </div>

    <div class="card reseller-pdf-dynamic" :class="{disabled:!corporativeProgram && !isView}">
      <div class="card-content">
        <div class="card-title">
          <strong>PDF Dynamic Text</strong>
        </div>

        <el-row>
          <el-col>
            <p>At the bottom of the Virtual Card PDF, you can create a pre-set instruction depending on your
              requirements. You can setup multiple pre-sets if you need to customise depending on recipient.</p>
          </el-col>
        </el-row>

        <el-row v-for="(preset, index) in dynamicPdf" :key="index">
          <el-col :md="24" class="mb-4">
            <div class="form-group">
              <el-col :md="4">
                <label class="mb-2" for="preset1">
                  <strong class="preset-title">Preset {{index + 1}}</strong>
                </label>
                <p v-if="isView">
                  <span class="mr-2">Preset Name</span>
                  {{resellerCorporate.dynamic_pdf[index].name}}
                </p>
                <fg-input v-else
                          v-model="resellerCorporate.dynamic_pdf[index].name"
                          id="preset1"
                          placeholder="Preset name"></fg-input>
              </el-col>
              <el-col :md="24">
                <el-input type="textarea" :disabled="isView"
                          :rows="6" placeholder="Please input"
                          v-model="resellerCorporate.dynamic_pdf[index].preset">
                </el-input>
              </el-col>
            </div>
          </el-col>
        </el-row>

        <!-- <el-row>
           <el-col :md="24" class="mb-4">
             <div class="form-group">
               <el-col :md="4">
                 <label class="mb-2" for="preset2">
                   <strong>Preset 2</strong>
                 </label>
                 <fg-input v-model="resellerCorporate.dynamic_pdf.preset2.name"
                           id="preset2"
                           :placeholder="'Preset name'"></fg-input>
               </el-col>
               <el-col :md="24">
                 <el-input type="textarea"
                           :rows="6" placeholder="Preset name"
                           v-model="resellerCorporate.dynamic_pdf.preset2.preset">
                 </el-input>
               </el-col>
             </div>
           </el-col>
         </el-row>-->

        <el-row>
          <el-col>
            <p-button v-if="!isView" round @click="handleAddPreset">
              <img :src="addIcon" alt="icon">
              Add another preset
            </p-button>
          </el-col>
        </el-row>

      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="reseller-footer d-flex justify-content-center">
          <p-button round type="primary" class="mr-3"
                    @click="$router.push(editRoute)"
                    v-if="isView && hasPermission(permission.RESELLER_SUBSCRIPTION_EDIT)">
            {{ $t(context === 'view' ? 'reseller.create.button.edit' : 'reseller.create.button.save') }}
          </p-button>
          <p-button v-else
                    round type="primary" class="mr-3"
                    @click.native="handleResellerAction()">
            {{ $t(context === 'view' ? 'reseller.create.button.edit' : 'reseller.create.button.save') }}
          </p-button>
          <p-button round @click="handleCancelAction()">{{ $t('reseller.create.button.cancel') }}</p-button>
        </div>
      </div>
    </div>

    <modal :show.sync="modals.visible"
           footer-classes="justify-content-center"
           type="notice">
      <h5 slot="header" class="modal-title">{{handleModalTitle}}</h5>
      <template>
        <strong v-if="actionBtn === 'save'">Are you sure you want to save Reseller Corporate Program</strong>
      </template>
      <div slot="footer" class="w-50 d-flex justify-content-between">
        <p-button round type="success"
                  @click.native="handleClientAction">Yes
        </p-button>
        <p-button round type="default"
                  @click.native="modals.visible = false">Cancel
        </p-button>
      </div>
    </modal>

    <Spinner v-if="loadingState === 'getting'"></Spinner>
  </div>
</template>
<script>
  import {permissionMixin} from '@/mixins/permission'
  import SlideYDownTransition from "vue2-transitions/src/Slide/SlideYDownTransition";
  import {mapActions, mapGetters} from "vuex";
  import {AbaModalEvents} from "../../../../main";
  import {
    ADD_RESELLER_SUBSCRIPTION,
    EDIT_RESELLER_SUBSCRTION_BY_ID,
    GET_ALL_CARD_PROGRAM, GET_RESELLER_SUBSCRTION_BY_ID,
    GETTER_ALL_CARDS,
    GETTER_LOADINGSTATE_RESELLER, GETTER_RESELLER_SUBSCRIPTION, SET_MODAL_TYPE, SHOW_TOAST_MESSAGE
  } from "../../../../store/types";
  import swal from 'sweetalert2'

  import createNewRowFromHeadings from "../../../../utils/createNewRowFromHeadings";
  import {
    breakInput,
    exactNumber,
    limitedCharNumber,
    mustBeAnEmail,
    shouldBeNumber,
    verifySpecialCharacter
  } from "../../../../utils/formValidations";
  import {decimals} from "../../../../utils/inputMasks";
  import Button from "../../../UIComponents/Button";
  import PButton from "../../../UIComponents/Button";
  import RegularTable from "../../../UIComponents/CeevoTables/RegularTable/RegularTable";
  import Loader from "../../../UIComponents/Loader";
  import Spinner from "../../../UIComponents/Spinner";
  import PRadio from "../../../UIComponents/Inputs/Radio";
  import {Modal} from 'src/components/UIComponents'
  import addIcon from '../../../../../public/static/img/dashboard_icons/ic_add.svg'

  export default {
    name: "CreateCorparateModule",
    props:['context'],
    mixins: [permissionMixin],
    components: {
      SlideYDownTransition,
      Spinner,
      Loader,
      PButton, RegularTable,
      [Button.name]: Button,
      PRadio,
      Modal,
    },
    data() {
      return {
        addIcon,
        editRoute: '',
        corporativeProgram: 0,
        reseller: {
          cpc: null,
          status: null,
          reseller_code: null,
          reseller_name: null,
          unique_float: null,
          alert_contact: null,
          load_fee: null,
          load_fee_pct: null,
          load_fee_cap: null,
          load_fee_bill_method: null,
          app_fee: null,
          app_fee_bill_method: null,
          monthly_fee: null,
          monthly_fee_bill_method: null,
          api_fee: null,
          api_fee_bill_method: null
        },
        resellerCorporate: {
          dynamicReferences: {
            ref1: '',
            ref2: '',
            ref3: '',
            ref4: '',
            ref5: '',
            ref6: '',
            ref7: '',
            ref8: '',
          },
          break_value: '',
          two_step_validation: 0,
          dynamic_pdf: [
            {name: 'test 1', preset: ' name 1'},
            {name: '', preset: ''},
          ],
        },
        modals: {
          visible: false,
        },
        secondLine: ['loadFee', 'loadFeePct', 'loadFeeCap', 'appFee'],
        thirdLine: ['monthlyFee', 'apiFee'],
        edit: false,
        dirty: false,
        tableHeadingsPack: {
          main: [
            {
              label: 'CPC',
              name: 'cardProgramID',
              i18n: 'reseller.create.table_header.card_program_id',
              input: 'select',
              mapViewData: 'cardProgCode',
              required: true,
              selectKeys: [
                {name: '', value: null}
              ],
            },
            {
              label: 'RC',
              name: 'resellerCode',
              i18n: 'reseller.create.table_header.reseller_code',
              required: true,
              validator: [
                verifySpecialCharacter,
                exactNumber(5)
              ],
              brakeAt: breakInput(5)
            },
            {
              label: 'Reseller Name',
              name: 'resellerName',
              i18n: 'reseller.create.table_header.reseller_name',
              required: true,
              validator: [
                verifySpecialCharacter,
                limitedCharNumber(0, 20)
              ],
              brakeAt: breakInput(20)
            },
            {
              label: 'Unique Float',
              name: 'uniqueFloat',
              i18n: 'reseller.create.table_header.unique_float',
              required: true,
              input: 'select',
              selectKeys: [{name: 'yes', value: true}]
            },
            {
              label: 'alert Contact',
              name: 'alertContact',
              i18n: 'reseller.create.table_header.alert_contact',
              required: true,
              validator: [mustBeAnEmail],
              brakeAt: breakInput(64)
            },

            {
              label: 'Status',
              name: 'status',
              i18n: 'reseller.create.table_header.status',
              required: true,
              input: 'select',
              selectKeys: [
                //  {name: '', value: null},
                {name: 'Active', value: 'ACTIVE'},
                {name: 'Closed', value: 'CLOSED'},
                {name: 'Pending Approval', value: 'PENDING'}
              ]
            },
          ],
          secondary: [
            {
              label: 'load Fee',
              name: 'loadFee',
              i18n: 'reseller.create.table_header.load_fee',
              mask: decimals(2),
              validator: [shouldBeNumber],
              $domAttri: {step: '0.01', type: 'number'},
              brakeAt: breakInput(8)
            },
            {
              label: 'load fee percentage',
              name: 'loadFeePct',
              i18n: 'reseller.create.table_header.load_fee_pct',
              mask: decimals(2), validator: [shouldBeNumber],
              $domAttri: {step: '0.01', type: 'number'},
              brakeAt: breakInput(8),
              required: false,
            },
            {
              label: 'load fee roof',
              name: 'loadFeeCap',
              i18n: 'reseller.create.table_header.load_fee_cap',
              mask: decimals(2), validator: [shouldBeNumber],
              $domAttri: {step: '0.01', type: 'number'},
              brakeAt: breakInput(8)
            },
            {
              label: 'Charged To',
              name: 'loadFeebillMethod',
              i18n: 'reseller.create.table_header.load_fee_bill_method',
              input: 'select',
              selectKeys: [
                {name: '', value: null},
                {name: 'ACCOUNT', value: 'ACCOUNT'},
                {name: 'FLOAT', value: 'FLOAT'},
                {name: 'INVOICE', value: 'INVOICE'}]
            },
            /*application*/
            {
              label: 'application fee',
              name: 'appFee',
              i18n: 'reseller.create.table_header.app_fee',
              mask: decimals(2),
              validator: [shouldBeNumber],
              $domAttri: {step: '0.01', type: 'number'},
              brakeAt: breakInput(8)

            },
            //application fee bill method
            {
              label: 'Charged To',
              name: 'appFeeBillMethod',
              i18n: 'reseller.create.table_header.app_fee_bill_method',
              input: 'select',
              selectKeys: [
                {name: '', value: null},
                {name: 'FLOAT', value: 'FLOAT'},
                {name: 'ACCOUNT', value: 'ACCOUNT'},
                {name: 'INVOICE', value: 'INVOICE'}]
            },
            /*monthly fees*/
          ],
          third: [
            {
              label: 'monthly fee',
              name: 'monthlyFee',
              i18n: 'reseller.create.table_header.monthly_fee',
              mask: decimals(2),
              validator: [shouldBeNumber],
              $domAttri: {step: '0.01', type: 'number'},
              brakeAt: breakInput(8)

            },
            //monthly fee bill method
            {
              label: 'Charged To',
              name: 'monthlyFeeBillMethod',
              i18n: 'reseller.create.table_header.monthly_fee_bill_method',
              input: 'select',
              selectKeys: [
                {name: '', value: null},
                {name: 'ACCOUNT', value: 'ACCOUNT'},
                {name: 'FLOAT', value: 'FLOAT'},
                {name: 'INVOICE', value: 'INVOICE'}]
            },
            /*api fees*/
            {
              label: 'api fee',
              name: 'apiFee',
              i18n: 'reseller.create.table_header.api_fee',
              mask: decimals(2),
              validator: [shouldBeNumber],
              $domAttri: {step: '0.01', type: 'number'},
              brakeAt: breakInput(8)
            },

            {
              label: 'Charged To',
              name: 'apiFeeBillMethod',
              i18n: 'reseller.create.table_header.api_fee_bill_method',
              input: 'select',
              selectKeys: [
                {name: '', value: null},
                {name: 'FLOAT', value: 'FLOAT'},
                {name: 'INVOICE', value: 'INVOICE'}
              ]
            },
          ]
        },
        editAll: false,
        editId: '',
        cardReseller: [],
        resellerId: '',
        //context: 'edit',
        valid: {
          main: false,
          secondary: false,
          third: false,
        },
        cpcValues: [
          {name: '', value: 1}
        ],
        statusValues: [
          {name: 'Active', value: 'ACTIVE'},
          {name: 'Closed', value: 'CLOSED'},
          {name: 'Pending Approval', value: 'PENDING'}
        ],
        chargedToValues: [
          {name: 'ACCOUNT', value: 'ACCOUNT'},
          {name: 'FLOAT', value: 'FLOAT'},
          {name: 'INVOICE', value: 'INVOICE'}
        ],
        chargedToApiValues: [
          {name: 'FLOAT', value: 'FLOAT'},
          {name: 'INVOICE', value: 'INVOICE'}
        ],
        uniqueFloatValues: [
          {name: 'yes', value: 1},
        ],
        dynamicRef1: [
          {name: 'Ref 1', model: 'ref1'},
          {name: 'Ref 2', model: 're2'},
          {name: 'Ref 3', model: 're3'},
          {name: 'Ref 4', model: 'ref4'},
        ],
        actionBtn: 'save',
      };
    },
    computed: {
      ...mapGetters({
        cardData: GETTER_ALL_CARDS,
        loadingState: GETTER_LOADINGSTATE_RESELLER,
      }),
      resellerData() {
        const resellerSub = this.$store.state.reseller.resellerSubscription;
        if (!resellerSub) return void 0;
        return !this.$route.params.id ? resellerSub : {
          ...resellerSub,
          ['cardProgCode']: (this.$store.state.cardProgram.allCardPrograms.find(cardProgram => cardProgram.id === resellerSub.cardProgramID) ||
            {cardProgCode: null}).cardProgCode
        }
      },
      creationResponseState() {
        return this.$store.state.UiModule.responseState[ADD_RESELLER_SUBSCRIPTION]
      },
      editionResponseState() {
        return this.$store.state.UiModule.responseState[EDIT_RESELLER_SUBSCRTION_BY_ID]
      },
      isValid() {
        return Object.keys(this.valid).reduce((acc, i) => acc && this.valid[i], true)
      },
      dynamicPdf(){
        return this.resellerCorporate.dynamic_pdf
      },
      isView(){
        return this.context === 'view'
      },
      handleModalTitle(){
        if(this.actionBtn === 'save'){
          return 'Save Reseller Corporate Program'
        }
        return 'Discard changes?'
      },
    },
    watch: {
      cardData(newVal) {
        this.chagneCardProgramOptions(newVal);
      },
      creationResponseState(newVal, oldVal) {
        if (!oldVal) return this.sweetAlertHandler(newVal)
        if (newVal.timeStamp === oldVal.timeStamp) return;
        this.sweetAlertHandler(newVal)
      },
      editionResponseState(newVal, oldVal) {
        if (newVal.timeStamp === oldVal.timeStamp) return;
        this.sweetAlertHandler(newVal)
      },
      resellerData(newVal) {
        if (!newVal) return;
        this.cardReseller = [newVal]
      },
      editId(newVal, oldVal) {
        if (this.context === 'view' && newVal) {
          //this.context = 'edit'
        }
      },
      $route(newVal, oldVal) {
        const {id} = newVal.params;
        if (!id) {
          //this.context = 'create'
          this.cardReseller = [createNewRowFromHeadings([
              ...this.tableHeadingsPack.main,
              ...this.tableHeadingsPack.secondary, ...this.tableHeadingsPack.third],
            'Reseller_new_row')];
          this.editId = 'Reseller_new_row';

        }
      }
    },
    methods: {
      ...mapActions({
        addReseller: ADD_RESELLER_SUBSCRIPTION,
        getAllCardPrograms: GET_ALL_CARD_PROGRAM,
        editReseller: EDIT_RESELLER_SUBSCRTION_BY_ID,
        getResellerSubscripiton: GET_RESELLER_SUBSCRTION_BY_ID,
        showModal: SET_MODAL_TYPE
      }),
      chagneCardProgramOptions(cardPrograms = []) {
        this.tableHeadingsPack.main = this.tableHeadingsPack.main.map(i => {
          if (i.name === 'cardProgramID') {
            return {
              ...i,
              selectKeys: cardPrograms.map(cardProgram => ({name: cardProgram.cardProgCode, value: cardProgram.id}))
            }
          } else {
            return i;
          }
        })
      },
      sweetAlertHandler(newVal) {
        if (newVal.state === true) {
          const key = this.context + 'handleSecondaryAction' + 'reseller';

          this.showModal({
            type: 'normal',
            message: this.context === 'create' ? this.$t('reseller.create.result_modal.message.create') : this.$t('reseller.create.result_modal.message.edit'),
            copy: this.$t('reseller.create.result_modal.copy'),
            mainButton: this.$t('reseller.create.result_modal.main_button'),
            key
          })

          AbaModalEvents.$on(key, response => {
            if (response.ok) {
              this.$router.push('/reseller/view')
            } else {
              this.dirty = false;

            }
            AbaModalEvents.$off(key)
          })
        }
      },
      listenToInput({value, valid, dirty}, table) {
        this.cardReseller = value;
        console.log('value', value);
        this.dirty = this.dirty || !!dirty;
        this.valid = {
          ...this.valid,
          [table]: valid
        };
      },
      secondaryAction() {
        console.log('secondary');
        if (this.context === 'view' || (this.context !== 'view' && !this.dirty)) {
          this.$router.push('/reseller/view')
        } else {
          const key = this.context + 'reseller';
          this.showModal({
            type: 'normal',
            message: this.$t('reseller.create.discard_modal.message'),
            copy: this.$t('reseller.create.discard_modal.copy'),
            mainButton: this.$t('reseller.create.discard_modal.main_button'),
            secondaryButton: this.$t('reseller.create.discard_modal.secondary_button'),
            key
          })
          AbaModalEvents.$on(key, response => {
            AbaModalEvents.$off(key)
            if (response.ok) this.$router.push('/reseller/view')
          })
        }
      },
      handlePrimaryAction() {
        if (this.context === 'view') {
          this.editId = this.$route.params.id;
          this.$router.push({
            path: this.$route.path,
            query: {
              edit: true
            }
          })
          this.edit = true;

          return;
        }
        if (!this.valid) return this.$store.dispatch(SHOW_TOAST_MESSAGE, {
          message: this.$t('reseller.create.toast.error'),
          status: 'danger'
        })

        const key = this.context + 'handlePrimaryAction' + 'reseller';
        this.showModal({
          type: 'normal',
          message: `  ${this.context === 'create' ? 'Do you want to create new reseller subscription ' : ' Do you want to save the changes  '} ?`,
          copy: `${this.context === 'create' ? this.$t('reseller.create.confirm_modal.copy.create') : this.$t('reseller.create.confirm_modal.copy.edit')}`,
          mainButton: this.$t('reseller.create.confirm_modal.main_button'),
          secondaryButton: this.$t('reseller.create.confirm_modal.secondary_button'),
          key
        })
        AbaModalEvents.$on(key, response => {
          AbaModalEvents.$off(key)

          if (response.ok) {
            // on edit ?

            if (this.editId !== '' && this.loadingState === 'ideal') {
              // on edit for faiure creating new card
              //massage data -> remove edit prop
              const {id, edit, cardProgCode, resellerId, ...body} = this.cardReseller.find(i => i.id === this.editId);
              console.log(body, 'from dest');
              if (this.editId === 'Reseller_new_row') {
                // create
                // todo fix redirect
                this.addReseller({body})
                return;
              } else {
                //massage data -> remove edit prop
                // edit single card
                this.editReseller({body, id})
              }
            }
          }

        })
      },
      handleAddPreset() {
        console.log('add another preset')
        this.resellerCorporate.dynamic_pdf.push({name: '', preset: ''})
      },
      handleResellerAction(){
        this.modals.visible = true
        this.actionBtn = 'save'
      },
      handleCancelAction(){
        this.actionBtn = 'cancel'
        this.modals.visible = true
      },
    },
    mounted() {
      this.getAllCardPrograms();
      const {id,} = this.$route.params;
      const {edit} = this.$route.query;
      this.edit = edit;
      if (id) {
        this.resellerId = id
        this.editRoute = `/reseller/edit/${this.resellerId}`
        if (edit) {

          //this.context = 'edit';
          this.editId = id;
        } else {
          //this.context = 'view';
        }
        // get the reseller subscription by id
        if (this.context !== 'create') {
          this.getResellerSubscripiton(id)

        }
      }
      if (this.context === 'create') {


        this.cardReseller = [createNewRowFromHeadings([...this.tableHeadingsPack.main,
          ...this.tableHeadingsPack.secondary, ...this.tableHeadingsPack.third], 'Reseller_new_row')];
        this.editId = 'Reseller_new_row';
        this.chagneCardProgramOptions(this.cardData)
      }
    },
    filters: {
      booleanToYesNoFormat: (value) => {
        return value ? 'Yes' : 'No'
      },
    }
  };
</script>
<style scoped lang="scss">
  $switcher-bg: #2ED684;
  $label-color: #292929;
  $placeholder-color: #9A9A9A;

  .card {
    font-size: 16px;

    &.disabled {
      opacity: .6;

      &:before {
        content: '';
        display: block;
        width: 100%;
        min-height: 100%;
        position: absolute;
        background-color: rgba(183, 183, 183, .2);
        z-index: 100;
        border-radius: 9px;
      }
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
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
    height: 24px;
    width: 24px;
    left: 1px;
    bottom: 1px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: $switcher-bg;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px $switcher-bg;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .card-content {
    padding: 40px;
  }

  .display-inline {
    display: inline;
  }

  .card-header {
    padding-bottom: 2rem;
  }

  .card-content .tabel-wrapper {
    margin-top: 10px;
  }

  .actionsWrapper {
    padding-top: 1rem;
    text-align: right;
  }

  @media (max-width: 620px) {
    .actionsWrapper {
      padding-top: 1rem;
      text-align: right;
    }
  }

  .required-field-symbol {
    color: #7039DA;
    transform: translateY(-39%);
    font-size: 21px;
    top: 50%;
    right: -10px;
    position: absolute;
  }

  /deep/ {
    .el-select {
      width: 350px;
    }

    .el-input__inner, .el-textarea__inner {
      border-radius: 10px !important;
    }

    .form-control {
      border-radius: 10px !important;
    }
  }

  .reseller-form-column {
    /deep/ {
      .form-group {
        margin-bottom: 0;
      }

      .form-control {
        width: 350px;
      }
    }
  }

  .preset-title{
    font-size: 20px;
    color: $label-color;
  }

  .reseller-footer {
    .btn {
      width: 230px;
    }
  }

  .card-title {
    font-size: 28px;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
  }

  .col-form-label {
    margin-right: 10px;
    color: $label-color;
  }

  .reseller-dynamic-references {
    /deep/ {
      .form-control {
        width: 360px !important;
      }
    }
  }

  .reseller-account-funding {
    .row-label {
      width: 150px;
      color: $label-color;
    }

    /deep/ {
      .form-group {
        width: 295px;
        display: inline-block;
      }
    }
  }

  .reseller-pdf-dynamic {
    strong {
      label {
        color: $label-color;
      }
    }

    /deep/ {
      .el-textarea__inner {
        padding: 5px 10px !important;
        resize: none;

        &::placeholder {
          color: $placeholder-color;
        }

        &:-ms-input-placeholder {
          color: $placeholder-color;
        }

        &::-ms-input-placeholder {
          color: $placeholder-color;
        }
      }

      .el-textarea__inner:focus {
        outline: none;
        border-color: #9A9A9A;
      }

      .form-control {
        &::placeholder {
          color: $placeholder-color;
        }

        &:-ms-input-placeholder {
          color: $placeholder-color;
        }

        &::-ms-input-placeholder {
          color: $placeholder-color;
        }
      }

      .el-textarea.is-disabled .el-textarea__inner{
        background-color: transparent!important;
        color: $label-color;
      }

    }
  }

  /deep/{
    .modal-dialog {
      min-width: 760px;
      text-align: center;

      .modal-content{
        .modal-header {
          border-bottom-color: transparent !important;
          margin-top: 50px;

          .modal-title {
            font-weight: 900;
            font-family: 'Poppins', sans-serif;
          }
        }

        .modal-footer {
          border-top-color: transparent !important;
          .btn {
            width: 175px!important;
            height: 44px;
            margin-bottom: 50px;
          }
        }
      }
    }
  }
</style>
