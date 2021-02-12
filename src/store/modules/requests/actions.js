export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        }
        const axios = context.rootGetters.axios
        const response = await axios.post(`/requests/${payload.coachId}.json`, newRequest)
        const responseData = response.data

        if (response.status !== 200) {
            throw new Error(responseData.message || 'Failed to send requests')
        }

        newRequest.id = responseData.id
        newRequest.coachId = payload.coachId

        context.commit('addRequest', newRequest)
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId
        const axios = context.rootGetters.axios
        const token = context.rootGetters.token
        const response = await axios.get(`/requests/${coachId}.json?auth=${token}`)
        const responseData = response.data
        if (response.status !== 200) {
            throw new Error(responseData.message || 'Failed to fetch results')
        }
        console.log(response)
        const requests = []
        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request)
        }
        console.log(requests)
        context.commit('setRequests', requests)
    }
}