import { Connection } from "mongoose";

export async function getOrganization(db: Connection) {
    return db.models.Organization.findOne({}).exec();
}

export async function updateOrganization(db: Connection, update) {
    return db.models.Organization.updateOne({}, { $set: update }).exec();
}
