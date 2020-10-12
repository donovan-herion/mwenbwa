// const User = require("../models/user");

import {ObjectId} from "mongodb";

const list = async (req, res) => {
    try {
        const collection = req.app.locals.db.collection("trees");
        // Find some documents
        const trees = await collection.find().limit(200).toArray();
        console.log(trees);
        res.json(trees);
    } catch (error) {
        console.log(error);
        res.send("error");
    }
};

const queryGetAllTrees = () => ({
    $project: {
        _id: 1,
        x_lambda: 1,
        y_phi: 1,
    },
});

const getAllTrees = async (req, res) => {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);

    try {
        const collection = req.app.locals.db.collection("trees");
        const responseGetAllTrees = await collection
            .aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [lat, lng],
                        },
                        distanceField: "distance.calculated",
                        maxDistance: 300,
                    },
                },
                queryGetAllTrees(),
            ])
            .toArray();

        console.log(responseGetAllTrees);
        return res.status(200).json(responseGetAllTrees);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
};

const getTreePrice = async (treeId, db) => {
    let value = 250;
    const trees = db.collection("trees");
    const tree = await trees.findOne({_id: ObjectId(treeId)});
    try {
        if (tree.hauteur_totale !== null || tree.circonf !== null) {
            value = Math.ceil((tree.hauteur_totale * tree.circonf) / Math.PI);
        }
        console.log(value);

        // await trees.updateOne(
        //     {_id: ObjectId(treeId)},
        //     {$set: {price: value}},
        //     false,
        //     true,
        // );
        return value;
    } catch (error) {
        console.log(error);
        return true;
    }
};

const getOneTree = async (req, res) => {
    try {
        const treeId = req.query.id;

        const options = {
            projection: {
                _id: 1,
                nom_complet: 1,
                hauteur_totale: 1,
                diametre_cime: 1,
                circonf: 1,
                isLocked: 1,
                price: 1,
                owner: 1,
                x_lambda: 1,
                y_phi: 1,
            },
        };

        const trees = req.app.locals.db.collection("trees");
        const tree = await trees.findOne({_id: ObjectId(treeId)}, options);

        tree.price = await getTreePrice(treeId, req.app.locals.db);
        console.log(tree.price);

        return res.status(200).json(tree);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
};

const getByCoords = async (req, res) => {
    try {
        const {lat, lng} = req.query;
        const collection = req.app.locals.db.collection("trees");
        // Find some documents
        const trees = await collection
            .find({geoloc: {lat, lon: lng}})
            .limit(200)
            .toArray();
        res.json(trees);
    } catch (error) {
        console.log(error);
        res.send("error");
    }
};

export default {
    list,
    getByCoords,
    getAllTrees,
    getOneTree,
};
