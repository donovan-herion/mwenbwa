const add = async (db, {action, createdBy, date}) => {
    try {
        const logs = db.collection("logs");
        const log = {
            action,
            createdBy,
            date,
        };
        await logs.insertOne(log);
        return status(201).json({message: "Log created"});
    } catch (error) {
        return status(500).json({error: error.message});
    }
};
const getAllLogs = async (req, res) => {
    const logs = req.app.locals.db.collection("logs");
    try {
        const responseGetAllLogs = await logs
            .aggregate([{$sort: {_id: -1}}])
            .toArray();

        return res.status(200).json(responseGetAllLogs);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};
export default {
    add,
    getAllLogs,
};
