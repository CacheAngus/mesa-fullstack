export type Entity = {
    _id?: string;
    name: string;
    type: string;
    tax_id: string;
    sof: string;
};

export type Signatory = {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    title: string;
};

export type Store = {
    _id?: string;
    franchise_name: string;
    franchise_number: number;
    address: string;
};

export type Billing = {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    extension?: string;
    address: string;
};
