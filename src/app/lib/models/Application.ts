import mongoose, { Document, Schema } from "mongoose";
import { Billing, Signatory, Entity, Store } from "../Types";

export interface IApplication extends Document {
    name: string;
    type: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    phone: string;
    extension: string;
    billings: Billing[];
    signatories: Signatory[];
    entities?: Entity[];
    stores?: Store[];
    comment: string;
    orders?: [];
    status: "draft" | "active" | "complete" | "deleted";
    created_by: string;
    last_modified_by: string;
}

const applicationSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    extension: { type: String, required: true },
    billings: Array<Billing>,
    signatories: Array<Signatory>,
    entities: Array<Entity>,
    stores: Array<Store>,
    comment: String,
    orders: [],
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    last_modified_by: { type: String, required: true },
});

const Application =
    mongoose.models.Application ||
    mongoose.model<IApplication>("Application", applicationSchema);

export default Application;
