import {ObjectId} from "mongodb";

const add = async (db, {action, createdBy, date}) => {
    try {
        const users = db.collection("users");
        const user = await users.findOne({_id: ObjectId(createdBy)});
        const logs = db.collection("logs");
        const log = {
            action,
            createdBy: user.name,
            date,
        };
        await logs.insertOne(log);
        return log;
    } catch (error) {
        return "error";
    }
};

const getAllLogs = async (req, res) => {
    const logs = req.app.locals.db.collection("logs");

    try {
        const responseGetAllLogs = await logs
            .aggregate([{$sort: {_id: -1}}])
            .limit(3)
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
