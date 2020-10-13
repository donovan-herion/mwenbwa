import React, {useState} from "react";
import MapOpen from "./MapOpen";
import Home from "./Home";
import Dashboard from "./Dashboard";

function Parent() {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    console.log(name);

    return (
        <>
            <Home setName={setName} />
            <Dashboard name={name} />
            <MapOpen />
        </>
    );
}

export default Parent;
