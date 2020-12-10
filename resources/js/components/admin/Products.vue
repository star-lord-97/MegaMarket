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
                    <td>Edit/Delete</td>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-if="products"
                    v-for="(product, index) in products"
                    :key="product.id"
                >
                    <td>{{ ++index }}</td>
                    <td>
                        <router-link
                            :to="{ path: '/products/' + product.id }"
                            class="text-black hover:text-black hover:no-underline"
                            >{{ product.name }}</router-link
                        >
                    </td>
                    <td>
                        <img
                            :src="product.image"
                            :alt="product.name"
                            class="rounded-lg w-24"
                        />
                    </td>
                    <td>{{ product.units }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        {{ product.discreption.slice(0, 30) }}
                        <router-link
                            :to="{ path: '/products/' + product.id }"
                            class="text-black hover:text-black hover:underline"
                        >
                            ...
                        </router-link>
                    </td>
                    <td>
                        <router-link
                            :to="{
                                path: '/edit_product?product_id=' + product.id
                            }"
                            class="btn btn-success mb-2 w-24"
                        >
                            Edit
                        </router-link>
                        <button
                            class="btn btn-danger w-24"
                            @click="deleteProduct(product.id, index)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h1 v-if="products && products.length <= 0" class="text-xl">
            No products to show yet :"[
        </h1>
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
            products_pagination: null,
            current_page: 0
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
                    this.current_page = page;
                });
        },

        deleteProduct(product_id, index) {
            axiosInstanceWithToken()
                .delete(`/products/${product_id}`)
                .then(this.getResults(this.current_page));
        }
    }
};
</script>
