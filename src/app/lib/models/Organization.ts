import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
    name: string;
    primary_color?: string;
    secondary_color: string;
    logo: string;
    features: {};
}

const organizationSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    primary_color: { type: String, default: "" },
    secondary_color: { type: String, default: "" },
    logo: { type: String, default: "" },
    features: {
        catalogs: Boolean,
        applications: Boolean,
    },
});

const Organization =
    mongoose.models.Organization ||
    mongoose.model<IOrganization>("Organization", organizationSchema);

export default Organization;
