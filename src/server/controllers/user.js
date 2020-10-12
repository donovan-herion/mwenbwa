import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

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
        };
        await users.insertOne(user);
        res.status(201).json({message: "User created"});
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
                        email: user.email,
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

// exports.getUserInfos = async (req, res) => {
//     try {
//         const responseGetUserInfos = await User.aggregate([
//             {
//                 $match: {_id: mongoose.Types.ObjectId(req.userId)},
//             },
//             // queryPopulateTrees(),
//             // queryGetUsersInfos(),
//         ]).exec();

//         const userInfos = responseGetUserInfos[0];

//         return res.status(200).json(userInfos);
//     } catch (error) {
//         return res.status(500).json({error});
//     }
// };

export default {
    login,
    signup,
};
