// import React from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: "https://wood-wars.herokuapp.com/",
});

export default instance;
