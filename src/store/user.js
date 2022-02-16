export default {
    state: {
        user: null
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        updateUser(state, user) {
            state.user = {...state.user, ...user};
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    },

    actions: {
        login({commit}, {user}) {
            commit('setUser', user);
            localStorage.setItem('user', JSON.stringify(user));
        },

        updateData({commit}, {data}) {
            commit('updateUser', data);
        },

        exit({commit}) {
            commit('updateUser', null);
            localStorage.removeItem('user');
        }
    },

    getters: {
        getUser: (state) => {
            return state.user;
        }
    }
}