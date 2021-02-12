import {timer} from './actions'

export default {
    setUser(state, payload) {
        state.token = payload.token
        state.userId = payload.userId
        state.didAutoLogout = false
    },
    logout(state) {
        localStorage.removeItem('userAuth')
        clearTimeout(timer)
        state.token = null
        state.userId = null
        state.tokenExpiration = null
    },
    setAutoLogout(state){
        state.didAutoLogout = true
    }
}