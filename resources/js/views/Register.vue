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
                    Create a new account
                </h2>
            </div>
            <form class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="text-center">
                        <label for="name" class="sr-only">Name</label>
                        <input
                            v-model="state.credentials.name"
                            id="name"
                            name="name"
                            type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Name"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.name"
                            >{{ state.errors.name[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="email-address" class="sr-only"
                            >Email address</label
                        >
                        <input
                            v-model="state.credentials.email"
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.email"
                            >{{ state.errors.email[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="phone-number" class="sr-only"
                            >Phone number</label
                        >
                        <input
                            v-model="state.credentials.phone"
                            id="phone-number"
                            name="phone"
                            type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Phone number"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.phone"
                            >{{ state.errors.phone[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="address" class="sr-only">Address</label>
                        <input
                            v-model="state.credentials.address"
                            id="address"
                            name="address"
                            type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Address"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.address"
                            >{{ state.errors.address[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="password" class="sr-only">Password</label>
                        <input
                            v-model="state.credentials.password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.password"
                            >{{ state.errors.password[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="password_confirmation" class="sr-only"
                            >Password confirmation</label
                        >
                        <input
                            v-model="state.credentials.password_confirmation"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            autocomplete="current-password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password confirmation"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.password"
                            >{{ state.errors.password[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.credentials"
                            >{{ state.errors.credentials[0] }}</span
                        >
                    </div>
                </div>

                <div>
                    <button
                        @click.prevent="register"
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
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";
import store from "../store";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();

        const state = reactive({
            credentials: {
                name: "",
                email: "",
                phone: "",
                address: "",
                password: "",
                password_confirmation: "",
            },

            errors: [],
        });

        let register = () => {
            store
                .dispatch("register", { credentials: state.credentials })
                .then((response) => {
                    router.push({ path: "/login" });
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        state.errors = error.response.data.errors;
                    }
                });
        };

        return { state, register };
    },
};
</script>
