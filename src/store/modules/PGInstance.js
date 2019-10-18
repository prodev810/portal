import Vue from 'vue'

export default function (env) {
		return env === 'sandbox' ? Vue.prototype.$http.acchttp : Vue.prototype.$http.acchttpLive
}