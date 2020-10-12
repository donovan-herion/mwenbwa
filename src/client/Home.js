// eslint-disable-next-line unicorn/filename-case
import React, {useState, useEffect} from "react";
import "./Home.css";
import flatDesign from "./data/flat-design.jpg";
import Login from "./Login";
import Signup from "./Signup";
import axios from "./axios";

function Home() {
    const [hide, setHide] = useState("");

    const [connexionStatus, setConnexionStatus] = useState(true);

    const checkUser = (tempEmail, tempPassword) => {
        axios
            .post("/login", {
                email: tempEmail,
                password: tempPassword,
            })
            .then((res) => {
                console.log("moment de creer la session");
                console.log(res);

                setHide("none");
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
                console.log("moment de creer la session");
                console.log(res);
                setHide("none");
            })
            .catch((err) => console.log(err.message));
    };

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

export default Home;
