export default {
    userId(state) {
        return state.userId
    },
    apiKey(state) {
        return state.apiKey
    },
    token(state) {
        return state.token
    },
    isAuthenticated(state) {
        return !!state.token
    },
    didAutoLogout(state) {
        return state.didAutoLogout
    }
}