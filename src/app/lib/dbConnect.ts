import mongoose from "mongoose";

global.mongoose = {
    db: null,
    promise: null,
};

export default async function dbConnect() {
    if (global.mongoose && global.mongoose.db) {
        console.log("Connected from previous");
        return global.mongoose.db;
    } else {
        const connectionString = process.env.MONGO_DB_URI!;
        const promise = mongoose.connect(connectionString, { autoIndex: true });
        global.mongoose = { db: await promise, promise };
        console.log("Connected to db");
        return await global.mongoose;
    }
}
