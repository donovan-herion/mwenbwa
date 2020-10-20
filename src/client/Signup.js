// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faAt, faUnlock} from "@fortawesome/free-solid-svg-icons";

function Signup(props) {
    if (props.connexionStatus == false) {
        return (
            <div className="home-right">
                <h1 className="home-signup-title">Sign Up</h1>
                <div className="home-signup-text-input-container">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="home-signup-icon-username"
                    />
                    <input
                        className="home-signup-text-input error-signup-class"
                        type="text"
                        maxLength={15}
                        minLength={5}
                        placeholder="Username"
                        value={props.name}
                        onChange={(e) => props.setName(e.target.value)}
                    />
                </div>
                <div className="home-signup-text-input-container">
                    <FontAwesomeIcon
                        icon={faAt}
                        className="home-signup-icon-email"
                    />
                    <input
                        className="home-signup-email-input error-signup-class"
                        type="email"
                        name="username"
                        placeholder="Email"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                    />
                </div>

                <div className="home-signup-text-password-container">
                    <FontAwesomeIcon
                        icon={faUnlock}
                        className="home-signup-icon-password"
                    />
                    <input
                        className="home-signup-password-input error-signup-class"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => {
                        props.createUser(
                            props.name,
                            props.email,
                            props.password,
                        );
                        props.getRanking();
                        props.getLogs();
                    }}
                    className="home-signup-submit-button"
                    type="submit">
                    Sign Up
                </button>
                <a
                    href="#"
                    onClick={() =>
                        props.setConnexionStatus(!props.connexionStatus)
                    }
                    className="disapear-button">
                    I have an account
                </a>
            </div>
        );
    } else {
        return null;
    }
}

export default Signup;
