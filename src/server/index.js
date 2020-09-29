// import { resolveSoa } from "dns";
/* becodeorg/mwenbwa
 *
 * /src/server/index.js - Server entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import express from "express";
import {MongoClient} from "mongodb";
// import path from "path";
import trees from "./controllers/trees";

const {APP_PORT} = process.env;

// Connection URL
const url = "mongodb://dev:dev@mongo:27017";

// Database Name
const dbName = "mwenbwa";

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
    console.log(err);
    if (err !== null) {
        throw new Error(err.message);
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const app = express();
    app.locals.db = db;

    app.get("/api/trees", trees.list);
    app.get("/api/trees/coords", trees.getByCoords);

    app.listen(APP_PORT, () =>
        console.log(`🚀 Server is listening on port ${APP_PORT}.`),
    );
});
