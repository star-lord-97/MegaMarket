import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
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
