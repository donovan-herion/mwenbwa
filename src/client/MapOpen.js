// eslint-disable-next-line unicorn/filename-case
import React from "react";
import "./MapOpen.css";
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import Trees from "./data/arbustum.json";
import treepng from "./data/tree.png";
import MarkerClusterGroup from "react-leaflet-markercluster";
import leaf from "./data/leaf.png";
import TreePopup from "./TreePopup";

//Icon properties
// eslint-disable-next-line no-undef
const icon = L.icon({
    iconUrl: treepng,
    iconSize: [50, 50],
});

function MapOpen() {
    return (
        <Map center={[50.64, 5.57]} zoom={14}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
            <MarkerClusterGroup disableClusteringAtZoom={15}>
                {Trees.map((tree) => (
                    <Marker
                        icon={icon}
                        key={tree.arbotag}
                        position={[tree.y_phi, tree.x_lambda]}>
                        <TreePopup
                            name={tree.nom_complet}
                            circonf={tree.circonf}
                        />
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </Map>
    );
}

export default MapOpen;
