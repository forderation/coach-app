export default {
    addRequest(state, payload) {
        state.requests.push(payload)
    },
    setRequests(state, payload){
        console.log("set requests")
        console.log(payload)
        state.requests = payload
    }
}