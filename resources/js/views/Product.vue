<template>
    <!-- <div class="bg-white py-8 container mx-auto items-center">
        <div class="pt-3 flex items-center justify-between">
            <p class="">{{ product.name }}</p>
        </div>
        <img :src="this.product.image" :alt="this.product.name" />
        <h1>{{ this.product.discreption }}</h1>
        <h1>$ {{ this.product.price }}</h1>
        <h1>{{ this.product.units }} units left</h1>
    </div> -->

    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <img :src="product.image" :alt="product.name" />
                <h3 class="title">{{ product.name }}</h3>
                <p class="text-muted">{{ product.description }}</p>
                <h4>
                    <span class="small-text text-muted float-left"
                        >$ {{ product.price }}</span
                    >
                    <span class="small-text float-right"
                        >Available Quantity: {{ product.units }}</span
                    >
                </h4>
                <br />
                <hr />
                <router-link
                    :to="{ path: '/checkout?product_id=' + product.id }"
                    class="col-md-4 btn btn-sm btn-primary float-right"
                    >Buy Now</router-link
                >
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            product: {}
        };
    },

    mounted() {
        var productId = this.$route.params.id;
        axios.get("/api/products/" + productId).then(response => {
            this.product = response.data;
        });
    }
};
</script>
