// eslint-disable-next-line unicorn/filename-case
import React, {useState, useEffect} from "react";
import "./Dashboard.css";
import player from "./data/player.jpg";
import axios from "./axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faLeaf,
    faTree,
    faUserCog,
    faSignOutAlt,
    faQuestionCircle,
    faAngleDoubleLeft,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import ModalSettings from "./ModalSettings";
import ModalRules from "./ModalRules";
import ModalLogout from "./ModalLogout";
import ModalProfilePic from "./ModalProfilePic";
import Gravatar from "react-gravatar";

function Dashboard(props) {
    // Modal settings
    const [showRules, setShowRules] = useState(false);

    const handleCloseRules = () => setShowRules(false);
    const handleShowRules = () => setShowRules(true);

    // // Modal rules
    const [showSettings, setShowSettings] = useState(false);

    const handleCloseSettings = () => setShowSettings(false);
    const handleShowSettings = () => setShowSettings(true);

    // // Modal Logout
    const [showLogout, setShowLogout] = useState(false);

    const handleCloseLogout = () => setShowLogout(false);
    const handleShowLogout = () => setShowLogout(true);

    // Modal Profile Pic
    const [showProfilePic, setShowProfilePic] = useState(false);

    const handleCloseProfilePic = () => setShowProfilePic(false);
    const handleShowProfilePic = () => setShowProfilePic(true);

    // state for modalsettings
    const [userNameSettings, setUserNameSettings] = useState("");
    const [userEmailSettings, setUserEmailSettings] = useState("");

    // interval id state
    const [intervalId, setIntervalId] = useState("");

    // function addLeaves
    const addLeaves = () => {
        axios
            .post("/leaves", {
                userId: props.userId,
            })
            .then((res) => {
                props.getUserInfo();
                props.getRanking();
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        setIntervalId(
            setInterval(() => {
                addLeaves();
            }, 300000),
        );
    }, []);

    // function openDashboard responsive mode
    const moveDashboard = () => {
        const structureDiv = document.querySelector(".structure-div");
        const topRightIcon = document.querySelector(
            ".top-right-icon-responsive",
        );
        topRightIcon.classList.toggle("icon-visible");
        structureDiv.classList.toggle("dashboard-open");
    };

    // getUserSessionDetails and push it into the modalsettings
    const getUserSessionDetails = () => {
        axios
            .post("/info", {
                userId: props.userId,
            })
            .then((res) => {
                setUserNameSettings(res.data.name);
                setUserEmailSettings(res.data.email);
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getUserSessionDetails();
    }, [props.userId]);

    if (props.userToken === null) {
        return null;
        // eslint-disable-next-line no-else-return
    } else {
        return (
            <div className="structure-div">
                <FontAwesomeIcon
                    icon={faAngleDoubleLeft}
                    className="top-right-icon-responsive"
                    onClick={() => {
                        moveDashboard();
                    }}
                />
                <Gravatar
                    size="130"
                    className="profile-pic"
                    email={userEmailSettings}
                    default="mp"
                    onClick={() => {
                        handleShowProfilePic();
                    }}
                />
                <h2 className="player-info">{`${props.name}`}</h2>
                <div className="leaves-tree">
                    <p className="p-leaves-tree">
                        <FontAwesomeIcon icon={faLeaf} /> {props.userLeaves}
                    </p>
                    <p className="p-leaves-tree">
                        <FontAwesomeIcon icon={faTree} /> {props.userTrees}
                    </p>
                </div>
                <h2 className="box1">Gamelog</h2>
                {props.logs.slice(0, 3).map((log) => (
                    <p className="delete-bootstrap-margin">{`${log.action} by ${log.createdBy}`}</p>
                ))}

                <h2 className="box2">Ranking</h2>
                {props.ranking.slice(0, 3).map((player, index) => (
                    <p className="delete-bootstrap-margin">
                        {`${index + 1}. ${player.name} (${player.leaves})`}
                    </p>
                ))}

                <div className="settings-signout">
                    <FontAwesomeIcon
                        onClick={() => {
                            handleShowSettings();
                            getUserSessionDetails();
                        }}
                        icon={faUserCog}
                        className="clickable"
                    />
                    <FontAwesomeIcon
                        onClick={() => handleShowRules()}
                        icon={faQuestionCircle}
                        className="clickable"
                    />
                    <FontAwesomeIcon
                        onClick={() => handleShowLogout()}
                        icon={faSignOutAlt}
                        className="clickable"
                    />
                </div>
                <ModalSettings
                    userNameSettings={userNameSettings}
                    userEmailSettings={userEmailSettings}
                    setUserNameSettings={setUserNameSettings}
                    setUserEmailSettings={setUserEmailSettings}
                    setName={props.setName}
                    userId={props.userId}
                    showSettings={showSettings}
                    handleCloseSettings={handleCloseSettings}
                />
                <ModalRules
                    showRules={showRules}
                    handleCloseRules={handleCloseRules}
                />
                <ModalLogout
                    setUserLeaves={props.setUserLeaves}
                    setUserId={props.setUserId}
                    setUserToken={props.setUserToken}
                    setName={props.setName}
                    showLogout={showLogout}
                    handleCloseLogout={handleCloseLogout}
                    intervalId={intervalId}
                />
                <ModalProfilePic
                    showProfilePic={showProfilePic}
                    handleCloseProfilePic={handleCloseProfilePic}
                />
            </div>
        );
    }
}

export default Dashboard;
