// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
import MapOpen from "./MapOpen";
import Home from "./Home";
import Dashboard from "./Dashboard";

function Parent() {
    const [name, setName] = useState(localStorage.getItem("name"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [userLeaves, setUserLeaves] = useState(
        localStorage.getItem("leaves"),
    );
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));

    return (
        <>
            <Home
                setUserLeaves={setUserLeaves}
                setUserId={setUserId}
                setUserToken={setUserToken}
                setName={setName}
                userToken={userToken}
            />
            <Dashboard
                setUserLeaves={setUserLeaves}
                setUserId={setUserId}
                setUserToken={setUserToken}
                setName={setName}
                userId={userId}
                name={name}
                userLeaves={userLeaves}
                userToken={userToken}
            />
            <MapOpen userToken={userToken} name={name} />
        </>
    );
}

export default Parent;
