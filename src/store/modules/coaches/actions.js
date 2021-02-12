export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId
        const axios = context.rootGetters.axios
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }
        const token = context.rootGetters.token
        const response = await axios.put(`/coaches/${userId}.json?auth=${token}`, coachData)
        if (response.status !== 200) {
            const error = new Error(response.data.message || 'Failed to fetch !')
            throw error
        }
        console.log(response)

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
    },
    async loadCoaches(context, payload){
        
        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return
        }

        const axios = context.rootGetters.axios
        const response = await axios.get('/coaches.json')
        if (response.status !== 200) {
            const error = new Error(response.data.message || 'Failed to fetch !')
            throw error
        }
        const coaches = []
        const responseData = response.data
        for(const key in response.data){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas:  responseData[key].areas
            }
            coaches.push(coach)
        }
        context.commit('setCoaches', coaches)
        context.commit('setFetchTimestamp')
    }
}