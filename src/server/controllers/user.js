const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            color: req.body.color,
        });
        user.save()
            .then(() => res.status(201).json({message: "User created"}))
            .catch(error => res.status(500).json({error}));
    });
    return true;
};

exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({error: "User not found"});
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: "Wrong password"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        email: user.email,
                        token: jwt.sign(
                            {userId: user._id},
                            "VMvpi62eztD2fzfw2Wu6mtHeDIsijaoQuuGa2JPv6CRjXL3HXpJLcMOpeEQ68Mt",
                            {expiresIn: "24h"},
                        ),
                    });
                    return true;
                })
                .catch(error => res.status(500).json({error}));
            return true;
        })
        .catch(error => res.status(500).json({error}));
    return true;
};

exports.getUserInfos = async (req, res) => {
    try {
        const responseGetUserInfos = await User.aggregate([
            {
                $match: {_id: mongoose.Types.ObjectId(req.userId)},
            },
            // queryPopulateTrees(),
            // queryGetUsersInfos(),
        ]).exec();

        const userInfos = responseGetUserInfos[0];

        return res.status(200).json(userInfos);
    } catch (error) {
        return res.status(500).json({error});
    }
};
