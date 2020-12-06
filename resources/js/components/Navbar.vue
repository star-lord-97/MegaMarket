<template>
    <div>
        <nav class="bg-gray-800">
            <div
                class="max-w-7xl mx-auto flex items-center justify-center h-20"
            >
                <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                />
                <h1 class="px-5 font-bold text-xl text-indigo-400">
                    BIGSTORE
                </h1>
                <router-link
                    to="/"
                    class="px-3 py-2 rounded-md text-l font-medium  text-gray-300 hover:text-white hover:bg-gray-700"
                    exact
                    >Home</router-link
                >
                <router-link
                    to="/login"
                    v-if="!isLoggedIn"
                    class="px-3 py-2 rounded-md text-l font-medium  text-gray-300 hover:text-white hover:bg-gray-700"
                    >Login</router-link
                >
                <router-link
                    to="/register"
                    v-if="!isLoggedIn"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Register</router-link
                >
                <router-link
                    to="/admin"
                    v-show="showAdmin"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Admin</router-link
                >
                <router-link
                    to="/dashboard"
                    v-show="showDashboard"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Dashboard</router-link
                >
                <a
                    v-if="isLoggedIn"
                    @click.prevent="logout"
                    href="#"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Logout</a
                >
            </div>
        </nav>
    </div>
</template>

<script>
import User from "../apis/User";
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn"]),

        ...mapGetters(["isAdmin"]),

        showAdmin() {
            return this.isLoggedIn && this.isAdmin;
        },

        showDashboard() {
            return this.isLoggedIn && !this.isAdmin;
        }
    },

    methods: {
        logout() {
            User.logout().then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("isAdmin");
                this.$store.commit("LOGIN", false);
                this.$store.commit("ADMIN", false);
                this.$store.commit("AUTH_USER", null);
                this.$router.push("/");
            });
        }
    }
};
</script>

<style scoped>
.router-link-exact-active {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
    --tw-bg-opacity: 1;
    background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
</style>
