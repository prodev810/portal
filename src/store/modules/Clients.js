import Vue from 'vue';
import i18n from '@/i18n'
import {
    SHOW_TOAST_MESSAGE,
    MUTATE_GET_ALL_CLIENTS_LIST,
    GETTER_CLIENTS_LIST,
    ACTION_GET_ALL_CLIENTS_LIST,
		ACTION_GET_CLIENT,
		ACTION_SAVE_CLIENT
} from '../types';

const state = {
    clients: []
};

const mutations = {
    [MUTATE_GET_ALL_CLIENTS_LIST]: (state, {data}) => {
        console.log( 'mutate',data );
        state.clients = data
    }
};

const actions = {
    [ACTION_GET_ALL_CLIENTS_LIST]: async ({commit, dispatch}, payload) => {
        const pageNum = (payload && payload.pageNum) ? payload.pageNum : 0
        const pageSize = (payload && payload.pageSize) ? payload.pageSize : 20
        // const paged = (payload && payload.paged) ? payload.paged : false;
        // const offset = (payload && payload.offset) ? payload.offset : 0;
        try {

            const { data } = await Vue.prototype.$http.clhttp.get('/client',{pageNum,pageSize});
            console.log( 'Clients', data );
            commit(MUTATE_GET_ALL_CLIENTS_LIST, { data });
        } catch (e) {
            dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.clients.error_load_clients') + e.message, status: 'danger' })
        }
		},
		/*
    [ACTION_GET_CLIENT]: async ({commit, dispatch}, id) => {

        return new Promise ( (resolve, reject) => {
            Vue.prototype.$http.clhttp.get(`/client/${id}`).then( data => {
                resolve(data.data);
            }).catch( error => {
                dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_get_merchants') + e.message, status: 'danger' });
                reject(error)
            });
        });
		},
		*/
		[ACTION_SAVE_CLIENT]:  async ({commit, dispatch}, {id, data}) => {

			return new Promise ( (resolve, reject) => {
					Vue.prototype.$http.clhttp.post(`/client/${id}`, data).then(response => {
							resolve(response);
					}).catch( error => {
							dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('store.paymentGateway.error_get_merchants') + e.message, status: 'danger' });
							reject(error)
					});
			});
		},
};


const getters = {
    [GETTER_CLIENTS_LIST]: state => state.clients
}

const Clients = {
    state,
    actions,
    getters,
    mutations
}

export default Clients
