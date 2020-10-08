// eslint-disable-next-line unicorn/filename-case
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faUnlock} from "@fortawesome/free-solid-svg-icons";

function Login(props) {
    if (props.connexionStatus == true) {
        return (
            <div className="home-right">
                <h1 className="home-login-title">Login</h1>
                <div className="home-login-text-input-container">
                    <FontAwesomeIcon
                        icon={faAt}
                        className="home-login-icon-username"
                    />
                    <input
                        className="home-login-email-input"
                        type="email"
                        name="username"
                        placeholder="Email"
                    />
                </div>
                <div className="home-login-text-password-container">
                    <FontAwesomeIcon
                        icon={faUnlock}
                        className="home-login-icon-password"
                    />
                    <input
                        className="home-login-password-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <div className="home-login-checkbox-container">
                    <input
                        className="home-login-checkbox"
                        type="checkbox"
                        name="remember-me"
                    />
                    <span className="home-login-span-checkbox">
                        Remember me
                    </span>
                </div>
                <button
                    onClick={() => props.setHide("none")}
                    className="home-login-submit-button"
                    type="submit">
                    Login
                </button>
            </div>
        );
    } else {
        return null;
    }
}

export default Login;
