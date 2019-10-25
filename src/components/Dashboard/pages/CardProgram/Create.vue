<template>
  <div>

		<div  class="bg-white">
		  <div class="row mb-4">
		    <div class="col-12">
          <h4 class="card-title display-inline  text-capitalize">
            {{ $t('card_program.create.title', { action: actionName }) }}
          </h4>

          <div v-if="!editMode">
            <p class="card-info">
              {{ $t('card_program.create.tips.create.line1') }}{{ $t('card_program.create.tips.create.line2') }}
              <span class="pull-right"><span class="required-field-sympol pr-1">*</span>required</span>
            </p>
            <ul class="card-info">
              <li>{{ $t('card_program.create.tips.create.li1') }}</li>
              <li>{{ $t('card_program.create.tips.create.li2') }}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>

		<!-- New style mock start-->
		<div class="row">

			<!-- col-1 -->
			<div class="col-12 col-md-6 col-xl-4">
				<div class="card ceevo__card-group">
					<div class="card-content p-4">
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">PSF REF <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.psfRef }}</div>
								<template v-else>
									<input v-model="cardProgramData.psfRef"
												v-validate="validatePsfRef" maxlength="7"
												name="psfRef"
												type="text"
												placeholder="psf Ref"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('psfRef')" class="validation-error offset-xl-5 px-3">{{ errors.first('psfRef') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">ISSUER INST <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.issuerInst }}</div>
								<template v-else>
									<input v-model="cardProgramData.issuerInst"
												v-validate="validateIssuerInst" maxlength="5"
												name="issuerInst"
												data-vv-as="issuer inst"
												type="text"
												placeholder="Issuer inst"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('issuerInst')" class="validation-error offset-xl-5 px-3">{{ errors.first('issuerInst') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">PM INST <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.pmInst }}</div>
								<template v-else>
									<input v-model="cardProgramData.pmInst"
												v-validate="validatePmInst" maxlength="5"
												name="pmInst"
												data-vv-as="PM inst"
												type="text"
												placeholder="PM inst"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('pmInst')" class="validation-error offset-xl-5 px-3">{{ errors.first('pmInst') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">PO INST <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.poInst }}</div>
								<template v-else>
									<input v-model="cardProgramData.poInst"
												v-validate="validatePoInst" maxlength="5"
												name="poInst"
												data-vv-as="PO inst"
												type="text"
												placeholder="PO inst"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('poInst')" class="validation-error offset-xl-5 px-3">{{ errors.first('poInst') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label text-capitalize">Card Program Code <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.cardProgCode }}</div>
								<template v-else>
									<input v-model="cardProgramData.cardProgCode"
												v-validate="validateCardProgCode" maxlength="5"
												name="cardProgCode"
												data-vv-as="card program code"
												type="text"
												placeholder="CPC"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('cardProgCode')" class="validation-error offset-xl-5 px-3">{{ errors.first('cardProgCode') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 d-flex align-items-center control-label">CARD PROGRAM DESCRIPTION <span class="required-field-sympol">＊</span></div>
							<div class="col-12">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.cardProgDesc }}</div>
								<template v-else>
									<textarea v-model="cardProgramData.cardProgDesc"
														v-validate="validateCardProgDesc" maxlength="40" rows="2"
														name="cardProgDesc"
														data-vv-as="card program description"
														placeholder="Card Program Description"/>
								</template>
							</div>
              <div v-if="errors.has('cardProgDesc')" class="validation-error px-3">{{ errors.first('cardProgDesc') }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- col-2 -->
			<div class="col-12 col-md-6 col-xl-5">
				<div class="card ceevo__card-group">
					<div class="card-content p-4">
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">CARD PROGRAM IDENTIFIER<span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.cardProgramIdentifier }}</div>
								<template v-else>
									<input v-model="cardProgramData.cardProgramIdentifier"
												type="text"
												maxlength="11"
												v-validate="validateCardProgramIdentifier"
												name="cardProgramIdentifier"
												data-vv-as="card program identifier"
												placeholder="card program identifier"
												class="form-control  form-control-danger">
								</template>
							</div>
							<div v-if="errors.has('cardProgramIdentifier')" class="validation-error offset-xl-5 px-3">{{ errors.first('cardProgramIdentifier') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">BUREAU INST CODE <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.cardPrinterCode }}</div>
								<template v-else>
									<input v-model="cardProgramData.cardPrinterCode"
												v-validate="validateCardPrinterCode" maxlength="5"
												name="cardPrinterCode"
												data-vv-as="bureau inst code"
												type="text"
												placeholder="bureau inst code"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('cardPrinterCode')" class="validation-error offset-xl-5 px-3">{{ errors.first('cardPrinterCode') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">DEFAULT CURRENCY <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.defaultCurrencyCode }}</div>
								<template v-else>
									<input v-model="cardProgramData.defaultCurrencyCode"
												v-validate="validateDefaultCurrencyCode"
												name="defaultCurrencyCode"
												data-vv-as="default currency"
												type="text"
												placeholder="default currency"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('defaultCurrencyCode')" class="validation-error offset-xl-5 px-3">{{ errors.first('defaultCurrencyCode') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">ALERT CONTACT E-MAIL <span class="required-field-sympol">＊</span></div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.alertContact }}</div>
								<template v-else>
									<input v-model="cardProgramData.alertContact"
												v-validate="validateAlertContact"
												name="alertContact"
												data-vv-as="alert contact email"
												type="text"
												placeholder="alert contact email"
												class="form-control form-control-danger">
								</template>
							</div>
              <div v-if="errors.has('alertContact')" class="validation-error offset-xl-5 px-3">{{ errors.first('alertContact') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">LOAD FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.loadFee }}</div>
								<template v-else>
									<input v-model="cardProgramData.loadFee" @input="refreshLoadFeeValidate"
												v-validate="validateLoadFeeInput"
												name="loadFee"
												data-vv-as="load fee"
												type="text" placeholder="LOAD FEE" class="form-control  form-control-danger">
								</template>
							</div>
							<div v-if="errors.has('loadFee')" class="validation-error offset-xl-5 px-3">{{ errors.first('loadFee') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">LOAD FEE %</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.loadFeePct }}</div>
								<template v-else>
                  <div class="icon-fee">
									  <input v-model="cardProgramData.loadFeePct" @input="refreshLoadFeeValidate"
													v-validate="validateLoadFeeInput"
													name="loadFeePct"
													data-vv-as="load fee pct"
													type="text" placeholder="LOAD FEE %" class="form-control  form-control-danger">
                  </div>
								</template>
							</div>
							<div v-if="errors.has('loadFeePct')" class="validation-error offset-xl-5 px-3">{{ errors.first('loadFeePct') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">LOAD FEE ROOF</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.loadFeeCap }}</div>
								<template v-else>
                  <div>
									  <input v-model="cardProgramData.loadFeeCap" @input="refreshLoadFeeValidate"
													v-validate="validateLoadFeeInput"
													name="loadFeeCap"
													data-vv-as="load fee cap"
													type="text" placeholder="LOAD FEE ROOF" class="form-control  form-control-danger">
                  </div>
								</template>
							</div>
							<div v-if="errors.has('loadFeeCap')" class="validation-error offset-xl-5 px-3">{{ errors.first('loadFeeCap') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7 ceevo__select-auto">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.loadFeebillMethod }}</div>
								<template v-else>
									<ChargedTo v-model="cardProgramData.loadFeebillMethod" @input="refreshLoadFeeValidate"
														v-validate="isLoadFeeGroupRequired"
														name="loadFeebillMethod"
														data-vv-as="load fee bill method"/>
								</template>
							</div>
							<div v-if="errors.has('loadFeebillMethod')" class="validation-error offset-xl-5 px-3">{{ errors.first('loadFeebillMethod') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">APPLICATION FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.appFee }}</div>
								<template v-else>
									<input v-model="cardProgramData.appFee" @input="refreshAppFeeValidate"
													v-validate="validateAppFeeInput"
													name="appFee"
													data-vv-as="app fee"
												type="text" placeholder="Application Fee" class="form-control  form-control-danger">
								</template>
							</div>
							<div v-if="errors.has('appFee')" class="validation-error offset-xl-5 px-3">{{ errors.first('appFee') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7 ceevo__select-auto">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.appFeeBillMethod }}</div>
								<template v-else>
									<ChargedTo v-model="cardProgramData.appFeeBillMethod" @input="refreshAppFeeValidate"
														v-validate="isAppFeeGroupRequired"
														name="appFeeBillMethod"
														data-vv-as="app fee bill method"/>
								</template>
							</div>
							<div v-if="errors.has('appFeeBillMethod')" class="validation-error offset-xl-5 px-3">{{ errors.first('appFeeBillMethod') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">MONTHLY FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.monthlyFee }}</div>
								<template v-else>
									<input v-model="cardProgramData.monthlyFee" @input="refreshMonthlyFeeValidate"
												v-validate="validateMonthlyFeeInput"
												name="monthlyFee"
												data-vv-as="monthly fee"
												type="text" placeholder="monthly Fee" class="form-control  form-control-danger">
								</template>
							</div>
							<div v-if="errors.has('monthlyFee')" class="validation-error offset-xl-5 px-3">{{ errors.first('monthlyFee') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7 ceevo__select-auto">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.monthlyFeeBillMethod }}</div>
								<template v-else>
									<ChargedTo v-model="cardProgramData.monthlyFeeBillMethod" @input="refreshMonthlyFeeValidate"
														v-validate="isMonthlyFeeGroupRequired"
														name="monthlyFeeBillMethod"
														data-vv-as="monthly fee bill method"/>
								</template>
							</div>
							<div v-if="errors.has('monthlyFeeBillMethod')" class="validation-error offset-xl-5 px-3">{{ errors.first('monthlyFeeBillMethod') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">API FEE</div>
							<div class="col-12 col-lg-12 col-xl-7">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.apiFee }}</div>
								<template v-else>
									<input v-model="cardProgramData.apiFee" @input="refreshApiFeeValidate"
													v-validate="validateApiFeeInput"
													name="apiFee"
													data-vv-as="api fee"
												type="text" placeholder="Api Fee" class="form-control  form-control-danger">
								</template>
							</div>
							<div v-if="errors.has('apiFee')" class="validation-error offset-xl-5 px-3">{{ errors.first('apiFee') }}</div>
						</div>
						<div class="row mb-xl-3">
							<div class="col-12 col-lg-12 col-xl-5 d-flex align-items-center control-label">CHARGED TO</div>
							<div class="col-12 col-lg-12 col-xl-7 ceevo__select-auto">
								<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.apiFeeBillMethod }}</div>
								<template v-else>
									<ChargedTo v-model="cardProgramData.apiFeeBillMethod" @input="refreshApiFeeValidate"
														v-validate="isApiFeeGroupRequired"
														name="apiFeeBillMethod"
														data-vv-as="api fee bill Method"/>
								</template>
							</div>
							<div v-if="errors.has('apiFeeBillMethod')" class="validation-error offset-xl-5 px-3">{{ errors.first('apiFeeBillMethod') }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- col-3 -->
			<div class="col-12 col-md-6 col-xl-3">
				<div class="card ceevo__card-group">
					<div class="card-content p-4 pb-5">
						<!-- KYC Classes -->
						<div v-for="(kyc, index) in cardProgramData.kycClassifier"
								 :key="`kyc${index}`"
								 class="row mb-0">
							<div class="kyc-adding w-75">
								<div class="col-12 d-flex align-items-center control-label">KYC CLASS {{ index + 1 }}<span class="required-field-sympol">＊</span></div>
								<div class="col-12 mb-0">
									<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.kycClassifier[index] }}</div>
									<template v-else>
                    <div class="kyc-group">
                      <input v-model="cardProgramData.kycClassifier[index]"
                            v-validate="validateKycClassifier" maxlength="5"
                            :name="`kyc${index}`"
                            :data-vv-as="`kyc class ${index + 1}`"
                            type="text"
                            :placeholder="`KYC Class ${index + 1}`"
                            class="form-control  form-control-danger"/>
                      <template v-if="!viewMode">
                        <button v-if="index > 0"
                                class="el-tooltip aba__button delete"
                                @click="cardProgramData.kycClassifier.splice(index, 1)">
                          <i class="el-icon-error"></i>
                        </button>

                        <button v-else
                                class="el-tooltip aba__button add"
                                @click="addElement(cardProgramData.kycClassifier)">
                          <i class="el-icon-plus"></i>
                        </button>
                      </template>
                    </div>


									</template>
								</div>
                <div v-if="errors.first(`kyc${index}`)" class="validation-error mt-1 px-3">{{ errors.first(`kyc${index}`) }}</div>
							</div>


						</div>

						<hr class="mt-4 mb-1">

						<div v-for="(matrix, index) in cardProgramData.matrixPID"
								 :key="`matrix${index}`"
								 class="row mb-0">
							<div class="kyc-adding w-75">
								<div class="col-12 d-flex align-items-center control-label">MARTIX PID {{ index + 1 }}</div>
								<div class="col-12 mb-0">
									<div v-if="viewMode" class="view-mode-value">{{ cardProgramData.matrixPID[index] }}</div>
									<template v-else>
                    <div class="kyc-group">
                      <input v-model="cardProgramData.matrixPID[index]"
                            :name="`matrix${index}`"
                            type="text"
                            :placeholder="`Matrix PID ${index + 1}`"
                            class="form-control  form-control-danger"/>
                      <template v-if="!viewMode">
                        <button v-if="index > 0"
                                class="el-tooltip aba__button delete"
                                @click="cardProgramData.matrixPID.splice(index, 1)">
                          <i class="el-icon-error"></i>
                        </button>

                        <button v-else
                                class="el-tooltip aba__button add"
                                @click="addElement(cardProgramData.matrixPID)">
                          <i class="el-icon-plus"></i>
                        </button>
                      </template>
                      </div>

									</template>

                  </div>
                  <div v-if="errors.first(`matrix${index}`)" class="validation-error mt-1 px-3">{{ errors.first(`matrix${index}`) }}</div>
								</div>
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
                    :disabled="!viewMode && (!isComplete || errors.all().length > 0)"
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
	loadFeeCap: '',
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
	matrixPID: [''],
	cardProgramIdentifier: '',
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
	props: {
		viewMode: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			loading: true,
			cardProgramData: Object.assign({}, emptyCardProgramData)
		}
	},
	computed: {
		isComplete() {
      return this.cardProgramData.psfRef !== '' && this.cardProgramData.issuerInst !== ''
              && this.cardProgramData.pmInst !== '' && this.cardProgramData.poInst !== ''
              && this.cardProgramData.cardProgCode !== '' && this.cardProgramData.cardProgDesc !== ''
							&& this.cardProgramData.cardPrinterCode !== '' && this.cardProgramData.defaultCurrencyCode !== ''
							&& this.cardProgramData.alertContact !== '' && this.cardProgramData.cardProgramIdentifier !== ''
    },
		editMode () {
			return this.$route.params.id !== 'new'
		},
		actionName () {
			return this.editMode
				? this.viewMode
					? 'View'
					: 'Edit'
				: 'Create'
		},
		validatePsfRef() {
			return {
				required: true,
				max: 7,
				regex: /^[a-zA-Z0-9\s]+$/,
				notAllowCharactersAtFirst: [' '],
        notAllowCharactersAtLast: [' ']
			}
		},
		validateIssuerInst() {
			return {
				required: true,
				length: 5,
				alpha_num: true,
			}
		},
		validatePmInst() {
			return {
				required: true,
				length: 5,
				alpha_num: true,
			}
		},
		validatePoInst() {
			return {
				required: true,
				length: 5,
				alpha_num: true,
			}
		},
		validateCardProgCode() {
			return {
				required: true,
				length: 5,
				alpha_num: true,
			}
		},
		validateCardProgDesc() {
			return {
				required: true,
				max: 40
			}
		},
		validateCardProgramIdentifier() {
			return { required: true, regex: /(^[1-9]([0-9]*)$|^[0-9]$)/, min_value: 1, max_value: 9999999999 }
		},
		validateCardPrinterCode() {
			return {
				required: true,
				length: 5,
				alpha_num: true,
			}
		},
		validateDefaultCurrencyCode() {
			return {
				required: true,
				currencyISO: true
			}
		},
		validateAlertContact() {
			return {
				required: true,
				email: true,
				max: 35
			}
		},
		validateKycClassifier() {
			return {
				required: true,
				max: 5,
				regex: /^[a-zA-Z0-9\s]+$/,
				notAllowCharactersAtFirst: [' '],
        notAllowCharactersAtLast: [' ']
			}
		},
		commonFeeValidateRules() {
      return {
        regex: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
        min_value: 0.00,
        max_value: 999999.99,
        notAllowCharactersAtLast: ['.']
      }
    },
		isLoadFeeGroupRequired() {
      return {
        required: (this.cardProgramData.loadFee !== null && this.cardProgramData.loadFee !== '')
        || (this.cardProgramData.loadFeePct !== null && this.cardProgramData.loadFeePct !== '')
        || (this.cardProgramData.loadFeeCap !== null && this.cardProgramData.loadFeeCap !== '')
        || (this.cardProgramData.loadFeebillMethod !== null && this.cardProgramData.loadFeebillMethod !== '')
      }
    },
    validateLoadFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isLoadFeeGroupRequired)
		},
		isAppFeeGroupRequired() {
      return {
        required: (this.cardProgramData.appFeeBillMethod !== null && this.cardProgramData.appFeeBillMethod !== '')
        || (this.cardProgramData.appFee !== null && this.cardProgramData.appFee !== '')
      }
    },
    validateAppFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isAppFeeGroupRequired)
		},
		isMonthlyFeeGroupRequired() {
      return {
        required: (this.cardProgramData.monthlyFee !== null && this.cardProgramData.monthlyFee !== '')
        || (this.cardProgramData.monthlyFeeBillMethod !== null && this.cardProgramData.monthlyFeeBillMethod !== '')
      }
    },
    validateMonthlyFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isMonthlyFeeGroupRequired)
		},
		isApiFeeGroupRequired() {
      return {
        required: (this.cardProgramData.apiFee !== null && this.cardProgramData.apiFee !== '')
        || (this.cardProgramData.apiFeeBillMethod !== null && this.cardProgramData.apiFeeBillMethod !== '')
      }
    },
    validateApiFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isApiFeeGroupRequired)
    },
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

				// this.$nextTick(() => {
				// 	this.$validator.validateAll()
				// })
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('card_program.errors.get_card_program') + error.message, status: 'danger' })
			}

			this.loading = false
		},
		async onSave () {
			if (this.viewMode) {
				this.$router.push(`/card-program/card/${this.$route.params.id}`)
			} else {

				const isValid = await this.$validator.validateAll()
				if (isValid) {
					this.loading = true

					try {
						let data = Object.assign({}, this.cardProgramData)

						// Filter lists
						data.kycClassifier = data.kycClassifier.filter(item => item)
						data.matrixPID = data.matrixPID.filter(item => item)

						let requestData = {}
						for (const key in data) {
							if (data[key] === '') {
								requestData[key] = null
							} else if (key !== 'id') {
								requestData[key] = data[key]
							} else {
								// console.log('ignore id')
							}
						}

						if (this.cardProgramData.id) {
							await this.$http.aba1.put(`/cardprograms/${this.$route.params.id}`, requestData)
						} else {
							await this.$http.aba1.post(`/cardprograms/`, requestData)
						}

						this.onCancel()
					} catch (error) {
						this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('card_program.errors.save_card_program') + error.message, status: 'danger' })
					}

					this.loading = false
				}
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
		refreshLoadFeeValidate() {
			this.commonRefreshValidate(['loadFee', 'loadFeePct', 'loadFeeCap', 'loadFeebillMethod'])
		},
		refreshAppFeeValidate() {
			this.commonRefreshValidate(['appFee', 'appFeeBillMethod'])
		},
		refreshMonthlyFeeValidate() {
			this.commonRefreshValidate(['monthlyFee', 'monthlyFeeBillMethod'])
		},
		refreshApiFeeValidate() {
			this.commonRefreshValidate(['apiFee', 'apiFeeBillMethod'])
		},
		commonRefreshValidate(fields) {
			this.$nextTick(() => {
				this.$validator.validateAll(fields)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
span.required-field-sympol{
  vertical-align: sub;
  font-size: 18px;
}
.control-label {
  font-weight: bold;
  text-transform: uppercase;
}

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
.view-mode-value {
	height: 39px;
	margin-bottom: 16px;
	display: flex;
	align-items: center;
}
</style>
