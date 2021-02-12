let timer
const actions = {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    async auth(context, payload) {
        const mode = payload.mode
        const key = context.getters.apiKey
        let url = `/accounts:signInWithPassword?key=${key}`
        if (mode === 'signup') {
            url = `/accounts:signUp?key=${key}`
        }
        const axios = context.getters.authAxios
        const response = await axios.post(url, {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        })
        const responseData = response.data
        if (response.status !== 200) {
            throw new Error('Failed to authenticated, please check your login data!')
        }
        const expiresIn = +responseData.expiresIn * 1000
        // const expiresIn = 5000
        const expirationDate = new Date().getTime() + expiresIn

        const userAuth = {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: expirationDate
        }
        localStorage.setItem('userAuth', JSON.stringify(userAuth))

        timer = setTimeout(function () {
            context.dispatch('autoLogout')
        }, expiresIn)

        context.commit('setUser', userAuth)
    },
    async tryLogin(context) {
        const userAuth = await JSON.parse(localStorage.getItem('userAuth'))
        if (userAuth) {
            const expiresIn = +userAuth.tokenExpiration - new Date().getTime()
            if (expiresIn < 0) {
                return
            }
            timer = setTimeout(function () {
                context.dispatch('autoLogout')
            }, expiresIn)
            if (userAuth.token && userAuth.userId) {
                context.commit('setUser', {
                    token: userAuth.token,
                    userId: userAuth.userId,
                })
            }
        }
    },
    autoLogout(context) {
        context.commit('logout')
        context.commit('setAutoLogout')
    }
}
export {
    actions, timer
}