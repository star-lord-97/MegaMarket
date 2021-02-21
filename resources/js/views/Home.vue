<template>
    <section class="bg-white py-8">
        <h2
            class="mx-96 my-10 text-center text-3xl font-extrabold text-indigo-400 bg-gray-100 rounded-full"
        >
            Store
        </h2>
        <h2 class="inline">Categories:</h2>
        <router-link class="mx-10" to="/">New</router-link>
        <router-link class="mx-10" :to="'/category/sale'">On Sale</router-link>
        <div
            class="inline mx-10"
            v-for="category in state.categories"
            :key="category"
        >
            <router-link :to="'/category/' + category">{{
                category
            }}</router-link>
        </div>
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <div
                class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
                v-for="product in state.products"
                :key="product.id"
            >
                <router-link :to="{ path: '/product/' + product.id }">
                    <!-- :src="product.main_image[0].image_path" -->
                    <img
                        src="\img\default-product.png"
                        :alt="product.name"
                        class="hover:grow hover:shadow-lg"
                    />
                    <div class="pt-3 flex items-center justify-between">
                        <p class="">{{ product.name }}</p>
                    </div>
                </router-link>
                <router-link :to="'/category/' + product.category">
                    <p class="pt-1 text-gray-500 font-bold">
                        {{ product.category }}
                    </p>
                </router-link>
                <p
                    class="pt-1 text-gray-900 font-bold"
                    v-if="product.sale === 1"
                >
                    On Sale
                </p>
                <p class="pt-1 text-gray-900 font-bold">
                    $ {{ product.price }}
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted, reactive } from "vue";
import store from "../store";

export default {
    setup() {
        const state = reactive({
            products: [],
            categories: [],
        });

        onMounted(() => {
            store.dispatch("getAllProducts").then((response) => {
                state.products = response.data;
            });

            store.dispatch("getAllCategories").then((response) => {
                state.categories = response.data;
            });
        });

        return { state };
    },
};
</script>
