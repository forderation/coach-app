import mutations from './mutations'
import getters from './getters'
import {actions} from './actions'

export default {
    state() {
        return {
            userId: null,
            token: null,
            apiKey: 'AIzaSyDDUUWrStnOSWQ69qH0fb6qCi_sZUZqORc',
            didAutoLogout: false
        }
    },
    mutations,
    getters,
    actions
}