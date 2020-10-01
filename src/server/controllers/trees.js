// const Tree = require("../models/tree");
// const User = require("../models/user");

const list = async (req, res) => {
    try {
        const collection = req.app.locals.db.collection("trees");
        // Find some documents
        const trees = await collection.find().limit(200).toArray();
        res.json(trees);
    } catch (error) {
        console.log(error);
        res.send("error");
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
};
