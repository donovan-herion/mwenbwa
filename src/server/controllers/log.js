exports.add = async (req, res, {action, createdBy}) => {
    try {
        const logs = req.app.locals.db.collection("logs");
        const log = {
            action,
            createdBy,
        };
        await logs.insertOne(log);
        res.status(201).json({message: "Log created"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.getAllLogs = async (req, res) => {
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

        const logsActionsTranslated = responseGetAllLogs.map(log => {
            let actionTranslated = null;

            switch (log.action) {
                case "Add comment":
                    actionTranslated = "Commentaire ajouté";
                    break;
                case "Tree locked":
                    actionTranslated = "Arbre bloqué";
                    break;
                case "Tree purchased":
                    actionTranslated = "Arbre acheté";
                    break;
                default:
                    actionTranslated = "Arbre acheté";
                    break;
            }

            return {...log, action: actionTranslated};
        });

        return res.status(200).json(logsActionsTranslated);
    } catch (error) {
        return res.status(500).json({error});
    }
};
