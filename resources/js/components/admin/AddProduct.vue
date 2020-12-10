<template>
    <div class="flex items-center justify-center bg-gray-50 py-12 px-4">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2
                    class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                >
                    Add a new product
                </h2>
            </div>
            <form class="mt-8 space-y-6">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="text-center">
                        <label for="productName" class="sr-only"
                            >Product name</label
                        >
                        <input
                            v-model="newProduct.name"
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
                    <div class="text-center">
                        <label for="productImage" class="sr-only"
                            >Product Image</label
                        >
                        <div class="flex">
                            <input
                                id="productImage"
                                name="productImage"
                                type="file"
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                @change="imageUploaded"
                            />
                            <img
                                v-if="imageURL"
                                :src="this.imageURL"
                                alt="image"
                                class="w-12"
                            />
                        </div>
                        <span
                            class="text-red-700 font-bold"
                            v-if="errors.productImage"
                            >{{ errors.productImage[0] }}</span
                        >
                    </div>
                    <div class="text-center">
                        <label for="productUnits" class="sr-only"
                            >Product units</label
                        >
                        <input
                            v-model="newProduct.units"
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
                            v-model="newProduct.price"
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
                            v-model="newProduct.discreption"
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
                        @click.prevent="addProduct"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add product
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axiosInstanceWithToken from "../../apis/Api";

export default {
    data() {
        return {
            newProduct: {
                name: "",
                units: "",
                price: "",
                discreption: "",
                image: ""
            },

            imageURL: null,

            errors: []
        };
    },

    methods: {
        addProduct() {
            const newProductFormData = new FormData();
            newProductFormData.append("name", this.newProduct.name);
            newProductFormData.append("units", this.newProduct.units);
            newProductFormData.append(
                "discreption",
                this.newProduct.discreption
            );
            newProductFormData.append("price", this.newProduct.price);
            newProductFormData.append("image", this.newProduct.image);

            axiosInstanceWithToken()
                .post("/products", newProductFormData)
                .then(response => {
                    this.$router.push("/").catch(() => {});
                })
                .catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                });
        },

        imageUploaded(event) {
            this.newProduct.image = event.target.files[0];
            this.imageURL = URL.createObjectURL(event.target.files[0]);
        }
    }
};
</script>
