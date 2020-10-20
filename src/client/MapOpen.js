// eslint-disable-next-line unicorn/filename-case
import React, {useState, useEffect} from "react";
import "./MapOpen.css";
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import treepng from "./data/tree.png";
import herepng from "./data/here.png";
import lockpng from "./data/lock.png";
import MarkerClusterGroup from "react-leaflet-markercluster";
import TreeComponentPopup from "./TreeComponentPopup";
import axios from "./axios";

function MapOpen(props) {
    //Icon properties
    // eslint-disable-next-line no-undef
    const treep = L.icon({
        iconUrl: treepng,
        iconSize: [30, 30],
    });

    const here = L.icon({
        iconUrl: herepng,
        iconSize: [30, 30],
    });

    const lock = L.icon({
        iconUrl: lockpng,
        iconSize: [30, 30],
    });

    //map center for getAllTrees Function
    const [mapCenter, setMapCenter] = useState(() => [50.644855, 5.573321]);
    const [mapZoom, setMapZoom] = useState(() => 17);

    // new tree collection state
    const [newTrees, setNewTrees] = useState(() => []);

    //api request getAllTrees
    const getAllTrees = (tempMapCenter) => {
        axios
            .post("/trees", {
                lat: tempMapCenter[0],
                lng: tempMapCenter[1],
            })
            .then((res) => {
                setNewTrees(res.data);
            })
            .catch((err) => console.log(err.message));
    };

    // run get all tree when the app first launches and then only on viewport events
    useEffect(() => {
        getAllTrees(mapCenter);
    }, [mapCenter]);

    return (
        <Map
            viewport={{center: mapCenter, zoom: mapZoom}}
            minZoom={15}
            onViewportChanged={(e) => {
                setMapZoom(e.zoom);
                setMapCenter(e.center);
            }}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
            <MarkerClusterGroup disableClusteringAtZoom={17}>
                {newTrees.map((tree) => (
                    <Marker
                        icon={
                            tree.isLocked
                                ? lock
                                : tree.owner === props.userId
                                ? here
                                : treep
                        }
                        key={tree._id}
                        position={[tree.y_phi, tree.x_lambda]}>
                        <Popup autoPan={false}>
                            <TreeComponentPopup
                                getLogs={props.getLogs}
                                getRanking={props.getRanking}
                                getUserInfo={props.getUserInfo}
                                getAllTrees={getAllTrees}
                                mapCenter={mapCenter}
                                tree={tree}
                                name={props.name}
                                userId={props.userId}
                            />
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </Map>
    );
}

export default MapOpen;
