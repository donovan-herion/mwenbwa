// eslint-disable-next-line unicorn/filename-case
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalLogout.css";

const clearUserData = (props) => {
    props.setName(null);
    props.setUserId(null);
    props.setUserLeaves(null);
    props.setUserToken(null);

    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("leaves");
    localStorage.removeItem("trees");
    localStorage.removeItem("token");

    clearInterval(props.intervalId);

    props.handleCloseLogout();
};

function ModalLogout(props) {
    return (
        <>
            <Modal
                className="modal-logout"
                show={props.showLogout}
                onHide={props.handleCloseLogout}
                centered={true}
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={props.handleCloseLogout}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => clearUserData(props)}
                        variant="danger">
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalLogout;
