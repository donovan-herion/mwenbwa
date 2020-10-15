// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
import "./Home.css";
import flatDesign from "./data/flat-design.jpg";
import Login from "./Login";
import Signup from "./Signup";
import axios from "./axios";
import {useEffect} from "react";

function Home(props) {
    const [hide, setHide] = useState("");

    const [connexionStatus, setConnexionStatus] = useState(true);

    const checkUser = (tempEmail, tempPassword) => {
        axios
            .post("/login", {
                email: tempEmail,
                password: tempPassword,
            })
            .then((res) => {
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("leaves", res.data.leaves);
                localStorage.setItem("trees", res.data.trees);
                localStorage.setItem("token", res.data.token);

                const name = localStorage.getItem("name");
                const userId = localStorage.getItem("userId");
                const leaves = localStorage.getItem("leaves");
                const trees = localStorage.getItem("trees");
                const token = localStorage.getItem("token");

                props.setName(name);
                props.setUserId(userId);
                props.setUserLeaves(leaves);
                props.setUserTrees(trees);
                props.setUserToken(token);
            })
            .catch((err) => console.log(err.message));
    };

    const createUser = (tempName, tempEmail, tempPassword, tempColor) => {
        axios
            .post("/signup", {
                name: tempName,
                email: tempEmail,
                password: tempPassword,
                color: tempColor,
            })
            .then((res) => {
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("leaves", res.data.leaves);
                localStorage.setItem("trees", res.data.trees);
                localStorage.setItem("token", res.data.token);

                const name = localStorage.getItem("name");
                const userId = localStorage.getItem("userId");
                const leaves = localStorage.getItem("leaves");
                const trees = localStorage.getItem("trees");
                const token = localStorage.getItem("token");

                props.setName(name);
                props.setUserId(userId);
                props.setUserLeaves(leaves);
                props.setUserTrees(trees);
                props.setUserToken(token);
            })
            .catch((err) => console.log(err.message));
    };

    const checkToken = () => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            props.setUserToken(token);
        }
    };

    useEffect(() => {
        checkToken();
        console.log("checkedtoken");
    }, []);

    if (props.userToken !== null) {
        console.log(props.userToken);
        return null;
    } else {
        return (
            <>
                <div className="home-full-screen" style={{display: hide}}>
                    {" "}
                </div>
                <div className="home-flex-container" style={{display: hide}}>
                    <div className="home-left">
                        <img
                            src={flatDesign}
                            className="home-flat-design"
                            alt="flat design"
                        />
                        <a
                            href="#"
                            onClick={() => setConnexionStatus(!connexionStatus)}
                            className="home-create-button">
                            {connexionStatus
                                ? "Create an account"
                                : "I already have an account"}
                        </a>
                    </div>
                    <Login
                        setName={props.setName}
                        connexionStatus={connexionStatus}
                        setHide={setHide}
                        checkUser={checkUser}
                    />
                    <Signup
                        connexionStatus={connexionStatus}
                        setHide={setHide}
                        createUser={createUser}
                    />
                </div>
            </>
        );
    }
}

export default Home;
