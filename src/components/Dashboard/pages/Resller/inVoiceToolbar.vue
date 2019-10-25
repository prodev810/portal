<template>
  <div class="d-flex w-100 align-items-center flex-wrap">

    <div class="mt-2 mb-4 d-flex mr-auto align-items-center w-100">

      <div class="span-blod mr-0 mr-sm-3">
        <span>{{ $t('invoice.search_filter.label.card_program_code') }}</span>
        <span>{{ cardProgCode }}</span>
      </div>

      <div class="span-blod mr-0 mr-sm-3">
        <span>{{ $t('invoice.search_filter.label.reseller_code') }}</span>
        <span>{{ resellerCode }}</span>
      </div>

      <div class="span-blod mr-0 mr-sm-3">
        <span>{{ $t('invoice.search_filter.label.currency_code') }}</span>
        <span>{{ currencyCode }}</span>
      </div>

    </div>
    <div class="mt-2 mb-4 d-flex mr-auto align-items-center w-100">
      <el-alert v-if="dateRangeError !== ''" :title="dateRangeError" type="error" center show-icon :closable="false"></el-alert>
    </div>
    <div class="mt-2 mb-2 d-flex mr-auto align-items-center">
      <div class="from-date">
          <span>{{ $t('invoice.search_filter.label.from') }}</span>
          <el-date-picker
            @input="handleFromDate"
            :value="fromDate"
            type="date"
            placeholder="Pick Starting Date"
            :picker-options="fromDatePickerOptions"
            :clearable="false"
            :editable="false"
            value-format="timestamp"
          >
          </el-date-picker>
      </div>
      <div class="to-date">
        <span>{{ $t('invoice.search_filter.label.to') }}</span>
        <el-date-picker
          @input="handleToDate"
          :value="toDate"
          type="date"
          placeholder="Pick Ending Date"
          :picker-options="toDatePickerOptions"
          :clearable="false"
          :editable="false"
          value-format="timestamp"
        ></el-date-picker>
      </div>
    </div>

    <!-- button -->
    <div class="d-flex ml-auto pr-2 align-items-center btn-invoices-content">
      <div>
        <p-button round @click="buttonClick" type="primary" :disabled="buttonDisabled">
          {{ $t('invoice.search_filter.button.search') }}
        </p-button>
      </div>
    </div>
    <!-- button -->
  </div>
</template>
<script>
  import {Button, DatePicker, Input, Option, Select, Alert} from 'element-ui';
  import PButton from "../../../UIComponents/Button";
  import RegularTable from "../../../UIComponents/CeevoTables/RegularTable/RegularTable";
  import Modal from "../../../UIComponents/Modal";
  import InVoiceToolbar from "./inVoiceToolbar";

  export default {
    name: "inVoiceToolbar",
    components: {
      InVoiceToolbar,
      Modal,
      PButton,
      RegularTable,
      [Input.name]: Input,
      [Button.name]: Button,
      [Option.name]: Option,
      [Select.name]: Select,
      [DatePicker.name]: DatePicker,
      [Alert.name]: Alert,

    },
    data() {
      return {
      }
    },
    computed: {
      toDatePickerOptions() {
        return {
          disabledDate: (time) => {
            return time.getTime() > Date.now()
          }
        }
      },
      fromDatePickerOptions() {
        return {
          disabledDate: (time) => {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    props: ['toDate','currencies' ,'currencyCode','fromDate', 'resellerCode', 'resellers', 'cardProgramData', 'cardProgCode', 'buttonDisabled', 'dateRangeError'],
    methods: {
      handleToDate($event) {
        this.$emit('toDateChange', $event)
      },
      handleFromDate($event) {
        this.$emit('fromDateChange', $event)
      },handleCurrency($event){
        this.$emit('currencyCodeChange', $event)
      },
      handleResellerId($event) {
        this.$emit('resellerIdChange', $event)
      }, hadleCardPrgram($event) {
        this.$emit('CardProgCodeChange', $event)
      },
      buttonClick() {
        this.$emit('buttonClick')
      }
    }
  }
</script>
<style scoped lang="scss">

  .el-select {
    width: 130px;
    overflow: hidden;
  }

  .el-select input {
    border-radius: .4rem !important;
    border: 1px solid #DDDDDD !important;

    /* unknown */
    /* &:hover {
      border: 1px solid #000 !important;
    }
    &::placeholder{
      text-transform: capitalize;
    } */
  }
  .nowrap{
    white-space: nowrap;
  }
  @media screen and (max-width: 620px) {
    .d-flex,.from-date,.to-date{display: inline-grid !important;width: 100% !important; margin-bottom:5px;}
    .btn-invoices-content{margin-left: 0 !important;}
    .el-date-editor, .el-select{width:100% !important;}
  }

  .span-blod{
    border:1px solid #7039DA;
    border-radius: 4px;
    background-color:rgba(#7039DA,.05);
    color:#7039DA;
    font-weight: 600;
    padding:8px 12px;
    margin-bottom:10px;
    span{
      padding-right:5px;
      &:last-child{
        padding-right:0;
      }
    }
  }
  .span-margin-right{
    margin-right: 6px;
  }
</style>
