// eslint-disable-next-line unicorn/filename-case
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalRules.css";
import tree from "./data/tree.png";
import leaf from "./data/leaf.png";

function ModalRules(props) {
    return (
        <>
            <Modal
                className="game-rules"
                show={props.showRules}
                onHide={props.handleCloseRules}
                centered={true}
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img className="tree-image" src={tree} />
                        Game Rules
                        <img className="tree-image" src={tree} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <img className="tree-image" src={leaf} />
                        Buy a lot of trees
                    </p>
                    <p>
                        <img className="tree-image" src={leaf} />
                        Lock the trees you just bought
                    </p>
                    <p>
                        <img className="tree-image" src={leaf} />
                        Enjoy !
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={props.handleCloseRules}>
                        Understood
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalRules;
