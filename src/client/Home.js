// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
import greenTriangle from "./data/green-triangle.png";

const itemsStyle = {
    margin: "350px 80px 0",
    width: "250px",
    backgroundColor: "#BA855E",
    position: "relative",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const greenTriangleStyle = {
    width: "400px",
    height: "200px",
    position: "absolute",
    top: "-180px",
    left: "-75px",
};
export default function Home() {
    const [hide, setHide] = useState("flex");
    return (
        <>
            <div
                // eslint-disable-next-line react/jsx-no-duplicate-props
                style={{
                    display: hide,
                    justifyContent: "center",
                    width: "100vw",
                    height: "100vh",
                    position: "fixed",
                    zIndex: "2",
                    backgroundColor: "white",
                }}>
                <div style={itemsStyle}>
                    <img src={greenTriangle} style={greenTriangleStyle} />

                    <h2>{"Game rules"}</h2>
                    <p style={{margin: "10px"}}>
                        {"Lorem ipsum dolor sit amet consectetur."}
                    </p>
                    <p style={{margin: "10px"}}>
                        {"Lorem ipsum dolor sit amet consectetur."}
                    </p>
                    <p style={{margin: "10px"}}>
                        {"Lorem ipsum dolor sit amet consectetur."}
                    </p>
                    <p style={{margin: "10px"}}>
                        {"Lorem ipsum dolor sit amet consectetur."}
                    </p>
                    <p style={{margin: "10px"}}>
                        {"Lorem ipsum dolor sit amet consectetur."}
                    </p>
                </div>{" "}
                <div style={itemsStyle}>
                    <img src={greenTriangle} style={greenTriangleStyle} />

                    <h2>{"Login"}</h2>
                    <input
                        type={"text"}
                        name={"name"}
                        placeholder={"Your name"}
                    />
                    <br />
                    <input
                        type={"email"}
                        name={"email"}
                        placeholder={"Your email"}
                    />
                    <br />
                    <input
                        type={"password"}
                        name={"password"}
                        placeholder={"Your password"}
                    />
                    <br />
                    <button
                        // eslint-disable-next-line react/jsx-curly-brace-presence
                        type="button"
                        onClick={() => {
                            setHide("none");
                        }}>
                        {"Simulation Login"}
                    </button>
                </div>
                <div style={itemsStyle}>
                    <img src={greenTriangle} style={greenTriangleStyle} />
                    <h2>{"Sign Up"}</h2>
                    <br />
                    <input
                        type={"email"}
                        name={"email"}
                        placeholder={"Your email"}
                    />
                    <br />
                    <input
                        type={"password"}
                        name={"password"}
                        placeholder={"Your password"}
                    />
                    <br />
                    <button
                        // eslint-disable-next-line react/jsx-curly-brace-presence
                        type="button"
                        onClick={() => {
                            setHide("none");
                        }}>
                        {"Simulation Sign Up"}
                    </button>
                </div>
            </div>
        </>
    );
}
