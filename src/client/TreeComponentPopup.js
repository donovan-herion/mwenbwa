// eslint-disable-next-line unicorn/filename-case
import React, {useState, useEffect} from "react";
import "./TreeComponentPopup.css";
import Button from "react-bootstrap/Button";
import tree from "./data/tree.png";
import axios from "./axios";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

function TreeComponentPopup(props) {
    const [isLoading, setIsLoading] = useState(false);

    const [treeCompleteName, setTreeCompleteName] = useState("");
    const [treePrice, setTreePrice] = useState("");
    const [treeLockPrice, setTreeLockPrice] = useState("");
    const [treeIsLocked, setTreeIsLocked] = useState(false);
    const [treeOwnerName, setTreeOwnerName] = useState("");
    const [treeOwnerId, setTreeOwnerId] = useState("");
    const [treeComments, setTreeComments] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [showOwner, setShowOwner] = useState(false);
    const [writtenComment, setWrittenComment] = useState("");

    //creation de tous les states dont j'ai besoin

    useEffect(() => {
        getTreeInfo(props.tree._id);
    }, []);

    //api request buyTree
    const buyTree = (tempTreeId, tempUserId) => {
        props.setIsStillLoading(true);
        axios
            .post("/buytree", {
                treeId: tempTreeId,
                userId: tempUserId,
            })
            .then((res) => {
                getTreeInfo(props.tree._id);
                props.getUserInfo(props.userId);
                props.getLogs();
                props.getRanking();
                props.getAllTrees(props.mapCenter);
            })
            .catch((err) => console.log(err.message));
    };

    //api request lockTree
    const lockTree = (tempTreeId, tempUserId) => {
        props.setIsStillLoading(true);
        axios
            .post("/locktree", {
                treeId: tempTreeId,
                userId: tempUserId,
            })
            .then((res) => {
                getTreeInfo(props.tree._id);
                props.getUserInfo(props.userId);
                props.getLogs();
                props.getRanking();
                props.getAllTrees(props.mapCenter);
            })
            .catch((err) => console.log(err.message));
    };

    const addComment = (tempTreeId, tempUserId, tempComment) => {
        axios
            .post("/comment", {
                treeId: tempTreeId,
                userId: tempUserId,
                comment: tempComment,
            })
            .then((res) => {
                getTreeInfo(props.tree._id);
                props.getUserInfo(props.userId);
            });
    };

    //api request getAllTrees
    const getTreeInfo = (tempTreeId) => {
        setIsLoading(true);
        axios
            .post("/tree", {
                treeId: tempTreeId,
            })
            .then((res) => {
                setTreeCompleteName(res.data.nom_complet);
                setTreePrice(res.data.price);
                setTreeLockPrice(res.data.lockPrice);
                setTreeIsLocked(res.data.isLocked);
                setTreeComments(res.data.comments);
                setTreeOwnerName(res.data.ownerName);
                setTreeOwnerId(res.data.ownerId);
                setIsLoading(false);
            })
            .catch((err) => console.log(err.message));
    };

    if (isLoading === false && props.isStillLoading === false) {
        return (
            <div className="popup-container">
                <div className="flex-top">
                    <img src={tree} alt="tree pic" className="tree-pic" />
                    <h5 className="nom-complet">{treeCompleteName}</h5>
                    <img src={tree} alt="tree pic" className="tree-pic" />
                </div>
                {treeIsLocked ? (
                    <Button
                        variant="danger"
                        onClick={() => lockTree(props.tree._id, props.userId)}
                        className="buttons"
                        disabled
                        block>
                        Locked by {treeOwnerName}
                    </Button>
                ) : (
                    <>
                        {props.userId == treeOwnerId ? (
                            <>
                                <Button
                                    variant="success"
                                    className="buttons"
                                    disabled
                                    block>
                                    You are the owner
                                </Button>
                                {/* condition locktree enough leaves */}
                                {props.userLeaves >= treeLockPrice ? (
                                    <Button
                                        variant="secondary"
                                        className="buttons"
                                        onClick={() =>
                                            lockTree(
                                                props.tree._id,
                                                props.userId,
                                            )
                                        }
                                        block>
                                        Lock for {treeLockPrice} leaves
                                    </Button>
                                ) : (
                                    <Button
                                        variant="danger"
                                        className="buttons"
                                        disabled
                                        block>
                                        Need more leaves ({treeLockPrice})
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                {/* condition buy enough leaves */}
                                {props.userLeaves >= treePrice ? (
                                    <Button
                                        variant="success"
                                        className="buttons"
                                        onClick={() => {
                                            console.log(props.tree._id);
                                            console.log(props.userId);
                                            buyTree(
                                                props.tree._id,
                                                props.userId,
                                            );
                                        }}
                                        block>
                                        Buy for {treePrice} leaves
                                    </Button>
                                ) : (
                                    <Button
                                        variant="danger"
                                        className="buttons"
                                        disabled
                                        block>
                                        Need more leaves ({treePrice})
                                    </Button>
                                )}
                                <Button
                                    variant="secondary"
                                    disabled
                                    className="buttons"
                                    block>
                                    You need to buy first
                                </Button>
                            </>
                        )}
                    </>
                )}
                <div className="flex-bottom">
                    <Button
                        variant="outline-secondary"
                        onClick={() => {
                            setShowOwner(!showOwner);
                            setShowComments(false);
                        }}
                        className="bottom-btn">
                        Owners ({treeOwnerName == null ? 0 : 1})
                    </Button>
                    <Button
                        onClick={() => {
                            setShowComments(!showComments);
                            setShowOwner(false);
                        }}
                        variant="outline-secondary"
                        className="bottom-btn">
                        Comments ({treeComments.length})
                    </Button>
                </div>
                <div
                    className={
                        showComments ? "show-comments" : "hide-comments"
                    }>
                    <ListGroup>
                        {treeComments.length == 0 ? (
                            <ListGroup.Item key={Math.random()}>
                                No posted comment yet.
                            </ListGroup.Item>
                        ) : (
                            treeComments.map((comment) => (
                                <ListGroup.Item key={Math.random()}>
                                    {comment.comment}
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>

                    <div className="submit-comment-div">
                        <input
                            className="submit-comment"
                            onChange={(e) => setWrittenComment(e.target.value)}
                            type="text"
                            placeholder="Your comment here"
                        />
                        <button
                            onClick={() => {
                                addComment(
                                    props.tree._id,
                                    props.userId,
                                    writtenComment,
                                );
                            }}
                            className="submit-comment-button">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
                <div className={showOwner ? "show-owner" : "hide-owner"}>
                    <ListGroup>
                        {treeOwnerName == null ? (
                            <ListGroup.Item key={Math.random()}>
                                No previous owner yet.
                            </ListGroup.Item>
                        ) : (
                            <ListGroup.Item key={Math.random()}>
                                {treeOwnerName}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    {props.userId == treeOwnerId ? (
                        <Button variant="outline-success" block>
                            You are the owner
                        </Button>
                    ) : (
                        <Button variant="outline-danger" block>
                            You are not the owner
                        </Button>
                    )}
                </div>
            </div>
        );
    } else {
        return (
            <div className="is-loading-div">
                <FontAwesomeIcon size="4x" icon={faRedo} />
            </div>
        );
    }
}

export default TreeComponentPopup;
