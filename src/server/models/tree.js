const mongoose = require("mongoose");

const treeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    location: {
        type: {type: String},
        coordinates: [],
    },
    diameter: {
        type: Number,
    },
    height: {
        type: Number,
    },
    owner: {
        type: "ObjectId",
        ref: "User",
        default: null,
    },
    isLocked: {
        type: Boolean,
    },
});

treeSchema.index({location: "2dsphere"});

module.exports = mongoose.model("Tree", treeSchema);
