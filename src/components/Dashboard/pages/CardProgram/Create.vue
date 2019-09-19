<template>
  <div>
		<!--
    <div class=" d-flex justify-content-between"
         :class="{
    ['section-header']:context ==='create',
    ['pb-3']:context !=='create',
    }"
    >
      <h4 class="card-title display-inline  text-capitalize">
        {{ $t('card_program.create.title', {action: context}) }}
      </h4>
    </div>
    <div class="pl-2" v-if="context ==='create'">
      <p>
        {{ $t('card_program.create.tips.create.line1') }}
        <br/>
        {{ $t('card_program.create.tips.create.line2') }}
      </p>
      <ul>
        <li>{{ $t('card_program.create.tips.create.li1') }}</li>
        <li>{{ $t('card_program.create.tips.create.li2') }}</li>
      </ul>
    </div>
    <div class="pl-2" v-if="context ==='view'">
      <p>
        {{ $t('card_program.create.tips.view.line1') }}
      </p>
      <ul>
        <li>{{ $t('card_program.create.tips.view.li1') }}</li>
        <li>{{ $t('card_program.create.tips.view.li2') }}</li>
      </ul>
    </div>
    <div class="pl-2" v-if="context ==='edit'">
      <p>
        {{ $t('card_program.create.tips.edit.line1') }}
      </p>
      <ul>
        <li>{{ $t('card_program.create.tips.edit.li1') }}</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-content">
        <div class="col-sm-12 tabel-wrapper mb-1">
          <div class="py-1">1
            <regular-table striped
                           :showValidFeedBack="showValidFeedBack"
                           :context="context"
                           :headings="tableHeadingsPack.main"
                           @input="listenToInput($event,'main')"
                           :editId="editId"
                           :value="tableViewData">
            </regular-table>
          </div>
        </div>
        <hr>
        <div class="col-sm-12 tabel-wrapper mb-1">
          <div class="py-1">2
            <regular-table striped
                           :showValidFeedBack="showValidFeedBack"
                           :context="context"
                           :headings="tableHeadingsPack.middle"
                           @input="listenToInput($event,'middle')"
                           :editId="editId"
                           :value="tableViewData"
                           :amonutAlignRightFormat="secondLine">
            </regular-table>
          </div>
        </div>
        <hr>
        <div class="col-sm-12 tabel-wrapper mb-1">
          <div class="py-1">3
            <regular-table striped
                           :showValidFeedBack="showValidFeedBack"
                           :context="context"
                           @input="listenToInput($event,'fees')"
                           :headings="tableHeadingsPack.fees"
                           :editId="editId"
                           :value="tableViewData"
                           :amonutAlignRightFormat="thirdLine">
            </regular-table>
          </div>
        </div>
        <hr>
        <div class="col-sm-12 tabel-wrapper mb-1">
          <div class="py-1">4
            <SingleFieldTable
              :tableData="tableViewData"
              filedName="kycClassifier"
              @input="listenToInput($event,'kycClassifier')"
              striped bordered
              label="card_program.create.table_header.kyc_classifier"
              :showValidFeedBack="showValidFeedBack"
              :context="context"
              :extraHeadings="1"
              :editId="editId"
              :headingObj="tableHeadingsPack.kycClassifier[0]"
            >
              <template v-if="this.context !== 'view'">
                <td>
                  <div class="cell">
                    <AbaButton
                      context="primary"
                      @click="createNewField('kycClassifier')"
                      tooltip="add new kyc"
                    >
                      <i class="fa  fa-plus"></i>
                    </AbaButton>
                  </div>
                </td>
              </template>
            </SingleFieldTable>
          </div>
        </div>
        <hr>
        <div class="col-sm-12 tabel-wrapper">
          <div class="py-1">5
            <SingleFieldTable
              :tableData="tableViewData"
              filedName="matrixPID"
              :context="context"
              label="card_program.create.table_header.matrix_pid"
              @input="listenToInput($event,'matrixPID')"
              striped bordered
              :showValidFeedBack="showValidFeedBack"
              :extraHeadings="1"
              :editId="editId"
              :headingObj="tableHeadingsPack.matrixPID[0]"
            >
              <template v-if="this.context !== 'view'">
                <td>
                  <div class="cell">
                    <AbaButton
                      context="primary"
                      @click="createNewField('matrixPID')"
                      tooltip="create new matrixPID"
                    >
                      <i class="fa  fa-plus"></i>
                    </AbaButton>
                  </div>
                </td>
              </template>
            </SingleFieldTable>
          </div>
          <br>
          <slide-y-down-transition>
            <p v-if="edit || context ==='create'">
              <span class="required-field-sympol">
                <b>*</b>
              </span>
              {{ $t('card_program.create.common.required_fields') }}
            </p>
          </slide-y-down-transition>
        </div>
      </div>
    </div>
	-->

		<!-- New style mock start-->
		<div class="row">

			<!-- col-1 -->
			<div class="col-12 col-md-6 col-xl-4">
				<div class="card ceevo__card-group">
					<div class="card-content p-4">
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">PSF REF <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.psfRef"
											 v-validate="'required|max:7'" maxlength="7"
											 name="psfRef"
											 type="text" 
											 placeholder="psf Ref" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('psfRef') }}</div>
							</div>
						</div>
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">ISSUER INST <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.issuerInst" 
											 v-validate="'required|length:5'" maxlength="5"
											 name="issuerInst"
											 data-vv-as="issuer inst"											 
											 type="text" 
											 placeholder="Issuer inst" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('issuerInst') }}</div>
							</div>
						</div>
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">PM INST <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.pmInst" 
											 v-validate="'required|length:5'" maxlength="5"
											 name="pmInst"
											 data-vv-as="PM inst"
											 type="text" 
											 placeholder="PM inst" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('pmInst') }}</div>
							</div>
						</div>
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">PO INST <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.poInst"
											 v-validate="'required|length:5'" maxlength="5"
											 name="poInst"
											 data-vv-as="PO inst"
											 type="text" 
											 placeholder="PO inst" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('poInst') }}</div>
							</div>
						</div>
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">Card Program Code <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.cardProgCode" 
											 v-validate="'required|length:5'" maxlength="5"
											 name="cardProgCode"
											 data-vv-as="card program code"
											 type="text" 
											 placeholder="CPC" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('cardProgCode') }}</div>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 d-flex align-items-center">CARD PROGRAM DESCRIPTION <span class="required-field-sympol">＊</span></div>
							<div class="col-12">
								<textarea v-model="cardProgramData.cardProgDesc"
													v-validate="'required|max:40'" maxlength="40" rows="2"
													name="cardProgDesc"
													data-vv-as="card program description"
													placeholder="Card Program Description"/>
								<div class="validation-error">{{ errors.first('cardProgDesc') }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- col-2 -->
			<div class="col-12 col-md-6 col-xl-5">
				<div class="card ceevo__card-group">
					<div class="card-content p-4">
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">BUREAU INST CODE <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.cardPrinterCode" 
										   v-validate="'required|length:5'" maxlength="5"
  										 name="cardPrinterCode"
											 data-vv-as="bureau inst code"
											 type="text" 
											 placeholder="BUREAU INST CODE" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('cardPrinterCode') }}</div>
							</div>
						</div>
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">DEFAULT CURRENCY <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.defaultCurrencyCode" 
										   v-validate="'required'"
  										 name="defaultCurrencyCode"
											 data-vv-as="default currency"
											 type="text" 
											 placeholder="DEFAULT CURRENCY" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('defaultCurrencyCode') }}</div>
							</div>
						</div>
						<div class="row mb-0">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">ALERT CONTACT E-MAIL <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.alertContact" 
										   v-validate="'required|email'"
  										 name="alertContact"
											 data-vv-as="alert contact email"
											 type="text" 
											 placeholder="ALERT CONTACT E-MAIL" 
											 class="form-control form-control-danger">
								<div class="validation-error">{{ errors.first('alertContact') }}</div>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">LOAD FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.loadFee" type="text" placeholder="LOAD FEE" class="form-control  form-control-danger">
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">LOAD FEE %</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.loadFeePct" type="text" placeholder="LOAD FEE %" class="form-control  form-control-danger">
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<ChargedTo v-model="cardProgramData.loadFeebillMethod"/>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">APPLICATION FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.appFee" type="text" placeholder="APPLICATION FEE" class="form-control  form-control-danger">
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<ChargedTo v-model="cardProgramData.appFeeBillMethod"/>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">MONTHLY FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.monthlyFee" type="text" placeholder="MONTHLY FEE" class="form-control  form-control-danger">
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<ChargedTo v-model="cardProgramData.monthlyFeeBillMethod"/>
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">API FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<input v-model="cardProgramData.apiFee" type="text" placeholder="API FEE" class="form-control  form-control-danger">
							</div>
						</div>
						<div class="row mb-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<ChargedTo v-model="cardProgramData.apiFeeBillMethod"/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- col-3 -->
			<div class="col-12 col-md-6 col-xl-3">
				<div class="card ceevo__card-group">
					<div class="card-content p-4">
						<!-- KYC Classes -->
						<div v-for="(kyc, index) in cardProgramData.kycClassifier" 
								 :key="`kyc${index}`"
								 class="row mb-0">
							<div class="kyc-adding w-75">
								<div class="col-12 d-flex align-items-center">KYC CLASS {{ index + 1 }}<span class="required-field-sympol">＊</span></div>
								<div class="col-12 mb-0">
									<input v-model="cardProgramData.kycClassifier[index]"
												 v-validate="'required|max:5'" maxlength="5"
												 :name="`kyc${index}`"
												 :data-vv-as="`kyc class ${index + 1}`"
												 type="text" 
												 :placeholder="`KYC Class ${index + 1}`" 
												 class="form-control  form-control-danger"/>
									<div class="validation-error">{{ errors.first(`kyc${index}`) }}</div>
								</div>
							</div>

							<button v-if="index > 0" 
											class="el-tooltip aba__button" 
											@click="cardProgramData.kycClassifier.splice(index, 1)">
								<i class="el-icon-delete"></i>
							</button>

							<button v-else 
										  class="el-tooltip aba__button" 
											@click="addElement(cardProgramData.kycClassifier)">
								<i class="el-icon-plus"></i>
							</button>
						</div>

						<hr>
						
						<div v-for="(matrix, index) in cardProgramData.matrixPID" 
								 :key="`matrix${index}`"
								 class="row mb-0">
							<div class="kyc-adding w-75">
								<div class="col-12 d-flex align-items-center">MARTIX PID {{ index + 1 }}<span class="required-field-sympol">＊</span></div>
								<div class="col-12 mb-0">
									<input v-model="cardProgramData.matrixPID[index]"
												 v-validate="'required'"
												 :name="`matrix${index}`"
												 :data-vv-as="`matrix PID ${index + 1}`"
												 type="text" 
												 :placeholder="`Matrix PID ${index + 1}`" 
												 class="form-control  form-control-danger"/>
									<div class="validation-error">{{ errors.first(`matrix${index}`) }}</div>
								</div>
							</div>

							<button v-if="index > 0" 
											class="el-tooltip aba__button" 
											@click="cardProgramData.matrixPID.splice(index, 1)">
								<i class="el-icon-delete"></i>
							</button>

							<button v-else 
										  class="el-tooltip aba__button" 
											@click="addElement(cardProgramData.matrixPID)">
								<i class="el-icon-plus"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- New style mock end-->

    <div class="row">
      <div class="col-md-12 mt-5">
        <div class="text-center ceevo__btn-group">
          <p-button round type="primary" @click="onSave"
                    :disabled="errors.all().length > 0"
                    v-if="hasPermission(permission.CARD_PROGRAM_EDIT)">
            <div class="d-flex align-items-center">
              <!--<loader v-if="loadingState ==='sending'"></loader>-->
              {{ $t(viewMode ? 'card_program.create.button.edit' : 'card_program.create.button.save') }}
            </div>
          </p-button>
          <p-button round @click="onCancel"> {{ $t(viewMode ? 'card_program.create.button.back' : 'card_program.create.button.cancel') }} </p-button>
        </div>
      </div>
    </div>

    <Spinner v-if="loading"/>
  </div>
</template>

<script>
import {Button} from 'src/components/UIComponents';
import swal from 'sweetalert2'
import SlideYDownTransition from "vue2-transitions/src/Slide/SlideYDownTransition";
import {mapActions, mapGetters} from 'vuex'
import {AbaModalEvents} from "../../../../main";
import {
	ADD_CARD_PROGRAM,
	EDIT_CARD_PROGRAM,
	GET_CARD_PROGRAM_BYID,
	GETTER_ACTIVE_CARD,
	GETTER_LOADINGSTATE_CARD_PROGRAM, SET_MODAL_TYPE,
	SHOW_TOAST_MESSAGE
} from '../../../../store/types';
import createNewRowFromHeadings from "../../../../utils/createNewRowFromHeadings";
import {breakInput, exactNumber, limitedCharNumber, mustBeAnEmail, mustBeAValidISOcurrency, shouldBeNumber, verifySpecialCharacter} from "../../../../utils/formValidations";
import {decimals} from "../../../../utils/inputMasks";
import AbaButton from "../../../UIComponents/ABAComponents/AbaButton";
import PButton from "../../../UIComponents/Button";
import RegularTable from '../../../UIComponents/CeevoTables/RegularTable/RegularTable'
import SingleFieldTable from "../../../UIComponents/CeevoTables/SingeFieldTable/SingleFieldTable";
import Loader from "../../../UIComponents/Loader";
import Spinner from "../../../UIComponents/Spinner";
import { permissionMixin } from '@/mixins/permission'

import ChargedTo from './ChargedTo'

const emptyCardProgramData = {
	// 
	psfRef: '',
	issuerInst: '',
	pmInst: '',
	poInst: '',
	cardProgCode: '',
	cardProgDesc: '',
	//
	cardPrinterCode: '', // Bureau inst code
	defaultCurrencyCode: '',
	alertContact: '',
	loadFee: '',
	loadFeePct: '',
	//loadFeeCap: '', // not in UI
	loadFeebillMethod: '', // Charged To
	//
	appFee: '',
	appFeeBillMethod: '', // fix in UI
	monthlyFee: '',
	monthlyFeeBillMethod: '',
	apiFee: '',
	apiFeeBillMethod: '',
	//
	kycClassifier: [''],
	matrixPID: ['']
}

export default {
	name: "Create",
	mixins: [permissionMixin],
	components: {
		SlideYDownTransition,
		AbaButton,
		SingleFieldTable,
		Spinner,
		Loader,
		PButton, RegularTable,
		[Button.name]: Button,

		ChargedTo
	},
	data() {
		return {
			loading: true,
			viewMode: false,
			cardProgramData: Object.assign({}, emptyCardProgramData)

			/*
			secondLine: ['loadFee', 'loadFeePct', 'loadFeeCap'],
			thirdLine: ['appFee', 'monthlyFee', 'apiFee'],
			edit: false,
			dirty: false,
			tableHeadingsPack: {
				main: [
					{
						label: 'psf Ref',
						name: 'psfRef',
						i18n: 'card_program.create.table_header.psf_ref',
						required: true,
						validator: [
							verifySpecialCharacter,
							exactNumber(7)
						],
						brakeAt: breakInput(7)

					},
					{
						label: 'issuer Inst',
						name: 'issuerInst',
						i18n: 'card_program.create.table_header.issuer_inst',
						required: true,
						validator: [
							verifySpecialCharacter,
							exactNumber(5)
						],
						brakeAt: breakInput(5)
					},
					{
						label: 'PM Inst',
						name: 'pmInst',
						i18n: 'card_program.create.table_header.pm_inst',
						required: true,
						validator: [
							verifySpecialCharacter,
							exactNumber(5)
						],
						brakeAt: breakInput(5)
					},
					{
						label: 'PO Inst',
						name: 'poInst',
						i18n: 'card_program.create.table_header.po_inst',
						required: true,
						validator: [
							verifySpecialCharacter,
							exactNumber(5)
						],
						brakeAt: breakInput(5)
					},
					{
						label: 'CPC',
						name: 'cardProgCode',
						i18n: 'card_program.create.table_header.card_prog_code',
						required: true,
						validator: [
							verifySpecialCharacter,
							exactNumber(5)
						],
						brakeAt: breakInput(5)
					},
					{
						label: 'card program description',
						name: 'cardProgDesc',
						i18n: 'card_program.create.table_header.card_prog_desc',
						required: true,
						validator: limitedCharNumber(0, 40),
						brakeAt: breakInput(40)
					},
				],
				middle: [
					{
						label: 'Bureau inst code',
						name: 'cardPrinterCode',
						i18n: 'card_program.create.table_header.card_printer_code',
						required: true,
						validator: [
							verifySpecialCharacter,
							exactNumber(5)
						],
						brakeAt: breakInput(5)
					},
					{
						label: 'default currency',
						name: 'defaultCurrencyCode',
						i18n: 'card_program.create.table_header.def_currency',
						required: true,
						validator: [mustBeAValidISOcurrency],
						brakeAt: breakInput(3)
					},
					{
						label: 'alert contact e-mail',
						name: 'alertContact',
						i18n: 'card_program.create.table_header.alert_contact',
						required: true,
						validator: [mustBeAnEmail], $domAttri: {type: 'email'},
						brakeAt: breakInput(64)
					},
					{
						label: 'load fee',
						name: 'loadFee',
						i18n: 'card_program.create.table_header.load_fee',
						validator: shouldBeNumber,
						mask: decimals(2),
						$domAttri: {step: '0.01', type: 'number'},
						brakeAt: breakInput(8)
					},
					{
						label: 'load fee %',
						name: 'loadFeePct',
						i18n: 'card_program.create.table_header.load_fee_pct',
						addonRightIcon: 'fa-percent fa',
						validator: shouldBeNumber,
						mask: decimals(2),
						$domAttri: {step: '0.01', type: 'number'},
						brakeAt: breakInput(8),
						i18n_placeholder: 'card_program.create.table_input_placeholder.load_fee_pct'
					},
					{
						label: 'load fee roof',
						name: 'loadFeeCap',
						i18n: 'card_program.create.table_header.load_fee_cap',
						validator: [shouldBeNumber],
						mask: decimals(2),
						$domAttri: {step: '0.01', type: 'number'},
						brakeAt: breakInput(8)
					},
					{
						label: 'Charged To',
						name: 'loadFeebillMethod',
						i18n: 'card_program.create.table_header.load_fee_bill_method',
						input: 'select',
						selectKeys: [
							{name: '', value: null},
							{name: 'ACCOUNT', value: 'ACCOUNT'},
							{name: 'FLOAT', value: 'FLOAT'},
							{name: 'INVOICE', value: 'INVOICE'},
						]
					},
				],
				fees: [{
					label: 'application fee',
					name: 'appFee',
					i18n: 'card_program.create.table_header.app_fee',
					validator: shouldBeNumber,
					mask: decimals(2),
					$domAttri: {step: '0.01', type: 'number'},
					brakeAt: breakInput(8)
				},
					//application fee bill method
					{
						label: 'Charged To',
						name: 'appFeeBillMethod',
						i18n: 'card_program.create.table_header.app_fee_bill_method',
						input: 'select',
						selectKeys: [
							{name: '', value: null},
							{name: 'FLOAT', value: 'FLOAT'},
							{name: 'ACCOUNT', value: 'ACCOUNT'},

							{name: 'INVOICE', value: 'INVOICE'}]
					},
					{
						label: 'monthly fee',
						name: 'monthlyFee',
						i18n: 'card_program.create.table_header.monthly_fee',
						validator: shouldBeNumber,
						mask: decimals(2),
						$domAttri: {step: '0.01', type: 'number'},
						brakeAt: breakInput(8)
					},
					//monthly fee bill method
					{
						label: 'Charged To',
						name: 'monthlyFeeBillMethod',
						i18n: 'card_program.create.table_header.monthly_fee_bill_method',
						input: 'select',
						selectKeys: [
							{name: '', value: null},
							{name: 'ACCOUNT', value: 'ACCOUNT'},
							{name: 'FLOAT', value: 'FLOAT'},
							{name: 'INVOICE', value: 'INVOICE'}]
					},
					{
						label: 'api fee',
						name: 'apiFee',
						i18n: 'card_program.create.table_header.api_fee',
						validator: shouldBeNumber,
						mask: decimals(2),
						$domAttri: {step: '0.01', type: 'number'},
						brakeAt: breakInput(8)
					},
					{
						label: 'Charged To',
						name: 'apiFeeBillMethod',
						i18n: 'card_program.create.table_header.api_fee_bill_method',
						input: 'select',
						selectKeys: [
							{name: '', value: null},
							{name: 'FLOAT', value: 'FLOAT'},
							{name: 'INVOICE', value: 'INVOICE'}
						]
					},
				],
				kycClassifier: [
					{
						label: 'kyc classifier',
						name: 'kycClassifier',
						multiVal: true,
						validator: exactNumber(3),
						brakeAt: breakInput(3),
						required: true,
					},],
				matrixPID: [{
					label: 'matrix PID',
					name: 'matrixPID',
					multiVal: true,
					validator: exactNumber(6),
					brakeAt: breakInput(6),
					required: true,

				},]

			},
			tableViewData: [],
			showValidFeedBack: false,
			editId: '',
			valid: {
				main: false,
				middle: false,
				fees: false,
				matrixPID: false,
				kycClassifier: false,
			},
			context: 'create' // create view edit
			*/
		}
	}, 
	computed: {
		editMode () {
			return this.$route.params.id !== 'new'
		}
	}, 
	watch: {		
		'$route': {
			immediate: true,
			handler () {
				this.getData()
			}
		}
	},
	methods: {
		async getData () {
			this.loading = true

			try {
				if (this.editMode) {
					let response = await this.$http.aba1.get(`/cardprograms/${this.$route.params.id}`)
					
					this.cardProgramData = response.data
					// After load checks and modifications
					delete this.cardProgramData.id
					// Add at least one free item to each of lists
					if (this.cardProgramData.kycClassifier.length === 0) {
						this.cardProgramData.kycClassifier.push('')
					}
					
					if (this.cardProgramData.matrixPID.length === 0) {
						this.cardProgramData.matrixPID.push('')
					}

				} else {
					// Set clean data for create
					// no nested props so we can use Object.assign
					this.cardProgramData = Object.assign({}, emptyCardProgramData)
				}

				this.$nextTick(() => {
					this.$validator.validateAll()
				})
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('card_program.errors.get_card_program') + error.message, status: 'danger' })
			}

			this.loading = false
		},
		async onSave () {
			try {
				let data = Object.assign({}, this.cardProgramData)

				// Filter lists
				data.kycClassifier = data.kycClassifier.filter(item => item)
				data.matrixPID = data.matrixPID.filter(item => item) 

				await this.$http.aba1.put(`/cardprograms/${this.$route.params.id}`, data)
				this.onCancel()
			} catch (error) {
				console.log(error)
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('card_program.errors.save_card_program') + error.message, status: 'danger' })
			}
		},
		onCancel () {
			this.$router.push('/card-program/view')
		},
		addElement (arr) {
			arr.push('')
			// revalidate on nextTick because we need DOM update after inserting item into array
			this.$nextTick(() => {
				this.$validator.validateAll()
			})
		},

		/*
		...mapActions({
			createACardProgram: ADD_CARD_PROGRAM,
			getActiveCard: GET_CARD_PROGRAM_BYID,
			editSingleCard: EDIT_CARD_PROGRAM,
			showModal: SET_MODAL_TYPE
		}),
		createNewField(filed) {
			if (this.context === 'view') return;
			this.tableViewData = this.tableViewData.map(i => ({
				...i,
				[filed]: [...i[filed], '']
			}))
		},
		sweetAlertHandler(newVal) {
			if (newVal.state === true) {
				const key = this.context + 'handleSecondaryAction' + 'cardPorgram';

				this.showModal({
					type: 'normal',
					message: this.context === 'create' ? 'created new card program successfully' : 'The changes are updated. ',
					copy: 'any changes will be discarded',
					mainButton: 'Ok',
					key
				})

				AbaModalEvents.$on(key, response => {
					if (response.ok) {
						this.$router.push('/card-program/view')

					} else {
						this.dirty = false;
					}
					AbaModalEvents.$off(key)
				})
			}

		},
		secondaryAction() {
			// edit or create ask before leaving
			// view ->
			if (this.context === 'view' || (this.context !== 'view' && !this.dirty)) {
				this.$router.push({
					path: '/card-program/view',
					query: {
						edit: false
					}
				})

			} else {
				const key = this.context + 'handleSecondaryAction' + 'cardPorgram';
				this.showModal({
					type: 'normal',
					message: `Are you sure you want to exit the card program ${this.context} function?`,
					copy: 'any changes will be discarded',
					mainButton: 'Yes',
					secondaryButton: `No`,
					key
				})
				AbaModalEvents.$on(key, response => {
					if (response.ok) {
						this.$router.push('/card-program/view')

					}
					AbaModalEvents.$off(key)
				})
				//ask

			}

		},
		listenToInput({value, valid, dirty}, tableName) {
			this.tableViewData = value;
			this.dirty = this.dirty || !!dirty
			this.valid = {
				...this.valid,
				[tableName]: valid
			};
		},
		handlePrimaryAction() {
			// on edit ?
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
			if (!this.valid) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, {message: 'Please ensure you complete all fields correctly.', status: 'danger'})
				return;
			}

			const key = this.context + 'handlePrimaryAction' + 'cardPorgram' +Date.now();
			this.showModal({
				type: 'normal',
				message: `  ${this.context === 'create' ? 'Are you sure you will create new card program ' : 'Do you want to save the changes'} ?`,
				copy: `${this.context === 'create' ? '' : 'You will not be able to recover the changes!'}`,
				mainButton: `YES`,
				secondaryButton: 'NO',
				key
			})
			AbaModalEvents.$on(key, response => {
				if (response.ok) {
					if (this.editId !== '' && this.loadingState === 'ideal') {
						// on edit for faiure creating new card
						//massage data -> remove edit prop
						const {id, edit, ...body} = this.tableViewData.find(i => i.id === this.editId);
						if (this.editId === 'card_program_new_row') {
							// create
							this.createACardProgram({body}).then(isSuccess => {
								if (isSuccess) {
									this.$router.push({
										path: `/card-program/view`
									})
								}
							});
							return;
						} else {
							// this.editId = '';
							//massage data -> remove edit prop
							// edit single card
							this.editSingleCard({body, id})
						}
					}

				}
				AbaModalEvents.$off(key)
			})

		}
		*/
	}
}
</script>

<style lang="scss" scoped>
.section-header {
	padding-bottom: .5rem;
}

.section-header h4 {
	margin: 0;
}

.section-header button {
	margin: 0;
}

.card-content .tabel-wrapper {
	margin: 10px 0;
}

.actionsWrapper button {
	margin-left: 10px;
}

@media (max-width: 620px) {
	.actionsWrapper {
		padding-top: 1rem;
		text-align: right;
	}
}

.refreshButton {
	background-color: #d8d8d8;
	color: #ffffff;
	position: absolute;
	right: 4rem;
}

.refreshButton:hover {
	background-color: #d3d3d3 !important;
}

.required-field-sympol {
	color: #5823bd;
	font-size: 24px;
	font-weight: 500;
	height: 26px;
}
.ceevo__card-group{
	.aba__button,
	.aba__button:hover{
		background:transparent !important;
		border:none;
		cursor: pointer;

		i{
			color: #7039DA;
			font-size: 28px;
			font-weight: bold;
			margin-top: 6px;
		}
	}
}
</style>
