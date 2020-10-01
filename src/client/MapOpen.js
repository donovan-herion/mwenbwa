// eslint-disable-next-line unicorn/filename-case
import React, {useState} from "react";
import "./MapOpen.css";
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import Trees from "./data/arbustum.json";
import treepng from "./data/tree.png";

// // Const declaration (History on the DB)
// const history = ["Michael Proprio", "Arthur Proprio", "Donovan Proprio"];

// // Const declaration (History on the DB)
// const comments = ["Don't take it plz", "I don't care", "fu u bastard"];

//Icon properties
// eslint-disable-next-line no-undef
const icon = L.icon({
    iconUrl: treepng,
    iconSize: [50, 50],
});
const mapStyle = {
    position: "relative",
    zIndex: "1",
};

function MapOpen() {
    const [historyPrint, setHistoryPrint] = useState(false);
    const [commentsPrint, setCommentsPrint] = useState(false);
    return (
        <Map style={mapStyle} center={[50.64, 5.57]} zoom={14}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
            {Trees.map(tree => (
                <Marker
                    icon={icon}
                    key={tree.arbotag}
                    position={[tree.y_phi, tree.x_lambda]}>
                    <Popup>
                        <h2>{tree.nom_complet}</h2>
                        <button
                            // eslint-disable-next-line react/button-has-type
                            type={"submit"}>
                            {`Buy ${tree.circonf} leaves`}
                        </button>
                        <br />
                        <br />
                        <button
                            // eslint-disable-next-line react/button-has-type
                            type={"button"}
                            onClick={() => {
                                setHistoryPrint(!historyPrint);
                                setCommentsPrint(false);
                            }}>
                            {"History"}
                        </button>
                        <button
                            // eslint-disable-next-line react/button-has-type
                            type={"button"}
                            onClick={() => {
                                setCommentsPrint(!commentsPrint);
                                setHistoryPrint(false);
                            }}>
                            {"Comments"}
                        </button>
                        {/* {historyPrint
                            ? history.map((proprio) => <p>{proprio}</p>)
                            : ""}{" "}
                        {commentsPrint
                            ? comments.map((comment) => <p>{comment}</p>)
                            : ""} */}
                    </Popup>
                </Marker>
            ))}
        </Map>
    );
}

export default MapOpen;
