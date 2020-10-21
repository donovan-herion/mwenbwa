// eslint-disable-next-line unicorn/filename-case
import React, {useState, useEffect} from "react";
import MapOpen from "./MapOpen";
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from "./axios";

function Parent() {
    const [name, setName] = useState(localStorage.getItem("name"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [userLeaves, setUserLeaves] = useState(
        localStorage.getItem("leaves"),
    );
    const [userTrees, setUserTrees] = useState(localStorage.getItem("trees"));
    const [userToken, setUserToken] = useState(localStorage.getItem("token"));

    //state for ranking
    const [ranking, setRanking] = useState([]);

    //state for logs
    const [logs, setLogs] = useState([]);

    const getUserInfo = () => {
        axios
            .post("/info", {
                userId: userId,
            })
            .then((res) => {
                localStorage.setItem("trees", res.data.trees);
                setUserTrees(res.data.trees);
                localStorage.setItem("leaves", res.data.leaves);
                setUserLeaves(res.data.leaves);
            })
            .catch((err) => console.log(err.message));
    };

    // get Ranking
    const getRanking = () => {
        axios
            .get("/ranking")
            .then((res) => {
                setRanking(res.data);
            })
            .catch((err) => console.log(err.message));
    };

    // get Logs
    const getLogs = () => {
        axios
            .get("/logs")
            .then((res) => {
                setLogs(res.data);
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getRanking();
        getLogs();
    }, []);

    return (
        <>
            <Home
                setUserLeaves={setUserLeaves}
                setUserTrees={setUserTrees}
                setUserId={setUserId}
                setUserToken={setUserToken}
                setName={setName}
                userToken={userToken}
                getRanking={getRanking}
                getLogs={getLogs}
            />
            <Dashboard
                setUserLeaves={setUserLeaves}
                setUserTrees={setUserTrees}
                setUserId={setUserId}
                setUserToken={setUserToken}
                setName={setName}
                userId={userId}
                name={name}
                userLeaves={userLeaves}
                userTrees={userTrees}
                userToken={userToken}
                ranking={ranking}
                logs={logs}
            />
            <MapOpen
                userToken={userToken}
                name={name}
                userId={userId}
                userLeaves={userLeaves}
                getUserInfo={getUserInfo}
                getRanking={getRanking}
                getLogs={getLogs}
            />
        </>
    );
}

export default Parent;
