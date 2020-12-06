<template>
    <div>
        <h1>Admin</h1>
        <div v-if="user">
            <h3>Hello, {{ user.name }}</h3>
            <span>{{ user.email }}</span>
        </div>
    </div>
</template>

<script>
import User from "../apis/User";
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            user: state => state.auth.user
        })
    },

    mounted() {
        User.auth().then(response => {
            this.$store.commit("AUTH_USER", response.data);
            if (localStorage.getItem("isAdmin") === "1") {
                this.$store.commit("ADMIN", true);
            } else {
                this.$store.commit("ADMIN", false);
            }
        });
    }
};
</script>
