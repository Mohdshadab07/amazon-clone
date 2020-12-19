import axios from "axios";
const instance = axios.create({
    baseURL: '...' //the api (cloud finction) url
});

export default instance;