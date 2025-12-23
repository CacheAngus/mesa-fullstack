import { Entity, Store, Signatory, Billing } from "./Types";

export type BaseAccount = {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    extension?: string;
    address: string;
    franchise_name?: string;
    type: string;
    sso_information?: { user_id: string };
    notifications: {
        catalogs: boolean;
        applications: boolean;
        organization: boolean;
        support: boolean;
    };
    created_at: string;
    permissions: { applications: boolean; catalogs: boolean };
    title: string;
};

export interface Account extends BaseAccount {
    billings?: Billing[];
    entities?: Entity[];
    stores?: Store[];
    signatories?: Signatory[];
}
