<template>
    <div id="aa">
        <section class="bg-white py-8">
            <h2
                class="mx-96 my-10 text-center text-3xl font-extrabold text-indigo-400 bg-gray-100 rounded-full"
            >
                Store
            </h2>
            <div
                class="container mx-auto flex items-center flex-wrap pt-4 pb-12"
            >
                <div
                    class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
                    v-for="product in this.products"
                    :key="product.id"
                >
                    <router-link :to="{ path: '/products/' + product.id }">
                        <img
                            class="hover:grow hover:shadow-lg"
                            :src="product.image"
                            :alt="product.name"
                        />
                        <div class="pt-3 flex items-center justify-between">
                            <p class="">{{ product.name }}</p>
                        </div>
                        <p class="pt-1 text-gray-900 font-bold">
                            $ {{ product.price }}
                        </p>
                    </router-link>
                </div>
            </div>
        </section>
        <pagination
            :data="this.products_pagination"
            @pagination-change-page="getResults"
            align="center"
        ></pagination>
    </div>
</template>

<script>
import axiosInstanceWithToken from "../apis/Api";

export default {
    data() {
        return {
            products: [],
            products_pagination: {}
        };
    },

    mounted() {
        this.getResults();
    },

    methods: {
        getResults(page = 1) {
            axiosInstanceWithToken
                .get("/api/products?page=" + page)
                .then(response => {
                    this.products = response.data.data;
                    this.products_pagination = response.data;
                });
        }
    }
};
</script>
