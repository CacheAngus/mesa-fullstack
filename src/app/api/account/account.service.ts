import { Connection, ObjectId } from "mongoose";

export async function updateAccount(
    db: Connection,
    accountId: ObjectId,
    update
) {
    return db.models.Account.updateOne(
        { _id: new ObjectId(accountId) },
        { $set: update }
    ).exec();
}

export async function getAccount(db: Connection, accountId: ObjectId) {
    return db.models.Account.findOne({ _id: accountId }).exec();
}

export async function createAccount(db: Connection, account) {
    return db.models.Account.create(account);
}
