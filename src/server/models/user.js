const createUserColl = (req, res) => {
    const collection = req.app.locals.db.createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "password", "email", "color", "leaves"],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "must be a string and is required",
                    },
                    password: {
                        bsonType: "string",
                        description: "must be a string and is required",
                    },
                    email: {
                        bsonType: "string",
                        description: "must be a string, unique and is required",
                    },
                    color: {
                        bsonType: ["string"],
                    },
                    leaves: {
                        bsonType: "int",
                        required: ["city"],
                        properties: {
                            street: {
                                bsonType: "string",
                                description:
                                    "must be a string if the field exists",
                            },
                        },
                    },
                },
            },
        },
    });
    res.json(collection);
};

export default {
    createUserColl,
};
