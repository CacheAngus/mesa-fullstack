import { Connection } from "mongoose";

export async function getApplications(db: Connection) {
    return await db.models.Application.find({}).exec();
}
