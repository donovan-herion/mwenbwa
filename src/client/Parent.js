import React, {useState} from "react";
import MapOpen from "./MapOpen";
import Home from "./Home";
import Dashboard from "./Dashboard";

function Parent() {
    const [name, setName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userToken, setUserToken] = useState(null);

    return (
        <>
            <Home
                setUserId={setUserId}
                setUserToken={setUserToken}
                setName={setName}
            />
            <Dashboard userId={userId} userToken={userToken} name={name} />
            <MapOpen />
        </>
    );
}

export default Parent;
