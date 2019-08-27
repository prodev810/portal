import PGAccordionTab from '@/components/Dashboard/pages/PaymentGateway/PGAccordionTab'
import CollapseItem from '@/components/UIComponents/Collapse/CollapseItem'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'
import Modal from '@/components/UIComponents/Modal'
import CeevoSelect from "@/components/UIComponents/CeevoSelect"
import CheckBox from "@/components/UIComponents/Inputs/Checkbox"
import moment from 'moment'

export default {
  props: {
    collapseItem: {
      type: [String, Number],
      required: true,
    }
  },
  data() {
    return {
      tableLoading: false,
      modal: {},
    }
  },
  components: {
    PGAccordionTab,
    CollapseItem,
    PButton,
    PGRow,
    Modal,
    CeevoSelect,
    CheckBox,
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD hh:mm:ss')
    },
    onInput(fieldName, fieldRef, value) {
      if (this.$refs[fieldRef] && this.$refs[fieldRef].dirty) {
        this.$refs[fieldRef].dirty = false
      }

      if (this.modalDataError[fieldName]) {
        this.modalDataError[fieldName] = '';
      }
    },
    onBlur(validateMethodName, value) {
      if (typeof this[validateMethodName] === 'function') {
        this[validateMethodName]();
      }
    },
    onChange(validateMethodName, val) {
      if (typeof this[validateMethodName] === 'function') {
        this[validateMethodName]();
      }
    },
  }
}
