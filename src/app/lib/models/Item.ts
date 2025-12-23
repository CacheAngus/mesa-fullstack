import mongoose, { Document, Schema } from "mongoose";
import Catalog from "./Catalog";
import Application from "./Application";

export interface IItem extends Document {
    name: string;
    catalog: string;
    type: string;
    price: number;
    currency: string;
    quantity_type: string;
    description: string;
    created_at: string;
    previously_purchased: string[];
}

const itemSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    catalog: { type: Catalog },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: String, default: new Date() },
    previously_purchased: [Application],
});

const Item = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;
