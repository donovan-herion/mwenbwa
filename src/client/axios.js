import React from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:80/",
});

export default instance;
