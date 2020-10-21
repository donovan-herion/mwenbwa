// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "./axios";
import "./ModalSettings.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUser,
    faAt,
    faKey,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

function ModalSettings(props) {
    const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
    const [updateErrorMessage, setUpdateErrorMessage] = useState("");

    const [userPasswordSettings, setUserPasswordSettings] = useState("");
    const [userNewPasswordSettings, setUserNewPasswordSettings] = useState("");

    const updateUser = (tempUserId, tempEmail, tempName, tempNewPassword) => {
        axios
            .post("/update", {
                userId: tempUserId,
                email: tempEmail,
                name: tempName,
                password: tempNewPassword,
            })
            .then((res) => {
                console.log(res.data);
                props.setName(props.userNameSettings);
                localStorage.setItem("name", props.userNameSettings);
                setUpdateSuccessMessage(res.data);

                document
                    .querySelector(".update-message-success")
                    .classList.add("update-message-success-appear");
            })
            .catch((err) => {
                console.log(err.message);
                setUpdateErrorMessage(err.message);
                document
                    .querySelector(".update-message-error")
                    .classList.add("update-message-error-appear");
            });
    };
    return (
        <>
            <Modal
                className="modal-settings"
                show={props.showSettings}
                onHide={props.handleCloseSettings}
                centered={true}
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>My Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-right">
                        <div className="modal-signup-text-input-container">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="modal-signup-icon-username"
                            />
                            <input
                                className="modal-signup-text-input"
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={(e) =>
                                    props.setUserNameSettings(e.target.value)
                                }
                                value={props.userNameSettings}
                            />
                        </div>
                        <div className="modal-signup-text-input-container">
                            <FontAwesomeIcon
                                icon={faAt}
                                className="modal-signup-icon-email"
                            />
                            <input
                                className="modal-signup-email-input"
                                type="text"
                                name="username"
                                placeholder="Email"
                                onChange={(e) =>
                                    props.setUserEmailSettings(e.target.value)
                                }
                                value={props.userEmailSettings}
                            />
                        </div>

                        <div className="modal-signup-text-password-container">
                            <FontAwesomeIcon
                                icon={faKey}
                                className="modal-signup-icon-password"
                            />
                            <input
                                className="modal-signup-password-input"
                                type="password"
                                placeholder="New Password"
                                onChange={(e) =>
                                    setUserPasswordSettings(e.target.value)
                                }
                            />
                        </div>
                        <div className="modal-signup-text-password-container">
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="modal-signup-icon-password"
                            />
                            <input
                                className="modal-signup-password-input"
                                type="password"
                                placeholder="Confirm New Password"
                                onChange={(e) =>
                                    setUserNewPasswordSettings(e.target.value)
                                }
                            />
                        </div>
                        <p className="update-message-success">
                            {updateSuccessMessage}
                        </p>
                        <p className="update-message-error">
                            {updateErrorMessage}
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="Modal-settings-footer">
                    <Button
                        variant="secondary"
                        onClick={props.handleCloseSettings}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        disabled={
                            userPasswordSettings == userNewPasswordSettings
                                ? false
                                : true
                        }
                        onClick={() =>
                            updateUser(
                                props.userId,
                                props.userEmailSettings,
                                props.userNameSettings,
                                userNewPasswordSettings,
                            )
                        }>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSettings;
