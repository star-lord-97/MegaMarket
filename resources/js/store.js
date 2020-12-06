import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        auth: {
            login: false,
            user: {},
            admin: false
        }
    },

    getters: {
        isLoggedIn(state) {
            return state.auth.login;
        },

        isAdmin(state) {
            return state.auth.admin;
        }
    },

    mutations: {
        LOGIN(state, loginStatus) {
            state.auth.login = loginStatus;
        },

        AUTH_USER(state, user) {
            state.auth.user = user;
        },

        ADMIN(state, adminStatus) {
            state.auth.admin = adminStatus;
        }
    },

    actions: {}
});
