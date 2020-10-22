import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import trees from "./tree";

import {ObjectId} from "mongodb";

const privateKEY = fs.readFileSync(`${__dirname}/jwtRS256.key`, "utf8");
// var publicKEY  = fs.readFileSync('../jwtRS256.key.pub', 'utf8');

const signup = async (req, res) => {
    try {
        // validation
        if (!req.body.email) {
            throw new Error("Missing email");
        }
        // TODO: add email validation
        if (!req.body.password) {
            throw new Error("Missing password");
        }
        // TODO: verify if user exist
        const users = req.app.locals.db.collection("users");
        const existingUser = await users.findOne({email: req.body.email});
        if (existingUser) {
            throw new Error("User existe");
        }
        const hash = await bcrypt.hash(req.body.password, 10);

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            color: req.body.color,
            leaves: 5000,
            trees: 0,
        };
        await users.insertOne(user);
        const thisUser = await users.findOne({email: req.body.email});
        console.log(thisUser);
        await trees.setRandomTrees(req.app.locals.db, thisUser);
        res.status(200).json({
            userId: thisUser._id,
            name: thisUser.name,
            color: thisUser.color,
            email: thisUser.email,
            leaves: thisUser.leaves,
            trees: 3,
            token: jwt.sign({userId: thisUser._id}, privateKEY, {
                expiresIn: "24h",
            }),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
};

const login = (req, res) => {
    const collection = req.app.locals.db.collection("users");
    collection
        .findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: "User not found"});
            }
            console.log(user);
            bcrypt
                .compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: "Wrong password"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        name: user.name,
                        color: user.color,
                        email: user.email,
                        leaves: user.leaves,
                        trees: user.trees,
                        token: jwt.sign({userId: user._id}, privateKEY, {
                            expiresIn: "24h",
                        }),
                    });
                    return true;
                })
                .catch(error => res.status(500).json({error: error.message}));
            return true;
        })
        .catch(error => res.status(500).json({error: error.message}));
    return true;
};

const getUserInfos = async (req, res) => {
    const users = req.app.locals.db.collection("users");
    try {
        const responseGetUserInfos = await users
            .aggregate([
                {
                    $match: {_id: ObjectId(req.body.userId)},
                },
            ])
            .toArray();

        const userInfos = responseGetUserInfos[0];

        return res.status(200).json(userInfos);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getRanking = async (req, res) => {
    const users = req.app.locals.db.collection("users");
    try {
        const responseGetRanking = await users
            .aggregate([{$sort: {leaves: -1}}])
            .limit(3)
            .toArray();

        return res.status(200).json(responseGetRanking);
    } catch (error) {
        return res.status(500).json({error});
    }
};

const getUpdateUser = async (req, res) => {
    const users = req.app.locals.db.collection("users");
    const userId = req.body.userId;
    const newEmail = req.body.email;
    const newPass = req.body.password;
    const newName = req.body.name;

    try {
        const user = await users.findOne({_id: ObjectId(userId)});
        if (newPass === "") {
            await users.updateOne(
                {_id: ObjectId(user._id)},
                {
                    $set: {
                        name: newName,
                        email: newEmail,
                    },
                },
            );
        } else {
            const hash = await bcrypt.hash(newPass, 10);
            await users.updateOne(
                {_id: ObjectId(user._id)},
                {
                    $set: {
                        name: newName,
                        email: newEmail,
                        password: hash,
                    },
                },
            );
        }
        return res.status(201).json("Infos successfully changed");
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

export default {
    login,
    signup,
    getUserInfos,
    getRanking,
    getUpdateUser,
};
