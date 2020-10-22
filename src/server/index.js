import express from "express";
import {MongoClient} from "mongodb";
import path from "path";
import trees from "./controllers/tree";
import users from "./controllers/user";
import logs from "./controllers/log";
import stuffDB from "./models/db";
import bodyParser from "body-parser";

const {APP_PORT} = process.env;

// Connection URL
const url =
    "mongodb://dev:dev@cluster0-shard-00-00.kl4px.mongodb.net:27017,cluster0-shard-00-01.kl4px.mongodb.net:27017,cluster0-shard-00-02.kl4px.mongodb.net:27017/test?replicaSet=atlas-1004la-shard-0&ssl=true&authSource=admin";

// Database Name
const dbName = "mwenbwa";

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
    if (err !== null) {
        throw new Error(err.message);
    }

    const db = client.db(dbName);
    stuffDB.addOwnerAndIsLockedToTree(db);
    stuffDB.setupDb(db);

    const app = express();
    app.locals.db = db;

    app.use(express.static(path.resolve(__dirname, "../../bin/client")));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}));

    // parse application/json
    app.use(bodyParser.json());

    app.post("/signup", users.signup);
    app.post("/login", users.login);
    app.post("/info", users.getUserInfos);
    app.post("/update", users.getUpdateUser);

    app.get("/ranking", users.getRanking);

    app.post("/comment", trees.addTreeComment);
    app.post("/leaves", trees.addLeaves);
    app.post("/trees", trees.getAllTrees);
    app.post("/tree", trees.getOneTree);
    app.post("/locktree", trees.lockTree);
    app.post("/buytree", trees.buyOneTree);
    app.get("/logs", logs.getAllLogs);

    app.listen(APP_PORT, () =>
        console.log(`🚀 Server is listening on port ${APP_PORT}.`),
    );
});
