// const User = require("../models/user");

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
        name: 1,
        location: 1,
        diameter: 1,
        height: 1,
        owner: 1,
        isLocked: 1,
        comments: {
            _id: 1,
            content: 1,
            owner: 1,
            createdAt: 1,
        },
    },
});

const getAllTrees = async (req, res) => {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    console.log(lat, lng);

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

const getOneTree = async (req, res) => {
    try {
        const collection = req.app.locals.db.collection("trees");
        const responseGetOneTree = await collection
            .aggregate([
                {$match: {_id: collection.ObjectId(req.params.treeId)}},
            ])
            .toArray();

        const tree = responseGetOneTree[0];

        // console.log(JSON.stringify(tree));

        //tree.price = await calculatePrice(tree, req.userId);

        return res.status(200).json(tree);
    } catch (error) {
        return res.status(500).json({error});
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
