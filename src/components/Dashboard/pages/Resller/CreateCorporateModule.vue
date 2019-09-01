<template>
  <div>
    <div class="card">
      <div class="card-content">
        <el-row class="reseller-form-column" :gutter="24">
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
                  <strong>{{reseller.cardProgCode}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.cardProgramID">
                    <el-option v-for="item in cpcList"
                               :key="item.value"
                               :label="item.name"
                               :value="item.value">{{item.name}}
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>

            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative  text-uppercase">{{$t('reseller.create.table_header.reseller_code')}}
                  <span v-if="!isView && !isEdit" class="required-field-symbol text-uppercase">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{reseller.resellerCode}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.resellerCode"
                            :class="{'is-invalid': !isValidResellerCode}"
                            :disabled="isEdit"
                            :placeholder="$t('reseller.create.table_header.reseller_code')"></fg-input>
                </div>
                <p v-if="!isValidResellerCode" class="invalid-feedback">
                  <span v-if="!reseller.resellerCode">{{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!verifySpace(reseller.resellerCode)">{{$t('common.form_validations.no_space')}}</span>
                </p>
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
                  <strong>{{reseller.resellerName}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model.trim="reseller.resellerName"
                            :class="{'is-invalid': !isValidResellerName}"
                            :placeholder="$t('reseller.create.table_header.reseller_name')"></fg-input>
                </div>
                <p v-if="!isValidResellerName" class="invalid-feedback">
                  <span v-if="!reseller.resellerName">{{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!verifyName(reseller.resellerName)">{{$t('common.form_validations.letters_only')}}</span>
                </p>
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
                  <strong class="text-capitalize">{{reseller.uniqueFloat | booleanToYesNoFormat}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.uniqueFloat">
                    <el-option v-for="item in uniqueFloatValues"
                               :key="item.value"
                               :label="item.name"
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
                  <strong>{{reseller.alertContact}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.alertContact"
                            type="email"
                            :class="{'is-invalid': !isValidAlertContact}"
                            :placeholder="$t('reseller.create.table_header.alert_contact')"></fg-input>
                </div>
                <p v-if="!isValidAlertContact" class="invalid-feedback">
                  <span v-if="!reseller.alertContact">{{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!verifyEmail(reseller.alertContact)">{{$t('common.form_validations.valid_email')}}</span>
                </p>
              </el-col>
            </el-row>

            <!-- Status -->
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

            <!-- Country code -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.country')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView"
                     class="w-100 d-flex align-items-center">
                  <strong>{{ getCountryByCode(reseller.countryCode) }}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.countryCode">
                    <el-option v-for="item in countries"
                               :key="item.alpha2Code"
                               :label="item.name"
                               :value="item.alpha2Code">{{item.name}}
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
                  <strong>{{reseller.loadFee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.loadFee"
                            @blur="handleNumberInput('loadFee')"
                            :class="{'is-invalid': !isValidLoadFee}"
                            type="number"
                            min="0"
                            :placeholder="$t('reseller.create.table_header.load_fee')"></fg-input>
                </div>
                <p v-if="!isValidLoadFee" class="invalid-feedback">
                  <span v-if="!reseller.loadFee"> {{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!reseller.loadFee"> {{$t('common.form_validations.enter_a_positive_number')}}</span>
                </p>
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
                  <strong>{{reseller.loadFeePct}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.loadFeePct"
                            @blur="handleNumberInput('loadFeePct')"
                            :class="{'is-invalid': !isValidLoadFeePct}"
                            type="number"
                            min="0"
                            :placeholder="$t('reseller.create.table_header.load_fee_pct')"></fg-input>
                </div>
                <p v-if="!isValidLoadFeePct" class="invalid-feedback">
                  <span v-if="!reseller.loadFeePct"> {{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!reseller.loadFeePct"> {{$t('common.form_validations.enter_a_positive_number')}}</span>
                </p>
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
                  <strong>{{reseller.loadFeeCap}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.loadFeeCap"
                            @blur="handleNumberInput('loadFeeCap')"
                            :class="{'is-invalid': !isValidLoadFeeCap}"
                            type="number"
                            min="0"
                            :placeholder="$t('reseller.create.table_header.load_fee_cap')"></fg-input>
                </div>
                <p v-if="!isValidLoadFeeCap" class="invalid-feedback">
                  <span v-if="!reseller.loadFeeCap"> {{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!reseller.loadFeeCap"> {{$t('common.form_validations.enter_a_positive_number')}}</span>
                </p>
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
                  <strong>{{reseller.loadFeebillMethod}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.loadFeebillMethod">
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
                  <strong>{{reseller.appFee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.appFee"
                            @blur="handleNumberInput('appFee')"
                            :class="{'is-invalid': !isValidAppFee}"
                            type="number"
                            min="0"
                            :placeholder="$t('reseller.create.table_header.app_fee')"></fg-input>
                </div>
                <p v-if="!isValidAppFee" class="invalid-feedback">
                  <span v-if="!reseller.appFee"> {{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!reseller.appFee"> {{$t('common.form_validations.enter_a_positive_number')}}</span>
                </p>
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
                  <strong>{{reseller.appFeeBillMethod}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.appFeeBillMethod">
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
                  <strong>{{reseller.monthlyFee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.monthlyFee"
                            @blur="handleNumberInput('monthlyFee')"
                            :class="{'is-invalid': !isValidMonthlyFee}"
                            type="number"
                            min="0"
                            :placeholder="$t('reseller.create.table_header.monthly_fee')"></fg-input>
                </div>
                <p v-if="!isValidMonthlyFee" class="invalid-feedback">
                  <span v-if="!reseller.monthlyFee"> {{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!reseller.monthlyFee"> {{$t('common.form_validations.enter_a_positive_number')}}</span>
                </p>
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
                  <strong>{{reseller.monthlyFeeBillMethod}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.monthlyFeeBillMethod">
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
                  <strong>{{reseller.apiFee}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.apiFee"
                            @blur="handleNumberInput('apiFee')"
                            :class="{'is-invalid': !isValidApiFee}"
                            type="number"
                            min="0"
                            :placeholder="$t('reseller.create.table_header.api_fee')"></fg-input>
                </div>
                <p v-if="!isValidApiFee" class="invalid-feedback">
                  <span v-if="!reseller.apiFee"> {{$t('common.form_validations.required_field')}}</span>
                  <span v-if="!reseller.apiFee"> {{$t('common.form_validations.enter_a_positive_number')}}</span>
                </p>
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
                  <strong>{{reseller.apiFeeBillMethod}}</strong>
                </div>
                <div v-else
                     class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.apiFeeBillMethod">
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

    <template v-if="isShowCorporativeBlock">

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

          <el-row :gutter="24" class="m-0">

            <el-col :md="12">
              <div class="form-group row">
                <label for="ref1" class="col-form-label"><strong>Ref 1</strong></label>
                <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref1}}</strong>
                <fg-input v-else
                          v-model="resellerCorporate.dynamicReferences.ref1" id="ref1"
                          :placeholder="'Ref 1'"></fg-input>
              </div>

              <div class="form-group row">
                <label for="ref2" class="col-form-label"><strong>Ref 2</strong></label>
                <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref2}}</strong>
                <fg-input v-else
                          v-model="resellerCorporate.dynamicReferences.ref2" id="ref2"
                          :placeholder="'Ref2'"></fg-input>
              </div>

              <div class="form-group row">
                <label for="ref3" class="col-form-label"><strong>Ref 3</strong></label>
                <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref3}}</strong>
                <fg-input v-else
                          v-model="resellerCorporate.dynamicReferences.ref3" id="ref3"
                          :placeholder="'Ref3'"></fg-input>
              </div>

              <div class="form-group row">
                <label for="ref4" class="col-form-label"><strong>Ref 4</strong></label>
                <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref4}}</strong>
                <fg-input v-else
                          v-model="resellerCorporate.dynamicReferences.ref4" id="ref4"
                          :placeholder="'Ref4'"></fg-input>
              </div>
            </el-col>

            <el-col :md="12">
              <div class="form-group row">
                <label for="ref5" class="col-form-label"><strong>Ref 5</strong></label>
                <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref5}}</strong>
                <fg-input v-else
                          v-model="resellerCorporate.dynamicReferences.ref51" id="ref5"
                          :placeholder="'Ref 5'"></fg-input>
              </div>

              <div class="form-group row">
                <label for="ref6" class="col-form-label"><strong>Ref 6</strong></label>
                <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref6}}</strong>
                <fg-input v-else
                          v-model="resellerCorporate.dynamicReferences.ref6" id="ref6"
                          :placeholder="'Ref6'"></fg-input>
              </div>

              <div class="form-group row">
                <label for="ref7" class="col-form-label"><strong>Ref 7</strong></label>
                <strong v-if="isView">{{resellerCorporate.dynamicReferences.ref7}}</strong>
                <fg-input v-else
                          v-model="resellerCorporate.dynamicReferences.ref7" id="ref7"
                          :placeholder="'Ref7'"></fg-input>
              </div>

              <div class="form-group row">
                <label for="ref8" class="col-form-label"><strong>Ref 8</strong></label>
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
              <p>When allocating money to a specific account, you can choose between 1 or 2 step load approval process.
                If
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
    </template>

    <div class="row">
      <div class="col-md-12">
        <div class="reseller-footer d-flex justify-content-center">
          <!--
          <p-button round type="primary" class="mr-3"
                    @click="handleAction()"
                    :class="{ 'disabled': !validateClientForm || !hasPermission([permission.RESELLER_SUBSCRIPTION_EDIT, permission.RESELLER_SUBSCRIPTION_CREATE])}">
            {{ $t(context === 'view' ? 'reseller.create.button.edit' : 'reseller.create.button.save') }}
          </p-button>
          -->

          <p-button round type="primary" class="mr-3"
                    @click="handleAction()"
                    :class="{ 'disabled': !validateClientForm }">
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
                  @click.native="handleModalAction()">Yes
        </p-button>
        <p-button round type="default"
                  @click.native="modals.visible = false">Cancel
        </p-button>
      </div>
    </modal>

    <Spinner v-if="isLoading"></Spinner>
  </div>
</template>
<script>
  import {permissionMixin} from '@/mixins/permission'
  import SlideYDownTransition from "vue2-transitions/src/Slide/SlideYDownTransition";
  import { mapActions, mapGetters, mapState } from "vuex"
  import {AbaModalEvents} from "../../../../main";
  import {
    ADD_RESELLER_SUBSCRIPTION,
    EDIT_RESELLER_SUBSCRTION_BY_ID,
    GET_ALL_CARD_PROGRAM,
    GET_RESELLER_SUBSCRTION_BY_ID,
    GETTER_ALL_CARDS,
    GETTER_LOADINGSTATE_RESELLER,
    GETTER_RESELLER_SUBSCRIPTION,
    SET_MODAL_TYPE,
    SHOW_TOAST_MESSAGE,
    GETTER_ALL_CARD_PROGRAM_CODE,
    GET_ALL_RESELLER_SUBSCRIPTIONS,
    GETTER_RESELLER_SUBSCRIPTIONS,
    ACTION_GET_COUNTRIES,
    GETTER_GET_COUNTRY_BY_CODE
  } from "@/store/types"
  import i18n from '@/i18n'
  import LOADING_STATE from '../../../../utils/loadingState'

  import createNewRowFromHeadings from "../../../../utils/createNewRowFromHeadings";
  import {
    breakInput,
    exactNumber,
    limitedCharNumber,
    mustBeAnEmail,
    shouldBeNumber,
    verifySpecialCharacter,
  } from "../../../../utils/formValidations";
  import {decimals} from "../../../../utils/inputMasks";
  import {
    toNumber,
    validateNumber
  } from "../../../../utils/numberInput";
  import Button from "../../../UIComponents/Button";
  import PButton from "../../../UIComponents/Button";
  import RegularTable from "../../../UIComponents/CeevoTables/RegularTable/RegularTable";
  import Loader from "../../../UIComponents/Loader";
  import Spinner from "../../../UIComponents/Spinner";
  import PRadio from "../../../UIComponents/Inputs/Radio";
  import {Modal} from 'src/components/UIComponents'
  import addIcon from '../../../../../public/static/img/dashboard_icons/ic_add.svg'
  import NAMED_ROUTES from '../../../../routes/nameRoutes'

  export default {
    name: "CreateCorparateModule",
    props: ['context'],
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
        id: '',
        isCancel: false,
        //editRoute: `/reseller/edit/`,
        corporativeProgram: 0,
        reseller: {},
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
            {name: '', preset: ''},
            {name: '', preset: ''},
          ],
        },
        resellerRequestPropDelete: [
          'cardProgCode',
          'defCurrency',
          'resellerId',
          'id',
        ],
        resellerRequestPropModify: [
          {name: 'apiFee', type: 'number'},
          {name: 'appFee', type: 'number'},
          {name: 'loadFee', type: 'number'},
          {name: 'loadFeeCap', type: 'number'},
          {name: 'loadFeePct', type: 'number'},
          {name: 'monthlyFee', type: 'number'},
          {name: 'uniqueFloat', type: 'boolean'},
        ],
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
          {name: 'Yes', value: 1},
          {name: 'No', value: 0},
        ],
        dynamicRef1: [
          {name: 'Ref 1', model: 'ref1'},
          {name: 'Ref 2', model: 're2'},
          {name: 'Ref 3', model: 're3'},
          {name: 'Ref 4', model: 'ref4'},
        ],
        actionBtn: 'save',
        validationList: [
          'apiFee',
          'apiFeeBillMethod',
          'appFee',
          'appFeeBillMethod',
          'cardProgramID',
          'loadFee',
          'loadFeeCap',
          'loadFeePct',
          'loadFeebillMethod',
          'monthlyFee',
          'monthlyFeeBillMethod',
          'status',
        ],
        validateArray: {
          resellerName: true,
          resellerCode: true,
          alertContact: true,
          uniqueFloat: true,
        },
      };
    },
    computed: {
      ...mapState({
        countries: state => state.countries.countries
      }),
      ...mapGetters({
        cardData: GETTER_ALL_CARDS,
        loadingState: GETTER_LOADINGSTATE_RESELLER,
        cpcList: GETTER_ALL_CARD_PROGRAM_CODE,
        resellerSubscription: GETTER_RESELLER_SUBSCRIPTIONS,
        getCountryByCode: GETTER_GET_COUNTRY_BY_CODE
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
      dynamicPdf() {
        return this.resellerCorporate.dynamic_pdf
      },
      isView() {
        return this.context === 'view'
      },
      isCreate() {
        return this.context === 'create'
      },
      isEdit() {
        return this.context === 'edit'
      },
      isLoading() {
        return this.loadingState !== LOADING_STATE.IDEAL
      },
      handleModalTitle() {
        if (this.actionBtn === 'save') {
          return 'Save Reseller Corporate Program'
        }
        return 'Discard changes?'
      },
      isShowCorporativeBlock() {
        if (this.isView) {
          return this.corporativeProgram
        }
        return true
      },
      validateClientForm() {
        let isValid = true
        if (!this.isViewMode && Object.keys(this.reseller).length !== 0) {
          this.validationList.forEach(item => {
            const field = this.reseller[`${item}`]
            if (typeof (field) === 'undefined' || field === '' || field === 0) {
              isValid = false
            }
            switch (item) {
              case'alertContact':
                this.validateArray.alertContact = this.isValidAlertContact
                break
              case'resellerName':
                this.validateArray.resellerName = this.isValidResellerName
                break
              case'resellerCode':
                this.validateArray.resellerCode = this.isValidResellerCode
                break
              case'uniqueFloat':
                this.validateArray.uniqueFloat = this.isValidUniqueFloat
                break
            }
          })

          if (typeof this.validateArray !== 'undefined') {
            Object.keys(this.validateArray).forEach(item => {
              if (!this.validateArray[item]) {
                return isValid = false
              }
            })
          }
        }

        return isValid
      },
      isValidResellerName() {
        return this.reseller.resellerName !== '' && this.verifyName(this.reseller.resellerName)
      },
      isValidResellerCode() {
        return (typeof (this.reseller.resellerCode) === 'undefined' || this.verifyContactRef(this.reseller.resellerCode))
      },
      isValidUniqueFloat() {
        return (typeof (this.reseller.uniqueFloat) === 'undefined')
      },
      isValidAlertContact() {
        return (typeof (this.reseller.alertContact) === 'undefined' || this.reseller.alertContact !== '' && this.verifyEmail(this.reseller.alertContact))
      },
      isValidLoadFee() {
        return validateNumber(this.reseller.loadFee)
      },
      isValidLoadFeeCap() {
        return validateNumber(this.reseller.loadFeeCap)
      },
      isValidLoadFeePct() {
        return validateNumber(this.reseller.loadFeePct)
      },
      isValidApiFee() {
        return validateNumber(this.reseller.apiFee)
      },
      isValidAppFee() {
        return validateNumber(this.reseller.appFee)
      },
      isValidMonthlyFee() {
        return validateNumber(this.reseller.monthlyFee)
      },
    },
    watch: {
      reseller(newVal){
        this.isStartEdit = true
      },
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
        this.reseller = this.modResellerModel(newVal)
      },
      editId(newVal, oldVal) {
        if (this.context === 'view' && newVal) {
          //this.context = 'edit'
        }
      },
      context(newVal) {
        if (newVal === 'create') {
          this.reseller = {}
        }
        this.getAllResellerSubscription()
      },
      $route(newVal, oldVal) {
        const {id} = newVal.params;
        
        if (!id) {        
          this.cardReseller = [createNewRowFromHeadings([
              ...this.tableHeadingsPack.main,
              ...this.tableHeadingsPack.secondary, ...this.tableHeadingsPack.third],
            'Reseller_new_row')];
          this.editId = 'Reseller_new_row';
        } else {
          // Update data
          this.loadData()
        }
      }
    },
    methods: {
      ...mapActions({
        addReseller: ADD_RESELLER_SUBSCRIPTION,
        getAllCardPrograms: GET_ALL_CARD_PROGRAM,
        editReseller: EDIT_RESELLER_SUBSCRTION_BY_ID,
        getResellerSubscripiton: GET_RESELLER_SUBSCRTION_BY_ID,
        getAllResellerSubscription: GET_ALL_RESELLER_SUBSCRIPTIONS,
        showModal: SET_MODAL_TYPE,
        getCountries: ACTION_GET_COUNTRIES
      }),
      modResellerModel(reseller) {
        reseller.uniqueFloat = Number(reseller.uniqueFloat)
        return reseller
      },
      modResellerRequest(reseller) {
        this.resellerRequestPropModify
          .forEach(property => {
            if (typeof reseller[property.name] !== 'undefined') {
              reseller[property.name] = this.checkModResellerType(property.type, reseller[property.name])
            }
          })

        return reseller
      },
      checkModResellerType(type, value) {
        switch (type) {
          case'number':
            return Number(value)
          case'boolean':
            return !!value
        }
      },
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
              //this.$router.push('/reseller/view')
            } else {
              this.dirty = false;
            }
            AbaModalEvents.$off(key)
          })
        }
      },
      listenToInput({value, valid, dirty}, table) {
        this.cardReseller = value;
        //console.log('value', value);
        this.dirty = this.dirty || !!dirty;
        this.valid = {
          ...this.valid,
          [table]: valid
        };
      },
      /*secondaryAction() {
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
      },*/
      handleAddPreset() {
        console.log('add another preset')
        this.resellerCorporate.dynamic_pdf.push({name: '', preset: ''})
      },
      handleCancelAction() {
        this.isCancel = true
        this.actionBtn = 'cancel'
        this.modals.visible = true
      },
      handleAction() {
        this.isCancel = false

        if (this.isView) {
          this.$router.push(this.editRoute)
        } else {
          this.isCancel = false
          this.modals.visible = true
          this.actionBtn = 'save'
        }
      },
      async handleModalAction() {
        this.modals.visible = false

        if (this.isCancel) {
          if (this.isView) {
            // We need to do this next tick because otherwise we encounter page scrollbar disappear
            // Looks like some conflict with modal
            this.$nextTick(() => {
              this.$router.push('/reseller/view')
            })            
          } else {
            if (this.resellerId) {
              this.$router.push(`/reseller/view/${this.resellerId}`)
            }
          }
          return
        }

        //console.log('Reseller:', this.reseller)
        const body = this.handleResellerRequestBody(this.reseller)
        //console.log('Body:', body)

        if (this.isEdit) {
          await this.editReseller({body, id: this.resellerId})
            .then(data => {
              if (data.status) {
                this.$router.push(`/reseller/view/${this.resellerId}`)
              }
            })
        }
        if (this.isCreate) {
          await this.addReseller(body)
            .then(data => {
              if (data && data.data && data.data.id) {
                this.$router.push(`/reseller/view/${data.data.id}`)
              }
            })
        }
      },
      handleResellerRequestBody(resellerData) {
        let reseller = JSON.parse(JSON.stringify(resellerData))
        this.resellerRequestPropDelete.forEach(name => {
          delete reseller[name]
        })
        reseller = this.modResellerRequest(reseller)
        return reseller
      },
      handleNumberInput(name) {
        this.reseller[`${name}`] = toNumber(event.target.value)
      },
      verifyEmail(email) {
        const emailCheck = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return emailCheck.test(email);
      },
      verifyName(name) {
        const nameCheck = /^[a-zA-Z ]{1,30}$/
        return nameCheck.test(name)
      },
      verifyContactRef(ref) {
        return ref !== '' && ref.length <= 6 && this.verifySpace(ref)
      },
      verifySpace(string) {
        const refCheck = /\s/
        return !refCheck.test(string)
      },
      loadData () {
        this.getAllCardPrograms()

        const { id } = this.$route.params

        if (id) {
          this.resellerId = id
          this.editRoute = `/reseller/edit/${this.resellerId}`
          // get the reseller subscription by id
          if (!this.isCreate) {
            this.getResellerSubscripiton(id)
          }
        }
        if (this.isCreate) {
          this.cardReseller = [createNewRowFromHeadings([...this.tableHeadingsPack.main,
            ...this.tableHeadingsPack.secondary, ...this.tableHeadingsPack.third], 'Reseller_new_row')];
          this.editId = 'Reseller_new_row';
          this.chagneCardProgramOptions(this.cardData)
        }
      }
    },
    created () {
      // Request countries if they not loaded yet
      this.getCountries()
    },
    mounted () {
      this.loadData()
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
    font-weight: bold;

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
      width: 100%;
    }

    .el-input__inner, .el-textarea__inner {
      border-radius: 10px !important;
      font-weight: bold;
    }

    .form-control {
      border-radius: 10px !important;
      font-weight: bold;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .reseller-form-column {
    /deep/ {
      .form-group {
        margin-bottom: 0;
        width: 100%;
      }

      .form-control {
        width: 100%;
      }
    }
  }

  .preset-title {
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
        & .form-group {
          width: 100%;
        & .form-control {
          //width: 360px !important;
          width: 100% !important;
        }
      }
    }

    & label.col-form-label {
      margin-left: 8px;
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

    .btn {
      height: 42px;
    }
  }

  /deep/ {
    .el-textarea__inner {
      padding: 5px 10px !important;
      resize: none;

      &::placeholder {
        color: $placeholder-color;
        font-weight: bold;
      }

      &:-ms-input-placeholder {
        color: $placeholder-color;
        font-weight: bold;
      }

      &::-ms-input-placeholder {
        color: $placeholder-color;
        font-weight: bold;
      }
    }

    .el-textarea__inner:focus {
      outline: none;
      border-color: #9A9A9A;
    }

    .form-control {
      &::placeholder {
        color: $placeholder-color;
        font-weight: bold;
      }

      &:-ms-input-placeholder {
        color: $placeholder-color;
        font-weight: bold;
      }

      &::-ms-input-placeholder {
        color: $placeholder-color;
        font-weight: bold;
      }
    }

    .el-textarea.is-disabled .el-textarea__inner {
      background-color: transparent !important;
      color: $label-color;
      font-weight: bold;
    }

    .modal-dialog {
      min-width: 760px;
      text-align: center;

      .modal-content {
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
            width: 175px !important;
            height: 44px;
            margin-bottom: 50px;
          }
        }
      }
    }

    .el-select .el-input:hover .el-input__icon,
    .el-select .el-input:hover input {
      color: $placeholder-color;
    }

  }

  .btn {
    text-transform: unset;
  }

  .invalid-feedback {
    display: block;
    margin: 0;
    position: absolute;
    font-weight: bold;
  }
</style>
