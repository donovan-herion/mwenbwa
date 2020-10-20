// eslint-disable-next-line unicorn/filename-case
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalProfilePic(props) {
    return (
        <>
            <Modal
                className="modal-logout"
                show={props.showProfilePic}
                onHide={props.handleCloseProfilePic}
                centered={true}
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Picture Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Profile Pictures are retrieved from you gravatar
                        account.
                    </p>
                    <p>
                        If you do not have a gravatar account follow the link
                        below to create one.
                    </p>
                    <a href="https://en.gravatar.com/" target="_blank">
                        Link to the gravatar website
                    </a>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={props.handleCloseProfilePic}>
                        Got it
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalProfilePic;
