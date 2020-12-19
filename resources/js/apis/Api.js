import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "https://megamarket0.herokuapp.com/api"
});

function axiosInstanceWithToken() {
    let token = localStorage.getItem("token");

    if (token) {
        axiosInstance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
    }

    return axiosInstance;
}

export default axiosInstanceWithToken;
