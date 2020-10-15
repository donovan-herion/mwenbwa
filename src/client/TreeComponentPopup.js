// eslint-disable-next-line unicorn/filename-case
import React, {useState, useEffect} from "react";
import "./TreeComponentPopup.css";
import Button from "react-bootstrap/Button";
import tree from "./data/tree.png";
import axios from "./axios";
import leaf from "./data/leaf.png";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

function TreeComponentPopup(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [commentActive, setCommentActive] = useState(false);
    const [ownerActive, setOwnerActive] = useState(false);
    const [treeCompleteName, setTreeCompleteName] = useState("");
    const [treePrice, setTreePrice] = useState("");
    const [treeLockPrice, setTreeLockPrice] = useState("");
    const [treeIsLocked, setTreeIsLocked] = useState("");
    const [treeOwner, setTreeOwner] = useState("");
    const [treeComments, setTreeComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    //api request getAllTrees
    const getTreeInfo = (tempTreeId) => {
        setIsLoading(true);
        axios
            .post("/tree", {
                id: tempTreeId,
                userId: props.name,
            })
            .then((res) => {
                console.log(res.data);
                setTreeCompleteName(res.data.nom_complet);
                setTreePrice(res.data.price);
                setTreeLockPrice(res.data.lockPrice);
                setTreeIsLocked(res.data.isLocked);
                setTreeComments(res.data.comments);
                setTreeOwner(res.data.owner);
                setIsLoading(false);
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getTreeInfo(props.tree._id);
        console.log(`popup dit mount ${props.tree._id}`);
    }, []);

    if (!isLoading) {
        return (
            <div className="popup-container">
                <div className="flex-top">
                    <img src={tree} alt="tree pic" className="tree-pic" />
                    <h5 className="nom-complet">{treeCompleteName}</h5>
                    <img src={tree} alt="tree pic" className="tree-pic" />
                </div>
                <Button variant="success" className="buttons" block>
                    Buy for {treePrice} leaves
                </Button>
                <Button variant="secondary" className="buttons" block>
                    Lock for {treeLockPrice} leaves
                </Button>
                <div className="flex-bottom">
                    <Button variant="outline-secondary" className="bottom-btn">
                        Owners (0)
                    </Button>
                    <Button
                        onClick={() => setShowComments(!showComments)}
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
                            type="text"
                            placeholder="Your comment here"
                        />
                        <button className="submit-comment-button">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
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
