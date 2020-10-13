import React from "react";
import ReactDOM from "react-dom";
import Parent from "./Parent";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <div class="main-flex-container">
        <Parent />
    </div>,
    document.querySelector("#root"),
);
