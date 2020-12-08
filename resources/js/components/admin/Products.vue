<template>
    <div>
        <table class="table table-responsive table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td>Product</td>
                    <td>Image</td>
                    <td>Units</td>
                    <td>Price</td>
                    <td>Description</td>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="products"
                    v-for="(product, index) in products"
                    :key="product.id"
                >
                    <td>{{ ++index }}</td>
                    <td>{{ product.name }}</td>
                    <td>
                        <img
                            :src="product.image"
                            :alt="product.name"
                            class="rounded-full w-24"
                        />
                    </td>
                    <td>{{ product.units }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.discreption }}</td>
                </tr>
            </tbody>
        </table>
        <pagination
            v-if="products_pagination"
            :data="this.products_pagination"
            @pagination-change-page="getResults"
            align="center"
        ></pagination>
    </div>
</template>

<script>
import axiosInstanceWithToken from "../../apis/Api";

export default {
    data() {
        return {
            products: null,
            products_pagination: null
        };
    },

    mounted() {
        this.getResults();
    },

    methods: {
        getResults(page = 1) {
            axiosInstanceWithToken()
                .get("/products?page=" + page)
                .then(response => {
                    this.products = response.data.data;
                    this.products_pagination = response.data;
                });
        }
    }
};
</script>
