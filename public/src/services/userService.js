import axios from "../setup/axios";

const registerService = (data) => {
    return axios.post("api/auth/register", data);
};

export { registerService };
