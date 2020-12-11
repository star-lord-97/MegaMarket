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
                    Update your profile
                </h2>
            </div>
            <form class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="text-center">
                        <label for="name" class="sr-only">Name</label>
                        <input
                            v-model="updatedUser.name"
                            id="name"
                            name="name"
                            type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Name"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.name"
                            >{{ errors.name[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="email-address" class="sr-only"
                            >Email address</label
                        >
                        <input
                            v-model="updatedUser.email"
                            id="email-address"
                            name="email"
                            type="email"
                            autocomplete="email"
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
                            v-model="updatedUser.password"
                            id="password"
                            name="password"
                            type="password"
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
                        <label for="password_confirmation" class="sr-only"
                            >Password confirmation</label
                        >
                        <input
                            v-model="updatedUser.password_confirmation"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password confirmation"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.password"
                            >{{ errors.password[0] }}</span
                        >
                    </div>
                </div>

                <div>
                    <button
                        @click.prevent="updateUser()"
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
                        Update
                    </button>
                </div>
                <div>
                    <button
                        @click.prevent="deleteUser()"
                        class="btn-danger w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
                    >
                        Delete user
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import User from "../apis/User";
import axiosInstanceWithToken from "../apis/Api";

export default {
    props: ["user_id"],

    data() {
        return {
            oldUser: {},

            updatedUser: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            },

            errors: []
        };
    },

    mounted() {
        User.auth().then(response => {
            this.oldUser = response.data;
            this.updatedUser.name = response.data.name;
            this.updatedUser.email = response.data.email;
        });
    },

    methods: {
        updateUser() {
            axiosInstanceWithToken()
                .patch(`users/${this.oldUser.id}`, this.updatedUser)
                .then(response => {
                    this.$router.push("/");
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },

        deleteUser() {
            axiosInstanceWithToken()
                .delete(`users/${this.oldUser.id}`)
                .then(response => {
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
