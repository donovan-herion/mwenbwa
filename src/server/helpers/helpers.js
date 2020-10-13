import {ObjectId} from "mongodb";

exports.getTreeValue = function (tree) {
    return Math.ceil(tree.diameter * tree.height);
};

const queryGeolocTrees100MeterRadius = tree => ({
    $geoNear: {
        near: {
            type: "Point",
            coordinates: [tree.x_lambda, tree.y_phi],
        },
        distanceField: "distance.calculated",
        maxDistance: 100,
    },
});
const groupSumOfTreeDefaultValues = () => ({
    $group: {
        _id: null,
        treeValue: {
            $sum: {
                $ceil: {
                    $multiply: ["$circonf", "$hauteur_totale"],
                },
            },
        },
    },
});

exports.calculatePrice = async (tree, userId, req) => {
    try {
        const trees = req.app.locals.db.collection("trees");
        let treeValue = 250;
        if (tree.hauteur_totale !== null || tree.circonf !== null) {
            treeValue = Math.ceil(
                (tree.hauteur_totale * tree.circonf) / Math.PI,
            );
        }
        let treePrice = treeValue;

        if (tree.owner === null) {
            return treePrice;
        }
        const currentOwner = tree.owner;
        const valueTargettedPlayersTreeWithin100m = await trees.aggregate([
            queryGeolocTrees100MeterRadius(tree),
            {
                $match: {owner: ObjectId(currentOwner)},
            },
            groupSumOfTreeDefaultValues(),
        ]);

        const amountOfTreesWithin100m = await trees.aggregate([
            queryGeolocTrees100MeterRadius(tree),
            {$group: {_id: null, count: {$sum: 1}}},
        ]);

        const amountOfTreesTargettedPlayerWithin100m = await trees.aggregate([
            queryGeolocTrees100MeterRadius(tree),
            {
                $match: {owner: ObjectId(currentOwner)},
            },
            {$group: {_id: null, count: {$sum: 1}}},
        ]);

        const valueOtherPeopleTreesWithin100m = await trees.aggregate([
            queryGeolocTrees100MeterRadius(tree),
            {
                $match: {
                    $and: [
                        {
                            owner: {
                                $ne: ObjectId(currentOwner),
                            },
                        },
                        {owner: {$type: "objectId"}},
                    ],
                },
            },

            groupSumOfTreeDefaultValues(),
        ]);

        //     value of all your tree in 100m radius
        const valueOfCurrentPlayerTrees = await trees.aggregate([
            queryGeolocTrees100MeterRadius(tree),
            {
                $match: {owner: ObjectId(userId)},
            },
            groupSumOfTreeDefaultValues(),
        ]);

        treePrice =
            treeValue +
            valueTargettedPlayersTreeWithin100m[0].treeValue *
                (amountOfTreesWithin100m[0].count /
                    amountOfTreesTargettedPlayerWithin100m[0].count) +
            valueOtherPeopleTreesWithin100m[0].treeValue -
            valueOfCurrentPlayerTrees[0].treeValue;

        return treePrice;
    } catch (error) {
        console.log(error);
    }
    return true;
};

exports.calculateLockPrice = async (req, tree) => {
    const trees = req.app.locals.db.collection("trees");
    const treeValue = Math.ceil(tree.circonf * tree.hauteur_totale);

    const queryValueTrees100MeterRadius = await trees.aggregate([
        queryGeolocTrees100MeterRadius(tree),
        groupSumOfTreeDefaultValues(),
    ]);
    const valueTrees100MeterRadius = queryValueTrees100MeterRadius[0].treeValue;

    const queryAmountPlayersAndValuePlayersTrees100MeterRadius = await trees.aggregate(
        [
            queryGeolocTrees100MeterRadius(tree),
            {
                $match: {owner: {$ne: null}},
            },
            {
                $group: {
                    _id: null,
                    amountPlayers: {$sum: 1},
                    treeValue: {
                        $sum: {
                            $ceil: {$multiply: ["$circonf", "$hauteur_totale"]},
                        },
                    },
                },
            },
        ],
    );
    const amountPlayers100MeterRadius =
        queryAmountPlayersAndValuePlayersTrees100MeterRadius[0].amountPlayers;
    const valuePlayersTrees100MeterRadius =
        queryAmountPlayersAndValuePlayersTrees100MeterRadius[0].treeValue;

    const lockPrice = Math.ceil(
        treeValue * 10 +
            valueTrees100MeterRadius * amountPlayers100MeterRadius -
            valuePlayersTrees100MeterRadius / amountPlayers100MeterRadius,
    );

    return lockPrice;
};
