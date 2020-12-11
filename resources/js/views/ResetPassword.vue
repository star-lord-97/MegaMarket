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
                    Reset your password
                </h2>
            </div>
            <form class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="text-center">
                        <label for="password" class="sr-only">Password</label>
                        <input
                            v-model="credentials.password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.password"
                            >{{ errors.password[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="password_confirmation" class="sr-only"
                            >Password confirmation</label
                        >
                        <input
                            v-model="credentials.password_confirmation"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            autocomplete="current-password"
                            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password confirmation"
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

                <div>
                    <button
                        @click.prevent="updatePassword()"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["token", "email"],

    data() {
        return {
            credentials: {
                password: "",
                password_confirmation: "",
                email: this.email,
                token: this.token
            },
            errors: []
        };
    },

    methods: {
        updatePassword() {
            axios
                .post("/api/reset", this.credentials)
                .then(response => this.$router.push("/login"))
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        }
    }
};
</script>
