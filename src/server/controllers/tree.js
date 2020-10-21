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
        owner: 1,
        isLocked: 1,
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
                        maxDistance: 700,
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

const getOneTree = async (req, res) => {
    try {
        const treeId = req.body.treeId;

        const options = {
            projection: {
                _id: 1,
                nom_complet: 1,
                hauteur_totale: 1,
                diametre_cime: 1,
                circonf: 1,
                isLocked: 1,
                price: 1,
                lockPrice: 1,
                owner: 1,
                comments: 1,
            },
        };

        const trees = req.app.locals.db.collection("trees");
        const users = req.app.locals.db.collection("users");
        const tree = await trees.findOne({_id: ObjectId(treeId)}, options);

        tree.price = helpers.calculatePrice(tree);

        tree.lockPrice = helpers.calculateLockPrice(tree);
        if (tree.owner === "") {
            return res.status(200).json(tree);
        }
        const user = await users.findOne({_id: ObjectId(tree.owner)});
        return res.status(200).json({
            _id: tree._id,
            owner: user.name,
            color: tree.color,
            nom_complet: tree.nom_complet,
            price: tree.price,
            lockPrice: tree.lockPrice,
            isLocked: tree.isLocked,
            comments: tree.comments,
        });
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
    const treeId = req.body.treeId;
    const userId = req.body.userId;

    try {
        const user = await users.findOne({_id: ObjectId(userId)});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const tree = await trees.findOne({_id: ObjectId(treeId)});
        if (!tree) {
            return res.status(404).json({error: "tree not found"});
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

        await trees.updateOne(
            {_id: ObjectId(tree._id)},
            {$set: {isLocked: true}},
        );

        await users.updateOne(
            {_id: ObjectId(user._id)},
            {$set: {leaves: user.leaves - lockPrice}},
        );
        // const currentdate = new Date();
        // let datetime;
        // if (currentdate.getMinutes() >= 0 && currentdate.getMinutes() <= 9) {
        //     datetime = `${currentdate.getDate()}/${
        //         currentdate.getMonth() + 1
        //     }/${currentdate.getFullYear()} @ ${
        //         currentdate.getHours() + 2
        //     }:0${currentdate.getMinutes()}`;
        // } else {
        //     datetime = `${currentdate.getDate()}/${
        //         currentdate.getMonth() + 1
        //     }/${currentdate.getFullYear()} @ ${
        //         currentdate.getHours() + 2
        //     }:${currentdate.getMinutes()}`;
        // }
        // await log.add(req.app.locals.db, {
        //     action: "Tree locked",
        //     createdBy: userId,
        //     date: datetime,
        // });

        return res.status(201).json("Tree successfully locked");
    } catch (error) {
        res.status(500).json({error: error.message});
    }

    return true;
};

const buyOneTree = async (req, res) => {
    const trees = req.app.locals.db.collection("trees");
    const users = req.app.locals.db.collection("users");
    const treeId = req.body.treeId;
    const userId = req.body.userId;

    try {
        const user = await users.findOne({_id: ObjectId(userId)});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const tree = await trees.findOne({_id: ObjectId(treeId)});
        if (!tree) {
            return res.status(404).json({error: "tree not found"});
        }
        if (tree.owner === "" || tree.owner.toString() !== user.name) {
            if (tree.isLocked !== true) {
                const treePrice = helpers.calculatePrice(tree);
                console.log(treePrice);
                if (user.leaves > treePrice) {
                    if (tree.owner !== "") {
                        const ancienUser = await users.findOne({
                            _id: ObjectId(tree.owner),
                        });
                        await users.updateOne(
                            {_id: ObjectId(ancienUser._id)},
                            {
                                $set: {
                                    trees: ancienUser.trees - 1,
                                },
                            },
                        );
                    }
                    try {
                        await trees.updateOne(
                            {_id: ObjectId(treeId)},
                            {
                                $set: {
                                    color: user.color,
                                    owner: user._id,
                                },
                            },
                        );
                        await users.updateOne(
                            {_id: ObjectId(userId)},
                            {
                                $set: {
                                    leaves: Math.ceil(user.leaves - treePrice),
                                    trees: user.trees + 1,
                                },
                            },
                        );

                        const currentdate = new Date();
                        let datetime;
                        if (
                            currentdate.getMinutes() >= 0 &&
                            currentdate.getMinutes() <= 9
                        ) {
                            datetime = `${currentdate.getDate()}/${
                                currentdate.getMonth() + 1
                            }/${currentdate.getFullYear()} @ ${
                                currentdate.getHours() + 2
                            }:0${currentdate.getMinutes()}`;
                        } else {
                            datetime = `${currentdate.getDate()}/${
                                currentdate.getMonth() + 1
                            }/${currentdate.getFullYear()} @ ${
                                currentdate.getHours() + 2
                            }:${currentdate.getMinutes()}`;
                        }
                        await log.add(req.app.locals.db, {
                            action: "Tree purchased",
                            createdBy: userId,
                            date: datetime,
                        });
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
        res.status(500).json({error: error.message});
    }
    return res.status(201).json({message: "Successfull transaction"});
};

const setRandomTrees = async (db, user) => {
    const trees = db.collection("trees");
    const users = db.collection("users");
    try {
        const matchTree1 = trees.findOne({owner: ""});
        const matchTree2 = trees.findOne({owner: ""});
        const matchTree3 = trees.findOne({owner: ""});
        await trees.updateOne(
            {_id: ObjectId(matchTree1._id)},
            {$set: {owner: user._id, color: user.color}},
        );
        await trees.updateOne(
            {_id: ObjectId(matchTree2._id)},
            {$set: {owner: user._id, color: user.color}},
        );
        await trees.updateOne(
            {_id: ObjectId(matchTree3._id)},
            {$set: {owner: user._id, color: user.color}},
        );
        await users.updateOne({_id: ObjectId(user._id)}, {$set: {trees: 3}});
        return true;
    } catch {
        return true;
    }
};

const addTreeComment = async (req, res) => {
    const trees = req.app.locals.db.collection("trees");
    const users = req.app.locals.db.collection("users");
    const treeId = req.body.treeId;
    const userId = req.body.userId;

    try {
        const user = await users.findOne({_id: ObjectId(userId)});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const tree = await trees.findOne({_id: ObjectId(treeId)});
        if (!tree) {
            return res.status(404).json({error: "tree not found"});
        }
        const currentdate = new Date();
        let datetime;
        if (currentdate.getMinutes() >= 0 && currentdate.getMinutes() <= 9) {
            datetime = `${currentdate.getDate()}/${
                currentdate.getMonth() + 1
            }/${currentdate.getFullYear()} @ ${
                currentdate.getHours() + 2
            }:0${currentdate.getMinutes()}`;
        } else {
            datetime = `${currentdate.getDate()}/${
                currentdate.getMonth() + 1
            }/${currentdate.getFullYear()} @ ${
                currentdate.getHours() + 2
            }:${currentdate.getMinutes()}`;
        }
        const comment = {
            comment: req.body.comment,
            userName: user.name,
            date: datetime,
        };
        tree.comments.push(comment);
        await trees.updateOne(
            {_id: ObjectId(tree._id)},
            {
                $set: {
                    comments: tree.comments,
                },
            },
        );

        return res.status(201).json("Comment successfully added");
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const addLeaves = async (req, res) => {
    const users = req.app.locals.db.collection("users");
    const userId = req.body.userId;

    try {
        const user = await users.findOne({_id: ObjectId(userId)});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const leavesAdded = user.trees * 50;
        await users.updateOne(
            {_id: ObjectId(user._id)},
            {
                $set: {
                    leaves: user.leaves + leavesAdded,
                },
            },
        );

        return res.status(201).json("Leaves successfully added");
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default {
    list,
    getByCoords,
    getAllTrees,
    getOneTree,
    buyOneTree,
    lockTree,
    setRandomTrees,
    addTreeComment,
    addLeaves,
};
