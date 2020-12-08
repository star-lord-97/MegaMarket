<template>
    <div class="flex items-center justify-center bg-gray-50 py-12 px-4">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2
                    class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    Edit product
                </h2>
            </div>
            <form class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="text-center">
                        <label for="productName" class="sr-only"
                            >Product name</label
                        >
                        <input
                            v-model="updatedProduct.name"
                            id="productName"
                            name="productName"
                            type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Product name"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.productName"
                            >{{ errors.productName[0] }}</span
                        >
                    </div>
                    <!-- image -->
                    <!-- <div class="text-center">
                        <label for="email-address" class="sr-only"
                            >Email address</label
                        >
                        <input
                            v-model="credentials.email"
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
                    </div> -->
                    <div class="text-center">
                        <label for="productUnits" class="sr-only"
                            >Product units</label
                        >
                        <input
                            v-model="updatedProduct.units"
                            id="productUnits"
                            name="productUnits"
                            type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Product units"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.productUnits"
                            >{{ errors.productUnits[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="productPrice" class="sr-only"
                            >Product price</label
                        >
                        <input
                            v-model="updatedProduct.price"
                            id="productPrice"
                            name="productPrice"
                            type="text"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Product price"
                        />
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.productPrice"
                            >{{ errors.productPrice[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="discreption" class="sr-only"
                            >Product description</label
                        >
                        <textarea
                            v-model="updatedProduct.discreption"
                            name="discreption"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Product description"
                        ></textarea>
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.discreption"
                            >{{ errors.discreption[0] }}</span
                        >
                    </div>
                </div>

                <div>
                    <button
                        @click.prevent="updateProduct"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update product
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axiosInstanceWithToken from "../../apis/Api";

export default {
    props: ["product_id"],

    data() {
        return {
            updatedProduct: {
                name: "",
                units: "",
                price: "",
                discreption: "",
                image: ""
            },

            errors: []
        };
    },

    beforeMount() {
        axiosInstanceWithToken()
            .get(`/products/${this.product_id}`)
            .then(response => {
                this.updatedProduct.name = response.data.name;
                this.updatedProduct.units = response.data.units;
                this.updatedProduct.price = response.data.price;
                this.updatedProduct.discreption = response.data.discreption;
                this.updatedProduct.image = response.data.image;
            });
    },

    methods: {
        updateProduct() {
            axiosInstanceWithToken()
                .patch(`/products/${this.product_id}`, this.updatedProduct)
                .then(response => {
                    this.$router
                        .push({ path: "/products/" + this.product_id })
                        .catch(() => {});
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

<style></style>
