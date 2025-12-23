import { Billing, Signatory, Entity, Store } from "./Types";

export type Application = {
    _id?: string;
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
};
