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
const url = "mongodb://dev:dev@mongo:27017";

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

    app.post("/trees", trees.getAllTrees);
    app.post("/tree", trees.getOneTree);

    app.listen(APP_PORT, () =>
        console.log(`🚀 Server is listening on port ${APP_PORT}.`),
    );
});
