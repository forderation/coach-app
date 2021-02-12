import {createStore} from "vuex";
import coaches from './modules/coaches/index'
import requests from './modules/requests/index'
import auth from './modules/auth/index'
import { realTimeDatabase, authentication } from '@/axios'

export default createStore({
    modules: {
        coaches,
        requests,
        auth
    },
    state(){
        return {
            axios: realTimeDatabase,
            authAxios: authentication
        }
    },
    getters : {
        axios(state){
            return state.axios
        },
        authAxios(state){
            return state.authAxios
        }
    }
})