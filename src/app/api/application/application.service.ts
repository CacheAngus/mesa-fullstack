import { Connection, ObjectId } from "mongoose";

export async function createApplication(db: Connection, application) {
    return db.models.Application.create(application);
}

export async function updateApplication(
    db: Connection,
    applicationId: ObjectId,
    update
) {
    return db.models.Application.updateOne(
        { _id: new ObjectId(applicationId) },
        { $set: update }
    ).exec();
}

export async function getApplication(db: Connection, applicationId: ObjectId) {
    return db.models.Application.findOne({ _id: applicationId }).exec();
}
