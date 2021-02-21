<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2" v-if="state.product">
                <!-- :src="state.product.main_image[0].image_path" -->
                <img
                    src="\img\default-product.png"
                    :alt="state.product.name"
                    class="w-2/5"
                />
                <h3 class="title">{{ state.product.name }}</h3>
                <p class="text-muted">{{ state.product.details }}</p>
                <h4>
                    <span class="small-text text-muted float-left"
                        >$ {{ state.product.price }}</span
                    >
                </h4>
                <br />
                <hr />
                <div>
                    <label class="row"
                        ><span class="col-md-2 float-left">Quantity: </span
                        ><input
                            type="number"
                            name="units"
                            min="1"
                            :max="state.product.units"
                            class="col-md-2 float-left"
                            v-model="state.order.quantity"
                        />
                        <span class="col-md-2 float-left">Size: </span
                        ><select
                            v-model="state.order.size"
                            class="col-md-2 float-left"
                        >
                            <option disabled value="">
                                Please select size
                            </option>
                            <option
                                v-for="size in state.product.sizes"
                                :key="size.id"
                                :value="size.size"
                            >
                                {{ size.size }}
                            </option>
                        </select>
                        <span
                            class="text-red-700 font-bold"
                            v-if="state.errors.size"
                            >{{ state.errors.size[0] }}</span
                        >
                    </label>
                    <br />
                    <hr />
                    <p class="small-text text-muted float-left">
                        Total: $
                        {{ state.product.price * state.order.quantity }}
                    </p>
                    <p class="small-text text-muted float-right">
                        Available Units:
                        {{ state.product.units - state.order.quantity }}
                    </p>
                </div>
                <br />
                <hr />
                <button
                    @click.prevent="addToCart"
                    class="col-md-4 btn btn-sm btn-primary float-right text-red-500 font-bold"
                >
                    Add to cart
                </button>
                <br />
                <button
                    @click.prevent="addToWishlist"
                    class="col-md-4 btn btn-sm btn-primary float-right text-red-500 font-bold"
                >
                    Add to wishlist
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            product: {},
            order: {
                quantity: 1,
                size: "",
            },
            errors: [],
        });

        onMounted(() => {
            store
                .dispatch("getOneProduct", { id: route.params.id })
                .then((response) => {
                    state.product = response.data;
                });
        });

        let addToCart = () => {
            store
                .dispatch("addToCart", {
                    quantity: state.order.quantity,
                    size: state.order.size,
                    product_id: state.product.id,
                })
                .then((response) => {
                    router.push("/cart");
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        state.errors = error.response.data.errors;
                    }
                });
        };

        let addToWishlist = () => {
            store
                .dispatch("addToWishlist", {
                    product_id: state.product.id,
                })
                .then((response) => {
                    router.push("/wishlist");
                });
        };

        return { state, addToCart, addToWishlist };
    },
};
</script>
