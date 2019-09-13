<template>
  <div>
    <div
      :class="{
        'ceevo__table--bordered': bordered,
        'ceevo__table--responsive': responsive,
        'ceevo__table--condensed': true,
        'ceevo__table--striped': striped,
        'ceevo__table-edit': editId || editAll,
        'productConfig': productConfig
      }"
      class="table__wrapper ceevo__table--auto-height"
    >
      <table
        border="1"
        class="ceevo__table table"
        v-if="allData.length > 0"
        :class="{ 'productConfig': productConfig }"
      >
        <thead>
          <tr>
            <th :key="heading.name" v-for="heading in renderHeadings">
              <div class="ceevo__heading-label"
                  :class="{'sortable':heading.sortable}"
                  @click="sortTable(heading.name)"
                >
                {{heading.i18n ? $t(heading.i18n) : heading.label}}
                <fade-transition><span v-if="heading.required&&editId" class="required-field-sympol"> * </span></fade-transition>
              </div>
            </th>
            <th :key="heading.name" v-for="heading in addToHeaders">
              <div class="ceevo__heading-label">{{heading.i18n ? $t(heading.i18n) : heading.label}}
              </div>
            </th>
            <th v-for="(itemindex,index) in extraHeadings" :key="index+'extra label'"></th>
          </tr>
        </thead>
        <!-- style="outline: thin solid rgb(194, 170, 239);" -->
        <tbody>
          <slot name="balance"></slot>
          <!--  row is an object [{row ,row }]<- table data-->
          <tr v-for="(row,index) in allData" :key="row.id">
            <td scope="row" v-for="heading in renderHeadings"
                :key="(row.id ||JSON.stringify(row))+heading.name"
                :class="[
                row && row.required && row.required.value === 'Yes' && productConfig ? 'productConfigYes' : '',
                row && row.required && row.required.value === 'No' && productConfig ? 'productConfigNo' : '',
                heading.info ? 'ceevo__table_info' : '',
                heading.name === 'idCheckStatus' ? idCheckStatusClass(row) : '',
                heading.name === 'poaCheckStatus' ? poaCheckStatusClass(row) : '',
                heading.name === 'sanctionCheckStatus' ? sanctionCheckStatusClass(row) : '',
                heading.danger ? 'ceevo__table_danger': '',
                heading.button ? 'ceevo__table_action':'',
                heading.email ? 'text-primary':'',
                heading.status ? 'ceevo__table_status':'',
                heading.custom ? 'ceevo__table_custom':'',
                row.classes ? row.classes[heading.name] : ''
                ]">
              <div class="cell">
                <template v-if="row.edit && !heading.readOnly">
                  <fg-input v-if="!heading.input && (heading.$domAttri ||{}).type !=='number'"
                            size="sm"
                            :disabled="heading.read"
                            @input.native.prevent="handleInputChange(row.id, $event.target.value, heading.name,null,$event.target)"
                            :value="row[heading.name] ? row[heading.name].value: ''"
                            :placeholder="hanldePlaceholder(heading)"
                            v-bind="(heading.$domAttri ||{})"
                            :addonRightIcon="heading.addonRightIcon"
                            :error="row[heading.name]? (row[heading.name].dirty ? row[heading.name].errors[0] :'') : '' "
                            @focus="dirtifyInput(row.id,heading.name,$event.target.value)">
                  </fg-input>
                  <decimals-input
                    v-if="!heading.input && (heading.$domAttri ||{}).type === 'number'"
                    :value="row[heading.name] ? row[heading.name].value: ''"
                    @input="handleInputChange(row.id, $event, heading.name,null)"
                    :placeholder="hanldePlaceholder(heading)"
                    :addonRightIcon="heading.addonRightIcon"
                    :error="row[heading.name]? (row[heading.name].dirty ? row[heading.name].errors[0] :'') : '' "
                    @focus="dirtifyInput(row.id,heading.name,$event.target.value)"
                  >
                  </decimals-input>

                  <template v-if="heading.input === 'select'">
                    <el-select class="select-default"
                              size="small"
                              :placeholder="hanldePlaceholder(heading)"
                              @input="handleInputChange(row.id, $event, heading.name,true)"
                              :value="row[heading.name] !== void 0 ? row[heading.name].value: '' "
                              @blur="dirtifyInput(row.id,heading.name,$event.target.value)"
                    >
                      <el-option v-for="option in heading.selectKeys"
                                class="select-success"
                                :value="option.value"
                                :label="option.name"
                                :key="option.value + row.id+heading.name +index">
                      </el-option>
                    </el-select>
                  </template>

                  <el-select v-if="heading.input === 'multiple'" class="select-default"
                            size="small"
                            :placeholder="hanldePlaceholder(heading)"
                            multiple
                            @input="handleInputChange(row.id, $event, heading.name,true)"
                            :value="row[heading.name] ? row[heading.name].value: '' "
                            collapse-tags
                  >
                    <el-option v-for="option in heading.selectKeys"
                              class="select-success"
                              :value="option.value"
                              :label="option.name"
                              :key="option.value + row.id + heading.name + index">
                    </el-option>
                  </el-select>
                </template>

								<template v-else-if="heading.check">
									<i class="fa" :class="{ 'fa-check': row[heading.name].value, 'fa-times': !row[heading.name].value }"/>
								</template>

								<template v-else-if="heading.iconByValue">
									<i class="fa fa-2x" :class="{ [heading.iconByValue[row[heading.name].value]]: true }"/>
								</template>

                <template v-else-if="heading.name === 'view'">
                  <router-link class="action-button" v-if="row.appReferenceId" :to="{ name: 'KYC Main Page', query: {appRef: row.appReferenceId.value }}">
                        View
                  </router-link>
                </template>

                <template v-else-if="heading.name === 'action'" >
                    <router-link  class="action-button" v-if="row.appReferenceId" :to="{ name: 'KYC Main Page', query: {appRef: row.appReferenceId.value }}">
                        Action
                    </router-link>
                </template>

                <template v-else-if="heading.name === 'download'">
                  <button class="action-button" type="button" @click.stop.prevent="getSupportList(row)" :disabled="sendingGetDocListReq">Download</button>
                </template>

                <template v-else>
                  <template v-if="heading.mapViewData">
                    <span>  {{row[heading.mapViewData]? row[heading.mapViewData].value : '---' }}</span>
                  </template>
                  <template v-else>
                      <div class="div-max-length" v-html="handleViewDisplayData(row, heading)"></div>
                  </template>
                </template>
              </div>
            </td>
            <!--todo pass the id of the row-->
            <slot :index="{row: row, index: index}"></slot>
          </tr>
          <slot name="total"></slot>
        </tbody>
      </table>
      <div v-else>
        <h4 class="text-center">{{ $t('common.regular_table.no_data') }}
          <br>
        </h4>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { KYC_GET_LIST_SUPPORT_DOCUMENTS_ID } from "@/store/types"
import getNested from '@/utils/nestedObjects.js'

  import {Input, Option, Select} from 'element-ui'
  import FadeTransition from "vue2-transitions/src/Fade/FadeTransition";
  import {breakInput, defBreakInput, requiredField} from "../../../../utils/formValidations";
  import DecimalsInput from "../../ABAComponents/DecimalsInput/Decimals";
  import {amountFormatAlignRight} from "@/utils/moneyFormat";
  import { inArray } from "@/utils/common"

  export default {
    name: 'RegularTable',
    components: {
      DecimalsInput,
      FadeTransition,
      [Input.name]: Input,
      [Option.name]: Option,
      [Select.name]: Select,
    },
    data() {
      return {
        allData: [],
        maskedInput: {},
        sort_dir: 'ascend',
        sendingGetDocListReq: false,
      }
    },

    props: {
      addToHeaders: {
        type: Array,
        default: () => []
      },
      editId: {
        type: String,
      },
      uneditableFields: {
        type: Array,
        default: () => []
      },
      extraHeadings: {
        type: Number,
        default: 0
      },
      editAll: {
        type: Boolean,
        default: false
      },
      //  array of objects {label:visual label , name: api name}
      headings: {
        type: Array,
        default: () => []
      },
      // array of objects object[table row name] =>
      value: {
        type: Array,
        default: () => []
      },
      context: {
        type: String,
        default: 'view'
      },
      bordered: {
        type: Boolean,
        default: false
      },
      responsive: {
        type: Boolean,
        default: true
      },
      condensed: {
        type: Boolean,
        default: true
      },
      striped: {
        type: Boolean,
        default: false
      },
      amonutAlignRightFormat: {
        type: Array,
        default: () => []
      },
      oldestFirst: {
        type: Boolean,
        default: true
      },
      productConfig: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      parentData: {
        get() {
          if (!(this.value instanceof Array)) return []
          return [...this.value.map(i => {
            if (!this.editId) return {...i, edit: false};
            if (this.editId) return i.id === this.editId ? {...i, edit: true} : {...i, edit: false}
          })]
        },
        set(value) {
          this.value = value
        }
      },
      renderHeadings() {
        return this.headings.map(heading => !!this.uneditableFields.find(i => heading.name === i) ? {...heading, readOnly: true} : heading);
      }
    },
    watch: {
      parentData(newVal) {
        if (!newVal) return;
        if (newVal.length === 0) return this.allData = [];
        this.massageToFormValidation(newVal)
      },
      context(newVal, oldVal) {
        if (newVal === 'edit' && oldVal === 'view') {
          this.$emit('input', {
            value: this.value,
            valid: true
          })
        }
        if (newVal === 'create') {
          this.$emit('input', {
            value: this.value,
            valid: this.verifyTable()
          })
        }
      },
      allData(newVal, oldVal) {
        if (newVal.length === oldVal.length) return;
        this.$emit('input', {
          value: this.value,
          valid: this.verifyTable()
        })
        this.headings.map(heading => {
          if (heading.sortable) {
            this.sortTable(heading.name);
          }
        })
      }
    },
    methods: {
      ...mapActions({
          getListSupportDocs: KYC_GET_LIST_SUPPORT_DOCUMENTS_ID,
      }),
      hanldePlaceholder (heading) {
        if (heading.i18n_placeholder) {
          return this.$t(heading.i18n_placeholder)
        } else if (heading.i18n) {
          return this.$t(heading.i18n)
        } else {
          return heading.label
        }
      },
      handleViewDisplayData (row, heading) {
        // return row[heading.name] ? heading.mask ?
        //             heading.mask(row[heading.name].value)
        //             :(row[heading.name].value  === '' ||row[heading.name].value === null) ?
        //             '---' :row[heading.name].value
				//             : '---'
				// For nested values
				let r = getNested(row, heading.name)

        if (r) {
          if (heading.mask) {
            let temp = heading.mask(r.value)
            // console.log(heading.name)
            // if (temp !== '---' && this.inArray(heading.name, this.amonutAlignRightFormat)) {
            //   console.log('algin right', heading.name, temp)
            //   temp = amountFormatAlignRight(temp)
            // }
            return temp
          } else {
            if (r.value  === '' || r.value === null) {
              return '---'
            } else {
							// return r for nested values
              return r.value ? r.value : r
            }
          }
        } else {
          return '---'
				}
      },
      idCheckStatusClass(row) {
          if(!row || !row.idCheckStatus || !row.idCheckStatus.value) return 'bg-white';
          else if(row.idCheckStatus.value == 'Failed' || row.idCheckStatus.value == 'Manually Declined') return 'bg-bright-red';
          else if(row.idCheckStatus.value == 'Unknown' || row.idCheckStatus.value == 'Skipped' || row.idCheckStatus.value == 'Caution' || row.idCheckStatus.value == 'Attention') return 'bg-light-red';
          else if(row.idCheckStatus.value == 'Passed' || row.idCheckStatus.value == 'Manual Approval') return 'bg-green';
          else if(row.idCheckStatus.value == 'New ID Requested' || row.idCheckStatus.value == 'Update ID Request') return 'bg-orange';
          else return 'bg-white'
      },
      poaCheckStatusClass(row) {
          if(!row || !row.poaCheckStatus || !row.poaCheckStatus.value) return 'bg-white';
          else if(row.poaCheckStatus.value == 'Declined' || row.poaCheckStatus.value == 'Fraud') return 'bg-bright-red';
          else if(row.poaCheckStatus.value == 'Unverified') return 'bg-light-red';
          else if(row.poaCheckStatus.value == 'Approved') return 'bg-green';
          else if(row.poaCheckStatus.value == 'New POA requested' || row.poaCheckStatus.value == 'Address update') return 'bg-orange';
          else return 'bg-white'
      },
      sanctionCheckStatusClass(row) {
          if(!row || !row.sanctionCheckStatus || !row.sanctionCheckStatus.value) return 'bg-white';
          else if(row.sanctionCheckStatus.value == 'Manual Decline') return 'bg-bright-red';
          else if(row.sanctionCheckStatus.value == 'HIT') return 'bg-light-red';
          else if(row.sanctionCheckStatus.value == 'No Match' || row.sanctionCheckStatus.value == 'Manual Approval') return 'bg-green';
          else return 'bg-white'
      },
      // Sort Table Function
      sortTable(tableName) {
        const sortable = this.headings.find(head => head.name === tableName).sortable;
        if (sortable) { // Check if this column should be sorted
          // Toggle Sorting Direction
          if (this.oldestFirst) {
            this.sort_dir = 'ascend';
          } else {
            this.sort_dir = 'decend';
          }
          const sort_dir = this.sort_dir;
          // Sort Table Data
          this.allData.sort(function (a, b){
            if (sort_dir == "decend") {
              if (a[tableName].value > b[tableName].value) {
                return 1;
              }
              if (a[tableName].value < b[tableName].value) {
                return -1;
              }
            } else if (sort_dir == "ascend") {
              if (a[tableName].value > b[tableName].value) {
                return -1;
              }
              if (a[tableName].value < b[tableName].value) {
                return 1;
              }
            }
            return 0;
          });
        }
      },
      handleMassagedVal(key, value) {
        const _thisHeading = this.headings.find(heading => heading.name === key)
        if (!_thisHeading) return value
        if (!_thisHeading.mask) return value
        if (typeof _thisHeading.mask === "function") return _thisHeading.mask(value)
          return value;
      },
      massageToFormValidation(data) {
        if (this.parentData.length === 0) {
          console.log('empty');
          return this.allData = [];
        }
        const souceOfTruth = this.allData.length > 0 && data.length === this.allData.length ? this.allData : data;

        this.allData = souceOfTruth.map((i, index) => {
          let newDataLabel = {};
          for (const key in i) {
            if (key === 'id' || key === 'edit' || key === 'classes') {
              newDataLabel[key] = data[index][key]
            } else if (typeof i[key] !== "object") {
              //mask code  @commit e1955e739285782b054048b66a664ef605c50446
              /*can be  found at this revision*/
              /*un commend  the code on @funciton handleInputChange*/
              /*un comment the code at update life cycle*/

              newDataLabel = {
                ...newDataLabel,
                [key]: {
                  value: data[index][key],
                  dirty: false,
                  touched: false,
                  errors: [this.getValidationSate(key, data[index][key])]
                }
              }
            } else {
              newDataLabel = {
                ...newDataLabel,
                [key]: {
                  ...i[key],
                  value: data[index][key]
                }
              }
            }
          }
          return newDataLabel
        })
      },
      dirtifyInput(id, fieldName, value, noTEvent) {
        const errors = this.getValidationSate(fieldName, value)
        this.allData = this.allData.map(field => field.id === id ? {
          ...field,
          [fieldName]: {
            ...field[fieldName],
            dirty: true,
            touched: true,
            errors: [errors]
          }
        } : field)
        return errors
      },
      getValidationSate(fieldName, value = '') {
        const field = this.headings.find(i => i.name === fieldName);
        if (!field) return ''
        if (!field.required && value === '') return '';
        if (!field.validator) return requiredField(value);
        return requiredField(value) === '' ? this.executeValidators(field.validator, value) : requiredField(value)
      },
      executeValidators(validators = [], value, i = 0) {
        if (!(validators instanceof Array)) return validators(value);
        let error = typeof validators[i] === 'function' ? validators[i](value) : '';
        // return i <= validators.length || validators.length === 0 || error === '' ?
        //   error :
        //   this.executeValidators(validators, value, i + 1)

        if (error !== '') {
          return error
        } else if (i < validators.length) {
          return this.executeValidators(validators, value, i + 1)
        } else {
          return ''
        }
      },
      handleInputChange(id, value, fieldName, isSelect, $input) {
        //TODO: enhance the performance
        let {mask, read, brakeAt} = this.renderHeadings.find(i => i.name === fieldName);
        let dirty = false;
        //mask code
        /*  if (mask) {
            if ((value % 1 + '').length < 2) {
              this.maskedInput = $input
            } else {
              this.maskedInput = {};
            }
            value = mask ? mask(value) : value;
          }
        */
        const newValue = this.parentData.map(i => {
          if (i.id === id) {
            if (!isSelect && typeof value !== "boolean") {
              brakeAt = brakeAt || defBreakInput
              value = read ? i[fieldName] : !brakeAt(value) ? i[fieldName] : value
              dirty = isNaN(value) ? value !== i[fieldName] : (+value) !== i[fieldName]
            }
            this.dirtifyInput(id, fieldName, value)
          }
          const {edit, ...newFiled} = i.id === id ?
            {
              ...i,
              [fieldName]: value
            }
            : i;
          return newFiled;
        });
        // is valed
        const valid = this.verifyTable()
        if (isSelect) {
          dirty = true;
        }
        this.$emit('input', {value: newValue, valid, dirty})
      },
      verifyTable() {
        let valid = true
        loop1:
          for (const heading of this.renderHeadings) {
            for (const row of this.allData) {
              const erros = row[heading.name] ? row[heading.name].errors ? row[heading.name].errors[0] : '' : ''
              if (!(erros === '')) {
                valid = false;
                break loop1;
              }
            }
          }
        return valid;
      },
      async getSupportList(row) {
          
          try {
            this.sendingGetDocListReq = true;
            await this.getListSupportDocs({ id: row.checkId.value, fromHistoryTable: true})
            this.sendingGetDocListReq = false;
          } catch(e) {
              this.sendingGetDocListReq = false;
          }
      }
    },
    updated() {
      /* if (this.maskedInput.value !== void 0) {
         if (this.maskedInput.selectionEnd !== void 0) {
           // if this is the first key store the user made we mask the value
           this.maskedInput.selectionEnd = 1;
           this.maskedInput = {}
         }
       }*/
    },
    mounted() {
      if (this.parentData.length === 0) return;
      this.massageToFormValidation(this.parentData)
    }
  }
</script>
<style lang="scss">
  .table__wrapper {
    &::-webkit-scrollbar {
      width: 28px;
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
  .ceevo__table {
    border-spacing: 0px !important;
    .el-select {
      width: 170px !important;
      padding: 0 .1rem;
      overflow: hidden;
    }
    thead {
      border-bottom: 1px solid #dee2e6;
      th {
        padding: 0 !important;
        border-left: 1px solid #dee2e6 !important;
        border-right: 1px solid #dee2e6 !important;
      }
      th:first-child {
        border-left: none !important;
      }
      th:last-child {
        border-right: none !important;
      }
    }
    tbody {
      td {
        padding: 0 !important;
        border: none !important;

        &.ceevo__table_selected {
          background-color: #ff0000;
        }

        &.ceevo__table_info {
          background-color: rgb(201, 244, 223);
        }
        &.ceevo__table_danger {
          background-color: rgb(255, 217, 217);
        }
        &.ceevo__table_action {
          background-color: rgb(255, 255, 255);
          border: none;
          padding: 1px 0!important;
        }
        .cell {
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
            line-height: 40px;
            text-align: center;
            text-decoration: none;
          }
          .el-select {
            input {
              border-radius: .4rem !important;
              border: 1px solid #DDDDDD !important;

              &:hover {
                border: 1px solid #000 !important;

              }
            }
          }
        }
      }
    }
  }

  .ceevo__table .cell {
    font-weight: normal;
    min-width: 120px;
    padding: .5rem .6rem;

    .ceevo__table-edit & {
      padding: .5rem .6rem;
    }

    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    text-align: left;

    &.right-align {
      text-align: right !important;
    }
  }

  .ceevo__table .ceevo__heading-label {
    padding: .5rem .6rem;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding-top: 9px !important;

    &.sortable {
      cursor: pointer;
    }

    .sort-button {
      width: 0;
      height: 0;
      margin-left: 10px;
      &.ascend {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #292929;
      }
      &.decend {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #292929;
      }
    }
  }

  .ceevo__table th {
    width: 220px !important;
    padding: 10px;
  }

  .ceevo__table .form-group {
    margin: 0 !important;
    position: relative;

    .aba__form--error {
      position: absolute;
      bottom: -.9rem;
    }

    input {
      padding: .375rem .75rem !important;
    }

    select::placeholder,
    input::placeholder {
      text-transform: capitalize;
    }
  }

  .required-field-sympol {
    color: #ff4d57;
  }
  .div-max-length {
    width: 100%;
    padding : 0px 0px !important;
  }

  .table__wrapper.ceevo__table--auto-height.ceevo__table--responsive.ceevo__table--condensed.ceevo__table--striped {
    padding: 0 0 20px 0;
  }
  .table__wrapper.ceevo__table--auto-height.ceevo__table--responsive.ceevo__table--condensed.ceevo__table--striped.productConfig {
    border-radius: 10px;
    padding: 0 0 0 0;
  }
  table.productConfig {
    margin-bottom: 0;
    tbody {
      tr {
        td {
          &.productConfigYes {
            &:nth-child(even) {
              background-color: rgba(46, 214, 132, 0.25);
              border: 1px solid rgba(46, 214, 132, 0.25);
            }
          }
          &.productConfigNo {
            &:nth-child(even) {
              background-color: rgba(255, 106, 106, 0.25);
              border: 1px solid rgba(255, 106, 106, 0.25);
            }
          }
        }
      }
    }
  }
  .bg-bright-red {
      background-color: #FFD0D0 !important;
  }
  .bg-light-red {
      background-color: #ff4d57 !important;
  }
  .bg-green {
      background-color: #c9f4df !important;
  }
  .bg-orange {
      background-color: #FF6A6A !important;
  }
</style>
