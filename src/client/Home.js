// eslint-disable-next-line unicorn/filename-case
import React, {useState, useEffect} from "react";
import "./Home.css";
import flatDesign from "./data/flat-design.jpg";
import Login from "./Login";
import Signup from "./Signup";
import axios from "./axios";

function Home(props) {
    const [connexionStatus, setConnexionStatus] = useState(true);
    const [hide, setHide] = useState("");

    // login state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const addErrorAnimationClass = () => {
        const shakeMeElement = document.querySelectorAll(".error-login");
        shakeMeElement.forEach((element) => {
            element.classList.add("error-class");
            setEmail("");
            setPassword("");
        });
    };

    // signup state
    const [name, setName] = useState("");

    const addErrorAnimationSignUpClass = () => {
        const shakeMeElement = document.querySelectorAll(".error-signup-class");
        shakeMeElement.forEach((element) => {
            console.log(element);
            element.classList.add("error-signup");
            setEmail("");
            setPassword("");
            setName("");
        });
    };

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
            .catch((err) => {
                addErrorAnimationClass();
                console.log(err.message);
            });
    };

    const createUser = (tempName, tempEmail, tempPassword) => {
        axios
            .post("/signup", {
                name: tempName,
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
            .catch((err) => {
                console.log(err.message);
                addErrorAnimationSignUpClass();
            });
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
                        setConnexionStatus={setConnexionStatus}
                        setHide={setHide}
                        checkUser={checkUser}
                        getRanking={props.getRanking}
                        getLogs={props.getLogs}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                    <Signup
                        connexionStatus={connexionStatus}
                        setConnexionStatus={setConnexionStatus}
                        setHide={setHide}
                        createUser={createUser}
                        getRanking={props.getRanking}
                        getLogs={props.getLogs}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        name={name}
                        setName={setName}
                    />
                </div>
            </>
        );
    }
}

export default Home;
