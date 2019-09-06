import Vue from 'vue';
import i18n from '@/i18n'
import {
    SHOW_TOAST_MESSAGE,
    MUTATE_GET_ALL_CLIENTS_LIST,
    GETTER_CLIENTS_LIST,
    ACTION_GET_ALL_CLIENTS_LIST
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
