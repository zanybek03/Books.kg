import axios from "axios";

export const API = axios.create({
    baseURL:'https://bo-ok-shop.herokuapp.com/api/v1/'
})
