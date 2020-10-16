// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import ModalSettings from "./ModalSettings";
import ModalRules from "./ModalRules";
import ModalLogout from "./ModalLogout";
import {useEffect} from "react";

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

    // state for modalsettings
    const [userNameSettings, setUserNameSettings] = useState(null);
    const [userEmailSettings, setUserEmailSettings] = useState(null);
    const [userPasswordSettings, setUserPasswordSettings] = useState(null);
    const [userColorSettings, setUserColorSettings] = useState(null);

    // getUserSessionDetails and push it into the modalsettings
    const getUserSessionDetails = () => {
        axios
            .post("/info", {
                userId: props.userId,
            })
            .then((res) => {
                setUserNameSettings(res.data.name);
                setUserEmailSettings(res.data.email);
                setUserPasswordSettings(res.data.password);
                setUserColorSettings(res.data.color);
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <div className="structure-div">
            <img className="profile-pic" src={player} alt="player picture" />
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
            <p className="delete-bootstrap-margin">
                Lorem ipsum dolor sit amet.
            </p>
            <p className="delete-bootstrap-margin">
                Lorem ipsum dolor sit amet.
            </p>
            <p className="delete-bootstrap-margin">
                Lorem ipsum dolor sit amet.
            </p>

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
                />
                <FontAwesomeIcon
                    onClick={() => handleShowRules()}
                    icon={faQuestionCircle}
                />
                <FontAwesomeIcon
                    onClick={() => handleShowLogout()}
                    icon={faSignOutAlt}
                />
            </div>
            <ModalSettings
                userNameSettings={userNameSettings}
                userEmailSettings={userEmailSettings}
                userPasswordSettings={userPasswordSettings}
                userColorSettings={userColorSettings}
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
            />
        </div>
    );
}

export default Dashboard;
