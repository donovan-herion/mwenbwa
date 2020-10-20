// eslint-disable-next-line unicorn/filename-case
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalSettings.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faUser,
    faAt,
    faKey,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

function ModalSettings(props) {
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
                                    props.setUserPasswordSettings(
                                        e.target.value,
                                    )
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
                                    props.setUserNewPasswordSettings(
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="Modal-settings-footer">
                    <Button
                        variant="secondary"
                        onClick={props.handleCloseSettings}>
                        Close
                    </Button>
                    <Button variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalSettings;
