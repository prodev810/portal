<template>
  <div>
    <div class="card">
      <div class="card-content">
        <el-row class="reseller-form-column" :gutter="24">

          <!-- first column -->
          <el-col :md="11">
            <!-- switch -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong>{{$t('reseller.create.table_header.corporate_program')}}</strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{corporativeProgram | booleanToYesNoFormat}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <strong class="mr-1">No</strong>
                  <label class="switch">
                    <input v-model="corporativeProgram" type="checkbox">
                    <span class="slider round"></span>
                  </label>
                  <strong class="ml-1">Yes</strong>
                </div>
              </el-col>
            </el-row>

            <!-- cardProgramCode -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.card_program_id')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{ reseller.cardProgramID | cardProgramCode(cpcList) }}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.cardProgramID"
                            name="cardProgramID"
                            data-vv-as="card program id"
                            v-validate="requiredField" @change="cardProgramChange" >
                    <el-option v-for="(item, index) in cpcList" :key="index" :label="item.name" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('cardProgramID')" class="invalid-feedback">
                  {{ errors.first('cardProgramID') }}
                </p>
              </el-col>
            </el-row>

            <!-- kycClassifier -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.kycClassifier')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{ reseller.kycClassifier }}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.kycClassifier"
                            name="kycClassifier" data-vv-as="kyc classifier" v-validate="requiredField">
                    <el-option v-for="(data, index) in getKycClassifier" :key="index" :label="data.key" :value="data.value">
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('kycClassifier')" class="invalid-feedback">
                  {{ errors.first('kycClassifier') }}
                </p>
              </el-col>
            </el-row>

            <!-- resellerCode -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative  text-uppercase">{{$t('reseller.create.table_header.reseller_code')}}
                  <span v-if="!isView && !isEdit" class="required-field-symbol text-uppercase">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.resellerCode}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.resellerCode"
                            name="resellerCode" data-vv-as="reseller code" v-validate="validateResellerCode"
                            :class="{'is-invalid': errors.has('resellerCode')}"
                            :disabled="isEdit"
                            :max-length="6"
                            :placeholder="$t('reseller.create.table_header.reseller_code')"></fg-input>
                </div>
                <p v-if="errors.has('resellerCode')" class="invalid-feedback">
                  {{ errors.first('resellerCode') }}
                </p>
              </el-col>
            </el-row>

            <!-- resellerName -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.reseller_name')}}
                  <span v-if="!isView" class="required-field-symbol text-uppercase">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.resellerName}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.resellerName"
                            name="resellerName" data-vv-as="reseller name" v-validate="validateResellerName"
                            :class="{'is-invalid': errors.has('resellerName')}"
                            :placeholder="$t('reseller.create.table_header.reseller_name')"
                            :max-length="30"></fg-input>
                </div>
                <p v-if="errors.has('resellerName')" class="invalid-feedback">
                  {{ errors.first('resellerName') }}
                </p>
              </el-col>
            </el-row>

            <!-- uniqueFloat -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.unique_float')}}
                  <span v-if="!isView" class="required-field-symbol text-uppercase">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong class="text-capitalize">{{reseller.uniqueFloat | booleanToYesNoFormat}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.uniqueFloat" 
                            name="uniqueFloat" data-vv-as="unique float" v-validate="requiredField">
                    <el-option v-for="item in options.uniqueFloatValues" :key="item.value" :label="item.name" :value="item.value">{{item.name}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('uniqueFloat')" class="invalid-feedback">
                  {{ errors.first('uniqueFloat') }}
                </p>
              </el-col>
            </el-row>

            <!-- alertContact -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.alert_contact')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.alertContact}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.alertContact"
                            name="alertContact" data-vv-as="alert contact" v-validate="validateAlertContact"
                            type="email"
                            :max-length="35"
                            :class="{'is-invalid': errors.has('alertContact')}"
                            :placeholder="$t('reseller.create.table_header.alert_contact')"></fg-input>
                </div>
                <p v-if="errors.has('alertContact')" class="invalid-feedback">
                  {{ errors.first('alertContact') }}
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
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.status}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.status"
                            name="status" data-vv-as="status" v-validate="requiredField">
                    <el-option v-for="item in options.statusValues" :key="item.value" :label="item.value" :value="item.value">{{item.name}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('status')" class="invalid-feedback">
                  {{ errors.first('status') }}
                </p>
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
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{ getCountryByCode(reseller.countryCode) }}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.countryCode"
                            name="countryCode" data-vv-as="country code" v-validate="requiredField">
                    <el-option v-for="item in countries" :key="item.alpha2Code" :label="item.name" :value="item.alpha2Code">{{item.name}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('countryCode')" class="invalid-feedback">
                  {{ errors.first('countryCode') }}
                </p>
              </el-col>
            </el-row>

            <!-- feeProfileId -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.feeProfileId')}}
                  <span v-if="!isView" class="required-field-symbol">*</span>
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.feeProfileId}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.feeProfileId"
                            name="feeProfileId" data-vv-as="fee profile id" v-validate="validateFeeProfileId"
                            :class="{'is-invalid': errors.has('feeProfileId')}"
                            type="text"
                            :placeholder="$t('reseller.create.table_header.feeProfileId')"></fg-input>
                </div>
                <p v-if="errors.has('feeProfileId')" class="invalid-feedback">
                  {{ errors.first('feeProfileId') }}
                </p>
              </el-col>
            </el-row>

            <!-- address 1 -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{ $t('reseller.create.table_header.address1') }}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.address1}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.address1"
                            name="address1" data-vv-as="address1" v-validate="validateAddress"
                            type="text"
                            :class="{'is-invalid': errors.has('address1')}"
                            :placeholder="$t('reseller.create.table_header.address1')"></fg-input>
                </div>
                <p v-if="errors.has('address1')" class="invalid-feedback">
                  {{ errors.first('address1') }}
                </p>
              </el-col>
            </el-row>

            <!-- address 2 -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{ $t('reseller.create.table_header.address2') }}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.address2}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.address2"
                            name="address2" data-vv-as="address2" v-validate="validateAddress"
                            type="text"
                            :class="{'is-invalid': errors.has('address2')}"
                            :placeholder="$t('reseller.create.table_header.address2')"></fg-input>
                </div>
                <p v-if="errors.has('address2')" class="invalid-feedback">
                  {{ errors.first('address2') }}
                </p>
              </el-col>
            </el-row>

            <!-- address 3 -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{ $t('reseller.create.table_header.address3') }}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.address3}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.address3"
                            name="address3" data-vv-as="address3" v-validate="validateAddress"
                            type="text"
                            :class="{'is-invalid': errors.has('address3')}"
                            :placeholder="$t('reseller.create.table_header.address3')"></fg-input>
                </div>
                <p v-if="errors.has('address3')" class="invalid-feedback">
                  {{ errors.first('address3') }}
                </p>
              </el-col>
            </el-row>

            <!-- city -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{ $t('reseller.create.table_header.city') }}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.city}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.city"
                            name="city" data-vv-as="city" v-validate="validateCityOrCounty"
                            type="text"
                            :class="{'is-invalid': errors.has('city')}"
                            :placeholder="$t('reseller.create.table_header.city')"></fg-input>
                </div>
                <p v-if="errors.has('city')" class="invalid-feedback">
                  {{ errors.first('city') }}
                </p>
              </el-col>
            </el-row>

            <!-- countyOrState -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{ $t('reseller.create.table_header.countyOrState') }}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.countyOrState}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.countyOrState"
                            name="countyOrState" data-vv-as="county or state" v-validate="validateCityOrCounty"
                            type="text"
                            :class="{'is-invalid': errors.has('countyOrState')}"
                            :placeholder="$t('reseller.create.table_header.countyOrState')"></fg-input>
                </div>
                <p v-if="errors.has('countyOrState')" class="invalid-feedback">
                  {{ errors.first('countyOrState') }}
                </p>
              </el-col>
            </el-row>

            <!-- postcode -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{ $t('reseller.create.table_header.postCode') }}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.postCode}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.postCode"
                            name="postCode" data-vv-as="post code" v-validate="validatePostCode"
                            type="text"
                            :class="{'is-invalid': errors.has('postCode')}"
                            :placeholder="$t('reseller.create.table_header.postCode')"></fg-input>
                </div>
                <p v-if="errors.has('postCode')" class="invalid-feedback">
                  {{ errors.first('postCode') }}
                </p>
              </el-col>
            </el-row>

            <!-- cardName -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{ $t('reseller.create.table_header.cardName') }}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.cardName}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.cardName"
                            name="cardName" data-vv-as="card name" v-validate="validateCardName"
                            type="text"
                            :max-length="20"
                            :class="{'is-invalid': errors.has('cardName')}"
                            :placeholder="$t('reseller.create.table_header.cardName')"></fg-input>
                </div>
                <p v-if="errors.has('cardName')" class="invalid-feedback">
                  {{ errors.first('cardName') }}
                </p>
              </el-col>
            </el-row>
          </el-col>

          <!-- second column -->
          <el-col :md="13">

            <!-- loadFee -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.loadFee}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.loadFee" @input="refreshLoadFeeValidate"
                            name="loadFee" data-vv-as="load fee" v-validate="validateLoadFeeInput"
                            :class="{'is-invalid': !errors.has('loadFee')}"
                            type="text"
                            :placeholder="$t('reseller.create.table_header.load_fee')"></fg-input>
                </div>
                <p v-if="errors.has('loadFee')" class="invalid-feedback">
                  {{ errors.first('loadFee') }}
                </p>
              </el-col>
            </el-row>

            <!-- loadFeePct -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee_pct')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.loadFeePct}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.loadFeePct" @input="refreshLoadFeeValidate"
                            name="loadFeePct" data-vv-as="load fee pct" v-validate="validateLoadFeeInput"
                            :class="{'is-invalid': errors.has('loadFeePct')}"
                            type="text"
                            :placeholder="$t('reseller.create.table_header.load_fee_pct')"></fg-input>
                </div>
                <p v-if="errors.has('loadFeePct')" class="invalid-feedback">
                  {{ errors.first('loadFeePct') }}
                </p>
              </el-col>
            </el-row>

            <!-- loadFeeCap -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee_cap')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.loadFeeCap}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.loadFeeCap" @input="refreshLoadFeeValidate"
                            name="loadFeeCap" data-vv-as="load fee cap" v-validate="validateLoadFeeInput"
                            :class="{'is-invalid': errors.has('loadFeeCap')}"
                            type="text"
                            :placeholder="$t('reseller.create.table_header.load_fee_cap')"></fg-input>
                </div>
                <p v-if="errors.has('loadFeeCap')" class="invalid-feedback">
                  {{ errors.first('loadFeeCap') }}
                </p>
              </el-col>
            </el-row>

            <!-- loadFeebillMethod -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.load_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.loadFeebillMethod}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.loadFeebillMethod" @change="refreshLoadFeeValidate"
                            name="loadFeebillMethod" data-vv-as="load fee bill method" v-validate="isLoadFeeGroupRequired">
                    <el-option v-for="item in options.chargedToValues" :key="item.name" :label="item.value" :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('loadFeebillMethod')" class="invalid-feedback">
                  {{ errors.first('loadFeebillMethod') }}
                </p>
              </el-col>
            </el-row>

            <!-- appFee -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.app_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.appFee}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.appFee" @input="refreshAppFeeValidate"
                            name="appFee" data-vv-as="app fee" v-validate="validateAppFeeInput"
                            :class="{'is-invalid': errors.has('appFee')}"
                            :placeholder="$t('reseller.create.table_header.app_fee')"
                            type="text"></fg-input>
                </div>
                <p v-if="errors.has('appFee')" class="invalid-feedback">
                  {{ errors.first('appFee') }}
                </p>
              </el-col>
            </el-row>

            <!-- appFeeBillMethod -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.app_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.appFeeBillMethod}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.appFeeBillMethod" @change="refreshAppFeeValidate"
                            name="appFeeBillMethod" data-vv-as="app fee bill method" v-validate="isAppFeeGroupRequired">
                    <el-option v-for="item in options.chargedToAppFee" :key="item.name" :label="item.value" :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('appFeeBillMethod')" class="invalid-feedback">
                  {{ errors.first('appFeeBillMethod') }}
                </p>
              </el-col>
            </el-row>

            <!-- monthlyFee -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.monthly_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.monthlyFee}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.monthlyFee" @input="refreshMonthlyFeeValidate"
                            name="monthlyFee" data-vv-as="monthly fee" v-validate="validateMonthlyFeeInput"
                            :class="{'is-invalid': errors.has('monthlyFee')}"
                            type="text"
                            :placeholder="$t('reseller.create.table_header.monthly_fee')"></fg-input>
                </div>
                <p v-if="errors.has('monthlyFee')" class="invalid-feedback">
                  {{ errors.first('monthlyFee') }}
                </p>
              </el-col>
            </el-row>

            <!-- monthlyFeeBillMethod -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.monthly_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.monthlyFeeBillMethod}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.monthlyFeeBillMethod" @change="refreshMonthlyFeeValidate"
                            name="monthlyFeeBillMethod" data-vv-as="monthly fee bill method" v-validate="isMonthlyFeeGroupRequired">
                    <el-option v-for="item in options.chargedToValues" :key="item.name" :label="item.value" :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('monthlyFeeBillMethod')" class="invalid-feedback">
                  {{ errors.first('monthlyFeeBillMethod') }}
                </p>
              </el-col>
            </el-row>

            <!-- apiFee -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.api_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.apiFee}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.apiFee" @input="refreshApiFeeValidate"
                            name="apiFee" data-vv-as="api fee" v-validate="validateApiFeeInput"
                            :class="{'is-invalid': errors.has('apiFee')}"
                            type="text"
                            :placeholder="$t('reseller.create.table_header.api_fee')"></fg-input>
                </div>
                <p v-if="errors.has('apiFee')" class="invalid-feedback">
                  {{ errors.first('apiFee') }}
                </p>
              </el-col>
            </el-row>

            <!-- apiFeeBillMethod -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.api_fee_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.apiFeeBillMethod}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.apiFeeBillMethod" @change="refreshApiFeeValidate"
                            name="apiFeeBillMethod" data-vv-as="api fee bill method" v-validate="isApiFeeGroupRequired">
                    <el-option v-for="item in options.chargedToApiValues" :key="item.name" :label="item.value" :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('apiFeeBillMethod')" class="invalid-feedback">
                  {{ errors.first('apiFeeBillMethod') }}
                </p>
              </el-col>
            </el-row>

            <!-- virtualCardFee -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.virtual_card_fee')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.virtualCardFee}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <fg-input v-model="reseller.virtualCardFee" @input="refreshVirtualCardFeeValidate"
                            name="virtualCardFee" data-vv-as="virtual card fee" v-validate="validateVirtualCardFeeInput"
                            :class="{'is-invalid': errors.has('virtualCardFee')}"
                            type="text"
                            :placeholder="$t('reseller.create.table_header.virtual_card_fee')"></fg-input>
                </div>
                <p v-if="errors.has('virtualCardFee')" class="invalid-feedback">
                  {{ errors.first('virtualCardFee') }}
                </p>
              </el-col>
            </el-row>

            <!-- virtualCardBillMethod -->
            <el-row class="w-100 d-flex align-items-center mb-3">
              <el-col :md="7">
                <strong class="position-relative text-uppercase">{{$t('reseller.create.table_header.virtual_card_bill_method')}}
                </strong>
              </el-col>
              <el-col :md="17">
                <div v-if="isView" class="w-100 d-flex align-items-center">
                  <strong>{{reseller.virtualCardBillMethod}}</strong>
                </div>
                <div v-else class="w-100 d-flex align-items-center">
                  <el-select v-model="reseller.virtualCardBillMethod" @change="refreshVirtualCardFeeValidate"
                            name="virtualCardBillMethod" data-vv-as="virtual card bill method" v-validate="isVirtualCardFeeGroupRequired">
                    <el-option v-for="item in options.chargedTovirtualCard" :key="item.name" :label="item.value" :value="item.value">{{item.value}}
                    </el-option>
                  </el-select>
                </div>
                <p v-if="errors.has('virtualCardBillMethod')" class="invalid-feedback">
                  {{ errors.first('virtualCardBillMethod') }}
                </p>
              </el-col>
            </el-row>

          </el-col>
        </el-row>

        <!-- Corporate module -->
        <template>

          <!-- Dynamic References -->
          <div class="card reseller-dynamic-references" :class="{disabled: isStandardMode}">
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
                <template v-if="reseller.virtualFields">
                  <el-col :md="12">
                    <div class="form-group row" v-for="(virtualField, key) in reseller.virtualFields.slice(0,Math.round(reseller.virtualFields.length / 2))" :key="key">
                      <label :for="`ref${virtualField.fieldNumber}`" class="col-form-label">
                        <strong>Ref {{ virtualField.fieldNumber }}</strong>
                      </label>
                      <strong v-if="isView">{{ virtualField.fieldName }}</strong>
                      <fg-input v-else v-model="virtualField.fieldName" :id="`ref${virtualField.fieldNumber}`" :placeholder="`Ref ${virtualField.fieldNumber}`"></fg-input>
                    </div>
                  </el-col>

                  <el-col :md="12">
                    <div class="form-group row" v-for="(virtualField, key) in reseller.virtualFields.slice(Math.round(reseller.virtualFields.length / 2), reseller.virtualFields.length)" :key="key">
                      <label :for="`ref${virtualField.fieldNumber}`" class="col-form-label">
                        <strong>Ref {{ virtualField.fieldNumber }}</strong>
                      </label>
                      <strong v-if="isView">{{ virtualField.fieldName }}</strong>
                      <fg-input v-else v-model="virtualField.fieldName" :id="`ref${virtualField.fieldNumber}`" :placeholder="`Ref ${virtualField.fieldNumber}`"></fg-input>
                    </div>
                  </el-col>
                </template>
              </el-row>
            </div>
          </div>

          <!-- 2 step validation - Account funding -->
          <div class="card reseller-account-funding" :class="{disabled: isStandardMode}">
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
                  <strong v-if="isView">{{reseller.twoStepValidateRequired | booleanToYesNoFormat}}</strong>

                  <div v-else
                      class="d-inline-flex">
                    <strong class="mr-1">No</strong>
                    <label class="switch">
                      <input v-model="reseller.twoStepValidateRequired" type="checkbox">
                      <span class="slider round"></span>
                    </label>
                    <strong class="ml-1">Yes</strong>
                  </div>
                </el-col>

                <el-col :md="24">
                  <label for="break-value" class="row-label"><strong>Break value 1</strong></label>
                  <strong v-if="isView">{{reseller.breakValue}}</strong>
                  <fg-input v-else
                            v-model="reseller.breakValue"
                            :placeholder="'Break value 1'"
                            type="text"
                            id="break-value"></fg-input>
                </el-col>
              </el-row>

            </div>
          </div>

          <!-- PDF Dynamic Text -->
          <div class="card reseller-pdf-dynamic" :class="{disabled: isStandardMode}">
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

              <el-row v-for="(preset, index) in reseller.virtualPresets" :key="index">
                <el-col :md="24" class="mb-4">
                  <div class="form-group">
                    <el-col :md="4">
                      <label class="mb-2" for="preset1">
                        <strong class="preset-title">Preset {{index + 1}}</strong>
                      </label>
                      <p v-if="isView">
                        <span class="mr-2">Preset Name:</span>
                        {{preset.presetName}}
                      </p>
                      <fg-input v-else
                                v-model="preset.presetName"
                                id="preset1"
                                placeholder="Preset name"></fg-input>
                    </el-col>
                    <el-col :md="24">
                      <el-input type="textarea" :disabled="isView"
                                :rows="6" placeholder="Please input"
                                v-model="preset.content">
                      </el-input>
                    </el-col>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col>
                  <p-button v-if="!isView" round @click="handleAddPreset">
                    <img :src="ui.addIcon" alt="icon">
                    Add another preset
                  </p-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </template>

        <!-- button -->
        <div class="row">
          <div class="col-md-12">
            <div class="reseller-footer d-flex justify-content-center">
              <p-button round
                        type="primary"
                        class="mr-3"
                        @click="handleAction('submit')"
                        :class="{ 'disabled': !hasPermission(getSubmitPermission) || (!isView && (!isComplete || errors.any())) }">
                {{ $t(submitActionButtonName) }}
              </p-button>

              <p-button round @click="handleAction('cancel')">
                {{ $t(cancelActionButtonName) }}
              </p-button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- confirm modal -->
    <modal :show.sync="modals.visible" footer-classes="justify-content-center" type="notice">
      <h5 slot="header" class="modal-title">{{ modalTitle }}</h5>
      <template>
        <strong v-if="isCreate">Are you sure you want to save Reseller Corporate Program</strong>
      </template>
      <div slot="footer" class="w-50 d-flex justify-content-between">
        <p-button round type="success" @click.native="handleModalAction('submit')">
          Yes
        </p-button>
        <p-button round type="default" @click.native="handleModalAction('cancel')">
          Cancel
        </p-button>
      </div>
    </modal>

    <!-- loading -->
    <Spinner v-if="ui.isLoading"></Spinner>
  </div>
</template>

<script>
import addIcon from '../../../../../public/static/img/dashboard_icons/ic_add.svg'
import Button from "../../../UIComponents/Button";
import PButton from "../../../UIComponents/Button";
import {Modal} from 'src/components/UIComponents'
import Spinner from "../../../UIComponents/Spinner";
import { permissionMixin } from '@/mixins/permission'
import { mapActions, mapGetters, mapState } from "vuex"
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
  GETTER_GET_COUNTRY_BY_CODE,
  GETTER_GET_KYC_CLASSIFIER,
  ACTION_GET_KYC_CLASSIFIER
} from "@/store/types"

const RESELLER_TYPE = {
  STANDARD: 'STANDARD',
  CORPORATE: 'CORPORATE',
}

const VIEW_OPERATION_TYPE = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  EDIT: 'EDIT'
}

const BUTTON_ACTION_TYPE = {
  CANCEL: 'CANCEL',
  SUBMIT: 'SUBMIT'
}

const VIRTUAL_FIELDS_LENGTH = 8
const VIRTUAL_PRESETS_LENGTH = 2

const options = {
  uniqueFloatValues: [
    {name: 'Yes', value: true},
    {name: 'No', value: false},
  ],
  statusValues: [
    {name: 'Active', value: 'ACTIVE'},
    {name: 'Closed', value: 'CLOSED'},
    {name: 'Pending Approval', value: 'PENDING'}
  ],
  chargedTovirtualCard: [
    {name: 'FLOAT', value: 'FLOAT'},
    {name: 'INVOICE', value: 'INVOICE'}
  ],
  chargedToApiValues: [
    {name: 'FLOAT', value: 'FLOAT'},
    {name: 'INVOICE', value: 'INVOICE'}
  ],
  chargedToValues: [
    {name: 'ACCOUNT', value: 'ACCOUNT'},
    {name: 'FLOAT', value: 'FLOAT'},
    {name: 'INVOICE', value: 'INVOICE'}
  ],
  chargedToAppFee:[
  {name: 'FLOAT', value: 'FLOAT'},
  {name: 'INVOICE', value: 'INVOICE'}
  ],
}

function defaultResllerField() {
  return {
    cardProgramID: '', // required
    kycClassifier: '', // required
    resellerCode: '', // required
    resellerName: '', // required
    uniqueFloat: '', // required
    alertContact: '', // required
    status: '', // required [PENDING, ACTIVE or CLOSED]
    countryCode: '', // required

    loadFee: '', // load fee group
    loadFeePct: '', // load fee group
    loadFeeCap: '', // load fee group
    loadFeebillMethod: '', // load fee group [FLOAT, ACCOUNT or INVOICE]

    appFee: '', // app fee group
    appFeeBillMethod: '', // app fee group [FLOAT, ACCOUNT or INVOICE]

    monthlyFee: '', // monthly fee group
    monthlyFeeBillMethod: '', // monthly fee group

    apiFee: '', // api fee group
    apiFeeBillMethod: '', // api fee group

    virtualCardFee: '', // virtual card fee group
    virtualCardBillMethod: '', // virtual card fee group [FLOAT, ACCOUNT or INVOICE]

    address1: '', // address fields
    address2: '', // address fields
    address3: '', // address fields
    city: '', // address fields
    countyOrState: '', // address fields
    postCode: '', // address fields

    resellerType: RESELLER_TYPE.STANDARD, // [STANDARD or CORPORATE]

    virtualFields: [],
    virtualPresets: [],

    twoStepValidateRequired: false,
    breakValue: '',
    cardName: '',
    feeProfileId: ''
  }
}

function handleVirtualPresetsForRequestData(virtualPresets) {
  let arr = []
  for (const obj of virtualPresets) {
    if (obj.content !== '' || obj.presetName !== '') {
      arr.push(obj)
    }
  }
  return arr
}

export default {
  name: 'create-corporate-module',
  components: {
    [Button.name]: Button,
    PButton,
    Spinner,
    Modal
  },
  mixins: [
    permissionMixin
  ],
  data() {
    return {
      options,
      viewOperationType: '',
      buttonActionType: '',
      corporativeProgram: false,
      ui: {
        addIcon,
        isLoading: false
      },
      modals: {
        visible: false
      },
      reseller: {},
    }
  },
  watch: {
    '$route': function() {
      this.init()
    },
    'reseller.cardProgramID': function(val) {
      if (val && val.trim() !== '') {
        this.loadKycClassifierByCardProgramId(val)
      }
    },
    getKycClassifier: function(data) {
      if (data && data.length === 1) {
        this.reseller.kycClassifier = data[0].key
      }
    },
    corporativeProgram: function (val) {
      this.reseller.resellerType = val === true ? RESELLER_TYPE.CORPORATE : RESELLER_TYPE.STANDARD
    },
    resellerSubscription: function(data) {
      this.reseller = data
      this.corporativeProgram = this.reseller.resellerType === RESELLER_TYPE.CORPORATE
      this.reseller.virtualFields = this.handleVirtualFields(this.reseller.virtualFields)
      if (this.isEdit && (!this.reseller.virtualPresets || this.reseller.virtualPresets.length === 0)) {
        for (let i = 0; i < VIRTUAL_PRESETS_LENGTH; i++) {
          this.handleAddPreset()
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.reseller = {}
  },
  computed: {
    ...mapState({
      countries: state => state.countries.countries
    }),
    ...mapGetters({
      cpcList: GETTER_ALL_CARD_PROGRAM_CODE,
      getCountryByCode: GETTER_GET_COUNTRY_BY_CODE,
      getKycClassifier: GETTER_GET_KYC_CLASSIFIER,
      resellerSubscription: GETTER_RESELLER_SUBSCRIPTION,
    }),
    isStandardMode() {
      return this.reseller.resellerType === RESELLER_TYPE.STANDARD
    },
    modalTitle() {
      if (this.isEdit && this.buttonActionType === BUTTON_ACTION_TYPE.CANCEL) {
        return 'Discard changes?'
      }
      return 'Save Reseller Corporate Program'
    },
    isComplete() {
      return this.reseller.cardProgramID !== '' && this.reseller.kycClassifier !== ''
              && this.reseller.resellerCode !== '' && this.reseller.resellerName !== ''
              && this.reseller.uniqueFloat !== '' && this.reseller.alertContact !== ''
              && this.reseller.status !== '' && this.reseller.countryCode !== ''
    },
    submitActionButtonName() {
      if (this.isView) {
        return 'reseller.create.button.edit'
      } else {
        return 'reseller.create.button.save'
      }
    },
    cancelActionButtonName() {
      if (this.isView) {
        return 'reseller.create.button.back'
      } else if (this.isEdit) {
        return 'reseller.create.button.cancel'
      } else {
        return 'reseller.create.button.gotoList'
      }
    },
    isView() {
      return this.viewOperationType === VIEW_OPERATION_TYPE.VIEW
    },
    isEdit() {
      return this.viewOperationType === VIEW_OPERATION_TYPE.EDIT
    },
    isCreate() {
      return this.viewOperationType === VIEW_OPERATION_TYPE.CREATE
    },
    commonFeeValidateRules() {
      return {
        regex: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
        min_value: 0.00,
        max_value: 999999.99,
        notAllowCharactersAtLast: ['.']
      }
    },
    requiredField() {
      return {
        required: true
      }
    },
    validateResellerCode() {
      return Object.assign({}, this.requiredField, {
        max: 6,
        alpha_num: true,
      })
    },
    validateResellerName() {
      return Object.assign({}, this.requiredField, {
        max: 30,
        regex: /^[a-zA-Z0-9\-&.,\/\s]+$/,
        notAllowCharactersAtFirst: [' '],
        notAllowCharactersAtLast: [' ']
      })
    },
    validateAlertContact() {
      return Object.assign({}, this.requiredField, {
        email: true,
        max: 35,
      })
    },
    validateAddress() {
      return {
        regex: /^[a-zA-Z0-9\-\+()#&:.,\/\'\s]+$/,
        max: 30,
        notAllowCharactersAtFirst: [' '],
        notAllowCharactersAtLast: [' ']
      }
    },
    validateCityOrCounty() {
      return {
        regex: /^[a-zA-Z0-9\-\s]+$/,
        max: 30,
        notAllowCharactersAtFirst: [' '],
        notAllowCharactersAtLast: [' ']
      }
    },
    validatePostCode() {
      return {
        regex: /^[a-zA-Z0-9\-\s]+$/,
        max: 15,
        notAllowCharactersAtFirst: [' '],
        notAllowCharactersAtLast: [' ']
      }
    },
    validateCardName() {
      return {
        regex: /^[a-zA-Z0-9\s]+$/,
        max: 20,
        notAllowCharactersAtFirst: [' '],
        notAllowCharactersAtLast: [' ']
      }
    },
    isAppFeeGroupRequired() {
      return {
        required: (this.reseller.appFeeBillMethod !== null && this.reseller.appFeeBillMethod !== '')
        || (this.reseller.appFee !== null && this.reseller.appFee !== '')
      }
    },
    validateAppFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isAppFeeGroupRequired)
    },
    isApiFeeGroupRequired() {
      return {
        required: (this.reseller.apiFee !== null && this.reseller.apiFee !== '')
        || (this.reseller.apiFeeBillMethod !== null && this.reseller.apiFeeBillMethod !== '')
      }
    },
    validateApiFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isApiFeeGroupRequired)
    },
    isLoadFeeGroupRequired() {
      return {
        required: (this.reseller.loadFee !== null && this.reseller.loadFee !== '')
        || (this.reseller.loadFeePct !== null && this.reseller.loadFeePct !== '')
        || (this.reseller.loadFeeCap !== null && this.reseller.loadFeeCap !== '')
        || (this.reseller.loadFeebillMethod !== null && this.reseller.loadFeebillMethod !== '')
      }
    },
    validateLoadFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isLoadFeeGroupRequired)
    },
    isVirtualCardFeeGroupRequired() {
      return {
        required: (this.reseller.virtualCardFee !== null && this.reseller.virtualCardFee !== '')
        || (this.reseller.virtualCardBillMethod !== null && this.reseller.virtualCardBillMethod !== '')
      }
    },
    validateVirtualCardFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isVirtualCardFeeGroupRequired)
    },
    isMonthlyFeeGroupRequired() {
      return {
        required: (this.reseller.monthlyFee !== null && this.reseller.monthlyFee !== '')
        || (this.reseller.monthlyFeeBillMethod !== null && this.reseller.monthlyFeeBillMethod !== '')
      }
    },
    validateMonthlyFeeInput() {
      return Object.assign({}, this.commonFeeValidateRules, this.isMonthlyFeeGroupRequired)
    },
    validateFeeProfileId() {
      return Object.assign({}, this.requiredField, {
        regex: /^([0]|[1-9][0-9]*)$/,
        min_value: 1,
        max_value: 99
      })
    },
    getSubmitPermission () {
      if (this.isEdit || this.isView) {
        return this.permission.RESELLER_SUBSCRIPTION_EDIT
      } else {
        return this.permission.RESELLER_SUBSCRIPTION_CREATE
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
      getCountries: ACTION_GET_COUNTRIES,
      loadKycClassifierByCardProgramId: ACTION_GET_KYC_CLASSIFIER
    }),
    handleAddPreset() {
      this.reseller.virtualPresets.push({
        presetName: '',
        content: '',
        format: 'TEXT'
      })
    },
    async handleAction(type) {
      if (type === 'submit') {
        if (this.isView) {
          this.$router.push({ name: 'Reseller Edit', param: { id: this.$route.params.id } })
        } else {
          const isValid = await this.$validator.validateAll()
          if (!isValid) {
            console.error('fields does not valid.')
            return;
          }
          this.modals.visible = true
        }
        this.buttonActionType = BUTTON_ACTION_TYPE.SUBMIT
      } else {
        this.buttonActionType = BUTTON_ACTION_TYPE.CANCEL
        if (this.isView) {
          this.$router.push({ name: 'Resellers View' })
        } else if (this.isEdit) {
          this.modals.visible = true
        } else {
          this.$router.push({ name: 'Resellers View' })
        }
      }
    },
    async handleModalAction(type) {

      if (type === 'cancel') {
        this.modals.visible = false
        return;
      }

      if (type === 'submit' && this.buttonActionType === BUTTON_ACTION_TYPE.CANCEL) {
        this.modals.visible = false
        this.$router.push({ name: 'Reseller View', params: { id: this.$route.params.id } })
        return;
      }

      const isValid = await this.$validator.validateAll()
      if (!isValid) {
        console.error('fields does not valid.')
        return;
      }

      if (type === 'submit' && this.buttonActionType === BUTTON_ACTION_TYPE.SUBMIT) {
        let id = ''
        try {
          this.ui.isLoading = true
          if (this.isEdit) {
            const ignoreFields = ['id', 'resellerId', 'defCurrency']
            let requestData = {}
            for (const key in this.reseller) {
              if (key === 'virtualPresets') {
                requestData[key] = handleVirtualPresetsForRequestData(this.reseller[key])
              } else if (ignoreFields.indexOf(key) === -1) {
                requestData[key] = this.reseller[key]
              }
            }
            await this.editReseller({id: this.reseller.id, body: requestData})
            id = this.$route.params.id
          } else {
            let requestData = {}
            for (const key in this.reseller) {
              if (key === 'virtualPresets') {
                requestData[key] = handleVirtualPresetsForRequestData(this.reseller[key])
              } else {
                requestData[key] = this.reseller[key]
              }
            }

            const data = await this.addReseller(requestData)
            id = data.data.id
          }
          this.modals.visible = false
          this.$router.push({ name: 'Reseller View', params: { id } })
          this.ui.isLoading = false
        } catch(e) {
          this.ui.isLoading = false
          console.error(e)
        }
      }
    },
    handleVirtualFields(data) {
      const arr = []
      for(let i = 0; i < VIRTUAL_FIELDS_LENGTH; i++) {
        const fieldNumber = i + 1
        let fieldObj = {
          fieldName: '',
          fieldNumber: fieldNumber
        }

        if (data && data.length > 0) {
          for(const field of data) {
            if (field.fieldNumber === fieldNumber) {
              fieldObj = field
            }
          }
        }
        arr.push(fieldObj)
      }
      return arr
    },
    async init() {
      this.ui.isLoading = true

      let requestList = []
      requestList.push(this.getCountries())
      requestList.push(this.getAllCardPrograms())
      await Promise.all(requestList)

      if (this.$route.name === 'Reseller Create') {
        this.corporativeProgram = false
        this.viewOperationType = VIEW_OPERATION_TYPE.CREATE
        this.reseller = defaultResllerField()
        this.reseller.virtualFields = this.handleVirtualFields(null)

        for (let i = 0; i < VIRTUAL_PRESETS_LENGTH; i++) {
          this.handleAddPreset()
        }
        this.$validator.reset()
      }

      if (this.$route.name === 'Reseller Edit' || this.$route.name === 'Reseller View') {
        if (this.$route.name === 'Reseller View') {
          this.viewOperationType = VIEW_OPERATION_TYPE.VIEW
        } else {
          this.viewOperationType = VIEW_OPERATION_TYPE.EDIT
        }
        await this.getResellerSubscripiton(this.$route.params.id)
      }

      this.ui.isLoading = false
    },
    cardProgramChange(value) {
      console.log('cardProgramChange', value)
      this.reseller.kycClassifier = ''
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
    refreshVirtualCardFeeValidate() {
			this.commonRefreshValidate(['virtualCardFee', 'virtualCardBillMethod'])
		},
		commonRefreshValidate(fields) {
			this.$nextTick(() => {
				this.$validator.validateAll(fields)
			})
		}
  },
  filters: {
    booleanToYesNoFormat: (value) => {
      return value ? 'Yes' : 'No'
    },
    cardProgramCode: (id, list) => {
      const cpc = list.find(data => {
        return data.value === id
      })
      if (cpc) {
        return cpc.name
      }
      return ''
    }
  }
}
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
    margin-top: 0px;
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