<template>
    <div>
        <table class="table table-responsive table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Joined</td>
                    <td>Total Orders</td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="users" v-for="(user, index) in users" :key="user.id">
                    <td>{{ ++index }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.created_at.split("T")[0] }}</td>
                    <td>{{ user.orders.length }}</td>
                </tr>
            </tbody>
        </table>
        <pagination
            v-if="users_pagination"
            :data="this.users_pagination"
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
            users: null,
            users_pagination: null
        };
    },

    mounted() {
        this.getResults();
    },

    methods: {
        getResults(page = 1) {
            axiosInstanceWithToken()
                .get("/users?page=" + page)
                .then(response => {
                    this.users = response.data.data;
                    this.users_pagination = response.data;
                });
        }
    }
};
</script>
