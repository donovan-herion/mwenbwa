// import {ObjectId} from "mongodb";

const getTreeValue = function (tree) {
    let treeValue = 250;
    if (tree.hauteur_totale !== null || tree.circonf !== null) {
        treeValue = Math.ceil((tree.hauteur_totale * tree.circonf) / Math.PI);
    }
    return treeValue;
};

// const queryGeolocTrees100MeterRadius = tree => ({
//     $geoNear: {
//         near: {
//             type: "Point",
//             coordinates: [tree.x_lambda, tree.y_phi],
//         },
//         distanceField: "distance.calculated",
//         maxDistance: 100,
//     },
// });
// const groupSumOfTreeDefaultValues = () => ({
//     $group: {
//         _id: null,
//         treeValue: {
//             $sum: {
//                 $ceil: {
//                     $multiply: ["$circonf", "$hauteur_totale"],
//                 },
//             },
//         },
//     },
// });

const calculatePrice = tree => {
    try {
        // const trees = db.collection("trees");
        // const users = db.collection("users");
        let treeValue = 250;
        if (tree.hauteur_totale !== null || tree.circonf !== null) {
            treeValue = Math.ceil(
                (tree.hauteur_totale * tree.circonf) / Math.PI,
            );
        }
        return treeValue + Math.floor(Math.random() * 10);
        // let treePrice = treeValue;
        // console.log(treeValue);
        // if (tree.owner === null) {
        //     return treePrice;
        // }

        // const user = users.findOne({name: tree.owner});
        // const currentOwner = user.name;
        // const valueTargettedPlayersTreeWithin100m = await trees.aggregate([
        //     queryGeolocTrees100MeterRadius(tree),
        //     {
        //         $match: {owner: currentOwner},
        //     },
        //     groupSumOfTreeDefaultValues(),
        // ]);
        // console.log(valueTargettedPlayersTreeWithin100m);

        // const amountOfTreesWithin100m = await trees.aggregate([
        //     queryGeolocTrees100MeterRadius(tree),
        //     {$group: {_id: null, count: {$sum: 1}}},
        // ]);
        // console.log(amountOfTreesWithin100m);

        // const amountOfTreesTargettedPlayerWithin100m = await trees.aggregate([
        //     queryGeolocTrees100MeterRadius(tree),
        //     {
        //         $match: {owner: currentOwner},
        //     },
        //     {$group: {_id: null, count: {$sum: 1}}},
        // ]);
        // console.log(amountOfTreesTargettedPlayerWithin100m);

        // const valueOtherPeopleTreesWithin100m = await trees.aggregate([
        //     queryGeolocTrees100MeterRadius(tree),
        //     {
        //         $match: {
        //             $and: [
        //                 {
        //                     owner: {
        //                         $ne: currentOwner,
        //                     },
        //                 },
        //             ],
        //         },
        //     },

        //     groupSumOfTreeDefaultValues(),
        // ]);
        // console.log(valueOtherPeopleTreesWithin100m);

        // //     value of all your tree in 100m radius
        // const valueOfCurrentPlayerTrees = await trees.aggregate([
        //     queryGeolocTrees100MeterRadius(tree),
        //     {
        //         $match: {owner: userName},
        //     },
        //     groupSumOfTreeDefaultValues(),
        // ]);
        // console.log(valueOfCurrentPlayerTrees);

        // treePrice =
        //     treeValue +
        //     valueTargettedPlayersTreeWithin100m[0].treeValue *
        //         (amountOfTreesWithin100m[0].count /
        //             amountOfTreesTargettedPlayerWithin100m[0].count) +
        //     valueOtherPeopleTreesWithin100m[0].treeValue -
        //     valueOfCurrentPlayerTrees[0].treeValue;

        // return treePrice;
    } catch (error) {
        console.log(error);
    }
    return true;
};

const calculateLockPrice = tree => {
    //const trees = db.collection("trees");
    let treeValue = 2500;
    if (tree.hauteur_totale !== null || tree.circonf !== null) {
        treeValue = Math.ceil((tree.hauteur_totale * tree.circonf) / Math.PI);
        treeValue = treeValue * 9 + Math.floor(Math.random() * 10);
    }
    return treeValue;
    // const queryValueTrees100MeterRadius = await trees.aggregate([
    //     queryGeolocTrees100MeterRadius(tree),
    //     groupSumOfTreeDefaultValues(),
    // ]);
    // const valueTrees100MeterRadius = queryValueTrees100MeterRadius[0].treeValue;

    // const queryAmountPlayersAndValuePlayersTrees100MeterRadius = await trees.aggregate(
    //     [
    //         queryGeolocTrees100MeterRadius(tree),
    //         {
    //             $match: {owner: {$ne: null}},
    //         },
    //         {
    //             $group: {
    //                 _id: null,
    //                 amountPlayers: {$sum: 1},
    //                 treeValue: {
    //                     $sum: {
    //                         $ceil: {$multiply: ["$circonf", "$hauteur_totale"]},
    //                     },
    //                 },
    //             },
    //         },
    //     ],
    // );
    // const amountPlayers100MeterRadius =
    //     queryAmountPlayersAndValuePlayersTrees100MeterRadius[0].amountPlayers;
    // const valuePlayersTrees100MeterRadius =
    //     queryAmountPlayersAndValuePlayersTrees100MeterRadius[0].treeValue;

    // const lockPrice = Math.ceil(
    //     treeValue * 10 +
    //         valueTrees100MeterRadius * amountPlayers100MeterRadius -
    //         valuePlayersTrees100MeterRadius / amountPlayers100MeterRadius,
    // );

    // return lockPrice;
};

export default {
    getTreeValue,
    calculatePrice,
    calculateLockPrice,
};
