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
                        class="group relative w-full flex justify-center my-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                    <a
                        id="facebook"
                        class="group relative w-full flex justify-center my-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:no-underline hover:text-white"
                        href="http://https://megamarket0.herokuapp.com/api/auth/facebook/redirect"
                    >
                        <span
                            class="absolute left-0 inset-y-0 flex items-center pl-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-facebook"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                                />
                            </svg>
                        </span>
                        Login with Facebook
                    </a>
                    <a
                        class="group relative w-full flex justify-center my-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black hover:no-underline hover:text-black"
                        href="http://https://megamarket0.herokuapp.com/api/auth/github/redirect"
                    >
                        <span
                            class="absolute left-0 inset-y-0 flex items-center pl-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-github"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                                />
                            </svg>
                        </span>
                        Login with Github
                    </a>
                    <!-- <button
                        class="group relative w-full flex justify-center my-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-500"
                    >
                        <span
                            class="absolute left-0 inset-y-0 flex items-center pl-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-google"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                                />
                            </svg>
                        </span>
                        Login with Google
                    </button> -->
                    <router-link
                        to="/forgot_password"
                        class="group relative w-full flex justify-center py-2 my-1 px-4 text-sm font-medium rounded-md text-black"
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
                        if (localStorage.getItem("isAdmin") === "true") {
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

<style scoped>
#facebook {
    background-color: #1877f2;
}
</style>
