export const createIndexes = db => {
    db.trees.createIndex({
        loc: "2d",
    });
};
