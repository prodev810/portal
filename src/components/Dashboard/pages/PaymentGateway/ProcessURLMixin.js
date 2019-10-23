export default {
  methods: {
		processModalURL(value) {
			let url = value.split('/')
			let idx = url.findIndex(s => s === 'payment-mgmt')

			return idx >= 0 
				? '/' + url.slice(idx + 1).join('/') 
				: value			
		}
  }
}