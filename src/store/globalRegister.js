function registerGlobalModule(store, props = {}) {
    if (!store || !store.hasModule) {
        return
    }

    const initState = props.getGlobalState && props.getGlobalState() || {
        user: {}
    }

    if (!store.hasModule('global')) {
        const globalModule = {
            namespaced: true,
            state: initState,
            mutations: {
                setGlobalState(state, payload) {
                    state = Object.assign(state, payload)
                },

                emitGlobalState(state) {
                    if (props.setGlobalState) {
                        props.setGlobalState(state)
                    }
                }
            },
            actions: {
                setGlobalState({ commit }, payload) {
                    commit('setGlobalState', payload)
                    commit('emitGlobalState', payload)
                },

                initGlobalState({ commit }, payload) {
                    commit('setGlobalState', payload)
                }
            }
        }
        store.registerModule('global', globalModule)
    } else {
        store.dispatch('global/initGlobalState', initState)
    }
}

export default registerGlobalModule
