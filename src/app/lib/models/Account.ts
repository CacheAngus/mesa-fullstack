import mongoose, { Document, Schema } from "mongoose";

export interface IAccount extends Document {
    first_name: string;
    franchise_name?: string;
    last_name: string;
    email: string;
    phone: number;
    extension: string;
    address: string;
    entities?: [];
    signatories?: [];
    sso_information?: { user_id: string };
    billings?: [];
    stores?: [];
    type?: string;
    notifications: {
        catalogs: boolean;
        applications: boolean;
        organization: boolean;
        support: boolean;
    };
    created_at: string;
    permissions: { applications: boolean; catalogs: boolean };
    title: string;
}

const accountSchema: Schema = new mongoose.Schema({
    first_name: { type: String, required: true },
    franchise_name: String,
    sso_information: { user_id: String },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    extension: String,
    address: { type: String, required: true },
    signatories: [
        {
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },
            email: { type: String, required: true },
            title: { type: String, required: true },
        },
    ],
    billings: [
        {
            first_name: { type: String, required: true },
            last_name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: Number, required: true },
            extension: { type: String, required: true },
            address: { type: String, required: true },
        },
    ],
    stores: [
        {
            franchise_number: Number,
            franchise_name: { type: String, required: true },
            address: { type: String, required: true },
        },
    ],
    entities: [
        {
            name: { type: String, required: true },
            type: { type: String, required: true },
            tax_id: { type: String, required: true },
            sof: { type: String, required: true },
        },
    ],
    type: String,
    notifications: {
        catalogs: Boolean,
        applications: Boolean,
        organization: Boolean,
        support: Boolean,
    },
    created_at: { type: String, default: new Date() },
    permissions: { applications: Boolean, catalogs: Boolean },
    title: { type: String },
});

const Account =
    mongoose.models.Account ||
    mongoose.model<IAccount>("Account", accountSchema);

export default Account;
