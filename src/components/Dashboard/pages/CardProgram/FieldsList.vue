<template>
	<div>		
		<div v-for="(kyc, index) in cardProgramData.kycClassifier" 
					:key="index"
					class="row mb-0">
			<div class="kyc-adding w-75">
				<div class="col-12 d-flex align-items-center">{{ title }} {{ index + 1 }}<span class="required-field-sympol">＊</span></div>
				<div class="col-12 mb-0">
					<input v-model="cardProgramData.kycClassifier[index]"
									v-validate.initial="'required'"
									:name="`${prefix}${index}`"
									:data-vv-as="`kyc class ${index + 1}`"
									type="text" 
									:placeholder="title + (index + 1)" 
									class="form-control  form-control-danger"/>
					<div class="validation-error">{{ errors.first(`${prefix}${index}`) }}</div>
				</div>
			</div>

			<button v-if="index > 0" 
							class="el-tooltip aba__button" 
							@click="$emit('add')">
				<i class="el-icon-delete"></i>
			</button>

			<button v-else 
							class="el-tooltip aba__button" 
							@click="$emit('delete', index)">
				<i class="el-icon-plus"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FieldsList',
	props: {
		title: String,
		prefix: String,
		value: Array
	},
	computed: {
		data: {
			get () {

			},
			set () {

			}
		}
	}
}
</script>