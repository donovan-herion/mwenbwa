// eslint-disable-next-line unicorn/filename-case
import React from "react";
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
                        className="home-signup-text-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                </div>
                <div className="home-signup-text-input-container">
                    <FontAwesomeIcon
                        icon={faAt}
                        className="home-signup-icon-email"
                    />
                    <input
                        className="home-signup-email-input"
                        type="text"
                        name="username"
                        placeholder="Email"
                    />
                </div>

                <div className="home-signup-text-password-container">
                    <FontAwesomeIcon
                        icon={faUnlock}
                        className="home-signup-icon-password"
                    />
                    <input
                        className="home-signup-password-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <div className="home-signup-checkbox-container">
                    <input type="color" name="" />
                    <span className="home-signup-span-checkbox">
                        Choose your color
                    </span>
                </div>
                <button
                    onClick={() => props.setHide("none")}
                    className="home-signup-submit-button"
                    type="submit">
                    Sign Up
                </button>
            </div>
        );
    } else {
        return null;
    }
}

export default Signup;
