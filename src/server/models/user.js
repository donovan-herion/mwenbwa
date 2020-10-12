export const createUserCollection = db => {
    const collection = db.collection("mycollection");
    console.log(collection);
    // db.createCollection("users", {
    //     validator: {
    //         $jsonSchema: {
    //             bsonType: "object",
    //             required: ["name", "password", "email", "color", "leaves"],
    //             properties: {
    //                 name: {
    //                     bsonType: "string",
    //                     description: "must be a string and is required",
    //                 },
    //                 password: {
    //                     bsonType: "string",
    //                     description: "must be a string and is required",
    //                 },
    //                 email: {
    //                     bsonType: "string",
    //                     description: "must be a string, unique and is required",
    //                 },
    //                 color: {
    //                     bsonType: ["string"],
    //                 },
    //                 leaves: {
    //                     bsonType: "int",
    //                 },
    //             },
    //         },
    //     },
    // });
};
