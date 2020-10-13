// const User = require("../models/user");
import log from "./log";
import helpers from "../helpers/helpers";

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
        nom_complet: 1,
        price: 1,
    },
});

const getAllTrees = async (req, res) => {
    const lat = parseFloat(req.body.lat);
    const lng = parseFloat(req.body.lng);

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
                        maxDistance: 600,
                    },
                },
                queryGetAllTrees(),
            ])
            .toArray();

        console.log(responseGetAllTrees);
        return res.status(200).json(responseGetAllTrees);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
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

const lockTree = async (req, res) => {
    const trees = req.app.locals.db.collection("trees");
    const users = req.app.locals.db.collection("users");
    try {
        const user = await users.findOne({_id: req.userId});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        const tree = await trees.findOne({_id: req.params.treeId});
        if (!tree) {
            return res.status(404).json({error: "Tree not found"});
        }

        const isTreeBelongToUser =
            user._id.toString() === tree.owner.toString() ? true : false;
        if (!isTreeBelongToUser) {
            return res.status(403).json({
                error: "The tree does not belong to this user",
            });
        }

        if (tree.isLocked) {
            return res.status(403).json({
                error: "The tree is already locked",
            });
        }

        const lockPrice = await helpers.calculateLockPrice(tree);

        const isPlayerHaveEnoughLeavesToLock =
            user.leaves >= lockPrice ? true : false;
        if (!isPlayerHaveEnoughLeavesToLock) {
            return res.status(401).json({
                error: "The user doesn't have enough leaves to lock this tree",
            });
        }

        await trees.updateOne({_id: tree._id}, {isLocked: true});

        await users.updateOne(
            {_id: user._id},
            {leaves: user.leaves - lockPrice},
        );
        log.add({action: "Tree locked", createdBy: req.userId});

        return res.status(201).json("Tree successfully locked");
    } catch (error) {
        res.status(500).json({error});
    }

    return true;
};

const buyOneTree = async (req, res) => {
    const trees = req.app.locals.db.collection("trees");
    const users = req.app.locals.db.collection("users");
    const treeId = req.params.treeId;
    const userId = req.userId;

    try {
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const tree = await trees.findById(treeId);
        if (!tree) {
            return res.status(404).json({error: "tree not found"});
        }

        if (tree.owner === null || tree.owner.toString() !== userId) {
            if (tree.isLocked !== true) {
                const treePrice = await helpers.calculatePrice(tree, userId);
                console.log(treePrice);
                if (user.leaves > treePrice) {
                    try {
                        await trees.updateOne(
                            {_id: treeId},
                            {
                                color: user.color,
                                owner: userId,
                            },
                        );

                        await users.updateOne(
                            {_id: userId},
                            {
                                leaves: Math.ceil(user.leaves - treePrice),
                            },
                        );

                        console.log("you bought a tree");
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return res
                        .status(403)
                        .json({message: "you don't have enough leaves"});
                }
            } else {
                return res.status(403).json({message: "this tree is locked"});
            }
        } else {
            return res.status(403).json({message: "you already own this tree"});
        }
    } catch (error) {
        res.status(500).json({error});
    }
    log.add({action: "Tree purchased", createdBy: userId});

    return res.status(201).json({message: "Successfull transaction"});
};

export default {
    list,
    getByCoords,
    getAllTrees,
    getOneTree,
    buyOneTree,
    lockTree,
};
