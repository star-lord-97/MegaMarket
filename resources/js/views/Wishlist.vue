<template>
    <section class="bg-white py-8">
        <h2
            class="mx-96 my-10 text-center text-3xl font-extrabold text-indigo-400 bg-gray-100 rounded-full"
        >
            Wishlist
        </h2>
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <div
                class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
                v-for="wish in state.wishlistProducts"
                :key="wish.id"
            >
                <router-link :to="{ path: '/product/' + wish.product.id }">
                    <!-- :src="wish.product.main_image[0].image_path" -->
                    <img
                        src="\img\default-product.png"
                        :alt="wish.product.name"
                        class="hover:grow hover:shadow-lg"
                    />
                    <div class="pt-3 flex items-center justify-between">
                        <p class="">{{ wish.product.name }}</p>
                    </div>
                </router-link>
                <p class="pt-1 text-gray-900 font-bold">
                    Price: $ {{ wish.product.price }}
                </p>
                <button
                    @click.prevent="deleteFromWishlist(wish.id)"
                    class="text-red-500"
                >
                    Remove
                </button>
            </div>
        </div>
        <h1 v-show="state.wishlistProducts.length == 0">
            Your wishlist is empty, go
            <router-link to="/" class="underline">Home</router-link> to fill it.
        </h1>
    </section>
</template>

<script>
import store from "../store";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();

        const state = reactive({
            wishlistProducts: [],
        });

        onMounted(() => {
            store.dispatch("getUserWishlist").then((response) => {
                state.wishlistProducts = response.data;
            });
        });

        let deleteFromWishlist = (id) => {
            store
                .dispatch("deleteFromWishlist", { id: id })
                .then((response) => {
                    router.push("/");
                });
        };

        return { state, deleteFromWishlist };
    },
};
</script>

<style></style>
