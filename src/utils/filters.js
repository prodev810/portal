import moment from 'moment'
import Vue from "vue"

Vue.filter("dateTime", val => !val? val: moment(String(val)).format('MMM. DD, YYYY, hh:mm'));
