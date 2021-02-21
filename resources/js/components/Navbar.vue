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
                    FATTO.shop
                </h1>
                <router-link
                    to="/"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    exact
                    >Home</router-link
                >
                <router-link
                    to="/login"
                    v-if="!isLoggedIn"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Login</router-link
                >
                <router-link
                    to="/register"
                    v-if="!isLoggedIn"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Register</router-link
                >
                <router-link
                    to="/cart"
                    v-show="isLoggedIn && !isAdmin"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Cart</router-link
                >
                <router-link
                    to="/wishlist"
                    v-show="isLoggedIn && !isAdmin"
                    class="px-3 py-2 rounded-md text-l font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >Wishlist</router-link
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
import { computed } from "vue";
import store from "../store";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();

        const isLoggedIn = computed(() => {
            return store.getters.isLoggedIn;
        });

        const isAdmin = computed(() => {
            return store.getters.isAdmin;
        });

        let logout = () => {
            store.dispatch("logout").then((response) => {
                router.push({ path: "/" });
            });
        };

        return { isLoggedIn, isAdmin, logout };
    },
};
</script>

<style scoped>
.router-link-exact-active.rounded-md {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
    --tw-bg-opacity: 1;
    background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
</style>
