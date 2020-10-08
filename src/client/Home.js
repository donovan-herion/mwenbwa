// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
import "./Home.css";
import flatDesign from "./data/flat-design.jpg";
import Login from "./Login";
import Signup from "./Signup";

function Home() {
    const [hide, setHide] = useState("");

    const [connexionStatus, setConnexionStatus] = useState(true);

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
                <Login connexionStatus={connexionStatus} setHide={setHide} />
                <Signup connexionStatus={connexionStatus} setHide={setHide} />
            </div>
        </>
    );
}

export default Home;
