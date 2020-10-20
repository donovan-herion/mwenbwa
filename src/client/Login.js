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
                        className="home-login-icon-email"
                    />
                    <input
                        className="home-login-email-input error-login"
                        type="email"
                        name="username"
                        placeholder="Email"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                    />
                </div>
                <div className="home-login-text-password-container">
                    <FontAwesomeIcon
                        icon={faUnlock}
                        className="home-login-icon-password"
                    />
                    <input
                        className="home-login-password-input error-login"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
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
                    onClick={() => {
                        props.checkUser(props.email, props.password);
                        props.getRanking();
                        props.getLogs();
                    }}
                    className="home-login-submit-button"
                    type="submit">
                    Login
                </button>
                <a
                    href="#"
                    onClick={() =>
                        props.setConnexionStatus(!props.connexionStatus)
                    }
                    className="disapear-button">
                    Create an account
                </a>
            </div>
        );
    } else {
        return null;
    }
}

export default Login;
