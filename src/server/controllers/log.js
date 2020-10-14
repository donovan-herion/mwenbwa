const add = async (db, {action, createdBy}) => {
    try {
        const logs = db.collection("logs");
        const log = {
            action,
            createdBy,
        };
        await logs.insertOne(log);
        return status(201).json({message: "Log created"});
    } catch (error) {
        return status(500).json({error: error.message});
    }
};

const getAllLogs = async (req, res) => {
    try {
        const logs = req.app.locals.db.collection("logs");
        const responseGetAllLogs = await logs
            .aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "_id",
                        as: "createdBy",
                    },
                },
                {$unwind: "$createdBy"},
                {$sort: {createdAt: -1}},
                {
                    $project: {
                        _id: 1,
                        action: 1,
                        createdAt: 1,
                        createdBy: "$createdBy",
                    },
                },
            ])
            .exec();

        return res.status(200).json(responseGetAllLogs);
    } catch (error) {
        return res.status(500).json({error});
    }
};

export default {
    add,
    getAllLogs,
};
