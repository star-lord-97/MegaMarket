<template>
    <div class="flex items-center justify-center bg-gray-50 py-12 px-4">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img
                    class="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2
                    class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    Sign in to your account
                </h2>
            </div>
            <form class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="text-center">
                        <label for="email-address" class="sr-only"
                            >Email address</label
                        >
                        <input
                            v-model="credentials.email"
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.email"
                            >{{ errors.email[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="password" class="sr-only">Password</label>
                        <input
                            v-model="credentials.password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.password"
                            >{{ errors.password[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.credentials"
                            >{{ errors.credentials[0] }}</span
                        >
                    </div>
                </div>

                <div class="grid grid-cols-1">
                    <button
                        @click.prevent="login"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span
                            class="absolute left-0 inset-y-0 flex items-center pl-3"
                        >
                            <svg
                                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
                        Sign in
                    </button>
                    <router-link
                        to="/forgot_password"
                        class="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-black"
                    >
                        Forgot your password?!
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import User from "../apis/User";

export default {
    data() {
        return {
            credentials: {
                email: "",
                password: ""
            },
            errors: []
        };
    },

    methods: {
        login() {
            User.login(this.credentials)
                .then(response => {
                    this.$store.commit("LOGIN", true);
                    localStorage.setItem("token", response.data);
                    User.auth().then(res => {
                        localStorage.setItem("isAdmin", res.data.is_admin);
                        if (localStorage.getItem("isAdmin") === true) {
                            this.$store.commit("ADMIN", true);
                            this.$router.push("/admin");
                        } else {
                            this.$store.commit("ADMIN", false);
                            this.$router.push("/dashboard");
                        }
                    });
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        }
    }
};
</script>
