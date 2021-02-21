<template>
    <section class="bg-white py-8">
        <h2
            class="mx-96 my-10 text-center text-3xl font-extrabold text-indigo-400 bg-gray-100 rounded-full"
        >
            Cart
        </h2>
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <div
                class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
                v-for="order in state.cartOrders"
                :key="order.id"
            >
                <router-link :to="{ path: '/product/' + order.product.id }">
                    <img
                        :src="order.product.main_image[0].image_path"
                        :alt="order.product.name"
                        class="hover:grow hover:shadow-lg"
                    />
                    <div class="pt-3 flex items-center justify-between">
                        <p class="">{{ order.product.name }}</p>
                    </div>
                </router-link>
                <p class="pt-1 text-gray-900 font-bold">
                    Price: $ {{ order.product.price }}
                </p>
                <p class="pt-1 text-gray-900 font-bold">
                    Quantity: {{ order.quantity }}
                </p>
                <p class="pt-1 text-gray-900 font-bold">
                    Size: {{ order.size }}
                </p>
                <p class="pt-1 text-gray-900 font-bold">
                    Total: $ {{ order.product.price * order.quantity }}
                </p>
                <button
                    @click.prevent="deleteFromCart(order.id)"
                    class="text-red-500"
                >
                    Remove
                </button>
            </div>
        </div>
        <h2 v-show="state.cartOrders.length > 0" class="font-bold text-red-500">
            Total: $ {{ calculateTotal }}
        </h2>
        <router-link
            v-show="state.cartOrders.length > 0"
            class="inline-block p-4 border-2 text-red-700 font-bold"
            to="/"
            >Checkout</router-link
        >
        <h1 v-show="state.cartOrders.length == 0">
            Your cart is empty, go
            <router-link to="/" class="underline">Home</router-link> to fill it.
        </h1>
    </section>
</template>

<script>
import store from "../store";
import { computed, onMounted, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";

export default {
    setup() {
        const router = useRouter();

        const state = reactive({
            cartOrders: [],
        });

        onMounted(() => {
            store.dispatch("getUserCart").then((response) => {
                state.cartOrders = response.data;
            });
        });

        const calculateTotal = computed(() => {
            let total = 0;

            state.cartOrders.forEach((order) => {
                total = total + order.product.price * order.quantity;
            });

            return total;
        });

        let deleteFromCart = (id) => {
            store.dispatch("deleteFromCart", { id: id }).then((response) => {
                router.push("/");
            });
        };

        return { state, calculateTotal, deleteFromCart };
    },
};
</script>

<style></style>
