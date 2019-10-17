<template>
	<modal :show="visible"
				 footerClasses="justify-content-center"
				 type="notice"
				 modalClasses="details-modal">
		<h5 slot="header" class="modal-title">{{ header }}</h5>

		<div class="d-flex flex-column">
			<div v-for="(item, index) in description"
					:key="index"
					class="d-flex flex-row align-items-center mb-1">
				<div class="w-50">
					<b>{{ item.label }}</b>
				</div>

				<div class="w-50">
					{{ dynamicFilter(data[item.key], item) }}
				</div>
			</div>
		</div>

		<div slot="footer" class="w-100 d-flex justify-content-center">
			<p-button type="default" 
								@click="visible = false" 
								class="btn btn-round btn-default">
				{{ $t('payment_gateway.button_close') }}
			</p-button>
		</div>
	</modal>	
</template>

<script>
import Vue from 'vue'
import Modal from "@/components/UIComponents/Modal"

export default {
	name: 'DetailsModal',
	components: {
		Modal
	},
	props: {
		header: String,
		value: Boolean,
		data: Object,
		description: Array
	},
	computed: {
		visible: {
			get () {
				return this.value
			},
			set (value) {
				this.$emit('input', value)
			}
		}
	},
	methods: {
		dynamicFilter (value, description) {
			return description.filter
				? Vue.filter(description.filter)(value)
				: value
		}
	}
}
</script>

<style lang="scss">
.details-modal {
	max-width: 700px !important;
}
</style>