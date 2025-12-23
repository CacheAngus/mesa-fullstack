import { Connection } from "mongoose";

export async function getAccounts(db: Connection) {
    return await db.models.Account.find({}).exec();
}
