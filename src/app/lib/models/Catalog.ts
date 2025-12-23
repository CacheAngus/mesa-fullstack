import mongoose, { Document, Schema } from "mongoose";

export interface ICatalog extends Document {
    name: string;
    type: string;
    company: string;
    created_at: string;
}

const catalogSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    created_at: { type: String, default: new Date() },
    company: { type: String, required: true },
    type: { type: String, required: true },
});

const Catalog =
    mongoose.models.Catalog ||
    mongoose.model<ICatalog>("Catalog", catalogSchema);

export default Catalog;
