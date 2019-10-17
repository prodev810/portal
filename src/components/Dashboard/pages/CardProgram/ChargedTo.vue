<template>
	<el-select v-model="selected"
						 class="w-100">
		<el-option v-for="(item, index) in chargedToValues"
								:key="index"
								:label="item.name"
								:value="item.value">{{ item.name }}
		</el-option>
	</el-select>	
</template>

<script>
export default {
	name: 'ChargedTo',
	props: ['value'],
	data () {
		return {
			chargedToValues: [
				{ name: 'Please choose', value: '' },
				{ name: 'ACCOUNT', value: 'ACCOUNT' },
				{ name: 'FLOAT', value: 'FLOAT' },
				{ name: 'INVOICE', value: 'INVOICE' }
			]			
		}
	},
	computed: {
		// Pass a prop from parent to child
		selected: {
			get () {
				return this.value
			},
			set (value) {
				this.$emit('input', value)
			}
		}
	}
}
</script>